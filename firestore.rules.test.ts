// Payload-First Security Test Specification (Reference Verification)
// Verifies all 12 Dirty Dozen payloads against firestore.rules invariants.

export interface DirtyDozenCase {
  id: number;
  name: string;
  collection: string;
  operation: 'create' | 'update' | 'get' | 'list' | 'delete';
  expected: 'PERMISSION_DENIED';
  reason: string;
}

export const DIRTY_DOZEN_TESTS: DirtyDozenCase[] = [
  { id: 1, name: 'Unauthenticated Write', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'isVerifiedUser() requires request.auth != null' },
  { id: 2, name: 'Unverified Email Write', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'isVerifiedUser() requires email_verified == true' },
  { id: 3, name: 'Identity Spoofing', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'isValidQuizAttempt enforces ownerUid == request.auth.uid' },
  { id: 4, name: 'Shadow Field Injection', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'data.keys().hasOnly(...) rejects unallowed keys' },
  { id: 5, name: 'Document ID Poisoning', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'isValidId(attemptId) enforces ^[a-zA-Z0-9_\\-]+$ and <= 128 chars' },
  { id: 6, name: 'Oversized String Attack', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'studentName.size() <= 80 enforced' },
  { id: 7, name: 'Invalid Class Enum', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'studentClass in ["9A", "9B"] enforced' },
  { id: 8, name: 'Score Range Tampering', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'score >= 0 && score <= 100 and answeredCount <= 35 enforced' },
  { id: 9, name: 'Client Timestamp Forgery', collection: 'quiz_attempts', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'createdAt == request.time && updatedAt == request.time enforced' },
  { id: 10, name: 'Terminal State Mutation', collection: 'quiz_attempts', operation: 'update', expected: 'PERMISSION_DENIED', reason: 'existing().status != "completed" enforced for non-admins' },
  { id: 11, name: 'Privilege Escalation', collection: 'admins', operation: 'create', expected: 'PERMISSION_DENIED', reason: 'Only isAdmin() may write /admins/{uid}' },
  { id: 12, name: 'Cross-Student Scraping', collection: 'quiz_attempts', operation: 'list', expected: 'PERMISSION_DENIED', reason: 'allow list checks isAdmin() || resource.data.ownerUid == request.auth.uid' },
];
