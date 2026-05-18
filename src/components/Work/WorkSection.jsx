import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: '01',
    name: 'AgroSync',
    year: '2026',
    title: 'AI-powered platform for smart farming and real-time decision making.',
    tags: ['AI', 'Mobile App', 'AgriTech'],
    description:
      'A cross-platform application designed to help farmers manage crops, monitor conditions, and make data-driven decisions using AI-powered insights and real-time interactions.',
    stats: ['React Native', 'Node.js', 'AI Integration'],
    features: [
      'Voice assistant for farmer interaction',
      'Crop planning and recommendations',
      'Real-time data insights',
      'Marketplace and community features',
    ],
    challenges: [
      'Designing intuitive UI for non-technical users',
      'Integrating AI insights in a simple and actionable way',
      'Handling real-time data efficiently across modules',
    ],
    repo: 'https://gitlab.com/emerks/AgroSync',
    demo: '',
    palette: 'from-[#4CAF50] via-[#2f7d35] to-[#0d1f10]',
    accent: '#4CAF50',
  },
  {
    number: '02',
    name: 'Cyber Shop',
    year: '2025',
    title: 'Full-stack e-commerce platform with secure transactions and admin control.',
    tags: ['Web App', 'E-commerce', 'Full Stack'],
    description:
      'A responsive e-commerce application simulating a complete online shopping experience, from product browsing to checkout, with secure authentication and real-time order management.',
    stats: ['React', 'PHP', 'MySQL'],
    features: [
      'User authentication and session management',
      'Dynamic product listing and cart system',
      'Admin dashboard for product and order management',
      'Receipt generation and order tracking',
    ],
    challenges: [
      'Building a secure authentication and session system',
      'Managing real-time order updates and state consistency',
      'Designing a clean, responsive UI for multiple user roles',
    ],
    repo: 'https://github.com/WhyHarvi/CYber',
    demo: 'https://example.com/',
    palette: 'from-[#0f172a] via-[#1e293b] to-[#020617]',
    accent: '#38bdf8',
  },
  {
    number: '03',
    name: 'Coffee Shot',
    year: '2025',
    title: 'Social review platform with real-time interactions and role-based control.',
    tags: ['Web App', 'Social Platform', 'Full Stack'],
    description:
      'A modern review and feedback platform where users can share, search, and interact with coffee shop reviews. Built with a social-first approach, featuring real-time updates, role-based access, and an interactive UI inspired by modern platforms.',
    stats: ['ASP.NET MVC', 'JavaScript', 'SQL Server'],
    features: [
      'Review posting, likes, comments, and replies',
      'Role-based authentication (admin vs user)',
      'Real-time updates without page reload',
      'Search and filtering functionality',
      'Admin controls with edit/delete permissions',
    ],
    challenges: [
      'Designing a real-time interactive system without heavy frameworks',
      'Managing role-based UI and permissions cleanly',
      'Maintaining performance with dynamic content updates',
    ],
    repo: 'https://github.com/WhyHarvi/CoffeeShot',
    demo: '',
    palette: 'from-[#1f1f1f] via-[#2a2a2a] to-[#0f0f0f]',
    accent: '#f43f5e',
  },
  {
    number: '04',
    name: 'Banking App',
    year: '2025',
    title: 'Mobile banking app design focused on usability, clarity, and accessibility.',
    tags: ['UI/UX', 'Mobile Design', 'Prototype'],
    description:
      'A modern mobile banking app prototype designed to deliver a seamless and secure user experience, covering essential flows like transactions, account management, and payments with intuitive navigation.',
    stats: ['Figma', 'Adobe XD', 'Design Systems'],
    features: [
      'User flows for login, dashboard, and transactions',
      'Interactive prototypes and wireframes',
      'Consistent design system and component library',
      'Accessibility-focused UI and micro-interactions',
    ],
    challenges: [
      'Designing clear and intuitive financial flows',
      'Maintaining consistency across multiple screens',
      'Balancing security with ease of use',
    ],
    repo: 'https://github.com/WhyHarvi/Banking_App.Xd',
    demo: 'https://example.com/',
    palette: 'from-[#0a2540] via-[#1f3c88] to-[#020617]',
    accent: '#3b82f6',
  },
]

const floatingLabels = [
  { label: 'Projects', className: 'left-3 top-[24%] lg:left-8' },
  { label: 'Case Studies', className: 'right-3 top-[34%] lg:right-8' },
  { label: 'Selected Work', className: 'bottom-[14%] left-3 lg:left-10' },
]

