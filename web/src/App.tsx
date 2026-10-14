import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { WorldLayout } from "./components/WorldLayout"

// K5: one chunk per page. Pages use named exports, so map them to default.
const Landing = lazy(() => import("./worlds/Landing").then((m) => ({ default: m.Landing })))
const ArtistHome = lazy(() => import("./worlds/artist/ArtistHome").then((m) => ({ default: m.ArtistHome })))
const Gallery = lazy(() => import("./worlds/artist/Gallery").then((m) => ({ default: m.Gallery })))
const Sound = lazy(() => import("./worlds/artist/sound/Sound").then((m) => ({ default: m.Sound })))
const Matchday = lazy(() => import("./worlds/artist/Matchday").then((m) => ({ default: m.Matchday })))
const Notes = lazy(() => import("./worlds/artist/Notes").then((m) => ({ default: m.Notes })))
const About = lazy(() => import("./worlds/artist/About").then((m) => ({ default: m.About })))
const ArtistContact = lazy(() => import("./worlds/artist/Contact").then((m) => ({ default: m.Contact })))
const AnalystHome = lazy(() => import("./worlds/analyst/AnalystHome").then((m) => ({ default: m.AnalystHome })))
const Skills = lazy(() => import("./worlds/analyst/Skills").then((m) => ({ default: m.Skills })))
const Work = lazy(() => import("./worlds/analyst/Work").then((m) => ({ default: m.Work })))
const Journey = lazy(() => import("./worlds/analyst/Journey").then((m) => ({ default: m.Journey })))
const Dashboard = lazy(() => import("./worlds/analyst/Dashboard").then((m) => ({ default: m.Dashboard })))
const Resume = lazy(() => import("./worlds/analyst/Resume").then((m) => ({ default: m.Resume })))
const AnalystContact = lazy(() => import("./worlds/analyst/Contact").then((m) => ({ default: m.Contact })))

export default function App() {
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
  )
}
