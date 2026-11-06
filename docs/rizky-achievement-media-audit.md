# Rizky Sandi Pratama — Achievement Media Audit

Audit date: 2026-11-05
Data file: `src/data/rizkyAchievements.ts`
Asset root: `public/assets/team/rizky/achievements/<competition>/`

## Status key

| Status | Meaning |
|---|---|
| COMPLETE | Original file found, its content was checked visually against the competition, and it is displayed on the site |
| MISSING | No matching original file was found in any accessible source |
| NEEDS ORIGINAL | Only a lower-quality copy exists; a better original is wanted |
| INACCESSIBLE | The source exists but could not be read |
| NEEDS VERIFICATION | A candidate file exists, but its link to the competition or LinkedIn entry could not be confirmed. Not displayed unless noted |

No item is marked COMPLETE from its filename alone. Each one was opened and checked against visible text: a certificate's wording, an award board, or a competition backdrop.

## Sources and access

| Source | Result |
|---|---|
| LinkedIn `linkedin.com/in/rizksan` — Honors & Awards | **INACCESSIBLE**: HTTP 999 to automated access. Not scraped, and no login was attempted. No LinkedIn media was retrieved. The "Expected media" titles below are the ones given in the brief, which come from the LinkedIn entries. |
| LinkedIn screenshots mentioned in the brief | Not received in this session. |
| Repository (`public/assets/projects/pharvia/`) | PHARVIA team photo and winner announcement, reused in place (not copied). |
| Rizky's local files (`Downloads/`, `Downloads/EVIDENCE/`, `Downloads/folder backup/Folder kuliah/lomba/<competition>/`, the "Sertifikat Perlombaan" compilation PDFs) | Main source for the certificates and photos below. |

**Permission:** these are Rizky's own achievements and documents, published at his request. Some photos and certificates show teammates, organisers or officials (names, signatures and staff ID numbers on certificates). Rizky should confirm that teammates are comfortable being shown.

**Processing:** photos are EXIF-rotated, then saved as WebP with all metadata, including GPS, removed. The long edge is capped at 1600px (2000px for the BMC poster), and nothing was upscaled. Certificates that exist as vector PDFs were re-rendered at 1600px wide (1100px for the portrait DIGITEX certificate). Whole certificates are kept, uncropped.

## Inventory by competition

### 01 — PHARVIA · USK Pharmacy Fair 2026 · 1st Place

| Expected media | Type | Source | Local asset | Original | Loads | Resolution | Displayed | Status |
|---|---|---|---|---|---|---|---|---|
| Pharvia Team | team | `Downloads/foto tim pharvia.jpg` (supplied earlier) | `/assets/projects/pharvia/pharvia-team.jpg` | yes | yes | 1600×962 | yes | COMPLETE |
| Winner Announcement | announcement | `Downloads/Foto juara Pharvia.jpg` (supplied earlier) | `/assets/projects/pharvia/pharvia-award.jpg` | yes | yes | 1600×900 | yes | COMPLETE |
| Certificate | certificate | `Downloads/Sertifikat juara 1_Rizky Sandi Pratama_Pharvia.png` | `pharvia/certificate.webp` | yes | yes | 1600×1131 | yes | COMPLETE |

Expected 3 · found 3 · integrated 3 · missing 0

### 02 — AstraLoka · Diponegoro Economics Project 2026 (DESC) · 2nd Place

| Expected media | Type | Source | Local asset | Original | Loads | Resolution | Displayed | Status |
|---|---|---|---|---|---|---|---|---|
| Sertifikat Undip | certificate | `lomba/ASTRALOKA/sertifat undip.pdf` (vector; "Piagam Penghargaan … Juara 2") | `astraloka/certificate.webp` | yes | yes | 1600×1132 | yes | COMPLETE |
| Foto team | team | — | — | no | — | — | no | MISSING |
| Foto sendiri | individual | — | — | no | — | — | no | MISSING |

Candidate not used: `lomba/ASTRALOKA/4aa232b9-42e9-4318-bc70-231f8dbd3af0.jpg` (780×1052). A candid outdoor photo with no award, certificate or identifiable team context. **NEEDS VERIFICATION**, not displayed.
Note: `lomba/ASTRALOKA/Rizky Sandi Pratama.pdf` is a duplicate of the Undip certificate.

