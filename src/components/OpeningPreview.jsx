import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import sky from '../assets/images/opening/atmosphere/sky-cloud.png'
import tous from '../assets/images/projects/touslesjours/thumbnail.png'
import megabox from '../assets/images/projects/megabox/thumbnail.png'
import apple from '../assets/images/projects/apple/thumbnail.png'
import duckspot from '../assets/images/projects/duckspot/thumbnail.png'
import wish from '../assets/images/projects/wish-shop/thumbnail.png'
import cineops from '../assets/images/projects/cineops/thumbnail.png'
import anime from '../assets/images/projects/anime-goods/thumbnail.png'
import megaboxApp from '../assets/images/projects/magabox_app/thumbnail.png'

import '../styles/opening-preview.css'

const previewProjects = [
  {
    id: 'touslesjours',
    name: 'TOUS LES JOURS',
    image: tous,
  },
  {
    id: 'megabox',
    name: 'MEGABOX',
    image: megabox,
  },
  {
    id: 'apple',
    name: 'APPLE',
    image: apple,
  },
  {
    id: 'duckspot',
    name: 'DUCKSPOT',
    image: duckspot,
  },
  {
    id: 'wish-shop',
    name: 'WISH SHOP',
    image: wish,
  },
  {
    id: 'cineops',
    name: 'CINEOPS',
    image: cineops,
  },
  {
    id: 'anime-goods',
    name: 'ANIME GOODS',
    image: anime,
  },
  {
    id: 'megabox-app',
    name: 'MEGABOX APP',
    image: megaboxApp,
  },
]

const projectGroups = [
  previewProjects.slice(0, 3),
  previewProjects.slice(3, 6),
  previewProjects.slice(6, 8),
]

