import React from 'react';
import { StimulusVisualConfig } from '../types/quiz';

interface StimulusVisualProps {
  visual: StimulusVisualConfig;
}

export const StimulusVisual: React.FC<StimulusVisualProps> = ({ visual }) => {
  return (
    <figure className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
      <div className="mb-3">
        <div className="text-sm font-bold text-slate-900">{visual.title}</div>
        {visual.subtitle && (
          <div className="text-xs text-slate-500 mt-0.5">{visual.subtitle}</div>
        )}
      </div>

      {visual.kind === 'wanaraya_infographic' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(visual.infographicItems || []).map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 flex flex-col justify-between"
            >
              <span className="text-xs font-medium text-slate-500">{item.label}</span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-slate-900 font-math">
                  {item.value}
                </span>
                {item.unit && (
                  <span className="text-xs font-semibold text-sky-700 font-math whitespace-nowrap">
                    {item.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {visual.kind === 'wanaraya_chart_bar' && <BarChartSvg visual={visual} />}

      {visual.kind === 'wanaraya_chart_line' && <LineChartSvg visual={visual} />}

      {visual.kind === 'geometry_net_grid' && <NetGridSvg visual={visual} />}

      {visual.kind === 'geometry_solid_3d' && <Solid3DSvg visual={visual} />}

      {visual.kind === 'geometry_circle' && <CircleDiagramSvg visual={visual} />}

      <figcaption className="mt-3 text-xs text-slate-500 leading-relaxed">
        {visual.caption}
      </figcaption>
    </figure>
  );
};

const BarChartSvg: React.FC<{ visual: StimulusVisualConfig }> = ({ visual }) => {
  const data = visual.chartData || [];
  const maxVal = Math.max(
    ...data.flatMap((d) => [d.value, d.secondaryValue || 0]),
    10
  );
  const yMax = Math.ceil(maxVal / 10) * 10 || 10;
  const width = 440;
  const height = 210;
  const padL = 44;
  const padR = 20;
  const padT = 18;
  const padB = 38;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3">
      {visual.seriesNames && (
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mb-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block" />
            {visual.seriesNames[0]}
          </span>
          {visual.seriesNames[1] && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" />
              {visual.seriesNames[1]}
            </span>
          )}
        </div>
      )}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
          const y = padT + plotH * (1 - t);
          const tickVal = Math.round(yMax * t);
          return (
            <g key={idx}>
              <line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#64748b"
                fontFamily="IBM Plex Mono, monospace"
              >
                {tickVal}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const groupW = plotW / Math.max(data.length, 1);
          const cx = padL + groupW * i + groupW / 2;
          const barW = d.secondaryValue !== undefined ? 34 : 48;
          const h1 = (d.value / yMax) * plotH;
          const h2 =
            d.secondaryValue !== undefined ? (d.secondaryValue / yMax) * plotH : 0;

          return (
            <g key={i}>
              <rect
                x={d.secondaryValue !== undefined ? cx - barW - 3 : cx - barW / 2}
                y={padT + plotH - h1}
                width={barW}
                height={h1}
                rx="4"
                fill="#0284c7"
              />
              <text
                x={d.secondaryValue !== undefined ? cx - barW / 2 - 3 : cx}
                y={padT + plotH - h1 - 5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#0f172a"
                fontFamily="IBM Plex Mono, monospace"
              >
                {d.value}
              </text>

              {d.secondaryValue !== undefined && (
                <>
                  <rect
                    x={cx + 3}
                    y={padT + plotH - h2}
                    width={barW}
                    height={h2}
                    rx="4"
                    fill="#f59e0b"
                  />
                  <text
                    x={cx + 3 + barW / 2}
                    y={padT + plotH - h2 - 5}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#0f172a"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {d.secondaryValue}
                  </text>
                </>
              )}

              <text
                x={cx}
                y={height - 12}
                textAnchor="middle"
                fontSize="11"
                fill="#334155"
                fontWeight="500"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const LineChartSvg: React.FC<{ visual: StimulusVisualConfig }> = ({ visual }) => {
  const data = visual.chartData || [];
  const maxVal = Math.max(
    ...data.flatMap((d) => [d.value, d.secondaryValue || 0]),
    100
  );
  const yMax = Math.ceil(maxVal / 20) * 20;
  const width = 440;
  const height = 220;
  const padL = 46;
  const padR = 24;
  const padT = 18;
  const padB = 38;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const getX = (i: number) =>
    padL + (data.length > 1 ? (i / (data.length - 1)) * plotW : plotW / 2);
  const getY = (val: number) => padT + plotH * (1 - val / yMax);

  const path1 = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`)
    .join(' ');
  const path2 = data
    .map(
      (d, i) =>
        `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.secondaryValue ?? d.value)}`
    )
    .join(' ');

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3">
      {visual.seriesNames && (
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mb-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-sky-600 inline-block" />
            {visual.seriesNames[0]}
          </span>
          {visual.seriesNames[1] && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-600 inline-block" />
              {visual.seriesNames[1]}
            </span>
          )}
        </div>
      )}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
          const y = padT + plotH * (1 - t);
          const tickVal = Math.round(yMax * t);
          return (
            <g key={idx}>
              <line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#64748b"
                fontFamily="IBM Plex Mono, monospace"
              >
                {tickVal}
              </text>
            </g>
          );
        })}

        <path d={path1} fill="none" stroke="#0284c7" strokeWidth="2.5" />
        <path
          d={path2}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.5"
          strokeDasharray="5 3"
        />

        {data.map((d, i) => (
          <g key={i}>
            <circle cx={getX(i)} cy={getY(d.value)} r="4" fill="#0284c7" />
            {d.secondaryValue !== undefined && (
              <circle
                cx={getX(i)}
                cy={getY(d.secondaryValue)}
                r="4"
                fill="#d97706"
              />
            )}
            <text
              x={getX(i)}
              y={height - 12}
              textAnchor="middle"
              fontSize="11"
              fill="#334155"
            >
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const NetGridSvg: React.FC<{ visual: StimulusVisualConfig }> = ({ visual }) => {
  if (visual.netPattern === 'pilihan_4_jaring' && visual.netCandidates) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {visual.netCandidates.map((cand, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col items-center"
          >
            <div className="text-xs font-bold text-slate-800 mb-2">{cand.label}</div>
            <svg viewBox="0 0 100 80" className="w-24 h-20">
              {cand.cells.map(([r, c], cellIdx) => (
                <rect
                  key={cellIdx}
                  x={10 + c * 20}
                  y={10 + r * 20}
                  width="20"
                  height="20"
                  fill="#e0f2fe"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>
        ))}
      </div>
    );
  }

  // Default: kubus_referensi numbered 1..6 (1 above 3, row 2-3-4-5, 6 below 4)
  const numberedCells: { r: number; c: number; n: string }[] = [
    { r: 0, c: 1, n: '1' },
    { r: 1, c: 0, n: '2' },
    { r: 1, c: 1, n: '3' },
    { r: 1, c: 2, n: '4' },
    { r: 1, c: 3, n: '5' },
    { r: 2, c: 2, n: '6' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex justify-center">
      <svg viewBox="0 0 220 150" className="w-56 h-auto">
        {numberedCells.map((cell) => {
          const x = 20 + cell.c * 42;
          const y = 12 + cell.r * 42;
          return (
            <g key={cell.n}>
              <rect
                x={x}
                y={y}
                width="42"
                height="42"
                fill="#f8fafc"
                stroke="#0f172a"
                strokeWidth="1.75"
              />
              <text
                x={x + 21}
                y={y + 26}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#0284c7"
                fontFamily="IBM Plex Mono, monospace"
              >
                {cell.n}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const Solid3DSvg: React.FC<{ visual: StimulusVisualConfig }> = ({ visual }) => {
  const kind = visual.solidKind || 'kubus';

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-52 flex justify-center shrink-0">
          <svg viewBox="0 0 200 160" className="w-48 h-auto">
            {kind === 'kubus' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <polygon points="45,50 115,50 115,120 45,120" fill="#e0f2fe" fillOpacity="0.5" />
                <polygon points="45,50 75,28 145,28 115,50" fill="#bae6fd" fillOpacity="0.6" />
                <polygon points="115,50 145,28 145,98 115,120" fill="#7dd3fc" fillOpacity="0.5" />
                <line x1="75" y1="28" x2="75" y2="98" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="45" y1="120" x2="75" y2="98" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="75" y1="98" x2="145" y2="98" strokeDasharray="4 3" stroke="#64748b" />
              </g>
            )}

            {kind === 'balok' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <polygon points="28,62 128,62 128,125 28,125" fill="#e0f2fe" fillOpacity="0.5" />
                <polygon points="28,62 62,36 162,36 128,62" fill="#bae6fd" fillOpacity="0.6" />
                <polygon points="128,62 162,36 162,99 128,125" fill="#7dd3fc" fillOpacity="0.5" />
                <line x1="62" y1="36" x2="62" y2="99" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="28" y1="125" x2="62" y2="99" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="62" y1="99" x2="162" y2="99" strokeDasharray="4 3" stroke="#64748b" />
              </g>
            )}

            {kind === 'prisma_segitiga' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <polygon points="35,120 75,55 115,120" fill="#e0f2fe" fillOpacity="0.6" />
                <polygon points="75,55 135,35 175,100 115,120" fill="#bae6fd" fillOpacity="0.55" />
                <line x1="35" y1="120" x2="95" y2="100" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="95" y1="100" x2="135" y2="35" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="95" y1="100" x2="175" y2="100" strokeDasharray="4 3" stroke="#64748b" />
              </g>
            )}

            {kind === 'limas_segiempat' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <polygon points="40,122 120,122 155,96 75,96" fill="#e0f2fe" fillOpacity="0.45" />
                <polygon points="40,122 120,122 98,28" fill="#bae6fd" fillOpacity="0.55" />
                <polygon points="120,122 155,96 98,28" fill="#7dd3fc" fillOpacity="0.5" />
                <line x1="75" y1="96" x2="98" y2="28" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="98" y1="28" x2="98" y2="109" strokeDasharray="3 3" stroke="#d97706" />
              </g>
            )}

            {kind === 'gabungan_kubus_limas' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <polygon points="52,72 118,72 118,136 52,136" fill="#e0f2fe" fillOpacity="0.55" />
                <polygon points="118,72 146,54 146,118 118,136" fill="#7dd3fc" fillOpacity="0.5" />
                <polygon points="52,72 118,72 99,20" fill="#fef3c7" fillOpacity="0.7" />
                <polygon points="118,72 146,54 99,20" fill="#fde68a" fillOpacity="0.7" />
                <line x1="52" y1="72" x2="80" y2="54" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="80" y1="54" x2="146" y2="54" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="80" y1="54" x2="99" y2="20" strokeDasharray="4 3" stroke="#64748b" />
              </g>
            )}

            {kind === 'gabungan_balok_prisma' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <polygon points="32,74 112,74 112,132 32,132" fill="#e0f2fe" fillOpacity="0.55" />
                <polygon points="112,74 166,52 166,110 112,132" fill="#7dd3fc" fillOpacity="0.5" />
                <polygon points="32,74 72,34 112,74" fill="#fef3c7" fillOpacity="0.75" />
                <polygon points="72,34 126,14 166,52 112,74" fill="#fde68a" fillOpacity="0.7" />
              </g>
            )}

            {kind === 'tabung' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <path d="M55,40 L55,120 A45,16 0 0,0 145,120 L145,40" fill="#e0f2fe" fillOpacity="0.55" />
                <ellipse cx="100" cy="40" rx="45" ry="16" fill="#bae6fd" fillOpacity="0.7" />
                <path d="M55,120 A45,16 0 0,1 145,120" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="100" y1="40" x2="145" y2="40" stroke="#0284c7" strokeWidth="2" />
                <text x="122" y="35" fontSize="11" fill="#0284c7" fontWeight="700" stroke="none">r</text>
              </g>
            )}

            {kind === 'kerucut' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <path d="M50,122 L100,24 L150,122 A50,16 0 0,1 50,122" fill="#e0f2fe" fillOpacity="0.6" />
                <path d="M50,122 A50,16 0 0,1 150,122" strokeDasharray="4 3" stroke="#64748b" />
                <line x1="100" y1="24" x2="100" y2="122" strokeDasharray="3 3" stroke="#d97706" />
                <line x1="100" y1="122" x2="150" y2="122" stroke="#0284c7" strokeWidth="2" />
                <text x="124" y="117" fontSize="11" fill="#0284c7" fontWeight="700" stroke="none">r</text>
                <text x="132" y="70" fontSize="11" fill="#0f172a" fontWeight="700" stroke="none">s</text>
              </g>
            )}

            {kind === 'bola' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <circle cx="100" cy="80" r="52" fill="#e0f2fe" fillOpacity="0.6" />
                <ellipse cx="100" cy="80" rx="52" ry="17" stroke="#0284c7" strokeDasharray="4 3" />
                <line x1="48" y1="80" x2="152" y2="80" stroke="#d97706" strokeWidth="2" />
                <text x="100" y="73" textAnchor="middle" fontSize="11" fill="#b45309" fontWeight="700" stroke="none">d</text>
              </g>
            )}

            {kind === 'gabungan_tabung_kerucut' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <path d="M60,72 L60,126 A40,12 0 0,0 140,126 L140,72" fill="#e0f2fe" fillOpacity="0.55" />
                <ellipse cx="100" cy="72" rx="40" ry="12" strokeDasharray="4 3" stroke="#64748b" />
                <polygon points="60,72 100,18 140,72" fill="#fef3c7" fillOpacity="0.7" />
                <line x1="100" y1="18" x2="100" y2="72" strokeDasharray="3 3" stroke="#d97706" />
              </g>
            )}

            {kind === 'gabungan_tabung_setengah_bola' && (
              <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                <path d="M55,75 L55,126 A45,14 0 0,0 145,126 L145,75" fill="#e0f2fe" fillOpacity="0.55" />
                <path d="M55,75 A45,45 0 0,1 145,75" fill="#fef3c7" fillOpacity="0.7" />
                <ellipse cx="100" cy="75" rx="45" ry="12" strokeDasharray="4 3" stroke="#64748b" />
              </g>
            )}
          </svg>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 gap-2">
          {(visual.dimensions || []).map((dim, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
            >
              <span className="text-xs font-medium text-slate-600">{dim.label}</span>
              <span className="text-sm font-bold text-slate-900 font-math">{dim.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CircleDiagramSvg: React.FC<{ visual: StimulusVisualConfig }> = ({ visual }) => {
  const kind = visual.circleKind || 'unsur_dasar';
  const labels = visual.circleLabels || {};

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 flex justify-center">
      <svg viewBox="0 0 280 180" className="w-72 h-auto">
        {kind === 'tali_busur_apotema' && (
          <g>
            <circle cx="140" cy="90" r="68" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <circle cx="140" cy="90" r="3.5" fill="#0f172a" />
            <text x="140" y="79" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">O</text>
            {/* Chord AB */}
            <line x1="88" y1="133" x2="192" y2="133" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="88" cy="133" r="3" fill="#0f172a" />
            <circle cx="192" cy="133" r="3" fill="#0f172a" />
            <text x="76" y="142" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
            <text x="198" y="142" fontSize="12" fontWeight="700" fill="#0f172a">B</text>
            {/* Apotema OC */}
            <line x1="140" y1="90" x2="140" y2="133" stroke="#d97706" strokeWidth="2.2" />
            <rect x="140" y="125" width="8" height="8" fill="none" stroke="#d97706" strokeWidth="1.4" />
            <text x="140" y="149" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b45309">C</text>
          </g>
        )}

        {kind === 'sudut_pusat_keliling' && (
          <g>
            <circle cx="140" cy="90" r="68" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            {/* Points A, B at top-ish, C at bottom */}
            <line x1="140" y1="90" x2="84" y2="52" stroke="#0f172a" strokeWidth="2" />
            <line x1="140" y1="90" x2="196" y2="52" stroke="#0f172a" strokeWidth="2" />
            <line x1="140" y1="158" x2="84" y2="52" stroke="#d97706" strokeWidth="2" />
            <line x1="140" y1="158" x2="196" y2="52" stroke="#d97706" strokeWidth="2" />
            <circle cx="140" cy="90" r="3.5" fill="#0f172a" />
            <text x="140" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">O</text>
            <text x="140" y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0284c7" fontFamily="IBM Plex Mono, monospace">{labels.angleA || '108°'}</text>
            <text x="72" y="49" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
            <text x="200" y="49" fontSize="12" fontWeight="700" fill="#0f172a">B</text>
            <text x="140" y="173" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b45309">C (?°)</text>
          </g>
        )}

        {kind === 'busur_juring' && (
          <g>
            <circle cx="140" cy="90" r="68" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
            <path d="M140,90 L199,56 A68,68 0 0,0 81,56 Z" fill="#fde68a" fillOpacity="0.65" stroke="#d97706" strokeWidth="2" />
            <circle cx="140" cy="90" r="3.5" fill="#0f172a" />
            <text x="140" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">O</text>
            <text x="140" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b45309" fontFamily="IBM Plex Mono, monospace">{labels.angleA || '120°'}</text>
            <text x="178" y="88" fontSize="11" fontWeight="600" fill="#0284c7" fontFamily="IBM Plex Mono, monospace">{labels.radius || 'r = 21 m'}</text>
          </g>
        )}

        {kind === 'garis_singgung_luar' && (
          <g>
            <circle cx="80" cy="95" r="46" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <circle cx="215" cy="115" r="24" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            {/* Center line PQ */}
            <line x1="80" y1="95" x2="215" y2="115" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Outer tangent line */}
            <line x1="87" y1="49" x2="219" y2="91" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="80" cy="95" r="3" fill="#0f172a" />
            <circle cx="215" cy="115" r="3" fill="#0f172a" />
            <text x="72" y="110" fontSize="12" fontWeight="700" fill="#0f172a">P</text>
            <text x="215" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Q</text>
            <text x="150" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a" fontFamily="IBM Plex Mono, monospace">l = ?</text>
            <text x="145" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" fontFamily="IBM Plex Mono, monospace">{labels.extra || 'd = 25 cm'}</text>
            <text x="58" y="85" fontSize="10" fontWeight="700" fill="#0284c7" fontFamily="IBM Plex Mono, monospace">R=12</text>
            <text x="215" y="106" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309" fontFamily="IBM Plex Mono, monospace">r=5</text>
          </g>
        )}

        {kind === 'unsur_dasar' && (
          <g>
            <circle cx="140" cy="90" r="66" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
            <line x1="74" y1="90" x2="206" y2="90" stroke="#0f172a" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="140" cy="90" r="3.5" fill="#0f172a" />
            <text x="140" y="82" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" fontFamily="IBM Plex Mono, monospace">{labels.radius || 'd = 70 m'}</text>
          </g>
        )}

        {kind === 'segiempat_tali_busur' && (
          <g>
            <circle cx="140" cy="90" r="68" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <polygon points="90,44 188,42 200,122 86,132" fill="#fef3c7" fillOpacity="0.6" stroke="#0f172a" strokeWidth="2" />
            <text x="78" y="42" fontSize="12" fontWeight="700" fill="#0f172a">A ({labels.angleA || '75°'})</text>
            <text x="192" y="40" fontSize="12" fontWeight="700" fill="#0f172a">B ({labels.angleB || '102°'})</text>
            <text x="205" y="132" fontSize="12" fontWeight="700" fill="#b45309">C (?)</text>
            <text x="70" y="144" fontSize="12" fontWeight="700" fill="#b45309">D (?)</text>
          </g>
        )}
      </svg>
    </div>
  );
};
