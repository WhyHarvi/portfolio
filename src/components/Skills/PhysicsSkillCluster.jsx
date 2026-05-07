import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
} from '@react-three/rapier'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const CENTER_BALL = {
  label: 'WORK',
  radius: 0.84,
}

const skillBalls = [
  { label: 'React', radius: 0.48, home: [-1.45, 0.42, 0.34] },
  { label: 'Node', radius: 0.46, home: [1.42, 0.45, -0.28] },
  { label: 'Mobile', radius: 0.5, home: [-1.05, -0.62, -0.2] },
  { label: 'GSAP', radius: 0.45, home: [1.04, -0.68, 0.3] },
  { label: 'AI', radius: 0.43, home: [0.18, 1.05, 0.16] },
  { label: 'API', radius: 0.43, home: [-0.2, -1.05, -0.34] },
  { label: 'UI', radius: 0.43, home: [-2.1, -0.04, 0.08] },
  { label: 'Projects', radius: 0.56, home: [2.08, -0.03, -0.04] },
]

const bounds = {
  x: 3,
  y: 1.55,
  z: 1.15,
}

function makeLabelTexture(label, isCenter = false) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = 768
  canvas.height = 384

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#050505'
  context.font = `${isCenter ? 900 : 850} ${
    isCenter ? 106 : label.length > 7 ? 58 : 68
  }px Arial, sans-serif`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(label.toUpperCase(), canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  return texture
}

function GlossyBall({ radius, label, isCenter = false }) {
  const labelRef = useRef(null)
  const { camera } = useThree()
  const labelTexture = useMemo(() => makeLabelTexture(label, isCenter), [
    isCenter,
    label,
  ])

  useFrame(() => {
    if (labelRef.current) {
      labelRef.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 40]} />
        <meshPhysicalMaterial
          color="#f8f4eb"
          roughness={0.18}
          metalness={0.05}
          clearcoat={0.85}
          clearcoatRoughness={0.18}
          reflectivity={0.62}
        />
      </mesh>
      <mesh position={[-radius * 0.26, radius * 0.28, radius * 0.84]}>
        <sphereGeometry args={[radius * 0.28, 24, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.32} />
      </mesh>
      <mesh ref={labelRef} position={[0, 0, radius + 0.026]}>
        <planeGeometry args={[radius * 1.72, radius * 0.62]} />
        <meshBasicMaterial
          map={labelTexture}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function CenterCore() {
  const groupRef = useRef(null)

  useEffect(() => {
    if (!groupRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.85,
          ease: 'elastic.out(1, 0.62)',
        },
      )
    }, groupRef)

    return () => ctx.revert()
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    const pulse = 1 + Math.sin(clock.elapsedTime * 1.9) * 0.035
    groupRef.current.scale.setScalar(pulse)
  })

  return (
    <RigidBody type="fixed" colliders={false} position={[0, 0, 0]}>
      <BallCollider args={[CENTER_BALL.radius]} />
      <group ref={groupRef}>
        <mesh scale={[1.25, 1.25, 1.25]}>
          <sphereGeometry args={[CENTER_BALL.radius * 1.02, 48, 32]} />
          <meshBasicMaterial color="#f7efe3" transparent opacity={0.08} />
        </mesh>
        <GlossyBall radius={CENTER_BALL.radius} label={CENTER_BALL.label} isCenter />
      </group>
    </RigidBody>
  )
}

function SkillSphere({ bodyRef, ball, index }) {
  const groupRef = useRef(null)
  const startPosition = useMemo(
    () => [
      ball.home[0] * 1.45,
      ball.home[1] + (index % 2 === 0 ? 1.1 : -1.1),
      ball.home[2],
    ],
    [ball.home, index],
  )

  useEffect(() => {
    if (!groupRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        {
          x: 1,
          y: 1,
          z: 1,
          delay: 0.3 + index * 0.07,
          duration: 0.7,
          ease: 'back.out(2.2)',
        },
      )
    }, groupRef)

    return () => ctx.revert()
  }, [index])

  return (
    <RigidBody
      ref={bodyRef}
      position={startPosition}
      colliders={false}
      canSleep={false}
      linearDamping={4.8}
      angularDamping={7.5}
      restitution={0.28}
      friction={0.92}
      enabledRotations={[false, false, false]}
    >
      <BallCollider args={[ball.radius]} />
      <group ref={groupRef}>
        <GlossyBall radius={ball.radius} label={ball.label} />
      </group>
    </RigidBody>
  )
}

