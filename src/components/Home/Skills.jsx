import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import htmlIcon from '../../assets/icons/skills/html.png'
import cssIcon from '../../assets/icons/skills/css.png'
import jsIcon from '../../assets/icons/skills/javascript.png'
import reactIcon from '../../assets/icons/skills/react.png'
import figmaIcon from '../../assets/icons/skills/figma.png'
import photoshopIcon from '../../assets/icons/skills/photoshop.png'
import illustratorIcon from '../../assets/icons/skills/illustrator.png'
import claudeIcon from '../../assets/icons/skills/claude.png'
import chatgptIcon from '../../assets/icons/skills/chatgpt.png'
import '../../styles/skills.css'

const skillCategories = [
  {
    category: 'MARKUP',
    label: 'SEMANTIC FOUNDATION',
    fig: 'FIG.01',
    icon: htmlIcon,
    items: [
      { name: 'HTML5', desc: '웹 표준 및 시맨틱 태그 구조 설계' },
      { name: 'Semantic Markup', desc: '의미론적 문서 구조화 및 검색 최적화' },
      { name: 'Web Standards & A11y', desc: '웹 접근성 지침 준수 및 대체 텍스트 구성' },
      { name: 'Cross Browsing', desc: '다양한 브라우저 환경 호환성 검증' },
    ]
  },
  {
    category: 'STYLE',
    label: 'LAYOUT & MOTION',
    fig: 'FIG.02',
    icon: cssIcon,
    items: [
      { name: 'CSS3', desc: '변수(CSS Variables) 기반 체계적인 스타일링' },
      { name: 'Flexbox & CSS Grid', desc: '복합 에디토리얼 레이아웃 구현 능력' },
      { name: 'Responsive Web', desc: '데스크톱 / 태블릿 / 모바일 최적화 브레이크포인트' },
      { name: 'CSS Animation & Transition', desc: '하드웨어 가속 기반 부드러운 인터랙션' },
    ]
  },
  {
    category: 'INTERACTION',
    label: 'LOGIC & DYNAMICS',
    fig: 'FIG.03',
    icon: jsIcon,
    items: [
      { name: 'JavaScript (ES6+)', desc: 'DOM 조작, 비동기 데이터 처리, 이벤트 핸들링' },
      { name: 'React', desc: '컴포넌트 단위 아키텍처 및 상태(State) 관리' },
      { name: 'React Router', desc: 'SPA 클라이언트 사이드 라우팅 및 동적 파라미터' },
      { name: 'Interactive UI', desc: '스크롤 리빌, 모달, 인터랙티브 맵 연동' },
    ]
  },
  {
    category: 'TOOLS & AI',
    label: 'DESIGN & WORKFLOW',
    fig: 'FIG.04',
    icon: figmaIcon,
    items: [
      { name: 'Figma', desc: '컴포넌트 시스템, 오토레이아웃 및 프로토타이핑' },
      { name: 'Photoshop & Illustrator', desc: '에셋 가공, 그래픽 리터칭 및 벡터 디자인' },
      { name: 'Git & GitHub', desc: '버전 관리, 브랜치 전략 및 배포 워크플로우' },
      { name: 'AI Assisted Coding', desc: 'AI 도구를 활용한 코드 작성 · 검토 및 작업 효율화' },
    ]
  }
]

export default function Skills() {
  const skillsRef = useRef(null)
  const skillsHeaderRef = useRef(null)
  const skillsIntroRef = useRef(null)
  const skillsGridRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const skillItems = skillsGridRef.current?.children

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 72%',
          once: true,
        },
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .from(skillsHeaderRef.current, {
          autoAlpha: 0,
          y: 16,
          duration: 0.45,
        })
        .from(
          skillsIntroRef.current,
          {
            autoAlpha: 0,
            y: 28,
            duration: 0.65,
          },
          '-=0.15',
        )
        .from(
          skillItems,
          {
            autoAlpha: 0,
            y: 32,
            duration: 0.55,
            stagger: 0.1,
          },
          '-=0.15',
        )
    }, skillsRef)

    return () => context.revert()
  }, [])

  return (
    <section ref={skillsRef} id="skills" className="skills-section" aria-label="Skills Section">
      <div ref={skillsHeaderRef} className="container archive-layout">
        {/* Editorial Section Header */}
        <div className="editorial-header archive-filebar">
          <span className="editorial-tag">FILE 02 / SKILLS</span>
        </div>

        {/* Section Intro: Typography & Whitespace */}
        <div className="skills-intro">
          <div ref={skillsIntroRef} className="skills-intro-left">
            <span className="skills-badge">ABILITY ARCHIVE</span>
            <h2 className="skills-title font-title">
              ABILITY
              <br />
              FILE
            </h2>
          </div>
          <div ref={skillsIntroRef} className="skills-description">
            <p>
              단순히 수치화된 퍼센티지 바를 지양하고, 각 영역별 실제 구현 역량과
              퍼블리셔로서 갖춘 기술적 역할을 명확하게 정의합니다.<br />
              디자인 시안을 정교한 웹 표준 코드로 전환하는 종합적인 실행력을 지향합니다.
            </p>
          </div>
        </div>

        {/* Unified Editorial Technical Matrix (No Card Boxes) */}
        <div ref={skillsGridRef} className="skills-matrix">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="skills-matrix-col">
              {/* Column Header */}
              <div className="matrix-col-header">
                <div className="matrix-meta-wrap">
                  <span className="matrix-fig-badge">{cat.fig}</span>
                  <span className="matrix-label">{cat.label}</span>
                </div>
                <div className="matrix-title-row">
                  <h3 className="matrix-category font-title">{cat.category}</h3>
                  <div className="matrix-icon-wrap" aria-hidden="true">
                    <img src={cat.icon} alt="" className="matrix-icon" />
                  </div>
                </div>
              </div>

              {/* Items List */}
              <ul className="matrix-items-list">
                {cat.items.map((item) => (
                  <li key={item.name} className="matrix-item">
                    <div className="matrix-item-head">
                      <span className="matrix-bullet" aria-hidden="true">/</span>
                      <strong className="matrix-item-name">{item.name}</strong>
                    </div>
                    <p className="matrix-item-desc">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Setting Book Annotation Footer for Skills */}
        <div className="skills-footer-annotation">
          <div className="annotation-col">
            <span className="annotation-tag">ANNOTATION</span>
            <span className="annotation-text">
              모든 스킬은 실제 제작된 10개의 프로젝트를 통해 구현 및 검증되었습니다.
            </span>
          </div>
          <div className="tools-mini-icons" aria-label="사용 도구 아이콘 모음">
            <img src={htmlIcon} alt="HTML" title="HTML5" />
            <img src={cssIcon} alt="CSS" title="CSS3" />
            <img src={jsIcon} alt="JS" title="JavaScript" />
            <img src={reactIcon} alt="React" title="React" />
            <img src={figmaIcon} alt="Figma" title="Figma" />
            <img src={photoshopIcon} alt="Photoshop" title="Photoshop" />
            <img src={illustratorIcon} alt="Illustrator" title="Illustrator" />
            <img src={claudeIcon} alt="Claude" title="Claude" />
            <img src={chatgptIcon} alt="ChatGPT" title="ChatGPT" />
          </div>
        </div>
      </div>
    </section>
  )
}