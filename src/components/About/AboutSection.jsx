import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutParagraphs = [
  'Recent graduate and full-stack developer, building web and mobile applications since 2022. I’ve worked with React and Node.js to create real-world projects, including AgroSync — a cross-platform app integrating AI features.',
  'My approach is hands-on and problem-driven. I focus on turning ideas into functional products, with clean UI and smooth user experiences.',
  'I enjoy exploring new technologies and continuously improving my skills while building practical solutions. Currently seeking opportunities to grow as a developer and contribute to meaningful projects.',
  'I was ranked 1st in my capstone project and have also participated in Skills Ontario.',
]

const highlightPhrases = [
  'full-stack developer',
  'smooth user experiences',
  'real-world projects',
  'new technologies',
  'capstone project',
  'Skills Ontario',
  'problem-driven',
  'AI features',
  'AgroSync',
  'clean UI',
  'Node.js',
  'React',
]

function tokenizeParagraph(paragraph) {
  const segments = []
  let cursor = 0

  while (cursor < paragraph.length) {
    const nextMatch = highlightPhrases
      .map((phrase) => ({
        phrase,
        index: paragraph.indexOf(phrase, cursor),
      }))
      .filter((match) => match.index !== -1)
      .sort((a, b) => a.index - b.index || b.phrase.length - a.phrase.length)[0]

    if (!nextMatch) {
      segments.push({ text: paragraph.slice(cursor), highlight: false })
      break
    }

    if (nextMatch.index > cursor) {
      segments.push({
        text: paragraph.slice(cursor, nextMatch.index),
        highlight: false,
      })
    }

    segments.push({ text: nextMatch.phrase, highlight: true })
    cursor = nextMatch.index + nextMatch.phrase.length
  }

  return segments
}

const revealParagraphs = aboutParagraphs.reduce(
  (collection, paragraph) => {
    let letterCount = collection.letterCount
    let highlightCount = collection.highlightCount
    const segments = tokenizeParagraph(paragraph).map((segment) => {
      const preparedSegment = { ...segment }

      if (segment.highlight) {
        preparedSegment.highlightIndex = highlightCount
        highlightCount += 1
      } else {
        preparedSegment.characters = Array.from(segment.text)
        preparedSegment.startIndex = letterCount
        letterCount += preparedSegment.characters.length
      }

      return preparedSegment
    })

    return {
      letterCount,
      highlightCount,
      paragraphs: [
        ...collection.paragraphs,
        {
          paragraph,
          segments,
        },
      ],
    }
  },
  { letterCount: 0, highlightCount: 0, paragraphs: [] },
).paragraphs

const experienceItems = [
  ['AgroSync', 'Full-Stack Developer', '2025 – Present'],
  ['Capstone Project', 'Full-Stack Developer', '2025 – 2026'],
  ['Soudelka Inc.', 'Frontend Developer', '2025'],
]

const awardItems = [
  [
    'Capstone Project – 1st Place',
    'Conestoga College · Awarded for building AgroSync, a cross-platform AI-powered application',
    'APR 2026',
  ],
  [
    'Postgraduate Certificate – High Distinction',
    'Conestoga College · Graduated with High Distinction in Mobile Solutions Development',
    'APR 2026',
  ],
  [
    'Skills Ontario – Software Development',
    'Skills Ontario Competition · Participated in a competitive coding environment solving real-world problems',
    '2025',
  ],
]

const skills = [
  'Systems Thinking',
  'Design Systems',
  '0→1 Product Work',
  'Cross-functional',
  'Data-informed Design',
  'Prototyping',
  'A/B Testing',
  'Research & Synthesis',
  'Best Slack Memes',
  'Stakeholder Alignment',
  'Design × Engineering',
  'AI-assisted Workflows',
  'Product Strategy',
  'Good Vibes',
]

