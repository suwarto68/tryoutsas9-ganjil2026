// Robust Interactive Web Audio SFX & Browser Web Speech API Narration Engine

let audioCtx: AudioContext | null = null;
let speechToken = 0;
let activeUtterances: SpeechSynthesisUtterance[] = [];
let pendingSpeechTimer: number | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function unlockAudioEngine(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  if (isSpeechSupported()) {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {
      // Ignore browser speech initialization errors
    }
  }
}

function scheduleOscillatorTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType,
  startTimeOffset: number,
  gainPeak: number
) {
  try {
    const now = ctx.currentTime + Math.max(0, startTimeOffset);
    const safeDuration = Math.max(0.05, duration);
    const safePeak = Math.max(0.01, Math.min(0.4, gainPeak));

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(safePeak, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + safeDuration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {
        // Ignore cleanup error
      }
    };

    osc.start(now);
    osc.stop(now + safeDuration + 0.03);
  } catch {
    // Ignore audio scheduling error
  }
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  startTimeOffset = 0,
  gainPeak = 0.14
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx
      .resume()
      .then(() => {
        scheduleOscillatorTone(
          ctx,
          frequency,
          duration,
          type,
          startTimeOffset,
          gainPeak
        );
      })
      .catch(() => {});
    return;
  }

  scheduleOscillatorTone(ctx, frequency, duration, type, startTimeOffset, gainPeak);
}

export function playSelectSound(enabled: boolean) {
  if (!enabled) return;
  playTone(587.33, 0.09, 'triangle', 0, 0.09);
}

export function playCorrectSound(enabled: boolean) {
  if (!enabled) return;
  playTone(523.25, 0.14, 'triangle', 0, 0.12);
  playTone(659.25, 0.14, 'triangle', 0.09, 0.12);
  playTone(783.99, 0.16, 'triangle', 0.18, 0.12);
  playTone(1046.5, 0.28, 'sine', 0.27, 0.14);
}

export function playWrongSound(enabled: boolean) {
  if (!enabled) return;
  playTone(349.23, 0.16, 'sine', 0, 0.11);
  playTone(293.66, 0.24, 'sine', 0.14, 0.11);
}

export function playLevelUpSound(enabled: boolean) {
  if (!enabled) return;
  playTone(440, 0.12, 'triangle', 0, 0.11);
  playTone(554.37, 0.12, 'triangle', 0.1, 0.11);
  playTone(659.25, 0.22, 'triangle', 0.2, 0.13);
}

export function playCompleteSound(enabled: boolean) {
  if (!enabled) return;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  notes.forEach((n, idx) => {
    playTone(n, 0.24, 'triangle', idx * 0.1, 0.12);
  });
}

// --- Web Speech API Narration ---

export type NarrationPhase = 'idle' | 'reading_stimulus' | 'reading_question';

export function isSpeechSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined'
  );
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    cachedVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', () => {
      try {
        cachedVoices = window.speechSynthesis.getVoices();
      } catch {
        // Ignore
      }
    });
  } catch {
    // Ignore
  }
}

function selectIndonesianVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  try {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
    }
    const pool = cachedVoices;
    if (!pool.length) return null;
    return (
      pool.find((v) => v.lang.toLowerCase() === 'id-id') ||
      pool.find((v) => v.lang.toLowerCase().startsWith('id')) ||
      pool.find((v) => v.lang.toLowerCase().startsWith('ms')) ||
      null
    );
  } catch {
    return null;
  }
}

function cleanMathForSpeech(text: string): string {
  return text
    .replace(/∠/g, 'sudut ')
    .replace(/⊥/g, ' tegak lurus ')
    .replace(/°/g, ' derajat')
    .replace(/cm²/g, ' sentimeter persegi')
    .replace(/m²/g, ' meter persegi')
    .replace(/dm²/g, ' desimeter persegi')
    .replace(/cm³/g, ' sentimeter kubik')
    .replace(/m³/g, ' meter kubik')
    .replace(/dm³/g, ' desimeter kubik')
    .replace(/²/g, ' kuadrat')
    .replace(/³/g, ' kubik')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'akar kuadrat dari ')
    .replace(/×/g, ' kali ')
    .replace(/÷/g, ' bagi ')
    .replace(/≤/g, ' kurang dari atau sama dengan ')
    .replace(/≠/g, ' tidak sama dengan ')
    .replace(/(\d+)\/(\d+)/g, '$1 per $2')
    .replace(/Rp\.?\s*([\d.]+)/gi, (_, num) => `${String(num).replace(/\./g, '')} rupiah`)
    .replace(/\s+/g, ' ')
    .trim();
}

// Split long Indonesian passages into natural sentence chunks (<= 160 chars)
// to prevent Chrome's 15-second SpeechSynthesis cutoff bug.
function splitIntoChunks(text: string, maxLen = 155): string[] {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  for (const sentence of sentences) {
    if (sentence.length <= maxLen) {
      chunks.push(sentence);
      continue;
    }
    const subParts = sentence
      .split(/(?<=[,;:])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    let current = '';
    for (const part of subParts) {
      if ((current + ' ' + part).trim().length <= maxLen) {
        current = (current + ' ' + part).trim();
      } else {
        if (current) chunks.push(current);
        current = part;
      }
    }
    if (current) chunks.push(current);
  }
  return chunks;
}

export function stopNarration(onPhaseChange?: (phase: NarrationPhase) => void) {
  speechToken += 1;
  if (pendingSpeechTimer !== null) {
    window.clearTimeout(pendingSpeechTimer);
    pendingSpeechTimer = null;
  }
  activeUtterances = [];
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancel errors
    }
  }
  onPhaseChange?.('idle');
}

