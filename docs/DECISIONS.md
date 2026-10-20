# Decisions and Open Questions

## Step 4 decisions

1. Reuse the existing Expo SQLite `~57.0.4` package and keep SQLite as the only authoritative local data source.
2. Use exclusive transactions for reward-critical operations, unique occurrence/reward identities and compensating correction events.
3. Serialize app-level writes and refresh all screens from one database-backed provider snapshot.
4. Level uses a flat 1,000 XP per level only for the demo. Rank promotion is disabled pending product-approved thresholds.
5. Streak policy: one grace miss per week, then streak break and 10% reduction on future XP only; three successful scheduled days restore normal rewards. This requires product approval.
6. Historical correction within 48 hours reverses XP and attribute allocations, preserves original ledger/completion rows and voids that occurrence.
7. In-place quest type changes are refused to protect occurrence identity and history. Archive and create a replacement task instead.
8. Local data has no cloud backup and may be removed by Android data clearing or uninstall.

## Approval needed

- Production level XP curve and rank gates.
- Sustainable-consistency requirements per rank.
- Grace miss, penalty and recovery interpretation.
- Whether correcting weekly/milestone progress should void all progress in the occurrence or support finer corrections.
- Home timezone changes around local date/week boundaries.
- Final class/presentation/rank artwork variants.

## Repository and verification

Repository: `Harshrana007/ascendia-android-demo`. Work branch: `feature/ascendia-android-demo-foundation`. Repository visibility was reported as public in the previous audit; verify privacy before adding confidential content.

Typecheck, lint, Jest, Metro and Android runtime/build checks remain pending because there was no local checkout with dependencies and no Android emulator tooling in this session.
