import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { navLinks, overlayTabs } from './navbarData'

function Navbar() {
  const [activeLink, setActiveLink] = useState('Home')
  const [activeTab, setActiveTab] = useState('Home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const menuButtonRef = useRef(null)
  const overlayRef = useRef(null)
  const overlayPanelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const menuLinkRefs = useRef([])
  const menuTimelineRef = useRef(null)
  const activeLinkRef = useRef('Home')
  const activeTabRef = useRef('Home')
  const isScrolledRef = useRef(false)
  const scrollTickingRef = useRef(false)

  const setMenuLinkRef = (element, index) => {
    menuLinkRefs.current[index] = element
  }

  const updateNavState = (nextLabel) => {
    if (activeLinkRef.current !== nextLabel) {
      activeLinkRef.current = nextLabel
      setActiveLink(nextLabel)
    }

    if (activeTabRef.current !== nextLabel) {
      activeTabRef.current = nextLabel
      setActiveTab(nextLabel)
    }
  }

  const handleNavClick = (link, event) => {
    event?.preventDefault()
    updateNavState(link.label)

    const section = document.querySelector(link.href)

    if (section) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const navOffset = window.innerWidth < 1024 ? 76 : 92
      const targetY = Math.max(
        0,
        section.getBoundingClientRect().top + window.scrollY - navOffset,
      )

      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
      window.history.pushState(null, '', link.href)
    }
  }

  const handleMenuLinkClick = (link, event) => {
    handleNavClick(link, event)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      scrollTickingRef.current = false

      const nextIsScrolled = window.scrollY > 64
      if (isScrolledRef.current !== nextIsScrolled) {
        isScrolledRef.current = nextIsScrolled
        setIsScrolled(nextIsScrolled)
      }

      const activeOffset = window.scrollY + window.innerHeight * 0.42
      const currentSection = [...navLinks].reverse().find((link) => {
        const section = document.querySelector(link.href)

        if (!section) {
          return false
        }

        const sectionTop = section.getBoundingClientRect().top + window.scrollY

        return sectionTop <= activeOffset
      })

      if (currentSection) {
        updateNavState(currentSection.label)
      }
    }

    const onScroll = () => {
      if (!scrollTickingRef.current) {
        scrollTickingRef.current = true
        requestAnimationFrame(handleScroll)
      }
    }

    handleScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.to(navRef.current, {
      paddingTop: isScrolled ? 8 : 18,
      paddingBottom: isScrolled ? 8 : 18,
      paddingLeft: isScrolled ? 18 : 0,
      paddingRight: isScrolled ? 18 : 0,
      borderRadius: isScrolled ? 999 : 0,
      borderColor: isScrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)',
      backgroundColor: isScrolled ? 'rgba(0,0,0,0.46)' : 'rgba(0,0,0,0)',
      boxShadow: isScrolled
        ? '0 22px 70px rgba(0,0,0,0.42)'
        : '0 0 0 rgba(0,0,0,0)',
      backdropFilter: isScrolled ? 'blur(18px)' : 'blur(0px)',
      duration: 0.42,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.to(logoRef.current, {
      scale: isScrolled ? 0.82 : 1,
      duration: 0.38,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.to([linksRef.current, menuButtonRef.current], {
      scale: isScrolled ? 0.92 : 1,
      duration: 0.38,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [isScrolled])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' })
      gsap.set(overlayPanelRef.current, { yPercent: -5, scale: 0.985, opacity: 0 })
      gsap.set(menuLinkRefs.current, { y: 58, opacity: 0 })
      gsap.set(closeButtonRef.current, { rotate: -28, opacity: 0 })

      menuTimelineRef.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .to(overlayRef.current, {
          autoAlpha: 1,
          pointerEvents: 'auto',
          duration: 0.34,
        })
        .to(
          overlayPanelRef.current,
          { yPercent: 0, scale: 1, opacity: 1, duration: 0.68 },
          '<0.04',
        )
        .to(
          closeButtonRef.current,
          { rotate: 0, opacity: 1, duration: 0.5 },
          '<0.1',
        )
        .to(
          menuLinkRefs.current,
          { y: 0, opacity: 1, duration: 0.68, stagger: 0.075 },
          '<0.08',
        )
    }, overlayRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    if (isMenuOpen) {
      menuTimelineRef.current?.play()
    } else {
      menuTimelineRef.current?.reverse()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-[padding] duration-500 ease-out ${
          isScrolled ? 'px-4 py-3 sm:px-6 lg:px-8' : 'px-4 py-4 sm:px-6 lg:px-8'
        }`}
      >
        <nav
          ref={navRef}
          className={`mx-auto flex items-center justify-between border border-transparent transition-[max-width,width] duration-500 ease-out ${
            isScrolled
              ? 'w-[calc(100%-1rem)] max-w-3xl rounded-full'
              : 'w-full max-w-none rounded-none'
          }`}
        >
          <a
            ref={logoRef}
            href="#home"
            onClick={(event) => handleNavClick(navLinks[0], event)}
            className={`origin-left font-[PlainMedium] font-medium tracking-[-0.08em] text-[#f5f0e8] drop-shadow-[0_0_18px_rgba(245,240,232,0.16)] transition-[font-size] duration-500 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}
            aria-label="Harwinder Sidhu home"
          >
            H.
          </a>

          <div
            ref={linksRef}
            className={`hidden origin-center items-center transition-[gap] duration-500 lg:flex ${
              isScrolled ? 'gap-5' : 'gap-8'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeLink === link.label

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => handleNavClick(link, event)}
                  className={`group relative px-1 py-2 font-semibold uppercase text-[#e9e2d6]/44 transition duration-300 hover:-translate-y-0.5 hover:text-[#f5f0e8] ${
                    isScrolled
                      ? 'text-[10px] tracking-[0.24em]'
                      : 'text-[11px] tracking-[0.3em]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#e33b28] shadow-[0_0_16px_rgba(227,59,40,0.95)] transition-all duration-300 ${
                      isActive
                        ? 'scale-100 opacity-100'
                        : 'scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-70'
                    }`}
                  />
                </a>
              )
            })}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className={`group grid place-items-center rounded-full border border-white/16 bg-white/[0.04] text-[#f5f0e8] shadow-[0_14px_48px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 hover:rotate-6 hover:border-[#d9efef]/70 hover:shadow-[0_0_34px_rgba(175,227,229,0.22)] lg:hidden ${
              isScrolled ? 'h-10 w-10' : 'h-12 w-12'
            }`}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <span className="relative h-4 w-5 transition duration-300 group-hover:rotate-90">
              <span className="absolute left-0 top-0 h-px w-5 bg-current transition duration-300 group-hover:top-1" />
              <span className="absolute left-1 top-2 h-px w-4 bg-current transition duration-300 group-hover:left-0 group-hover:w-5" />
              <span className="absolute bottom-0 left-0 h-px w-5 bg-current transition duration-300 group-hover:bottom-1" />
            </span>
          </button>
        </nav>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[95] overflow-hidden bg-[#02090b]/97 text-white lg:hidden"
        aria-hidden={!isMenuOpen}
      >
        <div
          ref={overlayPanelRef}
          className="relative flex min-h-svh flex-col px-5 pb-6 pt-5 sm:px-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex max-w-[calc(100%-4rem)] gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.06] p-1 sm:backdrop-blur">
              {overlayTabs.map((tab) => {
                const isActive = activeTab === tab.label

                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.label)
                      setActiveLink(tab.label)
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.26em] transition duration-300 ${
                      isActive
                        ? 'bg-[#e6eee7] text-[#062d33] shadow-[0_0_24px_rgba(212,239,235,0.24)]'
                        : 'text-white/48 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-white transition duration-300 hover:rotate-90 hover:border-[#d9efef]/70 hover:bg-white/12"
              aria-label="Close menu"
            >
              <span className="relative h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,rgba(141,220,224,0.18),transparent_64%)]" />
          <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-cyan-200/8 blur-3xl" />

          <div className="relative z-10 my-auto py-12">
            {navLinks.map((link, index) => {
              const isActive = activeLink === link.label

              return (
                <a
                  key={link.label}
                  ref={(element) => setMenuLinkRef(element, index)}
                  href={link.href}
                  onClick={(event) => handleMenuLinkClick(link, event)}
                  className={`block origin-left font-[PlainMedium] text-[clamp(3.4rem,15vw,8.75rem)] font-medium uppercase leading-[0.84] tracking-[-0.07em] text-white/20 transition duration-300 hover:translate-x-3 hover:text-[#dceff1] ${
                    isActive
                      ? 'text-[#e6eee7] drop-shadow-[0_0_24px_rgba(159,220,225,0.22)]'
                      : ''
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <div className="relative z-10 flex items-end justify-between text-[10px] font-bold uppercase tracking-[0.32em] text-white/45">
            <button
              type="button"
              className="transition duration-300 hover:text-[#e6eee7]"
            >
              English
            </button>
            <span>Motion</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
