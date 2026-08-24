# Angels Rest CMS recovery runbook

Status: R5 is complete under the accepted simplified snapshot path only. R6
remaining-CMS-module planning is current; no R6 import, publication, provider
switch, rollback, restore, content mutation, deletion, or other operational
effect is authorized.

## Current accepted R5 snapshot

The accepted snapshot is
`20260815T010542Z-35132abf-61a0-46c4-a43e-2b70138a1bdd`. Its result receipt
SHA-256 is
`35c850f4cba7b9aa0db646215b03771156479eef86d1b6de31a7cae145a778aa`,
and its independent result review is `B0/H0/M0`. The owner accepted that result
after review. The normalized acceptance record SHA-256 is
`7bd7ca7c24e9e7276eb155aca21a7fa32ff9713a35f9ac1de0ff499c8d7139dd`;
its acceptance index SHA-256 is
`d9b633c7e3f081539c1bf193b29e37dba821dc0ff1ed8aeba4c700a74860378f`.

Accepted custody is:

- ciphertext SHA-256
  `62a64b1b663fd2a3fcc30152a3fcd973b6106e7a5889650ff47cc2c1f5e721eb`,
  `2,273,228,482` bytes;
- local ciphertext
  `/home/strayblackdog/.local/state/angelsrest-recovery/custody-local/baseline/20260815T010542Z-35132abf-61a0-46c4-a43e-2b70138a1bdd/archive.tar.gz.gpg`;
- private R2 prefix
  `baseline/20260815T010542Z-35132abf-61a0-46c4-a43e-2b70138a1bdd/62a64b1b663fd2a3fcc30152a3fcd973b6106e7a5889650ff47cc2c1f5e721eb-sanity-production.tar.gz.gpg/`,
  containing one manifest and nine verified ciphertext parts under the
  externally preflighted Indefinite baseline default lock, which was not
  re-queried during capture;
- R2 manifest SHA-256
  `057f5eb183b9029096da79b3b347f88fd93375e92d70686d51cf4cfc74281466`;
- local custody `SHA256SUMS` SHA-256
  `ae85a9bb196c958e27013460b12e47d939a14fe33419695bd61d8373da691b53`;
- capture script SHA-256
  `4a0897013dde4cdaa93020326d8cf726b28af2f75560ade76c9955f55be9b52b`.

This was one standard Sanity production export without an editing freeze or a
closing no-edit attestation. The accepted receipt excludes proof of full
completeness, point-in-time edit consistency, Content Release versions,
inaccessible or unreferenced assets, deleted documents, Studio comments and
history, source bundles, deep graph reconciliation, native backup, continuous
RPO, isolated restore, empirical RTO, and duplicate-JSON-key detection. The
original deep Gate controls below are retained as historical design and are
superseded where they conflict with this accepted simplified path; they did not
pass and must not be represented as passed.

### Recover this snapshot

1. In a private temporary workspace, retrieve `MANIFEST.json` and all nine
   ciphertext parts from the exact private R2 prefix above. Alternatively, use
   the accepted local ciphertext when that custody is healthy.
2. Verify the manifest's exact SHA-256 above, then verify every listed part's
   name, size, SHA-256, and order. Require exactly nine parts with no missing or
   extra part before concatenating them in manifest order.
3. Verify the reassembled ciphertext is exactly `2,273,228,482` bytes and has
   the exact ciphertext SHA-256 above.
4. Decrypt it with the separately held recovery key. Require the resulting
   standard Sanity archive to be `2,273,228,385` bytes with SHA-256
   `f7731941571bf7639eed71ade7b5c0108803b240d0145d44a21120e504d13924`
   before any separately authorized import or restore.
5. Recover Studio source separately from Git at commit
   `0f7841a3e4dd453b67766b13734cd28035376466`, tree
   `677613e404d089aaf801510b9b133c02ffdf4845`; the content archive is not a
   source-code backup. Recover other application source from its separately
   verified Git history.

No restore or import is authorized by these instructions. R6 is planning only
until its separately required effect gates pass.

This is an operator checklist, not a shell program. On 2026-08-13 the owner
directed recovery work to favor a concise, small, elegant solution and to avoid
turning documentation into a second software system. That later direction
amends the presentation requirement for Gate 2: this file states the exact
operator contract and compact protocol pins, while detailed rationale, schemas,
parser rules, capacity formulas, and historical evidence remain in the reviewed
R5 plan snapshot. It does not waive a safety control or authorize an effect.

## 1. Authority and precedence

The controlling records are:

- Owner-accepted execution plan SHA-256:
  `61479548de1759ba6b2b1863e0632e475370584d9a491f9c79cc8a7bb4274c0f`.