Expected 3 · found 1 · integrated 1 · missing 2

### 03 — PasarAkar · NACOPS 7.0 National Business Plan Competition 2026 · 1st Place + Best Presentation

| Expected media | Type | Source | Local asset | Original | Loads | Resolution | Displayed | Status |
|---|---|---|---|---|---|---|---|---|
| Foto Penghargaan | award | `lomba/NACOPS/foto formal nacops.jpg` (holding both NACOPS certificates, trophy and medal) | `pasarakar/award.webp` | yes | yes | 1600×900 | yes | COMPLETE |
| Fourth LinkedIn item (unknown) | team | `lomba/NACOPS/foto non formal nacops.jpg` (team with the same NACOPS medals and trophy) | `pasarakar/team-celebration.webp` | yes | yes | 1200×1600 | yes | NEEDS VERIFICATION — photo verified as NACOPS; whether it is the LinkedIn fourth item could not be checked |
| Sertifikat Juara 1 | certificate | `Downloads/sertifikat juara.pdf` (vector) | `pasarakar/certificate-1st-place.webp` | yes | yes | 1600×1132 | yes | COMPLETE |
| Sertifikat Presentasi Terbaik | certificate | `Downloads/sertifikat presentasi terbaik.pdf` (vector) | `pasarakar/certificate-best-presentation.webp` | yes | yes | 1600×1132 | yes | COMPLETE |

Expected 4 · found 4 · integrated 4 · missing 0 (1 needs verification)

### 04 — AETHER · DIGITEX 2026, Universiti Teknologi Malaysia · Silver Award

| Expected media | Type | Source | Local asset | Original | Loads | Resolution | Displayed | Status |
|---|---|---|---|---|---|---|---|---|
| Foto team | team | `lomba/DIGITEX/foto team.jpeg` (DIGITEX 2026 backdrop) | `aether-digitex/team.webp` | yes | yes | 1086×1448 | yes | COMPLETE |
| Certificate of Award | certificate | `lomba/DIGITEX/Digitex 2026 Certificate-AETHER.pdf` (vector) | `aether-digitex/certificate.webp` | yes | yes | 1100×1556 | yes | COMPLETE — replaces the earlier 557×796 copy |
| *(additional)* Award photo | award | `lomba/DIGITEX/foto penghargaan.jpg` (DIGITEX backdrop) | `aether-digitex/award.webp` | yes | yes | 960×1280 | yes | COMPLETE |
| *(additional)* Individual photo | individual | `lomba/DIGITEX/foto non formal.jpg` | — | yes | — | 1200×1600 | no | NEEDS VERIFICATION — location sign only partly visible |

Expected 2 · found 2 (+1 extra displayed) · integrated 3 · missing 0

### 05 — AETHER · International Business Strategy Competition 2026, UNJ · 3rd Place

| Expected media | Type | Source | Local asset | Original | Loads | Resolution | Displayed | Status |
|---|---|---|---|---|---|---|---|---|
| Sertifikat juara 3 UNJ | certificate | Embedded in `Downloads/Sertifikat Perlombaan.pdf` (no standalone original found) | `aether-unj/certificate.webp` | copy | yes | 1026×720 | yes | COMPLETE — readable; a full-resolution original would be better |
| Aether Team | team | — | — | no | — | — | no | MISSING |
| *(additional)* Award photo | award | `Downloads/9b0de705-7427-489e-b886-c10934af4ced.jpg` (IBSC banner, 3rd Place board) | `aether-unj/award.webp` | yes | yes | 1200×1600 | yes | COMPLETE |
| *(additional)* AETHER Business Model Canvas | material | `lomba/UNJ/AETER.png` ("Created by DARNST Team", the IBSC team) | `aether-unj/business-model-canvas.webp` | yes | yes | 2000×1478 | yes | COMPLETE |

Not used: `Downloads/sertfikay unj.pdf` — a prize-money slide, not a certificate.

Expected 2 · found 1 (+2 extra displayed) · integrated 3 · missing 1

### 06 — SobatAmbis · Semar Entrepreneur 2025, Universitas Sebelas Maret · 1st Place

