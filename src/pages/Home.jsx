import { useLocation } from 'react-router'

import OpeningPreview from '../components/OpeningPreview.jsx'
import About from '../components/About.jsx'
import Projects from '../components/Projects.jsx'
import Process from '../components/Process.jsx'
import Contact from '../components/Contact.jsx'

export default function Home({
  onStartMusic,
  onRevealComplete,
}) {
  return (
    <>
      

      <main>
        <OpeningPreview
          onStart={onStartMusic}
          onRevealComplete={onRevealComplete}
        />

        <About />
        <Projects />
        <Process />
        <Contact />
      </main>
    </>
  )
}