- Independently reviewed substantive R2-amended plan SHA-256:
  `ac5da32bc467bfbae45896e935224d637b0ee4ae0a58eaf6f1fe7463fe9eb54e`.
- Owner-accepted Gate 2 hosted-surface baseline SHA-256:
  `c2ee93e0d6b6d5dc02d364c1010ebe5a162c7b7bdc46ad751e9b53a7cc35d828`.
- Detailed plan:
  `/home/strayblackdog/Documents/Obsidian/quilt/02_reference/project-support/photographer-crm/angels-rest-r5-cms-recovery-snapshot-plan-2026-08-11.md`.
- Sanity project `n7rvza4g`, dataset `production`, configuration `default`.
- Studio source baseline commit
  `da4c4b851ae77362ab7bab01d9aa807c831636ee`, tree
  `e939925cb7fcb5182421b6af3ab8c0f153f3da8d`.
- Hub reconciliation source commit
  `4f13b1659e0bb3b67d2318c3d9b7c156703449ff`, tree
  `2c36d08d525221be9cd8ce02eb3277c3e4928d2b`.

If this runbook, the current environment, or a provider result conflicts with
the accepted plan, stop. The accepted plan wins. A successful prior run never
waives a current precondition.

The two hashes above identify accepted decisions and provenance; they are not
assertions that the current living pathname still has either whole-file hash.
The separately required owner acceptance of the exact merged runbook is the
release for Gate 3. As the first bounded, credential-free Gate 3 preflight
effect after that acceptance, copy the reviewed current plan bytes and its
owner-acceptance record into registered local evidence; bind their current
whole-file hashes, the two immutable decision hashes above, this presentation
amendment, and the merged runbook identity. Independently review that combined
package before any install, credential, provider, capture, encryption, R2, or
other Gate 3 effect. If substantive continuity cannot be proved, stop for
review and acceptance of a successor plan. Never treat the mutable pathname or
an unavailable historical byte sequence alone as executable authority.

## 2. Scope

R5 establishes:

- a verified current Sanity recovery snapshot;
- recoverable Studio and hub source bundles;
- client-side-encrypted local custody;
- byte-identical encrypted custody in a dedicated private Cloudflare R2 bucket;
- an ongoing native-backup and 24-hour recovery-point policy;
- a no-effect rollback, tombstone, and four-hour RTO tabletop.

R5 does not authorize:

- a Sanity restore or import;
- content mutation or deletion;
- a production provider switch;
- rollback execution;
- R6 work;
- a home-server migration;
- weakening or deleting retained ciphertext;
- declaring empirical restore success.

The first real isolated restore belongs to R10 and requires separate authority.

## 3. Fixed recovery policy

| Control | Accepted value |
|---|---|
| Cutover RPO | Zero accepted edits during the capture freeze |
| Ongoing RPO | At most 24 hours for included current-state content |
| RTO objective | Four hours |
| Freeze | Zero accepted edits; maximum eight hours |
| Custody | Client-side-encrypted local copy plus private R2 copy |
| R2 failure-domain note | Same owner Cloudflare account as gallery storage |
| Rollback | Owner-only, reconciliation first |
| Content tombstone | 90 days; no deletion is authorized here |
| Restore target | New isolated non-production Sanity project/dataset |
| Baseline retention | At least 13 months after the later of R10 and R12 acceptance |
| Candidate retention | 30-day lock plus 31-day lifecycle |
| Baseline protection | Indefinite Bucket Lock; no matching deletion lifecycle |

Cloudflare Bucket Lock is removable by an account configuration administrator.
It is strong accidental-change protection, not compliance WORM. R2 in the same
Cloudflare account is off-host and outside Sanity, but it is not an independent
Cloudflare-account or provider failure domain.

No baseline object, lock, lifecycle, or key-recovery rule may be weakened
without a newer fully verified equivalent recovery point and a separate exact
owner-approved disposition manifest.

## 4. Required recovery set

The snapshot is incomplete unless it contains all of the following:

| Class | Required item |
|---|---|
| Authority | Reviewed current plan snapshot, accepted plan hashes, and owner-acceptance record |
| Source | Verified Studio Git bundle |
| Source | Verified hub Git bundle |
| Content | Raw A modern-API NDJSON export |
| Content | Native Sanity dataset export archive |
| Content | Raw B modern-API NDJSON export |
| Evidence | Private source, revision, relation, asset, and reconciliation manifest |
| Evidence | Required protected verification logs and receipts |
| Evidence | Credential-free sanitized result receipt and checksum inventory |

The private manifest and identifying logs are encrypted. Sanitized receipts may
contain hashes, sizes, timestamps, tool versions, nonsecret token IDs, and
result classes. They must never contain credentials, account endpoints, request
headers, raw provider bodies, hook URLs, source document bodies, or secret-
derived values.