function MagneticConnections({ bodies }) {
  const lineRefs = useRef([])
  const points = useMemo(() => [new THREE.Vector3(), new THREE.Vector3()], [])

  useFrame(() => {
    bodies.forEach((bodyRef, index) => {
      const body = bodyRef.current
      const line = lineRefs.current[index]

      if (!body || !line) {
        return
      }

      const position = body.translation()
      const distance = Math.hypot(position.x, position.y, position.z)
      const alpha = THREE.MathUtils.clamp(0.48 - distance * 0.09, 0.15, 0.4)

      points[0].set(0, 0, 0)
      points[1].set(position.x, position.y, position.z)
      line.geometry.setFromPoints(points)
      line.material.opacity = alpha
    })
  })

  return (
    <group>
      {skillBalls.map((ball, index) => (
        <line
          key={ball.label}
          ref={(element) => {
            lineRefs.current[index] = element
          }}
        >
          <bufferGeometry />
          <lineBasicMaterial
            color="#d9efef"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  )
}

function InvisibleBounds() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[bounds.x, 0.08, bounds.z]} position={[0, bounds.y, 0]} />
      <CuboidCollider args={[bounds.x, 0.08, bounds.z]} position={[0, -bounds.y, 0]} />
      <CuboidCollider args={[0.08, bounds.y, bounds.z]} position={[-bounds.x, 0, 0]} />
      <CuboidCollider args={[0.08, bounds.y, bounds.z]} position={[bounds.x, 0, 0]} />
      <CuboidCollider args={[bounds.x, bounds.y, 0.08]} position={[0, 0, -bounds.z]} />
      <CuboidCollider args={[bounds.x, bounds.y, 0.08]} position={[0, 0, bounds.z]} />
    </RigidBody>
  )
}

function SceneFallback() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 2.4, 4]} intensity={1.2} />
      <mesh>
        <sphereGeometry args={[0.84, 48, 32]} />
        <meshPhysicalMaterial color="#f8f4eb" roughness={0.2} clearcoat={0.8} />
      </mesh>
    </>
  )
}

