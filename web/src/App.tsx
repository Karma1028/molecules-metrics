import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { WorldLayout } from "./components/WorldLayout";

// K5: one chunk per page. Deck travel animates the arriving page as it mounts,
// so every chunk is also fetched on idle after first paint, and a page whose
// module is already in renders directly instead of suspending (React.lazy would
// still show the fallback for a beat, mid-travel).
type Loader = () => Promise<Record<string, unknown>>;
const loaders: (() => Promise<unknown>)[] = [];

function page(load: Loader, name: string): ComponentType {
  let ready: ComponentType | null = null;
  const fetch = () =>
    load().then((m) => {
      ready = m[name] as ComponentType;
      return { default: ready };
    });
  loaders.push(fetch);
  const Lazy = lazy(fetch);
  return function Page() {
    const C = ready;
    return C ? <C /> : <Lazy />;
  };
}

const PREFETCH_DELAY_MS = 2500;

function usePrefetchPages() {
  useEffect(() => {
    const run = () => loaders.forEach((load) => load().catch(() => {}));
    const id = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === "function")
        window.requestIdleCallback(run, { timeout: 3000 });
      else run();
    }, PREFETCH_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);
}

const Landing = page(() => import("./worlds/Landing"), "Landing");
const ArtistHome = page(
  () => import("./worlds/artist/ArtistHome"),
  "ArtistHome",
);
const Gallery = page(() => import("./worlds/artist/Gallery"), "Gallery");
const Sound = page(() => import("./worlds/artist/sound/Sound"), "Sound");
const Matchday = page(() => import("./worlds/artist/Matchday"), "Matchday");
const Notes = page(() => import("./worlds/artist/Notes"), "Notes");
const NoteReader = page(() => import("./worlds/artist/notes/NoteReader"), "NoteReader");
const About = page(() => import("./worlds/artist/About"), "About");
const ArtistContact = page(() => import("./worlds/artist/Contact"), "Contact");
const AnalystHome = page(
  () => import("./worlds/analyst/AnalystHome"),
  "AnalystHome",
);
const Skills = page(() => import("./worlds/analyst/Skills"), "Skills");
const Work = page(() => import("./worlds/analyst/Work"), "Work");
const Journey = page(() => import("./worlds/analyst/Journey"), "Journey");
const Dashboard = page(() => import("./worlds/analyst/Dashboard"), "Dashboard");
const Resume = page(() => import("./worlds/analyst/Resume"), "Resume");
const AnalystContact = page(
  () => import("./worlds/analyst/Contact"),
  "Contact",
);

export default function App() {
  usePrefetchPages();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <Landing />
          </Suspense>
        }
      />

      <Route path="/artist" element={<WorldLayout world="artist" />}>
        <Route index element={<ArtistHome />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="sound" element={<Sound />} />
        <Route path="matchday" element={<Matchday />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:slug" element={<NoteReader />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ArtistContact />} />
      </Route>

      <Route path="/analyst" element={<WorldLayout world="analyst" />}>
        <Route index element={<AnalystHome />} />
        <Route path="skills" element={<Skills />} />
        <Route path="work" element={<Work />} />
        <Route path="journey" element={<Journey />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="resume" element={<Resume />} />
        <Route path="contact" element={<AnalystContact />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