The protected plan snapshot and acceptance record are included in the private
artifact manifest and both encrypted custodies.

## 5. Global safety rules

Before any live phase:

- Create a new mode-`0700` phase root on reviewed tmpfs.
- Record and recheck its absolute path, device, inode, owner, mode, filesystem,
  and mount boundaries.
- Put every plaintext artifact, scratch file, log, Git recovery repository,
  browser profile, CLI configuration, credential file, and temporary download
  inside that root.
- Install the phase's signal/exit cleanup before creating a profile, opening a
  secret FD, launching a child, or making a provider request.
- Register secret paths and FDs before creating or opening them.
- Disable shell tracing and history, core dumps, Node diagnostic reports, and
  nonvolatile swap. Plaintext must not be staged on unencrypted `/home`.
- Accept secrets only through owner-operated no-echo ingress or GPG pinentry.
  Never place them in argv, exported environment, logs, hashes, evidence,
  screenshots, browser sync, downloads, or persistent clipboard history.
- Use a distinct Admin-A, Viewer-Capture, Admin-B, R2 preflight writer, R2
  capture writer, and read-only R2 verifier boundary.
- Recheck available bytes, inodes, and remaining freeze time before every
  large or irreversible step.

Hard ceilings:

- each R2 object is strictly smaller than `4,000,000,000` bytes;
- plaintext staging stays at or below 25 GiB;
- accepted baseline ciphertext stays at or below 15 GiB;
- all plan-attributable R2 objects stay at or below 30 GiB;
- incremental R2 cost stays at or below USD 6 per billing month, including tax;
- Class A and Class B requests each stay below one million.

Any ambiguity, drift, missing capacity, or unbounded time estimate is a stop,
not permission to retry or simplify the live procedure.

## 6. Gate map

| Gate | Outcome |
|---|---|
| 0 | Plan and recovery-policy bindings |
| 1 | Exact owner acceptance of the plan |
| 2 | This one-file Studio runbook, review, PR, protected merge, and owner hold |
| 3 | Tooling, native-backup, recovery-key, R2 configuration, and credential preflight |
| 3 hold | Independent evidence review and owner release |
| 4 | Owner declares the zero-edit freeze and absolute eight-hour deadline |
| 5 | Source/content capture and deterministic verification |
| 6 | Encrypt once, establish local custody, publish and verify private R2 custody |
| 7 | Native-backup policy check and no-effect policy/RTO tabletop |
| 8 | Independent result review and owner result acceptance |

Completion of one gate never expands the next gate's authority. Stop at every
owner hold.

## 7. Gate 2 publication

Gate 2 changes only root `RECOVERY.md` on branch
`agent/r5-studio-recovery-runbook`.

Before publication:

- Require the branch parent and tree to match the accepted Studio baseline.
- Require the complete diff to contain only new root `RECOVERY.md`.
- Review this file for correctness, readability, secret safety, and consistency
  with the accepted plan.
- Obtain three independent reviews on identical bytes, consolidated as
  `B0/H0/M0`.
- Run only credential-free local checks such as:

  ```bash
  sha256sum RECOVERY.md
  git add --intent-to-add -- RECOVERY.md
  git diff --check
  test "$(git diff --name-only)" = RECOVERY.md
  git status --short --branch
  ```

- Do not install dependencies locally. The sole Gate 2 install is the existing
  reviewed hosted Studio CI workflow
  `.github/workflows/studio-ci.yml`, SHA-256
  `cd33b59c5b4a5fd15bec6f72fd83a4299d1a3b1cf27ca9f1b519e064e702742e`.
- Revalidate the accepted GitHub branch, PR, workflow, orphan-run, protection,
  deployment, environment, and hook-delivery baseline immediately before each
  hosted effect.
- Never read, record, hash, compare, or disclose the repository hook URL or
  configuration values. Observe only normalized deliveries attributable to the
  exact candidate PR.

After protected merge, independently review the merged bytes and stop for:

> I accept merged Studio RECOVERY.md commit [SHA], tree [TREE], file SHA-256
> [HASH], and its clean review; authorize continuing only through accepted R5
> Gate 3 preflight effects.

Until that exact acceptance, Gate 3 remains blocked.

## 8. Gate 3 preflight

Gate 3 must prove, without capturing production content:

### Tooling and source

- The accepted Studio lock and Git state remain unchanged.
- Node `24.18.0`, pnpm `10.34.5`, Sanity `5.31.1`, and the invoked chain
  `@sanity/cli 6.7.2 -> @sanity/client 7.23.0 -> @sanity/export 6.2.0`
  resolve from the accepted installation.
- The accepted Git, jq, tar, gzip, coreutils, GnuPG, curl, and XML parser
  versions and hashes match the detailed plan.
- The exact Studio and hub source identities and reconciliation inputs match.

