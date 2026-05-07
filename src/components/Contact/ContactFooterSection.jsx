import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = [
  { label: 'EMAIL', href: 'mailto:info.harwinder14@gmai.com' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/livelikesidhu/' },
  { label: 'GITHUB', href: 'https://github.com/WhyHarvi' },
  { label: 'RESUME', href: '/CV_Harwinder_Singh.pdf' },
]

function ContactFooterSection() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const lineRefs = useRef([])
  const footerLinkRefs = useRef([])
  const dividerRef = useRef(null)
  const glowRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { y: 24, opacity: 0 })
      gsap.set(lineRefs.current, {
        yPercent: 116,
        clipPath: 'inset(100% 0% 0% 0%)',
      })
      gsap.set(footerLinkRefs.current, { y: 18, opacity: 0 })
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' })

      gsap
        .timeline({
          defaults: { ease: 'power4.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        })
        .to(labelRef.current, { y: 0, opacity: 1, duration: 0.8 })
        .to(
          lineRefs.current,
          {
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            stagger: 0.12,
          },
          '-=0.35',
        )
        .set(lineRefs.current, { clipPath: 'none' })
        .to(
          dividerRef.current,
          { scaleX: 1, duration: 0.9, ease: 'power3.inOut' },
          '-=0.35',
        )
        .to(
          footerLinkRefs.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
          },
          '-=0.35',
        )
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
    glowRef.current.style.opacity = '1'
  }

  const hideGlow = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      onPointerMove={moveGlow}
      onPointerLeave={hideGlow}
      onPointerCancel={hideGlow}
      className="relative isolate min-h-[90svh] overflow-visible bg-[#050505] px-5 py-10 text-[#f5f0e8] sm:px-8 sm:py-12 lg:px-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_22%_22%,rgba(227,59,40,0.09),transparent_32%),radial-gradient(ellipse_at_82%_62%,rgba(217,239,239,0.075),transparent_38%),linear-gradient(180deg,transparent,rgba(255,255,255,0.018)_46%,transparent)]" />
      <div className="work-noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[2] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e33b28]/10 opacity-0 blur-3xl transition-opacity duration-300"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(90svh-5rem)] max-w-7xl flex-col justify-between sm:min-h-[calc(90svh-6rem)]">
        <div className="pt-[10svh] sm:pt-[12svh]">
          <p
            ref={labelRef}
            className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.34em] text-[#f5f0e8]/48 sm:mb-8"
          >
            GET IN TOUCH
          </p>

          <a
            href="mailto:info.harwinder14@gmai.com"
            className="group relative inline-block font-[PlainMedium] text-[clamp(3.15rem,10.5vw,10.75rem)] font-medium uppercase leading-[0.82] tracking-[-0.075em] text-[#f5f0e8] drop-shadow-[0_24px_90px_rgba(0,0,0,0.42)]"
            aria-label="Send an email to Harwinder"
          >
            <span className="pointer-events-none absolute left-[8%] top-[7%] h-3 w-3 rounded-full bg-[#e33b28] shadow-[0_0_28px_rgba(227,59,40,0.88)] sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            <span className="block overflow-visible pb-[0.12em] pr-[0.18em]">
              <span
                ref={(element) => {
                  lineRefs.current[0] = element
                }}
                className="block pb-[0.1em] pr-[0.2em]"
              >
                Say hi!
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                ref={(element) => {
                  lineRefs.current[1] = element
                }}
                className="block pb-[0.14em] pr-[0.28em]"
              >
                <span className="relative inline-block">
                  <span>Let&apos;s talk</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0 overflow-hidden pr-[0.08em] text-[#e33b28] transition-[width] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[calc(100%+0.12em)]"
                  >
                    <span className="block whitespace-nowrap">Let&apos;s talk</span>
                  </span>
                </span>
                <span
                  className="ml-[0.08em] inline-block text-[#f5f0e8] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[0.08em] group-hover:translate-x-[0.08em] group-hover:rotate-12 group-hover:text-[#e33b28]"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block h-[0.62em] w-[0.62em] translate-y-[-0.02em]"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </span>
            </span>
          </a>
        </div>

        <footer className="pt-20">
          <div ref={dividerRef} className="mb-7 h-px w-full bg-white/12" />
          <div className="grid gap-8 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#f5f0e8]/50 sm:grid-cols-[1fr_auto] sm:items-end lg:grid-cols-[1fr_auto_1fr]">
            <div
              ref={(element) => {
                footerLinkRefs.current[0] = element
              }}
              className="space-y-2 normal-case tracking-normal text-[#f5f0e8]/64"
            >
              <a
                href="mailto:info.harwinder14@gmai.com"
                className="block transition-colors duration-300 hover:text-[#e33b28]"
              >
                info.harwinder14@gmai.com
              </a>
              <p>Canada</p>
            </div>

            <p
              ref={(element) => {
                footerLinkRefs.current[1] = element
              }}
              className="text-[#f5f0e8]/42 sm:order-3 lg:order-none lg:text-center"
            >
              © 2026 Harwinder Singh · Full-Stack Developer
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-3 sm:justify-end">
              {footerLinks.map((link, index) => (
                <a
                  key={link.label}
                  ref={(element) => {
                    footerLinkRefs.current[index + 2] = element
                  }}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="transition duration-300 hover:-translate-y-0.5 hover:text-[#e33b28]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default ContactFooterSection
