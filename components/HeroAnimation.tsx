'use client'

import { Environment, Lightformer, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import gsap from 'gsap'
import { forwardRef, useCallback, useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

// --- Configuration ---

const config = {
    modelSrc: 'xero-2.glb',
    camera: {
        position: new THREE.Vector3(3.8974264860083605, 0.82, -2.3958733109675228),
        rotation: new THREE.Euler(0, 0, 0),
        fov: 14,
        near: 0.1,
        far: 10,
        target: new THREE.Vector3(-0.15, 2.25, 1.12),
        rotationMultipliers: { x: 1 / 30, y: 1 / 40 }
    },
    ambient: {
        minMaxIntensity: [0.01, 0.4]
    },
    neon: {
        target: 0.54
    }
}

const setCameraLookAtEuler = (position: THREE.Vector3, target: THREE.Vector3) => {
    const m = new THREE.Matrix4()
    m.lookAt(position, target, new THREE.Vector3(0, 1, 0))
    return new THREE.Euler().setFromRotationMatrix(m)
}

config.camera.rotation.copy(
    setCameraLookAtEuler(config.camera.position, config.camera.target)
)

// --- Particles (Inline) ---

const particlesVert = `
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uParticleVelocity;
uniform float uParticleDisplaceFactor;

attribute float aScale;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float noiseX = snoise(vec2(position.x, uTime * uParticleVelocity)) * uParticleDisplaceFactor;
    float noiseY = snoise(vec2(position.y, uTime * uParticleVelocity)) * uParticleDisplaceFactor;
    float noiseZ = snoise(vec2(position.z, uTime * uParticleVelocity)) * uParticleDisplaceFactor;

    modelPosition = vec4(
      modelPosition.x + noiseX,
      modelPosition.y + noiseY,
      modelPosition.z + noiseZ,
      modelPosition.w
    );

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
}
`

const particlesFrag = `
uniform vec3 uColor;
uniform float uAlpha;
void main()
{
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = min(0.05 / distanceToCenter - 0.1, uAlpha);
  gl_FragColor = vec4(uColor, strength);
}
`

const Particles = ({ size = 25, color = '#fff', alpha = 0.25, velocity = 0.1, displacementFactor = 0.5 }) => {
    const meshRef = useRef<THREE.Points>(null)
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uParticleVelocity: { value: velocity },
        uParticleDisplaceFactor: { value: displacementFactor },
        uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
        uSize: { value: size },
        uColor: { value: new THREE.Color(color) },
        uAlpha: { value: alpha }
    }), [velocity, displacementFactor, size, color, alpha])

    useFrame((state) => {
        if (meshRef.current) {
            // @ts-ignore
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        const count = 1000
        const positions = new Float32Array(count * 3)
        const scale = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10
            scale[i] = 1
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))
        return geo
    }, [])

    return (
        <points ref={meshRef} geometry={geometry}>
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={particlesVert}
                fragmentShader={particlesFrag}
                transparent={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

// --- CamTargetRotation ---

const CamTargetRotation = ({ initialCamPosition, target, rotationMultipliers, isMobile }: any) => {
    const { camera } = useThree()

    const initialSpherical = useMemo(() => {
        const offset = initialCamPosition.clone().sub(target)
        return new THREE.Spherical().setFromVector3(offset)
    }, [initialCamPosition, target])

    useFrame((state) => {
        let thetaDelta = 0
        let phiDelta = 0

        if (isMobile) {
            // Auto sway for mobile
            const time = state.clock.getElapsedTime()
            thetaDelta = Math.sin(time * 0.2) * 0.2 // Gentle left-right
            phiDelta = Math.sin(time * 0.15) * 0.05 // Very subtle up-down
        } else {
            // Mouse interaction for desktop
            const x = state.pointer.x
            const y = state.pointer.y
            thetaDelta = Math.PI * x * rotationMultipliers.x
            phiDelta = -(Math.PI * y) * rotationMultipliers.y
        }

        const currentSpherical = initialSpherical.clone()
        currentSpherical.theta += thetaDelta

        currentSpherical.phi += phiDelta
        currentSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, currentSpherical.phi))

        const targetPosition = new THREE.Vector3()
        targetPosition.setFromSpherical(currentSpherical).add(target)

        camera.position.lerp(targetPosition, 0.05)
        camera.lookAt(target)
    })

    return null
}

// --- Xero Component ---

const Xero = forwardRef((props: any, ref) => {
    const { scene } = useGLTF(`/${config.modelSrc}`) as any

    useLayoutEffect(() => {
        scene.traverse((child: any) => {
            if (child.isMesh) {
                if (child.material) {
                    child.material.envMapIntensity = 0.08
                }

                // Neon Part
                if (child.name.includes('Cartel') || child.material.name.includes('Cartel')) {
                    child.material.toneMapped = false
                    child.material.emissive.setRGB(0, 0, 0)
                    child.material.emissiveIntensity = 1
                    child.material.envMapIntensity = 0

                    if (ref) {
                        if (typeof ref === 'function') ref(child)
                        else (ref as any).current = child
                    }
                }
            }
        })
    }, [scene, ref])

    return <primitive object={scene} {...props} />
})
Xero.displayName = 'Xero'