### Native backup

- Admin-A proves entitlement for the exact project and dataset.
- An authoritative exact-dataset `enabled=true` receipt is available, or the
  separately authorized idempotent assertion succeeds exactly.
- A machine-readable list contains a unique post-assertion recovery point less
  than 24 hours old.
- Authoritative account, security, or contract evidence proves encryption at
  rest and retrievability, and the owner explicitly accepts Sanity-managed
  custody for the scoped ongoing native backup.
- A listed point proves operation, not current enabled state. If its timestamp
  cannot prove dataset coverage, record it as coverage-ambiguous and do not use
  it to close later edit exposure.
- Destroy Admin-A before capture.

### Recovery key

- Use the accepted symmetric GPG parameters from the detailed plan.
- Create two independent owner-controlled off-host recovery copies with at least
  128 bits of entropy.
- Independently decrypt and verify a non-content test ciphertext with each copy.
- Record only separate nonsecret attestations.
- Close the scoped GPG agent and prove its home and socket are gone.

### Private R2

- Use only dedicated bucket `angelsrest-cms-recovery`.
- Create it only when absent. Reuse requires an exact accepted prior result plus
  fresh configuration and inventory readback; partial or nonaccepted state
  requires a separately reviewed disposition.
- Require default jurisdiction, Automatic location, and no location hint.
- Require no `r2.dev`, custom domain, CORS, Worker binding, event notification,
  Data Catalog, or authorized presigned-URL use.
- Require Standard storage.
- Require a 30-day candidate lock and 31-day candidate lifecycle.
- Require an Indefinite `baseline/` lock and no baseline expiration.
- Require incomplete multipart uploads to abort after seven days, while the
  accepted single-request path itself prohibits multipart upload.
- Prove unrelated buckets, account tokens, and the gallery Worker binding are
  unchanged.
- Use a fresh exact-bucket preflight writer and a separate read-only verifier.
- Prove create-only upload/copy, duplicate rejection, complete reads,
  decrypt/checksum, complete pagination, storage class, locked overwrite/delete
  rejection, anonymous denial, and verifier write denial using only the
  accepted probe and canary namespaces.
- Reconcile and delete both unlocked probe keys before writer revocation.
- Before revocation, require the canonical signed bounded list to succeed.
- Quiesce the writer, retain only its one-shot denial capsule, revoke its token
  by nonsecret ID in a separate administrator session, close that session, wait
  strictly more than 60 monotonic seconds, and require the identical request to
  return exact `401 Unauthorized`.
- Destroy the capsule and writer configuration. Retain the verifier only under
  the accepted owner recovery policy.

Cloudflare's destination create-only copy condition is beta and the source and
destination conditions are not atomic. The accepted controls are the existing
candidate lock, exact source ETag condition, new empty destination, destination
create-only condition, and both complete post-copy reads. Drift in any control
stops the run.

Seal a credential-free Gate 3 evidence manifest and obtain independent
`B0/H0/M0` review. Then stop for the exact Gate 3 owner-release text in the
accepted plan. Do not start the freeze from a merely successful preflight.

## 9. Gate 4 freeze

Immediately before the freeze:

- Revalidate every source, tool, backup, capacity, recovery-key, R2, credential,
  price, and owner-availability precondition.
- Create a fresh capture root and arm its controller before Issuer-C, a capture
  writer, Viewer-Capture, or any production read.
- Record UTC start and the absolute eight-hour deadline.
- The owner confirms all editors stopped.

No accepted source edit may occur until Gate 8 acceptance or safe stop. If the
owner cannot remain available through review and cleanup, do not begin.

## 10. Gate 5 capture

Perform exactly once, without retries under the same run:

1. Create the Studio Git bundle at the accepted merged runbook ref.
2. Recover it into a new isolated bare repository; verify its ref, commit, tree,
   objects, and required blobs; then remove only that recovery repository.
3. Create and independently verify the hub Git bundle the same way.
4. Capture Raw A from the modern non-cursor Export API.
5. Recheck actual size, asset count, declared asset bytes, free space, inodes,
   and remaining time.
6. Create the native compressed Sanity dataset archive with drafts and assets,
   strict asset verification, and no overwrite.
7. Capture Raw B through the same modern API contract.
8. Destroy Viewer-Capture and its entire configuration before Admin-B.

Every output is written to a new partial, bounded, verified, and atomically
sealed. A transport error, authentication error, partial file, malformed body,
export warning, retry requirement, source edit, watcher failure, or deadline
failure enters safe stop.

## 11. Deterministic verification

The verification passes only when:

- Raw A and Raw B contain valid one-object-per-line JSON.
- Every document has nonempty `_id`, `_rev`, and `_type`.
- Their canonical document streams and identity projections are byte-equal.
- IDs are unique and every document class is expected.
- `versions.**` count is zero. A nonzero count requires a separately reviewed
  all-version design.
