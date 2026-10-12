import Hero from '../components/Home/Hero.jsx'
import Skills from '../components/Home/Skills.jsx'

import About from '../components/About.jsx'
import Projects from '../components/Projects.jsx'
import Process from '../components/Process.jsx'
import Contact from '../components/Contact.jsx'

export default function Home({introComplete}) {
  return (
    <main>
      <Hero isActive={introComplete} />

      <About />

      <Skills />

      <Projects />

      <Process />

      <Contact />
    </main>
  )
}