# Cardinal Ritter High School — Class of 2007 | 20 Year Reunion

**Once a Raider, Always a Raider.**

A full-featured reunion website for the Cardinal Ritter High School Class of 2007. Built for the 20 Year Reunion — July 18–20, 2027 in Indianapolis, Indiana.

---

## Features

| Page | Description |
|---|---|
| **Home** | Hero with live countdown timer, 2007 Time Capsule, section previews |
| **About** | Reunion story and class timeline (2003–2027) |
| **Class Directory** | Searchable/filterable classmate cards with social links |
| **Then & Now** | Draggable before/after photo comparison slider |
| **Memory Lane** | Photo gallery with category filters (Sports, Prom, Homecoming, etc.) |
| **Raider Roll Call** | Interactive US map showing where classmates live now |
| **Hall of Raiders** | Featured classmates doing extraordinary things |
| **Reunion Weekend** | Full Fri/Sat/Sun event schedule |
| **Senior Superlatives** | Nomination system — voting opens at the reunion |
| **In Memoriam** | Tribute page for classmates and faculty who have passed |
| **Register** | Full submission form — name, city, occupation, photos, RSVP |

**Bonus features:**
- Floating Spotify player (2007 playlist)
- Raider pirate mascot woven throughout the design
- Framer Motion animations on all page loads and scroll reveals
- Fully mobile responsive

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Backend / Database | Supabase |
| Photo Storage | Supabase Storage |
| Map | react-simple-maps |
| Icons | react-icons |
| Music | Spotify Embed |
| Hosting | Netlify |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/19awburris88/crhs07.git
cd crhs07
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Run locally

```bash
npm run dev
```

---

## Supabase Setup

### Create the `classmates` table

```sql
create table classmates (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp default now(),
  name text not null,
  maiden_name text,
  email text not null,
  phone text,
  city text not null,
  occupation text,
  family text,
  fun_fact text,
  linkedin text,
  instagram text,
  photo_url text,
  senior_photo_url text,
  attending text default 'yes'
);
```

### Enable anonymous inserts (Row Level Security)

```sql
alter table classmates enable row level security;

create policy "Anyone can register"
on classmates for insert
to anon
with check (true);
```

### Create the storage bucket

Supabase Dashboard → Storage → New Bucket → name: `photos` → set to **Public**

---

## Deploying to Netlify

The `netlify.toml` is already configured. To deploy:

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables under **Site Settings → Environment Variables**

Netlify handles static file serving only. Form submissions and photo uploads go directly from the browser to Supabase — Netlify is not in that loop.

---

## Project Structure

```
src/
  assets/          # Logos, mascot, classmate photos
  components/
    Navbar.jsx
    Footer.jsx
    CountdownTimer.jsx
    MusicPlayer.jsx      # Spotify embed player
    TimeCapsule.jsx      # 2007 nostalgia facts
    ImageComparison.jsx  # Draggable Then & Now slider
  lib/
    supabase.js      # Supabase client + photo upload helper
    mockData.js      # Seed data for development
  pages/
    Home.jsx
    About.jsx
    Directory.jsx
    ThenAndNow.jsx
    MemoryLane.jsx
    RaiderRollCall.jsx
    InMemoriam.jsx
    ReunionWeekend.jsx
    HallOfRaiders.jsx
    Superlatives.jsx
    Submit.jsx
```

---

## Brand

```css
--cardinal-red: #C8102E;
--raider-black: #111111;
--off-white:    #F7F7F7;
--silver:       #BFC3C7;
--charcoal:     #222222;
```

Typography: **Bebas Neue** (display) + **Inter** (body)

---

*Cardinal Ritter High School — Class of 2007*  
*Once a Raider, Always a Raider.*
