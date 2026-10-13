import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

import skyCloudImg from '../../assets/images/opening/atmosphere/sky-cloud.png'
import '../../styles/hero.css'

export default function Hero({isActive=false}) {
  const heroRef = useRef(null)

    useLayoutEffect(() => {
    const context = gsap.context(() => {
      const select = gsap.utils.selector(heroRef)

      const targets = select(
        [
          '.hero-meta-top',
          '.hero-kicker',
          '.hero-title > span',
          '.hero-identity',
          '.hero-statement',
          '.hero-scroll-indicator',
        ].join(','),
      )

      // 오프닝이 진행되는 동안에는 메인 글자를 숨겨둡니다.
      gsap.set(targets, {
        autoAlpha: 0,
      })

      // 오프닝이 끝나기 전에는 등장 애니메이션을 시작하지 않습니다.
      if (!isActive) return

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .fromTo(
          select('.hero-meta-top'),
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0,
        )
        .fromTo(
          select('.hero-kicker'),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.1,
        )
        .fromTo(
          select('.hero-title > span'),
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
          },
          0.2,
        )
        .fromTo(
          select('.hero-identity, .hero-statement'),
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
          },
          0.5,
        )
        .fromTo(
          select('.hero-scroll-indicator'),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.75,
        )
    }, heroRef)

    return () => context.revert()
  }, [isActive])

  return (
    <section ref={heroRef} id="hero" className="hero-section" aria-label="Hero Section">
      <div className="hero-atmosphere" aria-hidden="true">
        <img src={skyCloudImg} alt="" className="hero-sky-img" />
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="container hero-container archive-layout">
        <div className="hero-meta-top">
          <span className="hero-spec">FILE 00 / OPENING OVERVIEW</span>
        </div>

        <div className="hero-content">
          <p className="hero-kicker">WEB PUBLISHER PORTFOLIO</p>
          <h1 className="hero-title font-title">
            <span>I MAKE DESIGN</span>
            <br />
            <span className="hero-title-accent">WORK ON SCREEN.</span>
          </h1>

          <div className="hero-bottom-grid">
            <div className="hero-identity">
              <span className="hero-name">YEON JOO</span>
              <span className="hero-subrole">UI/UX DESIGN · WEB PUBLISHING</span>
            </div>

            <div className="hero-statement">
              <p>
                디자인의 감성과 코드의 정교함 사이에서 균형을 맞춥니다.<br />
                사용자의 시선을 사로잡는 모션과 정보를 명확하게 전달하는 에디토리얼 구조로
                완성도 높은 웹 경험을 만들어갑니다.
              </p>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" aria-hidden="true">
          <span className="scroll-text">SCROLL TO EXPLORE</span>
          <span className="scroll-line"></span>
        </div>
      </div>
    </section>
  )
}