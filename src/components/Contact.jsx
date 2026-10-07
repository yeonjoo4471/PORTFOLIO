import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import nightSky from '../assets/images/contact/contact-night-sky.png'

import '../styles/contact.css'

gsap.registerPlugin(ScrollTrigger)

const credits = [
  {
    role: 'PLANNING & DESIGN',
    lines: ['LEE YEON JOO'],
  },
  {
    role: 'UI / UX & PUBLISHING',
    lines: ['LEE YEON JOO'],
  },
  {
    role: 'DESIGN TOOLS',
    lines: ['Figma · Photoshop · Illustrator'],
  },
  {
    role: 'DEVELOPMENT',
    lines: ['HTML · CSS · JavaScript · React'],
  },
  {
    role: 'MOTION',
    lines: ['GSAP · ScrollTrigger'],
  },
  {
    role: 'SPECIAL THANKS',
    lines: ['끝까지 함께해주신 당신께'],
  },
]

const contactInfo = {
  email: 'duswn4471@gmail.com',
  instagram: 'https://www.instagram.com/yeon_j._.0416/',
  github: 'https://github.com/yeonjoo4471',
}

const archiveLinks = [
  {
    label: 'GITHUB',
    href: contactInfo.github,
  },
  {
    label: 'INSTAGRAM',
    href: contactInfo.instagram,
  },
]

