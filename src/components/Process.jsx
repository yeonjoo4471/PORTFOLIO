import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import workspaceImage from '../assets/images/process/process-workspace-sunset.png'

import '../styles/process.css'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    number: '01',
    label: 'DISCOVER',
    title: '살펴보고 정리하기',
    description: '필요한 정보를 살펴보고 화면의 흐름과 우선순위를 정리합니다.',
    tools: ['Research, Wireframe'],
  },
  {
    number: '02',
    label: 'DESIGN',
    title: '화면으로 표현하기',
    description: '색과 글꼴, 여백의 균형을 맞춰 프로젝트의 분위기를 완성합니다.',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
  },
  {
    number: '03',
    label: 'BUILD & REFINE',
    title: '만들고 다듬기',
    description: '반응형 화면과 움직임을 구현하고 직접 확인하며 세부를 다듬습니다.',
    tools: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
]

export default function Process() {
  const processRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
      const select = gsap.utils.selector(processRef)

      const timeline = gsap.timeline({
        defaults: {
          duration: 1,
          ease: 'power2.out',
        },
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      timeline
        .from(
          select('.process-meta'),
          {
            autoAlpha: 0,
            y: 12,
          },
          0,
        )
        .from(
          select('.process-heading'),
          {
            autoAlpha: 0,
            y: 24,
          },
          0.15,
        )
        .from(
          select('.process-message'),
          {
            autoAlpha: 0,
            y: 20,
          },
          0.35,
        )
        .from(
          select('.process-visual'),
          {
            autoAlpha: 0,
            y: 28,
            duration: 1.1,
          },
          0.5,
        )
        .from(
          select('.process-step'),
          {
            autoAlpha: 0,
            y: 24,
            stagger: 0.22,
          },
          0.8,
        )
        .from(
          select('.process-footer'),
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.7,
          },
          1.55,
        )
      },
      processRef,
    )

    return () => media.revert()
  }, [])
  
  return (
    <section
      ref={processRef}
      id='process'
      className='process'
      aria-labelledby='process-title'
    >
      <div className='process-inner'>
        <header className='process-meta'>
          <p>FILE 03 / PROCESS</p>
          <p>MY PERSONAL ARCHIVE</p>
        </header>

        <div className='process-layout'>
          <div className='process-intro'>
            <div className='process-heading'>
              <h2 id='process-title'>PROCESS</h2>

              <span className='process-signature'>
                Behind the scenes
              </span>
            </div>

            <p className='process-message'>
              좋아하는 것을,
              <br />
              화면으로 완성하는 과정.
            </p>

            <figure className='process-visual'>
              <div className='process-image-wrap'>
                <img 
                  src={workspaceImage} 
                  alt="푸른 바다가 보이는 창가에 스케치북과 노트북이 놓인 여름 작업실"
                  loading='lazy' 
                />
              </div>

              <figcaption>
                <span>NOTES, IDEAS & LITTLE DETAILS</span>
                <span>01 - 03</span>
              </figcaption>
            </figure>
          </div>

          <ol className='process-steps'>
            {processSteps.map((step) => (
              <li
                key={step.number}
                className='process-step'
              >
                <span
                  className='process-step-number'
                  aria-hidden='true'
                >
                  {step.number}
                </span>

                <div className='process-step-content'>
                  <p className='process-step-label'>
                    {step.label}
                  </p>

                  <h3>{step.title}</h3>

                  <p className='process-step-description'>
                    {step.description}
                  </p>

                  <ul
                    className='process-step-tools'
                    aria-label={`${step.title}에 사용하는 도구와 방법`}
                  >
                    {step.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <footer className='process-footer'>
          <p>FROM AN IDEA TO A SCREEN</p>
          <p>LEE YEON JOO / 2026</p>
        </footer>
      </div>
    </section>
  )
}