- The native archive has exactly the expected safe root, document stream,
  asset map, image files, and file assets; it has no links, devices, traversal
  paths, duplicates, or unexpected members.
- The expected exporter rewrite matches the native archive's complete canonical
  document stream. The accepted rewrite filter SHA-256 is
  `63a5b7f87de9bb189a01dfca04e7c860037b7798945316abd6f4da2e86f6cf40`.
- Every raw asset maps to exactly one archive file with the expected path,
  size, and content identity.
- Every rewritten asset reference resolves exactly once.
- Blog and catalog source counts, relations, media keys, and protected
  reconciliation inputs match the accepted protected hub source.
- Both Git bundles recover their exact accepted commits, trees, and required
  blobs without network, filters, submodules, replacement objects, or missing
  object dependencies.

Construct one private artifact manifest mechanically from those verified
outputs. Do not add operator-authored artifact rows or success booleans.

## 12. Gate 6 encryption and local custody

- Recheck capacity and remaining freeze time.
- Use the exact GnuPG mode and parameters in the accepted plan, through pinentry
  and an isolated registered home.
- Encrypt each accepted plaintext artifact exactly once.
- Recheck the plaintext identity immediately before encryption.
- Seal every ciphertext name, size, and SHA-256.
- Stream-decrypt every ciphertext using each accepted recovery path and match
  the original plaintext size and SHA-256.
- Both recovery paths and secret custody must outlive every retained
  ciphertext. Rotation requires verified decrypt, re-encryption, verification
  in both custodies, and owner acceptance before the old secret retires.
- Copy the exact ciphertext bytes, never a second encryption, into:

  ```text
  /home/strayblackdog/.local/state/angelsrest-recovery/
    custody-local/baseline/<snapshot-id>/
      artifacts/*.gpg
      receipt.json
      SHA256SUMS
  ```

- Verify the new local files by complete readback.
- Treat local custody as verified candidate custody until the R2 chain and
  final review pass.
- Close the scoped GPG agent and prove its home/socket are absent.

Persistent local storage receives ciphertext and credential-free receipts only.

## 13. Gate 6 private R2 custody

Before object use, create exactly one fresh capture-writer token in a new
Issuer-C profile, record its nonsecret name and ID before secret egress, transfer
the one-time value through the accepted no-echo boundary, then close, log out,
and destroy the issuer profile and transfer residue. The token is restricted to
the exact recovery bucket and capture-writer permission.

For every encrypted artifact and sanitized receipt:

1. Create a unique content-bound candidate key with a single conditional PUT.
2. Require exact length, SHA-256, Content-MD5, create-only condition, and
   `STANDARD` class.
3. Record the returned candidate ETag.
4. Perform an ETag-bound complete GET and verify ciphertext bytes and SHA-256.
5. Perform a separate complete GET and stream-decrypt or byte-compare according
   to the object class.
6. List the complete candidate prefix and match the expected key, size, ETag,
   and storage class inventory.
7. Conditionally copy the candidate to its new `baseline/` key using source
   ETag and destination create-only conditions.
8. Repeat both complete reads and the complete baseline inventory.

A HEAD, ETag, copy response, or list result alone is never custody proof.
Multipart upload, redirects, automatic retries, public URLs, and unreviewed
storage classes are prohibited.

After all objects pass:

- Prove exact candidate/final/canary inventories and current lock/lifecycle
  configuration.
- Reconcile all unlocked probes before revocation.
- Quiesce and revoke the fresh capture writer using the same precontrol,
  separate administrator session, more-than-60-second wait, and exact
  `401 Unauthorized` denial procedure used at Gate 3.
- Destroy the writer capsule and configuration.
- Stage required evidence and transition records outside the volatile capture
  root before deleting that root.
- Seal cleanup preconditions, remove only the identity-verified plaintext and
  capture root, prove absence, seal the closure receipt, and then disarm the
  capture controller.

## 14. Gate 7 native policy and table-tops

With a fresh Admin-B boundary:

- Reassert or independently prove exact `enabled=true`.
- Confirm the historical Gate 3 recovery point remains listed without
  re-age-gating it.
- Separately query the bounded current range and select the newest qualifying
  recovery point.
- Apply the accepted 24-hour recovery-point rule. A list entry never substitutes
  for enabled-state evidence, and a coverage-ambiguous timestamp cannot close
  exposure.
- Destroy Admin-B, its configuration, and its phase root; prove absence.

Then perform no-effect table-tops:

- reconciliation-first owner-only rollback after a hypothetical first
  Convex-authored edit;
- the 90-day content tombstone state model without deleting anything;
- the complete R10 recovery path with a conservative total no greater than
  14,400 seconds.

