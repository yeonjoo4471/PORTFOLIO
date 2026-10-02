import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import sky from '../assets/images/opening/atmosphere/sky-cloud.png'
import wind from '../assets/images/opening/atmosphere/light-wind.png'
import tous from '../assets/images/projects/touslesjours/thumbnail.png'
import megabox from '../assets/images/projects/megabox/thumbnail.png'
import megaboxApp from '../assets/images/projects/magabox_app/thumbnail.png'
import apple from '../assets/images/projects/apple/thumbnail.png'
import duckspot from '../assets/images/projects/duckspot/thumbnail.png'
import wish from '../assets/images/projects/wish-shop/thumbnail.png'
import cineops from '../assets/images/projects/cineops/thumbnail.png'
import anime from '../assets/images/projects/anime-goods/thumbnail.png'
import '../styles/opening.css'

const projects = [
  { name: 'TOUS LES JOURS', image: tous },
  { name: 'MEGABOX', image: megabox },
  { name: 'APPLE', image: apple },
  { name: 'DUCKSPOT', image: duckspot },
  { name: 'WISH SHOP', image: wish },
  { name: 'CINEOPS', image: cineops },
  { name: 'ANIME GOODS', image: anime },
  { name: 'MEGABOX APP', image: megaboxApp },
]

function ProjectFrame({ project, index, className = '' }) {
  return <figure className={`op-frame ${className}`}>
    <img src={project.image} alt={project.name} decoding="async" />
    <figcaption>
      <span>FILE / {String(index + 1).padStart(2, '0')}</span>
      <span>{project.name}</span>
    </figcaption>
  </figure>
}

