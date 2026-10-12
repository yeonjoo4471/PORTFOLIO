import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Routes, Route, useLocation } from "react-router";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import Opening from "./components/Opening.jsx";
import bgm from "./assets/audio/end-of-summer.mp3";

import "./styles/App.css";

const MUSIC_VOLUME = 0.3;

export default function App() {
  const audioRef = useRef(null);
  const { pathname } = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [hasStarted, setHasStarted] = useState(() => pathname !== "/");

  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    if (isStarting || hasStarted) return;

    setIsStarting(true);

    const audio = audioRef.current;

    try {
      if (audio) {
        audio.volume = MUSIC_VOLUME;

        await audio.play();
      }
    } catch (error) {
      console.error("음악을 시작하지 못했습니다.", error.name, error.message);
    } finally {
      setHasStarted(true);
      setIsStarting(false);
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error("음악을 다시 재생하지 못했습니다.", error);
    }
  };

  const [showOpening, setShowOpening] = useState(() => {
    if (typeof window === "undefined") return false;

    const isDirectProject = window.location.hash.includes("/projects/");

    return !isDirectProject;
  });

  const [introComplete, setIntroComplete] = useState(() => pathname !== "/");

  const handleOpeningComplete = useCallback(() => {
    setShowOpening(false);
    setIntroComplete(true);
  }, []);

  const showMusicControls = hasStarted;

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      {!hasStarted && (
        <div className="portfolio-start-screen">
          <div className="portfolio-start-content">
            <p className="portfolio-start-year">2026 ARCHIVE</p>

            <h1 className="portfolio-start-title">YEON JOO</h1>

            <p className="portfolio-start-role">WEB PUBLISHER PORTFOLIO</p>

            <button
              type="button"
              className="portfolio-start-button"
              onClick={handleStart}
              disabled={isStarting}
              autoFocus
            >
              {isStarting ? "STARTING..." : "START"}
            </button>

            <p className="portfolio-start-note">
              음악과 함께 포트폴리오가 시작됩니다.
            </p>
          </div>
        </div>
      )}

      {hasStarted && showOpening && (
        <Opening onComplete={handleOpeningComplete} />
      )}

      <audio
        ref={audioRef}
        src={bgm}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={(event) => {
          setIsMuted(event.currentTarget.muted);
        }}
      />

      <ScrollTop />

      {hasStarted && (
        <>
          {pathname === "/" && <Header />}

          <Routes>
            <Route path="/" element={<Home introComplete={introComplete} />} />

            <Route path="/projects/:slug" element={<ProjectDetail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}

      {showMusicControls &&
        createPortal(
          <div
            className="music-controls"
            role="group"
            aria-label="배경음악 컨트롤"
          >
            <button
              type="button"
              className="music-icon-button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "음악 일시 정지" : "음악 재생"}
              title={isPlaying ? "음악 일시 정지" : "음악 재생"}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l10-6.5z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className={["music-icon-button", isMuted ? "is-muted" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={toggleMute}
              aria-pressed={isMuted}
              aria-label={isMuted ? "음소거 해제" : "음소거"}
              title={isMuted ? "음소거 해제" : "음소거"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" />

                {isMuted ? (
                  <>
                    <path className="music-icon-line" d="M17 9l4 6" />
                    <path className="music-icon-line" d="M21 9l-4 6" />
                  </>
                ) : (
                  <path
                    className="music-icon-line"
                    d="M16 8.5c1.8 1.8 1.8 5.2 0 7"
                  />
                )}
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