Record:

- `rollback_effect_performed=false`;
- `tombstone_mutation_performed=false`;
- `actual_restore_performed=false`;
- `empirical_rto_proved=false`.

R10 alone performs the timed isolated restore.

The rehearsal policy is quarterly plus material change. Before the first
successful R10 restore, a material change to schema, export or restore tooling,
archive format, encryption, key recovery, custody target, or backup mechanism
requires a fresh R5 tabletop plus the applicable R6 rollback/restore drill
before that changed path is relied upon; it does not reorder R10. R10 must pass
before R11. After the first successful R10 restore, the quarterly clock begins,
and every later material change requires another full isolated restore before
reliance. This creates no wait before R10. The durable cadence receipt records
the accountable operator, accepted result, open triggers, and next due date.

## 15. Gate 8 result

Before result review:

- Verify local custody and complete R2 custody again.
- Verify both recovery paths.
- Verify writer revocation and denial.
- Verify native-backup policy evidence.
- Verify source bundles, capture, deterministic verification, retention, RPO,
  policy, cadence, and RTO results.
- Verify Gate 3, capture, and Gate 7 controller closures and exact root absence.
- Verify every required evidence file from persistent storage; nothing may
  depend on a deleted volatile root.
- Verify the complete evidence index and all hashes.
- Confirm zero accepted edits during the freeze.
- Confirm no secret or raw provider body entered retained evidence.

Obtain independent `B0/H0/M0` review of identical result bytes. R5 remains
unchecked during review.

Only the exact final owner acceptance in the accepted plan may:

- accept the result manifest and both custody receipts;
- end the freeze;
- mark R5 complete;
- advance to R6 planning only.

It does not authorize R6 import, rollback, restore, provider switch, deletion,
or a home-server migration.

## 16. Ongoing backup operation

Sanity's native schedule is nominally daily, not a hard 24-hour SLA. For every
later content-changing window:

- begin from the newest recovery point that is proven to cover all prior
  accepted edits;
- require a fresh enabled-state assertion or authoritative receipt and a current
  bounded list;
- allow no overlapping edit window while changes remain uncovered;
- check immediately at window close and at least every four hours while
  uncovered edits remain;
- start the already reviewed manual contingency at the calculated latest safe
  start, without waiting past the 24-hour deadline;
- keep editing frozen and record an RPO incident if coverage is not closed.

Jesse Pomeroy is the accepted ongoing RPO operator. Standing contingency
authority applies only to the unchanged reviewed R5 path at its calculated
latest safe start.

Comments, timeline/history, and deleted-document history are outside the
accepted current-state recovery scope. Do not claim zero or 24-hour RPO for
those excluded classes.

## 17. Recovery procedure

Actual recovery requires separate authority. For the R10 isolated rehearsal:

1. Owner declares recovery; the four-hour clock starts and does not pause for
   unavailable credentials or custody.
2. Retrieve the accepted ciphertext inventory from local custody and R2.
3. Verify filenames, sizes, SHA-256 values, receipts, and the accepted result
   manifest before decryption.
4. Recover the secret through one independently accepted off-host path.
5. Decrypt into a new isolated protected workspace.
6. Verify plaintext hashes and formats.
7. Recover Studio and hub sources from their Git bundles and verify commits,
   trees, and required blobs.
8. Prepare a new isolated non-production Sanity project/dataset.
9. Import only under the separately accepted R10 manifest.
10. Verify documents, drafts, assets, references, application projections,
    Studio behavior, and provider boundaries.
11. End the clock only when the owner accepts the isolated result.

Never restore directly into production as a test.

## 18. Safe stop

Stop before the next effect when any source, credential, provider, response,
capacity, deadline, checksum, inventory, lock, lifecycle, backup, or evidence
state is missing, malformed, ambiguous, or unexpected.

Then select the applicable phase-aware branch:

1. Emit only a fixed credential-free failure class.
2. Do not retry an ambiguous request or reuse a transition/run ID.
3. Select exactly one credential branch, taking the first match: (a) for a known
   active writer, reconcile each exact unlocked probe; while the writer remains
   active, delete and absence-verify every exact unambiguous probe, retain and
   inventory every ambiguous or delete-failed probe, and seal all dispositions;
   only then quiesce children and writer, preserve only the sealed one-shot
   capsule, revoke by ID, close the administrator session, wait strictly more
   than 60 seconds, and run the exact denial check once; (b) for a known-quiesced writer with its sealed capsule
   and token ID, finish only that revoke, session-close, wait, and denial
   sequence; (c) for an authoritatively revoked writer, first accept a sealed
   prior canonical denial receipt only after revalidating its exact successful
   denial result, and never repeat its request; otherwise, if denial was not
   attempted and the exact sealed capsule's unused one-shot state is proved,
   use it once only for the canonical denial request, seal its result, destroy
   it, and accept only the exact denial result; otherwise make no denial claim,
   record `denial_unproved`, destroy local residue, and require authoritative
   resolution; (d) for any other state in which a secret was transferred, a
   request may be in flight, or active state cannot be proved, classify a
   credential incident and provider ambiguity, stop the scoped process, destroy
   local secret state, and require authoritative token and object-state
   reconciliation; (e) if a token ID exists but its secret was not transferred,
   close the issuer boundary and revoke or authoritatively prove absence by that
   known ID; or (f) if no token exists, skip token revocation.
4. For branches (b) through (f), do not attempt probe deletion; retain and
   inventory every unresolved probe as nonaccepted residue pending authoritative
   resolution.
5. Complete only the credential branch selected in step 3. A retained read-only
   verifier follows only its accepted recovery custody policy. Admin phases
   close their own credential/profile root and make no writer-denial claim. If
   revocation or provider state is ambiguous, destroy the secret, make no denial
   claim, record a credential incident, and block retry pending authoritative
   absence proof.
6. Close all secret FDs, sessions, profiles, configurations, and scoped GPG
   agents.
7. Stage required persistent evidence before removing volatile state.
8. Revalidate the exact temporary root identity, remove only that root, and
   prove absence.
9. End the freeze before eight hours only if a freeze actually began.

Never broad-delete, empty the bucket, weaken a lock, overwrite a final object,
or treat a failed object as accepted. A failed candidate remains encrypted,
locked, and nonaccepted. A failed final remains indefinitely locked and blocks
retry until a new exact owner disposition manifest.

A retry uses a wholly new run UUID, fresh source and revision state, fresh
independent review, and any required reviewed disposition or authoritative
absence proof for residue. It repeats every volatile precondition.

## 19. Evidence summary

Every phase receipt must be canonical, credential-free, and small. At
minimum it binds:

- accepted plan and runbook hashes;
- run and snapshot IDs;
- phase and prior receipt hash;
- input and output manifest hashes;
- source/tool identities;
- nonsecret token identity and scope where applicable;
- start/end timestamps;
- result or normalized failure class;
- provider-state ambiguity;
- credential/profile/child cleanup state;
- persistent evidence index hash.

Artifact and provider-operation manifests carry detailed rows. Do not duplicate
the same facts across multiple hand-authored wrappers.

Evidence is mechanically derived from the accepted schemas and reducers in the
reviewed current plan snapshot and this runbook's exact contract appendix. The
phase manifest that selects those fixed schemas is sealed and independently
reviewed before its first credential or provider effect. Every
provider effect has one request identity and one consume-once transition;
result, cleanup, absence, and prior-receipt hashes are reopened during final
review. Operator-authored success booleans cannot establish acceptance.

## 20. Exact execution contract

This compact contract is normative. The reviewed plan snapshot supplies the
full tool hashes, JSON/TSV schemas, parser grammar, capacity arithmetic, and
fixed evidence labels.

### Source and tool pins

```text
package.json_sha256=95fc3eb70b55bba9ac39eddec900cf1ee50d0e2a70b622e61fd2a601ca6ec189
pnpm-lock.yaml_sha256=5829a6a0927275773f9443f0e0903582235953e039f69015d2d57414d358fd31
pnpm-workspace.yaml_sha256=6ad289d91e8d1488eb00a57ddee84d9fb807f1236b0beb8b33e7bf55e514259f
client.config.ts_sha256=50c102c7941c4377a279fffdfd3d546686a9236c9811707ad8843b3697f9bb48
sanity.cli.ts_sha256=4c70791afb0b28eef278fcc40a47356eada30768e352297475ed85bb6e89c388
sanity.config.ts_sha256=553d19171a57d533536dc0f07bcde5a738bddbb87918bda7acff61661535ed3a
schemaTypes/index.ts_sha256=036d79e14aa3163d59d561900620999e15567f266d7e2fe63e1d4fac9f5bb35d
node=24.18.0
pnpm=10.34.5
sanity=5.31.1
sanity_cli=6.7.2
sanity_client_invoked=7.23.0
sanity_export=6.2.0
git=2.55.0
jq=1.8.2
tar=1.35
gzip=1.14-modified
coreutils=9.11
gnupg=2.4.9
curl=8.21.0
xmllint_libxml=2.15.3
```

Raw A and Raw B use only:

```text
GET https://n7rvza4g.api.sanity.io/v2025-02-19/data/export/production
query_string=empty
cursor=disabled
redirects=disabled
retry=disabled
authorization=opaque_header_FD_only
success=HTTP_200+expected_content_type+nonempty_exact_download_size
```

The native archive is the pinned equivalent of:

