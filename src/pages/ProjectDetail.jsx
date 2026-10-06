import { Link, useParams } from 'react-router'
import { projects } from '../data/projects.js'
import NotFound from './NotFound.jsx'

import '../styles/projectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()

  const projectIndex = projects.findIndex(
    item => item.slug === slug,
  )

  if (projectIndex === -1) {
    return <NotFound />
  }

  const project = projects[projectIndex]

  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <main
      className={[
        'project-detail',
        project.type ? `is-${project.type}` : '',
      ].filter(Boolean).join(' ')}
    >
      <header className='project-detail-header'>
        <Link
          to='/'
          state={{ scrollTo: 'projects' }}
          className='project-detail-back'
        >
          <span aria-hidden='true'>←</span>
          BACK TO PROJECTS
        </Link>

        <p>
          {project.category} / {project.year}
        </p>
      </header>

      <section className='project-detail-hero'>
        <div className='project-detail-title'>
          <p>PROJECT ARCHIVE</p>

          <h1>{project.title}</h1>

          <p>{project.subtitle}</p>
        </div>

        <div className='project-detail-actions'>
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {project.liveLabel ?? 'VIEW LIVE SITE'}

              <span aria-hidden='true'>↗</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              GITHUB
              <span aria-hidden='true'>↗</span>
            </a>
          )}
        </div>
      </section>

      {project.heroImage && (
        <figure className='project-detail-visual'>
          <img 
            src={project.heroImage} 
            alt={`${project.title} 프로젝트 대표 화면`}
            fetchPriority='high' 
          />
        </figure>
      )}

      <section className='project-detail-overview'>
        <div className='project-detail-summary'>
          <p>PROJECT OVERVIEW</p>

          <h2>{project.summary}</h2>
        </div>

        <dl className='project-detail-meta'>
          <div>
            <dt>ROLE</dt>
            <dd>{project.role}</dd>
          </div>

          <div>
            <dt>PERIOD</dt>
            <dd>{project.period}</dd>
          </div>

          <div>
            <dt>CONTRIBUTION</dt>
            <dd>{project.contribution}</dd>
          </div>

          <div>
            <dt>TOOLS</dt>
            <dd>{project.tools?.join(' · ')}</dd>
          </div>
        </dl>
      </section>

      <div className='project-detail-sections'>
        {project.sections?.map(section => (
          <section
            key={section.id}
            className={[
              'project-detail-section',
              `is-${section.id}`,

              section.layout ? `layout-${section.layout}` : '',
            ].filter(Boolean).join(' ')}
          >
            <header>
              <p>
                {section.number} / {section.label}
              </p>

              <h2>{section.title}</h2>

              {section.description && (
                <p>{section.description}</p>
              )}
            </header>

            {section.image && (
              <figure className='project-detail-section-image'>
                <img 
                  src={section.image} 
                  alt={
                    section.alt ??
                    `${project.title} ${section.title}`
                  }
                  loading='lazy' 
                />
              </figure>
            )}
            {section.images?.length > 0 && (
              <div className='project-detail-section-gallery'>
                {section.images.map((image) => (
                  <figure
                    key={image.label ?? image.src}
                    className='project-detail-gallery-item'
                  >
                    <img 
                      src={image.src} 
                      alt={
                        image.alt ??
                        `${project.title} ${section.title}`
                      }
                      loading='lazy' 
                    />

                    {image.label && (
                      <figcaption>
                        {image.label}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {project.liveUrl && (
        <section className='project-detail-visit'>
          <p>EXPERIENCE THE PROJECT</p>

          <a 
            href={project.liveUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {project.liveLabel ?? 'VISIT WEBSITE'}

            <span aria-hidden='true'>↗</span>
          </a>
        </section>
      )}

      {projects.length > 1 && (
        <footer className='project-detail-next'>
          <p>NEXT PROJECT</p>

          <Link
            to={`/projects/${nextProject.slug}`}
          >
            <span>{nextProject.title}</span>
            <span aria-hidden='true'>→</span>
          </Link>
        </footer>
      )}

      <button
        type="button"
        className="project-detail-top"
        onClick={() => {
          const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches

          window.scrollTo({
            top: 0,
            behavior: reduceMotion ? 'instant' : 'smooth',
          })
        }}
        aria-label="페이지 맨 위로 이동"
      >
        <span aria-hidden="true">↑</span>
        TOP
      </button>
    </main>
  )
}