export default function Opening({ onStart, onRevealComplete, }) {
  const root = useRef(null)
  const timeline = useRef(null)
  const heading = useRef(null)
  const startScreen = useRef(null)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)
  const [starting, setStarting] = useState(false)
  const start = async () => {
    if (starting || started) return

    setStarting(true)

    try {
      await onStart?.()
    } finally {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      
      setStarted(true)
      setStarting(false)

      if (reduceMotion) {
        timeline.current?.progress(1).pause()
        setFinished(true)

        gsap.set(startScreen.current, {
          autoAlpha: 0,
          pointerEvents: 'none',
        })

        onRevealComplete?.()

        return
      }

      timeline.current?.restart()

      gsap.to(startScreen.current, {
        autoAlpha: 0,
        duration: 1.2,
        delay: 0.1,
        ease: 'power2.inOut',
        pointerEvents: 'none',

        onComplete: () => {
          onRevealComplete?.()
        },
      })
    }
  }

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add(
      { 
        reduced: '(prefers-reduced-motion: reduce)', 
        normal: '(prefers-reduced-motion: no-preference)' 
      }, 
      context => {
      const q = gsap.utils.selector(root)
      const finish = () => setFinished(true)
      const tl = gsap.timeline({ 
          paused: true, 
          onComplete: finish 
        })

      timeline.current = tl
      
      const scene = (selector, start, end) => {
        tl.set(q(selector), { autoAlpha: 1 }, start)
        if (end !== undefined) {
          tl.set(q(selector), { autoAlpha: 0 }, end)
        }
      }

      scene('.op-sky', 0, 5)

      scene('.op-sky-label', 0, 1.5)

      scene('.op-message', 1.5, 5)

      tl.fromTo(
        q('.op-message'),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power1.out' },
        1.5,
      )

      tl.fromTo(
        q('.op-sky img'), 
        { scale: 1.01, opacity: 0.65 }, 
        { scale: 1.06, opacity: 1, duration: 4, ease: 'power1.out' }, 
        0,
      )

      tl.fromTo(
        q('.op-message-copy > *'), 
        { y: 24, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: .12, duration: .7 }, 
        1.5,
      )

      scene('.op-cut-one', 5, 7)

      scene('.op-cut-two', 7, 9)

      tl.fromTo(
        q('.op-cut-one .op-frame'), 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
        5,
      )

      tl.fromTo(
        q('.op-cut-two .op-frame'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        7,
      )

      scene('.op-collage-one', 9, 12)

      scene('.op-collage-two', 12, 15)

      tl.fromTo(
        q('.op-collage-one .op-frame'), 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: .8, stagger: .3, ease: 'power2.out' }, 
        9,
      )

      tl.fromTo(
        q('.op-collage-two .op-frame'), 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: .8, stagger: .3, ease: 'power2.out' }, 
        12,
      )

      scene('.op-wind', 15, 17.5)

      tl.fromTo(
        q('.op-wind img'), 
        { scale: 1.05, xPercent: -1 }, 
        { scale: 1, xPercent: 0, duration: 1.8, ease: 'none' }, 
        15,
      )

      tl.fromTo(
        q('.op-wind'), 
        { opacity: 1 }, 
        { opacity: 0, duration: .55 }, 
        16.95,
      )

      scene('.op-hero', 17.5)

      tl.fromTo(
        q('.op-title-line span'), 
        { yPercent: 110 }, 
        { yPercent: 0, duration: 1.2, stagger: .2, ease: 'power3.out' }, 
        17.5,
      )

      tl.fromTo(
        q('.op-signature, .op-role'), 
        { y: 16, opacity: 0 }, 
        { y: 0, opacity: 1, duration: .8, stagger: .15 }, 
        18.2,
      )

      tl.fromTo(
        q('.op-explore'), 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: .5 }, 
        19.5,
      )

      setFinished(false)
      tl.pause(0)

      return () => { 
        tl.kill(); 
        timeline.current = null 
      }
    }, root)

    return () => media.revert()
  }, [])

  const skip = () => {
    timeline.current?.progress(1).pause()
    setFinished(true)
    heading.current?.focus({ preventScroll: true })
  }

  return (
    <section 
    ref={root} 
    id="opening" 
    className={[
      'opening',
      started ? 'is-started' : '',
      finished ? 'is-finished' : '',
    ].filter(Boolean).join(' ')} 
    aria-label="이연주 포트폴리오 오프닝"
    >
      <div 
        ref={startScreen}
        className='op-start-screen'
        aria-hidden={started}
      >
        <div className='op-start-content'>
          <p className='op-start-label'>
            LEE YEON JOO<br />
            PORTFOLIO / 2026
          </p>

          <button
            type='button'
            className='op-start'
            onClick={start}
            disabled={starting || started}
          >
            <span>{starting ? 'LOADING' : 'START'}</span>
            <span aria-hidden="true">↗</span>
          </button>

          <p className='op-start-caption'>
            SOUND ON · FULL EXPERIENCE
          </p>
        </div>
      </div>

      {started && !finished && (
        <button 
          type="button" 
          className="op-skip" 
          onClick={skip}
        >
          SKIP INTRO 
          <span aria-hidden="true">↗</span>
        </button>
      )}

      <div className="op-scene op-sky" aria-hidden="true">
        <img 
          className="op-atmosphere" 
          src={sky} 
          alt="" 
          fetchPriority="high" 
        />
        <div className="op-sky-label">
          <p>
            2026<br />
            PORTFOLIO ARCHIVE
          </p>
          <span>SCENE 01</span>
        </div>
      </div>

      <div className="op-scene op-message" aria-hidden="true">
        <div className="op-message-copy">
          <p className="op-eyebrow">
            WHAT I LOVE, BECOMES WHAT I CREATE.
          </p>
          <p className="op-korean">
            좋아하는 것을,<br />
            <strong>잘하는 것으로.</strong>
          </p>
        </div>

        <div className="op-note">
          <span>my archive</span>
          <p>
            SKY / WIND / LIGHT<br />
            FILE 001
          </p>
        </div>
      </div>

      {projects.slice(0, 2).map((project, index) => (
        <div 
          key={project.name} 
          className={`op-scene op-cut op-cut-${index ? 'two' : 'one'}`} 
          aria-hidden="true"
        >
        <p className="op-scene-label">
          PROJECT / 0{index + 1}<br />
          WEB DESIGN
        </p>
        <ProjectFrame project={project} index={index} />
        <span className="op-count">
          0{index + 1} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>))}

      {
      [projects.slice(2, 5), 
        projects.slice(5)
      ]
      .map((group, groupIndex) => (
        <div 
          key={groupIndex} 
          className={`op-scene op-collage op-collage-${groupIndex ? 'two' : 'one'}`} 
          aria-hidden="true"
        >
        <p className="op-scene-label">
          ARCHIVE / SELECTED WORKS
        </p>

        {group.map((project, index) => (
          <ProjectFrame 
            key={project.name} 
            project={project} 
            index={index + (groupIndex ? 5 : 2)} 
            className={`op-position-${index}`} 
          />
        ))}

        <span className="op-count">SCENE 04 / 2026</span>
      </div>))}

      <div className="op-scene op-wind" aria-hidden="true">
        <img className="op-atmosphere" src={wind} alt="" />
        <p className="op-scene-label">SCENE / 05</p>
        <p className="op-wind-title">
          Light
          <span>Wind</span>
        </p>
        <span className="op-keep">keep creating.</span>
        <span className="op-count">SUMMER / 2026</span>
      </div>

      <div className="op-scene op-hero" aria-hidden={!finished}>
        <p className="op-scene-label">PORTFOLIO / 2026</p>
        <span className="op-hero-mark">SKY × WIND × LIGHT</span>

        <div className="op-title-block">
          <h1 
            ref={heading} 
            tabIndex={-1} 
            aria-label="LEE YEON JOO"
          >
            <span className="op-title-line">
              <span>LEE</span>
            </span>
            
            <span className="op-title-line">
              <span>YEON JOO</span>
            </span>
          </h1>
          
          <span className="op-signature">Archive</span>
          
          <p className="op-role">
            WEB DESIGN <span>·</span> UI/UX <span>·</span> FRONT-END</p>
        </div>

        <div className="op-hero-footer">
          <span className="op-explore">
            SCROLL TO EXPLORE 
            <span aria-hidden="true">↓</span>
          </span>
          
          <span>
            FILE / LYJ 
            <span className="op-footer-year">2026</span>
          </span>
        </div>
      </div>

      <div className="op-progress" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