export default function Contact() {
  const contactRef = useRef(null)
  const creditsTweenRef = useRef(null)
  const creditsTriggerRef = useRef(null)
  const pausedRef = useRef(false)

  const [isPaused, setIsPaused] = useState(false)
  const [motionEnabled, setMotionEnabled] = useState(false)
  const [isEmailCopied, setIsEmailCopied] = useState(false)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (!context.conditions.motion) {
          setMotionEnabled(false)
          return
        }

        setMotionEnabled(true)

        const root = contactRef.current
        const select = gsap.utils.selector(root)

        const viewport = root.querySelector(
          '.contact-credits-viewport',
        )
        const track = root.querySelector(
          '.contact-credits-track',
        )

        viewport.scrollTop = 0

        gsap.timeline({
          defaults: {
            duration: 1.2,
            ease: 'power2.out',
          },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        })
          .from(
            select('.contact-meta'),
            { autoAlpha: 0, y: 12 },
            0,
          )
          .from(
            select('.contact-message'),
            { autoAlpha: 0, y: 24 },
            0.2,
          )
          .from(
            select('.contact-credits-header'),
            { autoAlpha: 0, y: 12 },
            0.5,
          )
          .from(
            select('.contact-links'),
            { autoAlpha: 0, y: 18 },
            0.7,
          )
          .from(
            select('.contact-footer'),
            { autoAlpha: 0, y: 10 },
            0.9,
          )

        const creditsTween = gsap.fromTo(
          track,
          {
            y: () => viewport.clientHeight,
          },
          {
            y: () => -track.scrollHeight,
            duration: 40,
            ease: 'none',
            repeat: -1,
            repeatDelay: 2,
            paused: true,
          },
        )

        creditsTweenRef.current = creditsTween

        const syncPlayback = (trigger) => {
          if (trigger.isActive && !pausedRef.current) {
            creditsTween.play()
          } else {
            creditsTween.pause()
          }
        }

        const creditsTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top 60%',
          end: 'bottom top',
          onToggle: syncPlayback,

          onRefresh: (self) => {
            creditsTween.invalidate()
            syncPlayback(self)
          },
        })

        creditsTriggerRef.current = creditsTrigger
        syncPlayback(creditsTrigger)

        return () => {
          creditsTweenRef.current = null
          creditsTriggerRef.current = null
        }
      },
      contactRef,
    )

    return () => media.revert()
  }, [])

  const toggleCredits = () => {
    const nextPaused = !pausedRef.current

    pausedRef.current = nextPaused
    setIsPaused(nextPaused)

    const tween = creditsTweenRef.current
    const trigger = creditsTriggerRef.current

    if (!tween) return

    if (nextPaused) {
      tween.pause()
    } else if (trigger?.isActive) {
      tween.play()
    }
  }

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? 'instant' : 'smooth',
    })
  }

  const copyEmailAddress = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email)

      setIsEmailCopied(true)

      window.setTimeout(() => {
        setIsEmailCopied(false)
      }, 1600)
    } catch (error) {
      console.error('이메일 주소를 복사하지 못했습니다.', error)
    }
  }

  return (
    <section
      ref={contactRef}
      id='contact'
      className={[
        'contact',
        motionEnabled ? 'has-credit-motion' : '',
      ].filter(Boolean).join(' ')}
      aria-labelledby='contact-title'
    >
      <div className='contact-background' aria-hidden='true'>
        <img 
          src={nightSky} 
          alt=""
          loading='lazy' 
        />
      </div>

      <div className='contact-inner'>
        <header className='contact-meta'>
          <p>FILE 04 / CONTACT</p>
          <p>UNTIL THE NEXT CHAPTER</p>
        </header>

        <div className='contact-layout'>
          <div className='contact-message'>
            <h2 id='contact-title'>
              <span>Thank you</span>
              <br />
              <span>for watching.</span>
            </h2>

            <p className='contact-tagline'>
              좋아하는 마음이,
              <br />
              좋은 디자인이 되도록.
            </p>

            <p className='contact-goodbye'>
              그리고, 더 좋은 이야기로 다시 만나요.
            </p>
          </div>

          <div className='contact-right'>
            <div 
              className='contact-credits'
              role='group'
              aria-labelledby='contact-credits-title'
            >
              <div className="contact-credits-header">
                <h3 id="contact-credits-title">
                  ENDING CREDITS
                </h3>

                {motionEnabled && (
                  <button
                    type="button"
                    className="contact-credits-toggle"
                    onClick={toggleCredits}
                    aria-label={
                      isPaused
                        ? '크레딧 재생'
                        : '크레딧 일시정지'
                    }
                    aria-pressed={isPaused}
                    aria-controls="contact-credits-viewport"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {isPaused ? (
                        <path d="M8 5.5v13l10-6.5z" />
                      ) : (
                        <>
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </>
                      )}
                    </svg>
                  </button>
                )}
              </div>

              <div 
                className='contact-credits-viewport'
                tabIndex={0}
                role='region'
                aria-label='제작 크레딧'
              >
                <div className='contact-credits-track'>
                  <dl className='contact-credits-list'>
                    {credits.map((credit) => (
                      <div
                        key={credit.role}
                        className='contact-credit'
                      >
                        <dt>{credit.role}</dt>

                        <dd>
                          {credit.lines.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className='contact-credits-end'>
                    See you in the next chapter.
                  </p>
                </div>
              </div>
            </div>

            <div className='contact-links'>
              <section
                className='contact-email'
                aria-labelledby='contact-email-title'
              >
                <h3 id='contact-email-title'>
                  DIRECT EMAIL INQUIRY
                </h3>

                <div className='contact-email-row'>
                  <a
                    className='contact-email-address' 
                    href={`mailto:${contactInfo.email}`}
                  >
                    {contactInfo.email}
                  </a>

                  <button
                    type='button'
                    className='contact-email-copy'
                    onClick={copyEmailAddress}
                    aria-live='polite'
                  >
                    {isEmailCopied ? 'COPIED' : 'COPY ADDRESS'}
                  </button>
                </div>
              </section>

              <nav
                className='contact-archives'
                aria-labelledby='contact-archives-title'
              >
                <h3 id='contact-archives-title'>
                  EXTERNAL ARCHIVES
                </h3>

                <ul>
                  {archiveLinks.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span>{link.label}</span>
                        <span aria-hidden='true'>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <footer className='contact-footer'>
          <p>© 2026 LEE YEON JOO</p>

          <button
            type='button'
            className='contact-back-top'
            onClick={scrollToTop}
            aria-label='포트폴리오 맨 위로 이동'
          >
            BACK TO TOP
            <span aria-hidden='true'>↑</span>
          </button>
        </footer>
      </div>
    </section>
  )
}