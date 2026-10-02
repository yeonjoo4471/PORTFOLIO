import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import Opening from './components/Opening.jsx'
import About from './components/About.jsx'
import bgm from './assets/audio/j-rock-anime-opening-joyful.mp3'

import './styles/App.css'

const MUSIC_VOLUME = 0.3

export default function App() {
  const audioRef = useRef(null)

  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [openingVisible, setOpeningVisible] = useState(true)

  const startMusic = async () => {
    const audio = audioRef.current

    if (!audio) return

    audio.currentTime = 0
    audio.volume = 0
    audio.muted = false

    setHasStarted(true)
    setIsMuted(false)

    try {
      await audio.play()

      setIsPlaying(true)

      gsap.to(audio, {
        volume: MUSIC_VOLUME,
        duration: 1.5,
        ease: 'power1.out',
      })
    } catch (error) {
      setIsPlaying(false)
      console.error('음악을 재생하지 못했습니다.', error)
    }
  }

  const togglePlayback = async () => {
    const audio = audioRef.current

    if (!audio) return

    gsap.killTweensOf(audio)

    if (audio.paused) {
      audio.volume = 0

      try {
        await audio.play()
        setIsPlaying(true)

        gsap.to(audio, {
          volume: MUSIC_VOLUME,
          duration: 0.8,
          ease: 'power1.out',
        })
      } catch (error) {
        setIsPlaying(false)
        console.error('음악을 다시 재생하지 못했습니다.', error)
      }

      return
    }

    setIsPlaying(false)

    gsap.to(audio, {
      volume: 0,
      duration: 0.35,
      ease: 'power1.out',
      onComplete: () => {
        audio.pause()
        audio.volume = MUSIC_VOLUME
      },
    })
  }

  const toggleMute = () => {
    const audio = audioRef.current

    if (!audio) return

    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  useEffect(() => {
    const opening = document.querySelector('#opening')

    if (!opening) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOpeningVisible(
          entry.isIntersecting && entry.intersectionRatio >= 0.35
        )
      },
      {
        threshold: [0, 0.35],
      },
    )

    observer.observe(opening)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        src={bgm}
        preload="auto"
        loop
      />

      <main>
        <Opening
          onStart={startMusic}
          onRevealComplete={() => setShowMusicControls(true)} />
        <About />
      </main>

      {showMusicControls && (
        <div
          className={[
            'music-controls',
            openingVisible ? 'is-on-opening' : '',
          ].filter(Boolean).join(' ')}
          role="group"
          aria-label="배경음악 컨트롤"
        >
          <button
            type="button"
            className="music-icon-button"
            onClick={togglePlayback}
            aria-label={isPlaying ? '음악 일시 정지' : '음악 재생'}
            title={isPlaying ? '음악 일시 정지' : '음악 재생'}
          >
            {isPlaying ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5.5v13l10-6.5z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className={[
              'music-icon-button',
              isMuted ? 'is-muted' : '',
            ].filter(Boolean).join(' ')}
            onClick={toggleMute}
            aria-pressed={isMuted}
            aria-label={isMuted ? '음소거 해제' : '음소거'}
            title={isMuted ? '음소거 해제' : '음소거'}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 9v6h4l5 4V5L8 9H4z" />

              {isMuted ? (
                <>
                  <path
                    className="music-icon-line"
                    d="M17 9l4 6"
                  />
                  <path
                    className="music-icon-line"
                    d="M21 9l-4 6"
                  />
                </>
              ) : (
                <path
                  className="music-icon-line"
                  d="M16 8.5c1.8 1.8 1.8 5.2 0 7"
                />
              )}
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
