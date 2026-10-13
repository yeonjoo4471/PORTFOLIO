import { useState, useEffect, useCallback } from 'react'
import skyCloudImg from '../assets/images/opening/atmosphere/sky-cloud.png'
import '../styles/opening.css'

export default function Opening({ onComplete }) {
  const [currentScene, setCurrentScene] = useState(1)
  const [isClosing, setIsClosing] = useState(false)

  const handleFinish = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 600)
  }, [onComplete])

  useEffect(() => {
    // Scene timings (total ~7.6s)
    const t1 = setTimeout(() => setCurrentScene(2), 1400) // Scene 2: DESIGN / CODE / INTERACTION
    const t2 = setTimeout(() => setCurrentScene(3), 3000) // Scene 3: Mask reveal of Sky / Light
    const t3 = setTimeout(() => setCurrentScene(4), 4600) // Scene 4: Credits cross
    const t4 = setTimeout(() => setCurrentScene(5), 6000) // Scene 5: Big Typography
    const t5 = setTimeout(() => {
      // Scene 6: Fade out & transition to Hero
      handleFinish()
    }, 7600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [handleFinish])

  return (
    <div className={`opening-overlay scene-${currentScene} ${isClosing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label="오프닝 시퀀스">
      {/* Skip Intro Button */}
      <button
        type="button"
        className="opening-skip-btn"
        onClick={handleFinish}
        aria-label="오프닝 건너뛰기"
      >
        <span>SKIP INTRO</span>
        <span aria-hidden="true">»</span>
      </button>

      {/* Background Visuals for Scenes 3+ */}
      <div className={`opening-visual-bg scene-${currentScene}`} aria-hidden="true">
        <img src={skyCloudImg} alt="" className="opening-bg-sky" />
        <div className="opening-bg-vignette"></div>
      </div>

      {/* Scene 1: Minimal Black Screen Typography */}
      {currentScene === 1 && (
        <div className="scene-container scene-1-block">
          <span className="opening-tag-year">2026 ARCHIVE</span>
          <div className="opening-spec-lines">
            <span className="spec-line">WEB PUBLISHER</span>
            <span className="spec-line">PORTFOLIO</span>
          </div>
        </div>
      )}

      {/* Scene 2: Fast Kinetic Typography Cut */}
      {currentScene === 2 && (
        <div className="scene-container scene-2-block">
          <div className="kinetic-cut-wrap">
            <span className="kinetic-word cut-1 font-title">DESIGN</span>
            <span className="kinetic-separator">/</span>
            <span className="kinetic-word cut-2 font-title">CODE</span>
            <span className="kinetic-separator">/</span>
            <span className="kinetic-word cut-3 font-title">INTERACTION</span>
          </div>
        </div>
      )}

      {/* Scene 3: Sky Mask Reveal */}
      {currentScene === 3 && (
        <div className="scene-container scene-3-block">
          <div className="mask-reveal-box">
            <span className="scene-3-kicker">INTO THE CLEAR SKY</span>
            <h2 className="scene-3-title font-title">화면으로 이어진 생각과 기록</h2>
          </div>
        </div>
      )}

      {/* Scene 4: Opening Credits Cross */}
      {currentScene === 4 && (
        <div className="scene-container scene-4-block">
          <div className="opening-credits-grid">
            <div className="credit-role-tag">PLANNED · DESIGNED · PUBLISHED BY</div>
            <div className="credit-name-highlight font-title">YEON JOO</div>
          </div>
        </div>
      )}

      {/* Scene 5: Main Title Card */}
      {currentScene === 5 && (
        <div className="scene-container scene-5-block">
          <span className="main-title-pre">PORTFOLIO</span>
          <h1 className="main-title-name font-title">YEON JOO</h1>
          <span className="main-title-role">WEB PUBLISHER</span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="opening-progress-bar" aria-hidden="true">
        <div className="opening-progress-fill"></div>
      </div>
    </div>
  )
}
