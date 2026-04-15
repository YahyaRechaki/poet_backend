# Arabic Poets Timeline — Progress Report

## Project Overview
A Node.js / Express / TypeScript / TypeORM / PostgreSQL REST API that serves a
chronological timeline of Arabic poets from the pre-Islamic era (Jahiliyyah)
to the present day.

**Active branch:** `claude/arabic-poets-timeline-aBRxH`
**GitHub:** `https://github.com/YahyaRechaki/poet_backend`

---

## ✅ Done

### 1 — Poet Entity (`src/entity/Poet.ts`)
Added six new columns to the existing `Poet` TypeORM entity:

| Column | Type | Purpose |
|--------|------|---------|
| `bornYear` | `int` (nullable) | Birth year as an integer — easier than Date for ancient poets |
| `diedYear` | `int` (nullable) | Death year (`null` = still alive) |
| `madhhab` | `text` (nullable) | Islamic school of jurisprudence (Hanafi / Maliki / Shafi'i / Hanbali / Ja'fari / N/A) |
| `poetryThemes` | `text[]` (nullable) | Topics covered: romantic, elegy, satire, mysticism, resistance… |
| `biography` | `text` (nullable) | Short biographical note in English |
| `nationality` | `text` (nullable) | Modern nationality / origin country |

Kept all original fields: `nickName`, `fullName`, `bornAt`, `diedAt`,
`whereLived`, `underState`, `era`, `underRulers`, `religion`,
`bestKnownPoems`, `jahiliyyah`, `qabilah`.

### 2 — Controller (`src/controllers/poetsController.ts`)
Two new functions added alongside the existing `createPoet` / `getAllPoets`:

#### `getTimeline`  →  `GET /api/poets/timeline`
- Returns **all poets sorted by `bornYear` ASC**.
- Groups them into era buckets in canonical order:
  `Jahiliyyah → Sadr al-Islam → Umayyad → Abbasid → Andalusian →
   Ayyubid → Mamluk → Ottoman → Modern → Contemporary`
- Supports **optional query-string filters**:
  - `?era=Abbasid` — exact era match (array contains)
  - `?religion=Islam` — case-insensitive partial match
  - `?madhhab=Maliki` — case-insensitive partial match
  - `?theme=romantic` — exact theme tag match (array contains)
- Response shape:
  ```json
  { "total": 38, "timeline": [ { "era": "Jahiliyyah", "poets": [...] } ] }
  ```

#### `getPoetById`  →  `GET /api/poets/:id`
- Returns a single poet by UUID.
- Returns 404 if not found.

### 3 — Routes (`src/routes/poetRoutes.ts`)
```
GET  /api/poets/timeline   → getTimeline
GET  /api/poets/getAll     → getAllPoets   (unchanged)
POST /api/poets/create     → createPoet   (unchanged)
GET  /api/poets/:id        → getPoetById
```
> `/timeline` is registered **before** `/:id` to avoid route shadowing.

### 4 — Branch pushed
Branch `claude/arabic-poets-timeline-aBRxH` is live on GitHub.

---

## ❌ Still TODO (backend)

### 1 — Seed data file  ⬅ highest priority
**File to create:** `src/seed/arabic_poets.json`

This file is **not blocked by `.gitignore`** (only `poets.json` is blocked).

Must be a JSON array of Poet objects covering these ~38 poets in order:

| Era | Poets |
|-----|-------|
| Jahiliyyah | Imru al-Qays, Zuhayr ibn Abi Sulma, Tarafa ibn al-Abd, Labid ibn Rabi'ah, Antarah ibn Shaddad, Amr ibn Kulthum, Al-Nabighah al-Dhubiani, Al-A'sha, Al-Khansa' |
| Sadr al-Islam | Hassan ibn Thabit, Ka'b ibn Zuhayr |
| Umayyad | Al-Farazdaq, Jarir ibn Atiyah, Al-Akhtal (Christian), Umar ibn Abi Rabi'ah, Majnun Layla |
| Abbasid | Abu Nuwas, Abu Tammam, Al-Buhturi, Al-Mutanabbi, Abu al-Ala al-Ma'arri, Ibn al-Rumi, Al-Sharif al-Radi |
| Andalusian | Ibn Zaydun, Al-Mu'tamid ibn Abbad, Wallada bint al-Mustakfi |
| Ayyubid / Mamluk | Ibn al-Farid, Al-Busiri |
| Modern | Ahmad Shawqi, Hafiz Ibrahim, Khalil Gibran |
| Contemporary | Nizar Qabbani, Mahmoud Darwish, Badr Shakir al-Sayyab, Nazik al-Malaika, Adonis (still alive → `diedYear: null`), Fadwa Tuqan, Samih al-Qasim |

Each poet object must include **all** of these fields where known:
```jsonc
{
  "nickName": "امرؤ القيس",            // Arabic common name
  "fullName": "امرؤ القيس بن حجر الكندي", // Full Arabic name
  "bornYear": 501,
  "diedYear": 545,                       // null if still alive
  "qabilah": "كندة (Kindah)",
  "whereLived": ["Najd", "Byzantine Empire"],
  "underState": ["Pre-Islamic Arabia"],
  "era": ["Jahiliyyah"],
  "underRulers": ["N/A — tribal period"],
  "religion": "Pagan (Pre-Islamic)",
  "madhhab": "N/A",
  "bestKnownPoems": ["Mu'allaqah of Imru al-Qays"],
  "poetryThemes": ["romantic", "nature", "self-praise", "wandering"],
  "jahiliyyah": true,
  "biography": "Short English biography...",
  "nationality": "Arabian"
}
```

### 2 — Update import script
**File:** `src/scripts/import-poets.ts`

Change line 11 from:
```typescript
const filePath = path.join(__dirname, '../seed/poets.json');
```
to:
```typescript
const filePath = path.join(__dirname, '../seed/arabic_poets.json');
```

### 3 — Commit & push
After seed data + import script are done:
```bash
git add src/seed/arabic_poets.json src/scripts/import-poets.ts
git commit -m "feat: add seed data for 38 Arabic poets across all historical eras"
git push origin claude/arabic-poets-timeline-aBRxH
```

---

## Notes & Decisions
- `bornYear` / `diedYear` (integers) are used for timeline sorting instead of
  the existing `bornAt` / `diedAt` (Date) columns, because ancient dates like
  "501 CE" are awkward as JS Date objects.
- `DATABASE_SYNCHRONIZE=true` auto-migrates the schema in dev — no manual
  migration needed for the new columns.
- The import script (`npm run typeorm`) must be run once to populate the DB.
- All new columns are `nullable`, so existing rows won't break.