function ProjectImage({ project, index, className = '' }) {
  return (
    <div
      className={`relative h-full min-h-[11rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-h-[16rem] lg:min-h-0 ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.palette} opacity-90`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.34),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.14),transparent_42%)]" />
      <div className="absolute inset-x-5 top-5 flex items-center gap-2 rounded-full border border-white/12 bg-black/22 px-4 py-3 sm:backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 rounded-[1.1rem] border border-white/12 bg-black/28 p-3 sm:bottom-5 sm:left-5 sm:right-5 sm:p-4 sm:backdrop-blur-lg">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 h-2 w-16 rounded-full bg-white/48" />
            <div className="h-7 w-28 rounded-lg bg-white/22" />
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/12 bg-white/12 text-sm font-bold text-white/80">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="h-10 rounded-xl bg-white/18 sm:h-14" />
          <span className="h-10 rounded-xl bg-white/10 sm:h-14" />
          <span className="h-10 rounded-xl bg-white/14 sm:h-14" />
        </div>
      </div>
      <div
        className="absolute right-7 top-24 h-24 w-24 rounded-full blur-2xl"
        style={{ backgroundColor: project.accent, opacity: 0.24 }}
      />
    </div>
  )
}

function ProjectModal({ project, index, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#050505]/28 px-4 py-4 text-[#f5f0e8] backdrop-blur-md sm:px-6 sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      onMouseDown={onClose}
    >
      <motion.div
        className="mx-auto flex h-[calc(100svh-2rem)] max-w-5xl flex-col overflow-hidden rounded-[1.4rem] border border-white/14 bg-[#0b0b0a]/78 shadow-[0_34px_140px_rgba(0,0,0,0.66)] backdrop-blur-2xl sm:h-[calc(100svh-4rem)]"
        initial={{ y: 34, scale: 0.975, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: 26, scale: 0.985, opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#080807]/86 px-4 py-3 backdrop-blur-2xl sm:px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="group relative h-3.5 w-3.5 rounded-full bg-[#ff5f57] shadow-[0_0_18px_rgba(255,95,87,0.45)]"
              aria-label="Close project details"
              onClick={onClose}
            >
              <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#4b0a08] opacity-0 transition-opacity duration-200 group-hover:opacity-80" />
              <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#4b0a08] opacity-0 transition-opacity duration-200 group-hover:opacity-80" />
            </button>
            <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[#f5f0e8]/48">
            {project.name} / {project.year}
          </span>
        </div>

        <div className="grid flex-1 gap-8 overflow-y-auto p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:p-10">
          <div>
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#f5f0e8]/46">
              Project {project.number}
            </p>
            <h3 className="max-w-4xl text-[clamp(2rem,5.8vw,4.8rem)] font-black leading-[0.92] tracking-[-0.055em]">
              {project.title}
            </h3>
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-wrap items-start gap-3 lg:justify-end">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/12 bg-[#f5f0e8] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                GitHub Repo
              </a>
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f5f0e8] transition duration-300 hover:-translate-y-0.5 hover:bg-white/12"
                >
                  Live Demo
                </a>
              ) : null}
            </div>
            <p className="text-base leading-7 text-[#ddd4c4]/74 sm:text-lg sm:leading-8 lg:text-right">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-2">
            <ProjectImage
              project={project}
              index={index}
              className="min-h-[20rem] sm:min-h-[28rem]"
            />
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f5f0e8]/46">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stats.map((stat) => (
                <span
                  key={stat}
                  className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f5f0e8]/70"
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f5f0e8]/46">
              Key Features
            </h4>
            <ul className="space-y-3 text-sm leading-6 text-[#ddd4c4]/74 sm:text-base">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f5f0e8]/46">
              Challenges Solved
            </h4>
            <ul className="space-y-3 text-sm leading-6 text-[#ddd4c4]/74 sm:text-base">
              {project.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

function WorkCard({
  project,
  index,
  activeCardIndex,
  setCardRef,
  setImageRef,
  onOpen,
}) {
  const isActive = activeCardIndex === index
  const lightRef = useRef(null)
  const buttonRef = useRef(null)

  const handlePointerMove = (event) => {
    if (!isActive || !lightRef.current) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    lightRef.current.style.setProperty('--cursor-x', `${event.clientX - rect.left}px`)
    lightRef.current.style.setProperty('--cursor-y', `${event.clientY - rect.top}px`)
    lightRef.current.style.opacity = '1'
  }

  const handlePointerLeave = () => {
    if (lightRef.current) {
      lightRef.current.style.opacity = '0'
    }

    if (buttonRef.current) {
      buttonRef.current.style.transform = ''
    }
  }

  const handleMagneticMove = (event) => {
    if (!isActive || !buttonRef.current) {
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.28
    const y = (event.clientY - rect.top - rect.height / 2) * 0.28
    buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(45deg)`
  }

  const handleMagneticLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = ''
    }
  }

  return (
    <article
      ref={(element) => setCardRef(element, index)}
      className={`work-card absolute inset-x-0 top-0 mx-auto h-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/[0.13] bg-[#10100f]/62 p-3 text-[#f5f0e8] shadow-[0_30px_110px_rgba(0,0,0,0.48)] sm:backdrop-blur-2xl sm:p-4 lg:p-5 ${
        isActive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ zIndex: index + 1 }}
      aria-hidden={!isActive}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-[1.35rem]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        whileHover={
          isActive
            ? {
                borderColor: 'rgba(245,240,232,0.22)',
                backgroundColor: 'rgba(255,255,255,0.018)',
              }
            : undefined
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          ref={lightRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(360px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(245,240,232,0.11), transparent 42%)',
          }}
        />

        <div className="relative z-20 grid h-full min-h-0 gap-3 sm:gap-4 lg:min-h-[29rem] lg:grid-cols-[minmax(0,7fr)_minmax(17rem,3fr)]">
          <div className="flex min-w-0 flex-col justify-between rounded-[1.25rem] p-1 sm:p-3 lg:p-4">
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#f5f0e8]/48 sm:mb-8 sm:text-[0.68rem] sm:tracking-[0.28em]">
                <span>{project.number}</span>
                <span>
                  {project.name} / {project.year}
                </span>
              </div>

              <h3 className="max-w-4xl text-[clamp(1.7rem,6.4vw,4.9rem)] font-black leading-[0.92] tracking-[-0.055em] text-[#f5f0e8]">
                {project.title}
              </h3>
            </div>

            <div className="mt-5 grid gap-4 sm:mt-7 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-end">
              <div>
                <div className="mb-4 flex flex-wrap gap-2 sm:mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#f5f0e8]/68"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="max-w-2xl text-sm leading-6 text-[#ddd4c4]/72 sm:text-lg sm:leading-8">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 xl:justify-end">
                {project.stats.map((stat) => (
                  <span
                    key={stat}
                    className="rounded-full bg-[#f5f0e8]/10 px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#f5f0e8]/58"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div ref={(element) => setImageRef(element, index)} className="work-card-image">
            <ProjectImage project={project} index={index} />
          </div>
        </div>

        <motion.button
          ref={buttonRef}
          type="button"
          className="pointer-events-auto absolute right-5 top-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/14 bg-[#f5f0e8]/10 text-[#f5f0e8] shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-[background-color,color,border-color] duration-300 hover:border-white/25 hover:bg-[#f5f0e8] hover:text-black sm:right-7 sm:top-7 sm:backdrop-blur-md"
          aria-label={`Open ${project.name} project`}
          onClick={() => onOpen(project, index)}
          onPointerMove={handleMagneticMove}
          onPointerLeave={handleMagneticLeave}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </motion.button>
      </motion.div>
    </article>
  )
}

function WorkSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stackRef = useRef(null)
  const cardRefs = useRef([])
  const imageRefs = useRef([])
  const activeCardRef = useRef(0)

  const setCardRef = (element, index) => {
    cardRefs.current[index] = element
  }

  const setImageRef = (element, index) => {
    imageRefs.current[index] = element
  }

  const setActiveIndex = (index) => {
    if (activeCardRef.current !== index) {
      activeCardRef.current = index
      setActiveCardIndex(index)
    }
  }

  const handleOpenProject = (project, index) => {
    setSelectedProject(project)
    setSelectedProjectIndex(index)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768
      const cards = cardRefs.current.filter(Boolean)
      const images = imageRefs.current.filter(Boolean)

      gsap.set(headingRef.current, {
        yPercent: 120,
        opacity: 0,
        ...(isMobile ? {} : { filter: 'blur(12px)' }),
      })
      gsap.to(headingRef.current, {
        yPercent: 0,
        opacity: 1,
        ...(isMobile ? {} : { filter: 'blur(0px)' }),
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })

      gsap.set(cards, {
        transformOrigin: 'center top',
        force3D: true,
        willChange: isMobile ? 'transform, opacity' : 'transform, opacity, filter',
      })
      gsap.set(cards.slice(1), {
        yPercent: 112,
        y: 0,
        scale: 0.96,
        opacity: 0,
        ...(isMobile ? {} : { filter: 'blur(12px)' }),
      })
      gsap.set(cards[0], {
        yPercent: 40,
        y: 0,
        scale: 1,
        opacity: 1,
        ...(isMobile ? {} : { filter: 'blur(0px)' }),
      })
      gsap.set(images, {
        y: 26,
        scale: 1.06,
        force3D: true,
        willChange: 'transform',
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'none', overwrite: 'auto' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${projects.length * 95}%`,
          pin: true,
          scrub: isMobile ? 0.45 : 0.8,
          anticipatePin: isMobile ? 0 : 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              projects.length - 1,
              Math.max(0, Math.round(self.progress * (projects.length - 1))),
            )
            setActiveIndex(nextIndex)
          },
        },
      })

      const introLiftDuration = 0.65

      timeline
        .to(cards[0], { yPercent: 0, duration: introLiftDuration }, 0)
        .to(images[0], { y: -20, scale: 1.1, duration: 0.8 }, 0)

      cards.slice(1).forEach((card, index) => {
        const previous = cards[index]
        const image = images[index + 1]
        const position = introLiftDuration + index + 0.12

        timeline
          .to(
            previous,
            {
              yPercent: -(index + 1) * 5,
              y: 0,
              scale: 0.92 - index * 0.025,
              opacity: 0.68,
              ...(isMobile ? {} : { filter: 'blur(1.5px)' }),
              duration: 0.88,
            },
            position,
          )
          .to(
            card,
            {
              yPercent: 0,
              y: index * -10,
              scale: 1,
              opacity: 1,
              ...(isMobile ? {} : { filter: 'blur(0px)' }),
              duration: 0.88,
            },
            position,
          )
          .to(
            image,
            {
              y: -24,
              scale: 1.1,
              duration: 0.88,
            },
            position,
          )
      })

      timeline.to({}, { duration: 0.3 })

      const refresh = () => ScrollTrigger.refresh()
      const imageElements = sectionRef.current?.querySelectorAll('img') ?? []
      imageElements.forEach((image) => {
        if (!image.complete) {
          image.addEventListener('load', refresh, { once: true })
        }
      })
      window.addEventListener('load', refresh, { once: true })
      requestAnimationFrame(refresh)

      return () => {
        imageElements.forEach((image) => image.removeEventListener('load', refresh))
        window.removeEventListener('load', refresh)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative isolate min-h-svh overflow-hidden bg-[#050505] px-5 pb-10 pt-16 text-[#f5f0e8] sm:px-8 sm:pb-16 sm:pt-24 lg:px-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,rgba(139,211,205,0.11),transparent_36%),radial-gradient(ellipse_at_20%_72%,rgba(242,102,65,0.085),transparent_40%),linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.012)_22%,rgba(255,255,255,0.028)_46%,rgba(255,255,255,0.012)_76%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_82%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-black via-[#050505]/98 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-black via-[#050505]/82 to-transparent" />
        <div className="work-grid-overlay pointer-events-none absolute inset-0 opacity-[0.085] [mask-image:linear-gradient(to_bottom,transparent_0%,black_24%,black_78%,transparent_100%)]" />
        <div className="work-noise-overlay pointer-events-none absolute inset-0 opacity-[0.045] [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_82%,transparent_100%)]" />

        {floatingLabels.map((item) => (
          <span
            key={item.label}
            className={`pointer-events-none absolute hidden text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#f5f0e8]/28 xl:block ${item.className}`}
          >
            {item.label}
          </span>
        ))}

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col sm:min-h-[calc(100svh-8rem)]">
          <div className="shrink-0">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#f5f0e8]/54">
                  Selected Projects
                </p>
                <h2 className="overflow-hidden font-[PlainMedium] text-[clamp(2.5rem,8vw,7.5rem)] font-medium uppercase leading-[0.76] tracking-[-0.078em] text-[#f5f0e8] drop-shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
                  <span ref={headingRef} className="block">
                    Work
                  </span>
                </h2>
              </div>
              <div className="hidden text-right sm:block">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#f5f0e8]/42">
                  {String(activeCardIndex + 1).padStart(2, '0')} /{' '}
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            </div>
            <div className="mt-7 h-px w-full bg-[#f5f0e8]/16" />
          </div>

          <div
            ref={stackRef}
            className="relative mt-7 h-[calc(100svh-5rem)] min-h-[31rem] flex-1 -translate-y-[15%] sm:mt-12 sm:h-auto sm:min-h-[39rem] lg:mt-14"
          >
            {projects.map((project, index) => (
              <WorkCard
                key={project.name}
                project={project}
                index={index}
                activeCardIndex={activeCardIndex}
                setCardRef={setCardRef}
                setImageRef={setImageRef}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal
            key={selectedProject.name}
            project={selectedProject}
            index={selectedProjectIndex}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default WorkSection