function HighlightWord({
  children,
  highlightIndex,
  setHighlightRef,
  setUnderlineRef,
}) {
  return (
    <span
      ref={(element) => {
        setHighlightRef(element, highlightIndex)
      }}
      className="highlight-word group relative inline-block max-w-full whitespace-normal align-baseline font-bold text-neutral-300/5 transition duration-300 hover:-translate-y-0.5 hover:text-[#ff5a45]"
    >
      {children}
      <svg
        ref={(element) => {
          setUnderlineRef(element, highlightIndex)
        }}
        aria-hidden="true"
        viewBox="0 0 120 16"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.22em] left-0 h-[0.28em] w-full overflow-visible text-[#ff3b3b] opacity-90 transition duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,59,59,0.42)]"
      >
        <path
          d="M2 7 C18 4 32 9 48 6 S82 5 118 7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        <path
          d="M3 12 C20 10 34 13 51 11 S85 10 117 12"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    </span>
  )
}

function RevealText({ letterRefs, setHighlightRef, setUnderlineRef, setTextRef }) {
  return (
    <div
      ref={setTextRef}
      className="max-w-full space-y-7 overflow-hidden text-[clamp(1.18rem,2.45vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-neutral-300/5 [overflow-wrap:break-word]"
    >
      {revealParagraphs.map(({ paragraph, segments }) => (
        <p key={paragraph}>
          {segments.map((segment, segmentIndex) =>
            segment.highlight ? (
              <HighlightWord
                key={`${segment.text}-${segmentIndex}`}
                highlightIndex={segment.highlightIndex}
                setHighlightRef={setHighlightRef}
                setUnderlineRef={setUnderlineRef}
              >
                {segment.text}
              </HighlightWord>
            ) : (
              <span key={`${paragraph}-${segmentIndex}`}>
                {segment.characters.map((letter, letterIndex) => (
                  <span
                    key={`${letter}-${letterIndex}`}
                    ref={(element) => {
                      letterRefs.current[segment.startIndex + letterIndex] = element
                    }}
                    className="inline text-neutral-300/5 will-change-[color,opacity]"
                  >
                    {letter === ' ' ? '\u00a0' : letter}
                  </span>
                ))}
              </span>
            ),
          )}
        </p>
      ))}
    </div>
  )
}

function CVButton() {
  const buttonRef = useRef(null)

  const moveButton = (event) => {
    const button = buttonRef.current

    if (!button) {
      return
    }

    const rect = button.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18

    button.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const resetButton = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
  }

  return (
    <a
      ref={buttonRef}
      href="/CV_Harwinder_Singh.pdf"
      target="_blank"
      rel="noreferrer"
      onMouseMove={moveButton}
      onMouseLeave={resetButton}
      className="group relative mt-12 inline-flex h-14 items-center gap-3 overflow-hidden rounded-full border border-white/16 bg-white/[0.035] px-7 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#f5f0e8] shadow-[0_18px_55px_rgba(0,0,0,0.26)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-white/70 hover:shadow-[0_18px_70px_rgba(245,240,232,0.14)]"
    >
      <span className="absolute inset-x-0 bottom-0 h-0 bg-[#f5f0e8] transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-full" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        VIEW CV
      </span>
      <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full border border-white/14 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-45 group-hover:border-black/20 group-hover:text-black">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
        >
          <path
            d="M4 12L12 4M6 4h6v6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
        </svg>
      </span>
    </a>
  )
}

function SectionKicker({ children }) {
  return (
    <h3 className="mb-5 text-[0.66rem] font-bold uppercase tracking-[0.34em] text-neutral-500">
      {children}
    </h3>
  )
}