// --- MovingSpot ---

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0] }) {
    const group = useRef<THREE.Group>(null)
    const interval = 120

    useFrame((state, delta) => {
        if (group.current) {
            let nextZ = group.current.position.z + delta * 35
            if (nextZ > interval) nextZ = -interval
            group.current.position.z = nextZ
        }
    })

    return (
        <group position={[0, 4, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <group ref={group}>
                {positions.map((x, i) => (
                    <Lightformer
                        key={i}
                        form="rect"
                        intensity={5}
                        rotation={[Math.PI / 2, 0, 0]}
                        position={[x, 4, i * 6]}
                        scale={[4, 1, 1]}
                    />
                ))}
            </group>
        </group>
    )
}

// --- Effects ---

const Effects = () => {
    // Settings from Screenshot
    return (
        <EffectComposer multisampling={0}>
            <Noise opacity={0.18} />
            <Bloom
                radius={1.0}
                luminanceThreshold={2.0}
                luminanceSmoothing={0.0}
                mipmapBlur
            />
            <Vignette
                opacity={1.0}
                darkness={1.0}
                offset={0.0}
            />
        </EffectComposer>
    )
}

// --- Scene ---

const XeroScene = ({ isMobile }: { isMobile: boolean }) => {
    const neonRef = useRef<any>(null)
    const ambientRef = useRef<THREE.AmbientLight>(null)

    const updateNeon = useCallback((v: number) => {
        if (!ambientRef.current || !neonRef.current) return

        const neonColor = v
        const ambientIntensity = THREE.MathUtils.lerp(
            config.ambient.minMaxIntensity[0],
            config.ambient.minMaxIntensity[1],
            v
        )

        ambientRef.current.intensity = ambientIntensity

        neonRef.current?.material?.emissive?.setRGB?.(
            neonColor,
            neonColor,
            neonColor
        )
    }, [])

    useLayoutEffect(() => {
        const neon = { value: 0 }
        // Yanma şiddeti (Config'den alıyoruz ama biraz daha patlasın diye 1.2 ile çarptım)
        const onIntensity = config.neon.target * 1.2

        const tm = gsap.timeline({
            repeat: -1,       // Sonsuz döngü
            repeatDelay: 2,   // Döngüler arası 2 saniye bekle (Karanlık süre)
            onUpdate: () => updateNeon(neon.value),
            defaults: { ease: "power1.inOut" }
        })

        // --- Bozuk Floresan Senaryosu ---
        tm
            // 1. İlk kıvılcım (Hızlıca yan/sön)
            .set(neon, { value: onIntensity })
            .to(neon, { value: 0, duration: 0.05 })
            .to(neon, { value: 0, duration: 0.1 }) // Kısa bekleme

            // 2. İkinci kıvılcım serisi (Pır pır etme)
            .set(neon, { value: onIntensity * 0.5 }) // Yarım güçte yan
            .to(neon, { value: 0, duration: 0.05 })
            .set(neon, { value: onIntensity })       // Tam güçte yan
            .to(neon, { value: 0, duration: 0.03 })
            .set(neon, { value: onIntensity * 0.8 })
            .to(neon, { value: 0, duration: 0.15 })

            // 3. Ana Yanma (Bir süre açık kalır - "Cızzz" sesi efekti gibi)
            .to(neon, { value: onIntensity, duration: 0.05 })
            .to(neon, { value: onIntensity * 0.9, duration: 4.0 }) // 4 saniye ışık titreyerek yanık kalsın

            // 4. Kapanış
            .to(neon, { value: 0, duration: 0.1 })

        return () => { tm.kill() }
    }, [updateNeon])

    return (
        <>
            <ambientLight
                color="white"
                intensity={config.ambient.minMaxIntensity[0]}
                ref={ambientRef}
            />

            <CamTargetRotation
                initialCamPosition={config.camera.position}
                target={config.camera.target}
                rotationMultipliers={config.camera.rotationMultipliers}
                isMobile={isMobile}
            />

            <Xero position={[0.1, 1.2, 0.55]} ref={neonRef} />

            <Effects />

            <Environment preset="city" frames={Infinity} resolution={256} environmentIntensity={0.1}>
                <MovingSpots />
            </Environment>

            <Particles size={10} velocity={0.01} />
        </>
    )
}

export default function HeroAnimation() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="w-full h-full relative z-0">
            <Canvas
                gl={{ antialias: false, toneMapping: THREE.NoToneMapping }}
                dpr={[1, 1.5]}
                camera={{
                    position: config.camera.position,
                    fov: isMobile ? 22 : config.camera.fov,
                    near: config.camera.near,
                    far: config.camera.far
                }}
            >
                <XeroScene isMobile={isMobile} />
            </Canvas>
        </div>
    )
}