export default function OpeningPreview({ onStart, onRevealComplete, onIntroComplete, skipIntro = false, }) {
  const root = useRef(null)
  const timeline = useRef(null)
  const skipButton = useRef(null)
  const exploreLink = useRef(null)
  const startScreen = useRef(null)

  const [started, setStarted] = useState(skipIntro)
  const startLock = useRef(false)

  const startIntro = async () => {
    if (startLock.current) return

    startLock.current = true

    try {
      await onStart?.()
    } finally {
      setStarted(true)

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduceMotion) {
        gsap.set(startScreen.current, {
          autoAlpha: 0,
          pointerEvents: 'none',
        })

        onRevealComplete?.()
        onIntroComplete?.()
        return
      }

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
    if (!started) return

    if (skipIntro) {
      const q = gsap.utils.selector(root)
      const groups = q('.opening-preview-group')
      const lastGroup = groups[groups.length - 1]

      gsap.set(startScreen.current, {
        autoAlpha: 0,
        pointerEvents: 'none',
      })

      gsap.set(groups, {
        autoAlpha: 0,
      })

      if (lastGroup) {
        gsap.set(lastGroup, {
          autoAlpha: 1,
        })
      }

      gsap.set(q('.opening-preview-footer'), {
        autoAlpha: 1,
      })

      gsap.set(skipButton.current, {
        autoAlpha: 0,
        pointerEvents: 'none',
      })

      return
    }

    const media = gsap.matchMedia()

    media.add(
      {
        normal: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const q = gsap.utils.selector(root)
        const groups = q('.opening-preview-group')
        const footer = q('.opening-preview-footer')
        const skip = skipButton.current

        if (context.conditions.reduced) {
          gsap.set(groups, { autoAlpha: 0 })
          gsap.set(groups[2], { autoAlpha: 1 })
          gsap.set(footer, { autoAlpha: 1 })
          gsap.set(skip, { autoAlpha: 0 })
          return
        }

        gsap.set(groups, { autoAlpha: 0 })
        gsap.set(footer, { autoAlpha: 0 })
        gsap.set(skip, { autoAlpha: 1 })

        const tl = gsap.timeline({
          defaults: {
            ease: 'power2.out',
          },
          onComplete: () => {
            gsap.set(skip, { autoAlpha: 0, pointerEvents: 'none', })
            onIntroComplete?.()
          },
        })

        timeline.current = tl

        tl.from(
          q(
            '.opening-preview-eyebrow, ' +
            '.opening-preview-title h1, ' +
            '.opening-preview-signature, ' +
            '.opening-preview-message'
          ),
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
            stagger: 0.18,
          },
          0.1,
        )

        tl.fromTo(
          q('.opening-preview-bg'),
          { scale: 1 },
          {
            scale: 1.035,
            duration: 13.4,
            ease: 'none',
          },
          0,
        )

        const revealGroup = (groupIndex, time) => {
          const group = groups[groupIndex]
          const photos = group.querySelectorAll('.opening-photo')

          tl.set(group, { autoAlpha: 1 }, time)

          tl.fromTo(
            photos,
            {
              opacity: 0,
              y: 28,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.28,
            },
            time,
          )
        }

        revealGroup(0, 2)

        tl.to(
          groups[0],
          {
            autoAlpha: 0,
            duration: 0.4,
          },
          5.5,
        )

        revealGroup(1, 5.9)

        tl.to(
          groups[1],
          {
            autoAlpha: 0,
            duration: 0.4,
          },
          9.4,
        )

        revealGroup(2, 9.8)

        tl.fromTo(
          footer,
          {
            autoAlpha: 0,
            y: 8,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          12.8,
        )

        return () => {
          timeline.current = null
        }
      },
      root,
    )

    return () => media.revert()
  }, [started, skipIntro])

  const handleSkipIntro = () => {
    timeline.current?.progress(1).pause()
    onIntroComplete?.()
    exploreLink.current?.focus({ preventScroll: true })
  }

  return (
    <section
      ref={root}
      id='opening'
      className={[
        'opening-preview',
        started ? 'is-started' : '',
      ].filter(Boolean).join(' ')}
      aria-label='이연주 포트폴리오'
    >

      <div ref={startScreen} className='op-start-screen' aria-hidden={started}>
        <div className='op-start-content'>
          <p className='op-start-label'>
            LEE YEON JOO
            <br />
            PORTFOLIO / 2026
          </p>

          <button
            type='button'
            className='op-start'
            onClick={startIntro}
            disabled={started}
          >
            <span>START</span>
            <span aria-hidden="true">↗</span>
          </button>
          <p className='op-start-caption'>
            SOUND ON · FULL EXPERIENCE
          </p>
        </div>
      </div>

      {/* 배경 */}
      <img className='opening-preview-bg' src={sky} alt="" />

      {/* 상단 기록 정보 */}
      <header className='opening-preview-header'>
        <span>PORTFOLIO / 2026</span>
        <span>SKY x WIND x LIGHT</span>
      </header>

      <button
        ref={skipButton}
        type='button'
        className='opening-preview-skip'
        onClick={handleSkipIntro}
        tabIndex={started ? 0 : -1}
      >
        SKIP INTRO ↗
      </button>

      <div className='opening-preview-layout'>
        {/* 왼쪽 */}
        <div className='opening-preview-copy'>
          <p className='opening-preview-eyebrow'>
            DESIGN · PUBLISHING · ARCHIVE
          </p>

          <div className='opening-preview-title'>
            <h1>
              LEE<br />
              YEON JOO
            </h1>

            <span className='opening-preview-signature'>
              Archive
            </span>
          </div>

          <p className='opening-preview-message'>
            좋아하는 것을,<br />
            잘하는 것으로.
          </p>
        </div>

        {/* 오른쪽 */}
        <div className='opening-preview-stage'>
          {projectGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={[
                'opening-preview-collage',
                'opening-preview-group',
                group.length === 2 ? 'is-pair' : '',
              ].filter(Boolean).join(' ')}
            >
              {group.map((project, index) => (
                <figure
                  key={project.id}
                  className={`opening-photo opening-photo-${index + 1}`}
                >
                  <div className='opening-photo-image'>
                    <img src={project.image} alt={`${project.name} 프로젝트 화면`}
                    />
                  </div>

                  <figcaption>
                    <span>
                      FILE / {
                        String(groupIndex * 3 + index + 1).padStart(2, '0')
                      }
                    </span>

                    <span>{project.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      <footer className='opening-preview-footer'>
        <a 
          ref={exploreLink} 
          href="#about" 
          tabIndex={started ? 0 : -1}
          onClick={(event) => {
            event.preventDefault()

            document.getElementById('about')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }}
        >
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>

        <span>MY PERSONAL ARCHIVE</span>
      </footer>
    </section>
  )
}