function DetailList({ items, rowRefs, lineRefs, dateRefs, slower = false }) {
  return (
    <div className={slower ? 'space-y-0' : 'space-y-0'}>
      {items.map(([title, subtitle, date], index) => (
        <div
          key={`${title}-${date}`}
          ref={(element) => {
            rowRefs.current[index] = element
          }}
          className="group relative overflow-hidden rounded-sm px-3 py-4 opacity-0 blur-sm transition-colors duration-300 hover:bg-white/[0.045] sm:px-4"
        >
          <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white/10" ref={(element) => {
            lineRefs.current[index] = element
          }} />
          <div className="relative grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <p className="text-base font-semibold text-[#f5f0e8]/88 transition-colors duration-300 group-hover:text-white sm:text-lg">
                {title}
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-500">{subtitle}</p>
            </div>
            <p
              ref={(element) => {
                dateRefs.current[index] = element
              }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 opacity-0 transition-transform duration-300 group-hover:translate-x-1.5"
            >
              {date}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceList({ rowRefs, lineRefs, dateRefs }) {
  return (
    <div>
      <SectionKicker>Experience</SectionKicker>
      <DetailList items={experienceItems} rowRefs={rowRefs} lineRefs={lineRefs} dateRefs={dateRefs} />
    </div>
  )
}

function AwardsList({ rowRefs, lineRefs, dateRefs }) {
  return (
    <div>
      <SectionKicker>Achievements</SectionKicker>
      <DetailList items={awardItems} rowRefs={rowRefs} lineRefs={lineRefs} dateRefs={dateRefs} slower />
    </div>
  )
}

function SkillPills({ skillRefs }) {
  return (
    <div>
      <SectionKicker>Skills</SectionKicker>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, index) => (
          <span
            key={skill}
            ref={(element) => {
              skillRefs.current[index] = element
            }}
            className="scale-95 rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-[#f5f0e8]/72 opacity-0 shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 hover:border-[#d9efef]/45 hover:bg-[#d9efef]/10 hover:text-white hover:shadow-[0_0_28px_rgba(217,239,239,0.12)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function AboutExperienceSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const glowRef = useRef(null)
  const textRef = useRef(null)
  const letterRefs = useRef([])
  const highlightRefs = useRef([])
  const underlineRefs = useRef([])
  const experienceRowRefs = useRef([])
  const experienceLineRefs = useRef([])
  const experienceDateRefs = useRef([])
  const awardRowRefs = useRef([])
  const awardLineRefs = useRef([])
  const awardDateRefs = useRef([])
  const skillRefs = useRef([])

  const setHighlightRef = (element, index) => {
    highlightRefs.current[index] = element
  }

  const setUnderlineRef = (element, index) => {
    underlineRefs.current[index] = element
  }

  const setTextRef = (element) => {
    textRef.current = element
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { yPercent: 120, opacity: 0, filter: 'blur(12px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        },
      )

      gsap.set(letterRefs.current, { color: '#d4d4d4', opacity: 0.05 })
      gsap.to(letterRefs.current, {
        color: '#ffffff',
        opacity: 1,
        ease: 'none',
        stagger: 0.0025,
        scrollTrigger: {
          trigger: textRef.current,
          start: () => (window.innerWidth < 768 ? 'top 88%' : 'top 78%'),
          end: () => (window.innerWidth < 768 ? 'bottom 52%' : 'bottom 42%'),
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      })

      gsap.set(highlightRefs.current, {
        opacity: 0.05,
        y: 4,
        color: '#d4d4d4',
      })

      highlightRefs.current.forEach((highlight, index) => {
        const underline = underlineRefs.current[index]

        if (!highlight || !underline) {
          return
        }

        const paths = underline.querySelectorAll('path')

        paths.forEach((path) => {
          const length = path.getTotalLength()

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
        })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: highlight,
              start: () => (window.innerWidth < 768 ? 'top 88%' : 'top 82%'),
              end: () => (window.innerWidth < 768 ? 'top 70%' : 'top 62%'),
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          })
          .to(
            highlight,
            {
              opacity: 1,
              y: 0,
              color: '#ff3b3b',
              duration: 0.55,
              ease: 'power2.out',
            },
            0,
          )
          .to(
            paths[0],
            {
              strokeDashoffset: 0,
              duration: 0.72,
              ease: 'power2.out',
            },
            0.08,
          )
          .to(
            paths[1],
            {
              strokeDashoffset: 0,
              duration: 0.78,
              ease: 'power2.out',
            },
            0.22,
          )
          .fromTo(
            underline,
            { x: index % 2 === 0 ? -0.8 : 0.8, rotate: index % 2 === 0 ? -0.3 : 0.3 },
            {
              x: 0,
              rotate: 0,
              duration: 0.7,
              ease: 'sine.out',
            },
            0.08,
          )
      })

      const revealRows = (rows, lines, dates) => {
        rows.forEach((row, index) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                end: 'top 66%',
                scrub: 0.85,
              },
            })
            .to(
              row,
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'back.out(1.25)',
              },
              0,
            )
            .to(
              lines[index],
              {
                scaleX: 1,
                duration: 0.82,
                ease: 'power2.out',
              },
              0.08,
            )
            .to(
              dates[index],
              {
                x: 0,
                opacity: 1,
                duration: 0.72,
                ease: 'power2.out',
              },
              0.18,
            )
        })
      }

      gsap.set(
        [...experienceRowRefs.current, ...awardRowRefs.current],
        { y: 72, filter: 'blur(12px)' },
      )
      gsap.set(
        [...experienceDateRefs.current, ...awardDateRefs.current],
        { x: -8 },
      )

      revealRows(
        experienceRowRefs.current,
        experienceLineRefs.current,
        experienceDateRefs.current,
      )
      revealRows(
        awardRowRefs.current,
        awardLineRefs.current,
        awardDateRefs.current,
      )

      gsap.set(skillRefs.current, { y: 42, scale: 0.92, filter: 'blur(8px)' })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: skillRefs.current[0],
            start: 'top 90%',
            end: 'top 58%',
            scrub: 0.8,
          },
        })
        .to(skillRefs.current, {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'back.out(1.4)',
          stagger: 0.08,
        },
        0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const moveGlow = (event) => {
    if (!sectionRef.current || !glowRef.current) {
      return
    }

    const rect = sectionRef.current.getBoundingClientRect()
    glowRef.current.style.transform = `translate3d(${
      event.clientX - rect.left
    }px, ${event.clientY - rect.top}px, 0)`
    glowRef.current.style.opacity = '0.1'
  }

  const hideGlow = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      onPointerMove={moveGlow}
      onPointerLeave={hideGlow}
      onPointerCancel={hideGlow}
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-20 text-[#f5f0e8] sm:px-8 sm:py-28 lg:px-14 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_20%,rgba(217,239,239,0.09),transparent_34%),radial-gradient(ellipse_at_86%_34%,rgba(242,102,65,0.08),transparent_36%),radial-gradient(ellipse_at_54%_82%,rgba(139,211,205,0.08),transparent_44%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_88%,transparent_100%)]" />
      <div className="work-grid-overlay pointer-events-none absolute inset-0 opacity-[0.045] [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_84%,transparent_100%)]" />
      <div className="work-noise-overlay pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[2] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9efef]/10 opacity-0 blur-3xl transition-opacity duration-300"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 shrink-0 sm:mb-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#f5f0e8]/54">
                My Story
              </p>
              <h2 className="overflow-hidden font-[PlainMedium] text-[clamp(2.5rem,8vw,7.5rem)] font-medium uppercase leading-[0.76] tracking-[-0.078em] text-[#f5f0e8] drop-shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
                <span ref={headingRef} className="block">
                  About
                </span>
              </h2>
            </div>
          </div>
          <div className="mt-7 h-px w-full bg-[#f5f0e8]/16" />
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <div className="min-w-0 max-w-full lg:max-w-[calc(50vw-5rem)] xl:max-w-[36rem]">
            <RevealText
              letterRefs={letterRefs}
              setHighlightRef={setHighlightRef}
              setUnderlineRef={setUnderlineRef}
              setTextRef={setTextRef}
            />
            <CVButton />
          </div>

          <div className="space-y-14 lg:pt-2">
            <ExperienceList
              rowRefs={experienceRowRefs}
              lineRefs={experienceLineRefs}
              dateRefs={experienceDateRefs}
            />
            <AwardsList
              rowRefs={awardRowRefs}
              lineRefs={awardLineRefs}
              dateRefs={awardDateRefs}
            />
            <SkillPills skillRefs={skillRefs} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutExperienceSection
