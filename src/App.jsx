import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import Navbar from './components/Navbar/Navbar'

const WorkSection = lazy(() => import('./components/Work/WorkSection'))
const AboutSection = lazy(() => import('./components/About/AboutSection'))
const ContactFooterSection = lazy(
  () => import('./components/Contact/ContactFooterSection'),
)

const badges = [
  '● AVAILABLE FOR WORK',
  'Ontario, Canada',
  'Best Capstone Project',
]

function SectionFallback({ className = '' }) {
  return <div aria-hidden="true" className={`bg-[#050505] ${className}`} />
}

function NotFoundPage() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#050505] px-5 py-8 text-[#f5f0e8] sm:px-8 lg:px-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_24%_20%,rgba(217,239,239,0.1),transparent_34%),radial-gradient(ellipse_at_78%_68%,rgba(227,59,40,0.14),transparent_38%)]" />
      <div className="work-noise-overlay pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="pointer-events-none absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.5)]" />
      <div className="pointer-events-none absolute right-[18%] top-[24%] h-1 w-1 rounded-full bg-white/50" />
      <div className="pointer-events-none absolute bottom-[24%] left-[22%] h-1 w-1 rounded-full bg-white/45" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-between">
        <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-[0.34em] text-[#f5f0e8]/42">
          <span>404</span>
          <span>Lost Signal</span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]">
          <div>
            <p className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.34em] text-[#e33b28]">
              Coordinates Unknown
            </p>
            <h1 className="font-[PlainMedium] text-[clamp(3.3rem,11vw,12rem)] font-medium uppercase leading-[0.76] tracking-[-0.078em] text-[#f5f0e8] drop-shadow-[0_24px_90px_rgba(0,0,0,0.48)]">
              Page Lost
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-semibold leading-8 text-[#ded6c7]/74 sm:text-2xl sm:leading-9">
              This page has drifted to another dimension.
            </p>
            <a
              href="/"
              className="mt-10 inline-flex rounded-full border border-white/14 bg-white/[0.06] px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[#f5f0e8] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#f5f0e8] hover:text-black"
            >
              Return Home
            </a>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
            <div className="absolute inset-8 rounded-full border border-white/10 bg-white/[0.025] shadow-[inset_0_0_80px_rgba(255,255,255,0.04)]" />
            <svg
              viewBox="0 0 420 420"
              role="img"
              aria-label="Astronaut floating lost in space"
              className="not-found-astronaut relative z-10 h-full w-full overflow-visible"
            >
              <path
                d="M85 292C128 252 154 236 204 228"
                fill="none"
                stroke="rgba(245,240,232,0.16)"
                strokeDasharray="9 12"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <circle cx="212" cy="170" r="58" fill="#f5f0e8" />
              <circle cx="212" cy="170" r="39" fill="#111" />
              <path
                d="M182 163c15-20 51-22 70-1"
                fill="none"
                stroke="#d9efef"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <rect
                x="158"
                y="222"
                width="108"
                height="100"
                rx="34"
                fill="#f5f0e8"
              />
              <rect x="184" y="244" width="56" height="32" rx="12" fill="#111" />
              <circle cx="198" cy="260" r="4" fill="#e33b28" />
              <circle cx="214" cy="260" r="4" fill="#d9efef" />
              <path
                d="M165 244c-34 8-50 28-48 59"
                fill="none"
                stroke="#f5f0e8"
                strokeLinecap="round"
                strokeWidth="25"
              />
              <path
                d="M258 244c35 9 52 30 51 62"
                fill="none"
                stroke="#f5f0e8"
                strokeLinecap="round"
                strokeWidth="25"
              />
              <path
                d="M178 313c-18 28-16 52 6 72"
                fill="none"
                stroke="#f5f0e8"
                strokeLinecap="round"
                strokeWidth="25"
              />
              <path
                d="M240 314c23 24 28 48 12 73"
                fill="none"
                stroke="#f5f0e8"
                strokeLinecap="round"
                strokeWidth="25"
              />
              <circle cx="112" cy="312" r="15" fill="#f5f0e8" />
              <circle cx="313" cy="316" r="15" fill="#f5f0e8" />
              <circle cx="181" cy="389" r="16" fill="#f5f0e8" />
              <circle cx="249" cy="391" r="16" fill="#f5f0e8" />
              <circle cx="312" cy="92" r="10" fill="#e33b28" />
              <circle cx="88" cy="116" r="5" fill="#d9efef" />
              <circle cx="340" cy="258" r="5" fill="#f5f0e8" opacity="0.68" />
            </svg>
          </div>
        </div>

        <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-[#f5f0e8]/34">
          Sidhu Harwinder · Portfolio
        </p>
      </div>
    </main>
  )
}

function PageLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const loaderRef = useRef(null)
  const initialsRef = useRef(null)
  const fullNameRef = useRef(null)
  const progressWrapRef = useRef(null)
  const barRef = useRef(null)
  const percentRef = useRef(null)
  const progressRef = useRef({ value: 0 })
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(fullNameRef.current, { opacity: 0, y: 18, filter: 'blur(10px)' })
      gsap.set(progressWrapRef.current, { opacity: 0, y: 10 })
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo(
          initialsRef.current,
          { scale: 0.82, letterSpacing: '0.08em', opacity: 0 },
          { scale: 1, letterSpacing: '0.28em', opacity: 1, duration: 0.55 },
        )
        .to(
          initialsRef.current,
          {
            scale: 1.08,
            letterSpacing: '0.62em',
            opacity: 0,
            filter: 'blur(10px)',
            duration: 0.58,
          },
          '+=0.08',
        )
        .to(
          fullNameRef.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.72 },
          '-=0.35',
        )
        .to(
          progressWrapRef.current,
          { opacity: 1, y: 0, duration: 0.42 },
          '-=0.4',
        )

      gsap.to(progressRef.current, {
        value: 100,
        duration: 1.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = `${String(
              Math.round(progressRef.current.value),
            ).padStart(3, '0')}%`
          }

          gsap.set(barRef.current, {
            scaleX: progressRef.current.value / 100,
          })
        },
        onComplete: () => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true
            onComplete()
          }

          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.55,
            ease: 'power3.out',
            onComplete: () => setIsVisible(false),
          })
        },
      })
    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] bg-[#050505] text-[#f5f0e8]"
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_72%,rgba(227,59,40,0.12),transparent_38%)]" />
      <div className="absolute left-1/2 top-1/2 z-10 w-[min(82vw,46rem)] -translate-x-1/2 -translate-y-1/2 text-center">
        <p
          ref={initialsRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-[PlainMedium] text-[clamp(4rem,15vw,12rem)] font-medium uppercase leading-none tracking-[0.28em] text-[#f5f0e8]"
        >
          S H
        </p>
        <p
          ref={fullNameRef}
          className="font-[PlainMedium] text-[clamp(2.75rem,9vw,7.5rem)] font-medium uppercase leading-[0.8] tracking-[-0.07em] text-[#f5f0e8] opacity-0 blur-[10px] drop-shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
        >
          <span className="block">Sidhu</span>
          <span className="block">Harwinder</span>
        </p>
        <div ref={progressWrapRef} className="opacity-0">
          <div className="mx-auto mt-8 h-px w-full max-w-sm overflow-hidden bg-[#f5f0e8]/16">
            <span ref={barRef} className="block h-full w-full bg-[#e33b28]" />
          </div>
          <p
            ref={percentRef}
            className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.34em] text-[#f5f0e8]/48"
          >
            000%
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isLoaderDone, setIsLoaderDone] = useState(false)
  const isNotFound =
    typeof window !== 'undefined' &&
    !['/', '/index.html'].includes(window.location.pathname)
  const heroRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const lineRefs = useRef([])
  const introRef = useRef(null)
  const badgeRefs = useRef([])
  const scrollRef = useRef(null)
  const scrollLineRef = useRef(null)
  const handleLoaderComplete = useCallback(() => {
    setIsLoaderDone(true)
  }, [])

  const setLineRef = (element, index) => {
    lineRefs.current[index] = element
  }

  const setBadgeRef = (element, index) => {
    badgeRefs.current[index] = element
  }

  useLayoutEffect(() => {
    if (!isLoaderDone || isNotFound) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, {
        y: 28,
        opacity: 0,
        filter: 'blur(10px)',
      })
      gsap.set(titleRef.current, {
        scale: 0.965,
        filter: 'blur(14px)',
      })
      gsap.set(lineRefs.current, {
        yPercent: 118,
        clipPath: 'inset(100% 0% 0% 0%)',
      })
      gsap.set(introRef.current, {
        x: -42,
        opacity: 0,
      })
      gsap.set(badgeRefs.current, {
        x: 36,
        opacity: 0,
      })
      gsap.set(scrollRef.current, {
        y: -28,
        opacity: 0,
      })

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(labelRef.current, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.15,
        })
        .to(
          titleRef.current,
          {
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.55,
          },
          '<0.1',
        )
        .to(
          lineRefs.current,
          {
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.35,
            stagger: 0.12,
          },
          '<0.1',
        )
        .to(
          introRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1.15,
          },
          '-=0.72',
        )
        .to(
          badgeRefs.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.09,
          },
          '-=0.85',
        )
        .to(
          scrollRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          '-=0.8',
        )

      gsap.fromTo(
        scrollLineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          duration: 1.45,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [isLoaderDone, isNotFound])

  if (isNotFound) {
    return <NotFoundPage />
  }

  return (
    <main className="bg-black text-[#f4f0e8]">
      <PageLoader onComplete={handleLoaderComplete} />
      <Navbar />

      <section
        ref={heroRef}
        id="home"
        className="relative isolate h-svh overflow-hidden bg-black px-5 py-7 sm:px-8 sm:py-9 lg:px-14 lg:py-12"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="pt-[13svh] sm:pt-[13svh] lg:pt-[14svh]">
            <p
              ref={labelRef}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-[#d76b42] sm:mb-7"
            >
              Developer
            </p>

            <h1
              ref={titleRef}
              className="font-[PlainMedium] text-[clamp(3.35rem,13.4vw,14rem)] font-medium uppercase leading-[0.75] tracking-[-0.078em] text-[#f5f0e8] drop-shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span ref={(element) => setLineRef(element, 0)} className="block">
                  Sidhu
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span ref={(element) => setLineRef(element, 1)} className="block">
                  Harwinder
                </span>
              </span>
            </h1>
          </div>

          <div className="relative z-10 mt-12 flex flex-col gap-10 pb-2 lg:mt-0 lg:flex-row lg:items-end lg:justify-between">
            <p
              ref={introRef}
              className="max-w-[34rem] text-base leading-7 text-[#ded6c7]/78 sm:text-lg sm:leading-8"
            >
              Recent graduate building modern web &amp; mobile applications
              through personal projects. Actively learning and looking for
              opportunities to start my career.
            </p>

            <div className="flex flex-col items-start gap-2 sm:items-end">
              {badges.map((badge, index) => (
                <span
                  key={badge}
                  ref={(element) => setBadgeRef(element, index)}
                  className={`w-fit rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-md ${
                    index === 0
                      ? 'border-[#5bbd58]/35 bg-[#2b6f2d]/8 text-[#78dc70]'
                      : 'border-[#f1e9d8]/14 bg-[#f6efe1]/8 text-[#f5efe4]/66'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="absolute right-5 top-28 hidden items-center gap-5 sm:flex lg:right-14 lg:top-36"
        >
          <div className="relative h-24 w-px overflow-hidden rounded-full bg-white/14">
            <span
              ref={scrollLineRef}
              className="absolute left-0 top-0 block h-full w-px rounded-full bg-[#e33b28] shadow-[0_0_18px_rgba(227,59,40,0.8)]"
            />
          </div>
          <span className="rotate-90 text-[10px] font-bold uppercase tracking-[0.42em] text-[#f2dfcb]/52">
            Scroll
          </span>
        </div>
      </section>

      {/* Archived: 3D magnetic stack transition lives in components/Skills/PhysicsSkillCluster.jsx */}
      <div
        aria-hidden="true"
        className="h-[16vh] min-h-24 bg-black"
      />

      <Suspense fallback={<SectionFallback className="min-h-svh" />}>
        <WorkSection />
      </Suspense>

      <Suspense fallback={<SectionFallback className="min-h-svh" />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionFallback className="min-h-[90svh]" />}>
        <ContactFooterSection />
      </Suspense>
    </main>
  )
}

export default App