| Expected media | Type | Source | Local asset | Original | Loads | Resolution | Displayed | Status |
|---|---|---|---|---|---|---|---|---|
| Sertifikat UNS | certificate | Embedded in `Downloads/Sertifikat Perlombaan.pdf` | `sobatambis/certificate.webp` | copy (2000×1414 source) | yes | 1600×1131 | yes | COMPLETE |
| Foto tim UNS | team | `Downloads/EVIDENCE/UNS/UNS 1.jpg` (board: "Juara 1 Business Model Canvas — Semar Entrepreneur") | `sobatambis/team.webp` | yes | yes | 725×1280 | yes | COMPLETE — modest resolution, shown at native size |

Not used: the `lomba/UNTAR/` folder (SobatAmbis at IO Festival UNTAR is a different competition) and `EVIDENCE/UNS/LOA FINALIS BMC SE 2025.pdf` (a finalist letter).

Expected 2 · found 2 · integrated 2 · missing 0

### 07 — KENICARE · Klikstart Startup Competition 2025, Bandung Techno Park · 2nd Place

| Expected media | Type | Source | Local asset | Original | Loads | Resolution | Displayed | Status |
|---|---|---|---|---|---|---|---|---|
| Sertifikat Kenicare | certificate | `Downloads/EVIDENCE/BTP/Kenicare.pdf` p.1 (vector) | `kenicare/certificate.webp` | yes | yes | 1600×1132 | yes | COMPLETE — replaces the earlier 1095×772 copy |
| Kenicare award | award | `lomba/BTP/Penyerahan penghargaan.jpeg` (board: "Klikstart 2025 … 2nd Winner, Academic Staff & Alumnus Category") | `kenicare/award.webp` | yes | yes | 1280×720 | yes | COMPLETE |
| *(additional)* Team at Bandung Techno Park | team | `lomba/BTP/foto non formal...jpeg` (same award board) | `kenicare/team-bandung-techno-park.webp` | yes | yes | 900×1600 | yes | COMPLETE |

Excluded: `Downloads/1000078262.jpg.jpeg` reads "Klikstart 3.0 Smart Campus Innovation — First Runner-Up — 2 Minutes PaperLab". It's a different edition and project, not KENICARE 2025.

Expected 2 · found 2 (+1 extra displayed) · integrated 3 · missing 0

## Totals

| | Count |
|---|---|
| Named media slots (17 listed + the fourth PasarAkar item) | 18 |
| Found and integrated | 15 (1 needs verification) |
| Missing | 3 |
| Additional verified media integrated | 4 |
| **Images displayed on the site** | **19** |
| Duplicate files | 0 |
| Broken references | 0 |

## Missing-documentation checklist (please provide originals)

- [ ] **AstraLoka — Foto team** (DESC / Diponegoro Economics Project 2026)
- [ ] **AstraLoka — Foto sendiri** (individual photo). Or confirm whether `lomba/ASTRALOKA/4aa232b9-….jpg` belongs to this competition.
- [ ] **AETHER (IBSC, UNJ) — Aether Team photo**
- [ ] **PasarAkar — confirm the fourth LinkedIn media item.** Is it the team celebration photo now shown?
- [ ] *(optional)* **IBSC certificate original:** only a 1026×720 copy from the compilation PDF exists
- [ ] *(optional)* **DIGITEX individual photo:** confirm it was taken at UTM (`lomba/DIGITEX/foto non formal.jpg`)
- [ ] *(optional)* **LinkedIn post URLs** for each achievement, so `sourceUrl` can link to them

## QA performed

- Static: every image path in `rizkyAchievements.ts` exists, its declared width and height match the real file, there are no duplicate hashes across `public/assets`, and no file in the achievements folder is unreferenced.
- Browser (headless Chrome at 1440, 1024, 768 and 390px wide):
  - All 7 galleries opened, and all 19 images decode and display in full (`object-fit: contain`, entirely within the viewport), each with a caption.
  - The button counts match the real number of files.
  - Arrow keys navigate and wrap, thumbnails jump to the right image, Escape closes, focus returns to the button, and there are no console errors.
- `tsc --noEmit` and `npm run build` pass.
