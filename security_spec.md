# Security Specification — Try Out SAS Matematika Kelas 9 SMPN 1 Wanaraya

## 1. Data Invariants
1. A `QuizAttempt` document MUST belong to an authenticated, email-verified user (`ownerUid == request.auth.uid`), with `studentClass` strictly `"9A"` or `"9B"`.
2. `createdAt` is server-enforced (`request.time`) and immutable after creation; `updatedAt` is always server-enforced (`request.time`).
3. Once a `QuizAttempt` reaches terminal `status == "completed"`, students cannot mutate their scores or status further (only `isAdmin()` may correct/delete records).
4. `answersSummary` is strictly bounded (`size() <= 35`) and contains string tokens only.
5. `AdminUser` documents under `/admins/{uid}` can ONLY be created or deleted by an existing verified admin (including the bootstrapped teacher `ujiansmpn1wnry@gmail.com`). Students cannot self-promote to admin.
6. Non-admin users can only `get` or `list` their own `quiz_attempts` (`resource.data.ownerUid == request.auth.uid`), preventing PII/score scraping across students.

## 2. The "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. **Unauthenticated Write**: Create `/quiz_attempts/att_01` with `request.auth == null`.
2. **Unverified Email Write**: Create `/quiz_attempts/att_02` with `email_verified: false`.
3. **Identity Spoofing**: Student A creates `/quiz_attempts/att_03` with `ownerUid: "student_B_uid"`.
4. **Shadow Field Injection**: Create `/quiz_attempts/att_04` including an unallowed ghost field `isVerified: true` or `role: "admin"`.
5. **Document ID Poisoning**: Create `/quiz_attempts/bad$id!with*spaces` or a 500-char document ID.
6. **Oversized String Attack**: Create `/quiz_attempts/att_06` with `studentName` length > 80.
7. **Invalid Class Enum**: Create `/quiz_attempts/att_07` with `studentClass: "9C"`.
8. **Score Range Tampering**: Create `/quiz_attempts/att_08` with `score: 999` or `answeredCount: 50`.
9. **Client Timestamp Forgery**: Create `/quiz_attempts/att_09` with a fake past `createdAt` timestamp instead of `request.time`.
10. **Terminal State Mutation**: Student attempts to `update` a `quiz_attempts` doc whose existing `status` is `"completed"` to raise their `score`.
11. **Privilege Escalation**: Student attempts to create `/admins/{studentUid}` to grant themselves teacher dashboard access.
12. **Cross-Student Scraping**: Student A executes a `list` query on `/quiz_attempts` without filtering to `ownerUid == request.auth.uid`, or `get`s Student B's attempt.
