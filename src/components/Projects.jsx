import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router'

import React from 'react'
import touslesjoursCover from '../assets/images/projects/touslesjours/project-cover.png'
import megaboxCover from '../assets/images/projects/megabox/project-cover.png'
import megaboxAppCover from '../assets/images/projects/magabox_app/project-cover.png'
import appleCover from '../assets/images/projects/apple/project-cover.png'
import duckspotCover from '../assets/images/projects/duckspot/project-cover.png'
import wishShopCover from '../assets/images/projects/wish-shop/project-cover.png'
import cineopsCover from '../assets/images/projects/cineops/project-cover.png'
import animeGoodsCover from '../assets/images/projects/anime-goods/project-cover.png'

import 'swiper/css'
import '../styles/projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'touslesjours',
    slug: 'touslesjours',
    title: 'TOUS les JOURS',
    description: '뚜레쥬르 웹 리디자인',
    image: touslesjoursCover,
  },
  {
    id: 'megabox',
    slug: 'megabox',
    title: 'MEGABOX',
    description: '메가박스 웹 클론 코딩',
    image: megaboxCover,
  },
  {
    id: 'megabox-app',
    slug: 'megabox-app',
    title: 'MEGABOX APP',
    description: '메가박스 앱 UI/UX 디자인',
    image: megaboxAppCover,
  },
  {
    id: 'apple',
    slug: 'apple',
    title: 'Apple',
    description: '애플 웹 클론 코딩',
    image: appleCover,
  },
  {
    id: 'duckspot',
    slug: 'duckspot',
    title: 'DuckSpot',
    description: '지역과 취향으로 탐색하는 굿즈샵 지도',
    image: duckspotCover,
  },
  {
    id: 'wish-shop',
    slug: 'wish-shop',
    title: 'WISH SHOP',
    description: '선택하며 이야기를 경험하는 소원가게',
    image: wishShopCover,
  },
  {
    id: 'cineops',
    slug: 'cineops',
    title: 'CINEOPS',
    description: '영화관 운영 현황을 한 눈에 보는 대시보드',
    image: cineopsCover,
  },
  {
    id: 'anime-goods',
    slug: 'anime-goods',
    title: 'ANIME GOODS',
    description: '작품별로 탐색하는 애니메이션 굿즈',
    image: animeGoodsCover,
  },
]

const Projects = () => {
  const projectsRef = useRef(null)
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const q = gsap.utils.selector(projectsRef)

        const tl = gsap.timeline({
          defaults: {
            duration: 1.1,
            ease: 'power2.out',
          },

          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 75%',
            once: true,
          },
        })

        tl.from(
          q('.projects-meta'),
          {
            opacity: 0,
            y: 12,
          },
          0,
        )

        tl.from(
          q('.projects-heading'),
          {
            opacity: 0,
            y: 24,
          },
          0.15,
        )

        tl.from(
          q('.projects-guide'),
          {
            opacity: 0,
            y: 12,
          },
          0.35,
        )

        tl.from(
          q('.projects-swiper'),
          {
            opacity: 0,
            y: 32,
          },
          0.5,
        )

        tl.from(
          q('.projects-navigation'),
          {
            opacity: 0,
            y: 12,
          },
          0.9,
        )
      },
      projectsRef,
    )

    return () => media.revert()
  }, [])

  const movePrevious = () => {
    swiperRef.current?.slidePrev()
  }

  const moveNext = () => {
    swiperRef.current?.slideNext()
  }

  return (
    <section
      ref={projectsRef}
      id='projects'
      className='projects'
      aria-labelledby='projects-title'
    >
      <header className='projects-header'>
        <div className='projects-meta'>
          <span>FILE 02 / PROJECTS</span>
          <span>SELECTED WORKS / 2026</span>
        </div>

        <div className='projects-heading'>
          <h2 id='projects-title'>PROJECT</h2>
          <span className='projects-signature'>Archive</span>
        </div>

        <div className='projects-guide'>
          <p>DRAG TO EXPLORE ↔</p>

          <p aria-live='polite' aria-atomic='true'>
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            {' / '}
            {String(projects.length).padStart(2, '0')}
          </p>
        </div>
      </header>

      <Swiper
        className='projects-swiper'
        slidesPerView='auto'
        centeredSlides
        spaceBetween={12}
        speed={700}
        grabCursor
        threshold={8}
        preventClicks
        preventClicksPropagation
        breakpoints={{
          601: {
            spaceBetween: 20,
          },
          1024: {
            spaceBetween: 28,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex)
        }}
      >
        {projects.map((project, index) => {
          const cardContent = (
            <article className='project-card'>
              <div className='project-card-image'>
                <span className='project-card-number'>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <img 
                  src={project.image} 
                  alt={`${project.title}`} 프로젝트 
                />
              </div>

              <div className='project-card-info'>
                <p>{project.description}</p>
                <h3>{project.title}</h3>
              </div>
            </article>
          )

          return (
            <SwiperSlide key={project.id}>
              {project.slug ? (
                <Link
                  to={`/projects/${project.slug}`}
                  className='project-card-link'
                  aria-label={`${project.title} 상세 페이지 보기`}
                >
                    {cardContent}
                </Link>
              ) : (
                <div className='project-card-link is-disabled'>
                  {cardContent}
                </div>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className='projects-navigation'>
        <button
          type='button'
          onClick={movePrevious}
          disabled={activeIndex === 0}
          aria-label='이전 프로젝트'
        >
          ←
        </button>

        <div className='projects-progress' aria-hidden='true'>
          <span
            style={{
              width: `${((activeIndex + 1) / projects.length) * 100}%`,
            }}
          />
        </div>

        <button
          type='button'
          onClick={moveNext}
          disabled={activeIndex === projects.length - 1}
          aria-label='다음 프로젝트'
        >
          →
        </button>
      </div>
    </section>
  )
}

export default Projects