```bash
corepack pnpm exec sanity datasets export production "$NEW_ARCHIVE" \
  --project-id=n7rvza4g --mode=stream
```

Do not pass overwrite, raw, type filtering, asset exclusion, draft exclusion,
compression exclusion, or weakened asset verification flags.

The exact exporter rewrite is:

```jq
def filename($id):
  ($id | try capture("^(?<kind>image|file)-(?<asset>.*?)(?<ext>-[a-z]+)?$") catch null) as $m
  | if ($m == null or ($m.asset|length)==0) then ($id+".bin")
    else ($m.asset+"."+(($m.ext // "bin")|sub("^-";""))) end;
def asset_ref:
  if type=="object" and ((.asset? // null)|type)=="object"
     and ((.asset._ref? // null)|type)=="string"
  then .asset._ref else null end;
def recognized_ref:
  asset_ref as $r
  | if $r==null then null
    elif ($r|test("^image-[a-f0-9]{40}-[0-9]+x[0-9]+-[a-z]+$")) then $r
    elif ($r|test("^file-[a-f0-9]{40}-[a-z0-9]+$")) then $r
    else null end;
def rw:
  if type=="array" then [.[]|rw|select(.!=null)]
  elif type!="object" then .
  else recognized_ref as $r
    | if $r!=null then
        ($r|capture("^(?<type>image|file)-").type) as $t
        | (del(.asset)|rw) as $siblings
        | ({_sanityAsset:($t+"@file://./"+$t+"s/"+filename($r))}+$siblings)
      else with_entries(.value|=rw) end
  end;
select(._type!="sanity.imageAsset" and ._type!="sanity.fileAsset") | rw
```

Its UTF-8 bytes with one trailing LF have SHA-256

```text
63a5b7f87de9bb189a01dfca04e7c860037b7798945316abd6f4da2e86f6cf40
```

Native backup transport is limited to the exact project/dataset API version:

```text
PUT /v2025-02-19/projects/n7rvza4g/datasets/production/settings/backups
Content-Type: application/json
body={"enabled":true}
success=HTTP_204+zero_body

GET /v2025-02-19/projects/n7rvza4g/datasets/production/backups?after=<UTC_DATE>&limit=30
success=HTTP_200+bounded_machine_readable_unique_backup_list
```

Encryption uses GnuPG 2.4.9 with:

```text
--no-options --no-symkey-cache --pinentry-mode ask --symmetric
--cipher-algo AES256 --s2k-mode 3 --s2k-digest-algo SHA512
--s2k-count 65011712
```

Batch, loopback, passphrase argv/file/FD/environment, and symmetric-key cache
are prohibited.

R2 uses curl's reviewed SigV4 path only:

```text
bucket=angelsrest-cms-recovery
endpoint=https://<SEALED_ACCOUNT_ID>.r2.cloudflarestorage.com
region=auto
sigv4=aws:amz:auto:s3
storage_class=STANDARD
redirects=disabled
retry=disabled
multipart=disabled
```

Every PUT binds exact Content-Length, x-amz-content-sha256, base64 Content-MD5,
empty Expect, `If-None-Match: *`, and `x-amz-storage-class: STANDARD`; success
is exactly HTTP 200, empty body, and one valid quoted ETag. Every copy binds the
encoded source key, candidate ETag through `x-amz-copy-source-if-match`,
destination create-only through `cf-copy-destination-if-none-match: *`, and
Standard class; success is HTTP 200 with exactly one ETag and LastModified and
no embedded Error. Complete lists use ListObjectsV2 with URL encoding, bounded
`max-keys`, strict continuation-token progression, and duplicate key/token
rejection. HEAD establishes existence, size, and ETag only. Acceptance always
requires the two complete reads and complete inventory described above.

Object keys use the exact candidate/baseline v1 grammar from the accepted plan:
lowercase UUIDv4/run and snapshot namespaces, lowercase 64-hex byte digest,
safe basename, no traversal/control/backslash, and total UTF-8 length below 512
bytes. Duplicate create/copy is `412 PreconditionFailed`; locked overwrite or
delete is `403 ObjectLockedByBucketPolicy`; verifier write is `403 AccessDenied`;
post-revocation proof is exactly HTTP 401 plus S3 code `Unauthorized`.

R2 has no S3 bucket versioning or S3 Object Lock, and its object operations are
not complete provider audit-log evidence. No subscription, plan, billing-owner,
or account change is authorized.

## 21. Future home-server successor

The future private home server is not an R5 dependency. It may become an
additional copy only through a separately reviewed copy-then-verify manifest
that proves identical ciphertext, complete checksum and decrypt verification,
encrypted storage and swap, capacity, retention, monitoring, key recovery, and
RTO.

Do not remove or weaken R2 custody until the successor is fully verified and
explicitly owner-accepted.