interface SpeechChunk {
  text: string;
  phase: NarrationPhase;
}

function speakChunkQueue(params: {
  chunks: SpeechChunk[];
  rate: number;
  token: number;
  onPhaseChange?: (phase: NarrationPhase) => void;
  onBlockedOrError?: (reason: string) => void;
}) {
  const { chunks, rate, token, onPhaseChange, onBlockedOrError } = params;
  if (token !== speechToken || chunks.length === 0) {
    if (token === speechToken) onPhaseChange?.('idle');
    return;
  }

  let index = 0;

  const speakNext = () => {
    if (token !== speechToken) return;
    if (index >= chunks.length) {
      activeUtterances = [];
      onPhaseChange?.('idle');
      return;
    }

    const item = chunks[index];
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.lang = 'id-ID';
      utterance.rate = rate;
      const voice = selectIndonesianVoice();
      if (voice) utterance.voice = voice;

      // Retain strong reference to prevent Chromium premature GC
      activeUtterances.push(utterance);

      utterance.onstart = () => {
        if (token !== speechToken) return;
        onPhaseChange?.(item.phase);
      };

      utterance.onend = () => {
        if (token !== speechToken) return;
        index += 1;
        speakNext();
      };

      utterance.onerror = (event) => {
        if (token !== speechToken) return;
        const errType = event?.error || '';
        if (errType === 'interrupted' || errType === 'canceled') {
          return;
        }
        activeUtterances = [];
        onPhaseChange?.('idle');
        if (errType === 'not-allowed') {
          onBlockedOrError?.(
            'Browser memblokir suara otomatis. Tekan tombol "Bacakan Soal" untuk mendengarkan.'
          );
        } else {
          onBlockedOrError?.(
            'Suara narasi tidak tersedia di browser ini. Gunakan mode baca teks.'
          );
        }
      };

      onPhaseChange?.(item.phase);
      window.speechSynthesis.speak(utterance);
    } catch {
      activeUtterances = [];
      onPhaseChange?.('idle');
      onBlockedOrError?.(
        'Fitur narasi suara mengalami kendala pada browser ini.'
      );
    }
  };

  speakNext();
}

export function speakQuizContent(params: {
  stimulusTitle: string;
  stimulusText: string;
  questionText: string;
  questionType: 'pg' | 'mcma' | 'bs';
  extraItems?: string[];
  rate?: number;
  onPhaseChange?: (phase: NarrationPhase) => void;
  onError?: (message: string) => void;
}) {
  if (!isSpeechSupported()) {
    params.onError?.('Browser Anda belum mendukung fitur narasi suara.');
    return;
  }

  stopNarration();
  const currentToken = speechToken;
  const rate = params.rate ?? 0.98;

  const stimulusChunks = splitIntoChunks(
    cleanMathForSpeech(`${params.stimulusTitle}. ${params.stimulusText}`)
  ).map((text) => ({ text, phase: 'reading_stimulus' as NarrationPhase }));

  const extraPrefix =
    params.questionType === 'pg'
      ? (i: number) => `Pilihan ${['A', 'B', 'C', 'D'][i] || i + 1}`
      : (i: number) => `Pernyataan ${i + 1}`;

  const extraSentences =
    params.extraItems && params.extraItems.length > 0
      ? params.extraItems.map((item, i) => `${extraPrefix(i)}: ${item}.`)
      : [];

  const questionFullText = cleanMathForSpeech(
    `Pertanyaan: ${params.questionText}. ${extraSentences.join(' ')}`
  );
  const questionChunks = splitIntoChunks(questionFullText).map((text) => ({
    text,
    phase: 'reading_question' as NarrationPhase,
  }));

  const allChunks = [...stimulusChunks, ...questionChunks];

  // Small delay after cancel() avoids Chromium cancel-then-speak race condition
  pendingSpeechTimer = window.setTimeout(() => {
    pendingSpeechTimer = null;
    speakChunkQueue({
      chunks: allChunks,
      rate,
      token: currentToken,
      onPhaseChange: params.onPhaseChange,
      onBlockedOrError: params.onError,
    });
  }, 80);
}

export function speakFeedbackMessage(
  text: string,
  onError?: (message: string) => void
) {
  if (!isSpeechSupported()) return;
  stopNarration();
  const currentToken = speechToken;
  const chunks = splitIntoChunks(cleanMathForSpeech(text)).map((c) => ({
    text: c,
    phase: 'idle' as NarrationPhase,
  }));

  pendingSpeechTimer = window.setTimeout(() => {
    pendingSpeechTimer = null;
    speakChunkQueue({
      chunks,
      rate: 1.0,
      token: currentToken,
      onBlockedOrError: onError,
    });
  }, 80);
}