function SkillMoleculeScene() {
  const bodies = useMemo(() => skillBalls.map(() => ({ current: null })), [])
  const pointer = useRef(new THREE.Vector3(8, 8, 8))
  const pointerActive = useRef(false)
  const clockRef = useRef(0)

  useFrame((state, delta) => {
    clockRef.current += delta
    const time = clockRef.current
    const pointerInView =
      Math.abs(state.pointer.x) <= 1 && Math.abs(state.pointer.y) <= 1

    pointerActive.current = pointerInView
    pointer.current.set(
      state.pointer.x * (state.viewport.width / 2),
      state.pointer.y * (state.viewport.height / 2),
      0,
    )

    bodies.forEach((bodyRef, index) => {
      const body = bodyRef.current

      if (!body) {
        return
      }

      const current = body.translation()
      const currentVector = new THREE.Vector3(current.x, current.y, current.z)
      const home = skillBalls[index].home
      const orbit = new THREE.Vector3(
        Math.cos(time * (0.72 + index * 0.035) + index * 0.9) * 0.18,
        Math.sin(time * (0.66 + index * 0.04) + index * 1.2) * 0.13,
        Math.sin(time * 0.58 + index) * 0.08,
      )
      const homeVector = new THREE.Vector3(home[0], home[1], home[2]).add(orbit)
      const toHome = homeVector.sub(currentVector)
      const toCenter = currentVector.clone().multiplyScalar(-1)
      const centerDistance = Math.max(toCenter.length(), 0.001)
      const pullBoost = THREE.MathUtils.clamp(centerDistance - 1.02, 0, 1.8)
      const magneticPull = toCenter
        .normalize()
        .multiplyScalar((0.018 + pullBoost * 0.018) * delta * 60)
      const springHome = toHome.multiplyScalar(0.014 * delta * 60)

      body.applyImpulse(
        {
          x: magneticPull.x + springHome.x,
          y: magneticPull.y + springHome.y,
          z: magneticPull.z + springHome.z,
        },
        true,
      )

      const tangent = new THREE.Vector3(-currentVector.y, currentVector.x, 0)
      if (tangent.lengthSq() > 0.001) {
        tangent.normalize().multiplyScalar(0.0035 * delta * 60)
        body.applyImpulse({ x: tangent.x, y: tangent.y, z: tangent.z }, true)
      }

      if (pointerActive.current) {
        const pointerDistance = pointer.current.distanceTo(currentVector)

        if (pointerDistance < 1.45) {
          const falloff = 1 - pointerDistance / 1.45
          const away = currentVector
            .clone()
            .sub(pointer.current)
            .normalize()
            .multiplyScalar(falloff * falloff * 0.105 * delta * 60)

          body.applyImpulse({ x: away.x, y: away.y, z: away.z }, true)
        }
      }

      const positionClamp = {
        x: THREE.MathUtils.clamp(current.x, -bounds.x + 0.32, bounds.x - 0.32),
        y: THREE.MathUtils.clamp(current.y, -bounds.y + 0.24, bounds.y - 0.24),
        z: THREE.MathUtils.clamp(current.z, -bounds.z + 0.2, bounds.z - 0.2),
      }

      if (
        positionClamp.x !== current.x ||
        positionClamp.y !== current.y ||
        positionClamp.z !== current.z
      ) {
        body.setTranslation(positionClamp, true)
      }

      const velocity = body.linvel()
      const speed = Math.hypot(velocity.x, velocity.y, velocity.z)

      if (speed > 2.15) {
        const scale = 2.15 / speed
        body.setLinvel(
          {
            x: velocity.x * scale,
            y: velocity.y * scale,
            z: velocity.z * scale,
          },
          true,
        )
      }
    })
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <ambientLight intensity={0.72} />
      <directionalLight
        position={[2.5, 3, 5]}
        intensity={1.65}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-2.4, -1.6, 3.2]} intensity={0.72} color="#d9efef" />
      <pointLight position={[1.8, 1.2, 2.8]} intensity={0.48} color="#fff2d6" />

      <Physics gravity={[0, 0, 0]} interpolation timeStep="vary">
        <InvisibleBounds />
        <MagneticConnections bodies={bodies} />
        <CenterCore />

        {skillBalls.map((ball, index) => (
          <SkillSphere
            key={ball.label}
            bodyRef={bodies[index]}
            ball={ball}
            index={index}
          />
        ))}
      </Physics>

      <ContactShadows
        position={[0, -1.42, 0]}
        opacity={0.24}
        scale={7}
        blur={1.6}
        far={3.2}
      />
    </>
  )
}

function PhysicsSkillCluster() {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 22,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 86%',
          once: true,
        },
      })
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
      className="relative z-[50] h-[30vh] min-h-[230px] overflow-hidden bg-[#050505] text-[#f5f0e8] sm:min-h-[250px]"
      onPointerMove={moveGlow}
      onPointerLeave={hideGlow}
      onPointerCancel={hideGlow}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[55] h-16 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[55] h-16 bg-gradient-to-t from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[55] bg-[radial-gradient(ellipse_at_50%_50%,rgba(217,239,239,0.16),transparent_30%),linear-gradient(90deg,rgba(227,59,40,0.1),transparent_24%,transparent_76%,rgba(217,239,239,0.1))]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[56] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f0e8]/18 blur-3xl sm:h-44 sm:w-44" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[65] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9efef]/16 opacity-0 blur-2xl transition-opacity duration-300"
      />

      <div className="pointer-events-none relative z-[70] mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-14">
        <div className="max-w-[11rem]">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.32em] text-[#f5f0e8]/46 sm:text-[0.62rem]">
            Play with my stack
          </p>
        </div>
        <p className="hidden max-w-[12rem] text-right text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#f5f0e8]/38 sm:block">
          Move your cursor through the cluster
        </p>
      </div>

      <div className="absolute inset-0 z-[60]">
        <Canvas
          shadows
          dpr={[1, 1.7]}
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="h-full w-full cursor-crosshair"
        >
          <Suspense fallback={<SceneFallback />}>
            <SkillMoleculeScene />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default PhysicsSkillCluster
