import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '../styles/about.css'
import aboutCharacter from '../assets/images/about/profile/about-character-cutout-expanded.png'

import photoshopIcon from '../assets/icons/skills/photoshop.png'
import illustratorIcon from '../assets/icons/skills/illustrator.png'
import figmaIcon from '../assets/icons/skills/figma.png'
import htmlIcon from '../assets/icons/skills/html.png'
import cssIcon from '../assets/icons/skills/css.png'
import javascriptIcon from '../assets/icons/skills/javascript.png'
import jqueryIcon from '../assets/icons/skills/jquery.png'
import reactIcon from '../assets/icons/skills/react.png'
import chatgptIcon from '../assets/icons/skills/chatgpt.png'
import claudeIcon from '../assets/icons/skills/claude.png'

import photographyImage from '../assets/images/about/interest/photography.jpg'
import musicImage from '../assets/images/about/interest/music.jpg'
import writingImage from '../assets/images/about/interest/writing.jpg'

gsap.registerPlugin(ScrollTrigger)

const tools = [
  { name: 'Photoshop', image: photoshopIcon },
  { name: 'Illustrator', image: illustratorIcon },
  { name: 'Figma', image: figmaIcon },
  { name: 'HTML', image: htmlIcon },
  { name: 'CSS', image: cssIcon },
  { name: 'JavaScript', image: javascriptIcon },
  { name: 'jQuery', image: jqueryIcon, className: 'tool-jquery' },
  { name: 'React', image: reactIcon },
  { name: 'ChatGPT', image: chatgptIcon },
  { name: 'Claude', image: claudeIcon },
]

const interests = [
  { name: '사진 찍기', image: photographyImage },
  { name: '음악 듣기', image: musicImage },
  { name: '글쓰기', image: writingImage },
]

const About = () => {
  const aboutRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const q = gsap.utils.selector(aboutRef)

        const tl = gsap.timeline({
          defaults: {
            duration: 1.1,
            ease: 'power2.out',
          },

          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            once: true,
          },
        })

        tl.from(
          q('.about-header'), 
          {
            opacity: 0,
            y: 12,
          }, 
          0,
        )

        tl.from(
          q('.about-left, .about-portrait, .about-right'),
          {
            opacity: 0,
            y: 24,
            stagger: 0.2,
          },
          0.2,
        )

        tl.from(
          q('.about-profile'),
          {
            opacity: 0,
            y: 16,
          },
          0.9,
        )
      },
      aboutRef
    )

    return () => media.revert()
  }, [])
  
  return (
    <section ref={aboutRef} id='about' className='about'>
      <header className='about-header'>
        <p>FILE 01 / ABOUT</p>
        <p>MY PERSONAL ARCHIVE</p>
      </header>

      <div className='about-layout'>
        {/* 왼쪽 정보 */}
        <div className='about-left'>
          <h2 className='about-title'>
            CHARACTER
            <br />
            FILE / 01
          </h2>

          <p className='about-message'>
            좋아하는 것을,
            <br />
            잘하는 것으로.
          </p>

          <div className='about-group'>
            <h3>NAME</h3>
            <p>LEE YEON JOO</p>
            <p>이연주</p>
          </div>

          <div className='about-group'>
            <h3>ROLE</h3>
            <p>UI/UX DESIGN</p>
            <p>WEB PUBLISHING</p>
          </div>
        </div>

        {/* 가운데 일러스트와 강점 */}
        <div className='about-center'>
          <div className='about-portrait'>
            <img 
              src={aboutCharacter} 
              alt="하늘을 바라보며 안경과 헤드셋을 착용한 캐릭터 일러스트" 
            />
          </div>

          <div className='about-profile'>
            <h3>MY STRENGTHS</h3>

            <p>
              막히더라도 끝까지 방법을 찾고,
              <br />
              밝고 긍정적인 태도로 도전하며,
              <br />
              새로운 것을 배우고 적용하는 일을 즐깁니다.
            </p>
          </div>
        </div>

        {/* 오른쪽 정보 */}
        <div className='about-right'>
          <div className='about-group'>
            <h3>TOOLS</h3>

            <ul className='about-tools'>
              {tools.map((tool) => (
                <li key={tool.name}>
                  <img src={tool.image} alt="" className={tool.className} />
                  <span>{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='about-group'>
            <h3>INTEREST</h3>
            
            <ul className='about-interests'>
              {interests.map((interest) => (
                <li key={interest.name}>
                  <img src={interest.image} alt="" />
                  <span>{interest.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='about-group'>
            <h3>WHAT MATTERS</h3>
            <p>가족, 그리고 건강한 몸과 마음.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
