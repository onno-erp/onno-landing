import { useEffect, useRef, useState } from 'react'
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  Material,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const MODEL_URL = '/models/onno-hero.glb'

function createPresetMaterial() {
  return new MeshPhysicalMaterial({
    color: new Color('#ffffff'),
    roughness: 0,
    // Full metalness cancels transmission in Three.js' physical shader.
    // Keep a trace of metallic reflection while preserving the glass preset.
    metalness: 0.05,
    transmission: 0.98,
    ior: 2.01,
    thickness: 0.3,
    attenuationColor: new Color('#00e0d5'),
    attenuationDistance: 1.3,
    dispersion: 5,
    iridescence: 1,
    iridescenceIOR: 2.19,
    iridescenceThicknessRange: [236, 249],
    clearcoat: 0.57,
    clearcoatRoughness: 0,
    envMapIntensity: 1.3,
    emissive: new Color('#00e0d5'),
    emissiveIntensity: 0,
    side: DoubleSide,
  })
}

export function ModelShowcase({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let frame = 0
    let disposed = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new Scene()
    const camera = new PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 5)

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      setStatus('error')
      return
    }

    renderer.setClearColor(new Color(0x000000), 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.className = 'h-full w-full'
    mount.appendChild(renderer.domElement)

    const pmrem = new PMREMGenerator(renderer)
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = environment
    scene.environmentIntensity = 1.2
    scene.environmentRotation.set(
      MathUtils.degToRad(16),
      MathUtils.degToRad(12),
      MathUtils.degToRad(40),
    )

    scene.add(new AmbientLight(0xffffff, 2.1))
    const keyLight = new DirectionalLight(0xffffff, 5)
    keyLight.position.set(1.291, 5.334, 5)
    scene.add(keyLight)

    const stage = new Group()
    stage.position.y = 0.1
    stage.rotation.order = 'YXZ'
    stage.rotation.set(-0.5236, 0.24435, 0.40143)
    scene.add(stage)

    let isDragging = false
    let previousPointerX = 0
    let previousPointerY = 0
    let previousPointerTime = 0
    let automaticYaw = 0.24435
    let manualYaw = 0
    let manualPitch = 0
    let yawVelocity = 0
    let pitchVelocity = 0
    let pointerYaw = 0
    let pointerPitch = 0
    let targetPointerYaw = 0
    let targetPointerPitch = 0

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true
      previousPointerX = event.clientX
      previousPointerY = event.clientY
      previousPointerTime = performance.now()
      yawVelocity = 0
      pitchVelocity = 0
      targetPointerYaw = 0
      targetPointerPitch = 0
      mount.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - previousPointerX
        const deltaY = event.clientY - previousPointerY
        const now = performance.now()
        const pointerDeltaTime = Math.max((now - previousPointerTime) / 1000, 1 / 120)
        previousPointerX = event.clientX
        previousPointerY = event.clientY
        previousPointerTime = now
        manualYaw += deltaX * 0.012
        manualPitch += deltaY * 0.012
        yawVelocity = MathUtils.clamp((deltaX * 0.012) / pointerDeltaTime, -8, 8)
        pitchVelocity = MathUtils.clamp((deltaY * 0.012) / pointerDeltaTime, -8, 8)
        return
      }

      if (reduceMotion) return
      const bounds = mount.getBoundingClientRect()
      const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
      targetPointerYaw = normalizedX * 0.11
      targetPointerPitch = -normalizedY * 0.075
    }

    const stopDragging = (event: PointerEvent) => {
      isDragging = false
      if (reduceMotion) {
        yawVelocity = 0
        pitchVelocity = 0
      }
      if (mount.hasPointerCapture(event.pointerId)) mount.releasePointerCapture(event.pointerId)
    }

    const onPointerLeave = () => {
      if (isDragging) return
      targetPointerYaw = 0
      targetPointerPitch = 0
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
      event.preventDefault()
      if (event.key === 'ArrowLeft') manualYaw -= 0.22
      if (event.key === 'ArrowRight') manualYaw += 0.22
      if (event.key === 'ArrowUp') manualPitch -= 0.22
      if (event.key === 'ArrowDown') manualPitch += 0.22
    }

    mount.addEventListener('pointerdown', onPointerDown)
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerup', stopDragging)
    mount.addEventListener('pointercancel', stopDragging)
    mount.addEventListener('pointerleave', onPointerLeave)
    mount.addEventListener('keydown', onKeyDown)

    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return

        const model = gltf.scene
        const bounds = new Box3().setFromObject(model)
        const center = bounds.getCenter(new Vector3())
        const size = bounds.getSize(new Vector3())
        const maxDimension = Math.max(size.x, size.y, size.z) || 1

        model.position.sub(center)
        model.scale.setScalar((2.9 / maxDimension) * 0.8 * 0.75)
        model.traverse((object) => {
          if (!(object instanceof Mesh)) return
          const originals = Array.isArray(object.material) ? object.material : [object.material]
          const replacements = originals.map(() => createPresetMaterial())
          originals.forEach((material: Material) => material.dispose())
          object.material = Array.isArray(object.material) ? replacements : replacements[0]
        })
        stage.add(model)
        setStatus('ready')
      },
      undefined,
      () => {
        if (!disposed) setStatus('error')
      },
    )

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    resize()

    let lastFrameTime = performance.now()
    let elapsed = 0
    const render = (time = performance.now()) => {
      const delta = Math.min((time - lastFrameTime) / 1000, 0.05)
      lastFrameTime = time
      elapsed += delta
      if (!reduceMotion && !isDragging) automaticYaw += delta * 0.2
      if (!isDragging) {
        manualYaw += yawVelocity * delta
        manualPitch += pitchVelocity * delta
        const inertiaDamping = Math.exp(-delta * 2.4)
        yawVelocity *= inertiaDamping
        pitchVelocity *= inertiaDamping
      }
      const smoothing = 1 - Math.exp(-delta * 7)
      pointerYaw += (targetPointerYaw - pointerYaw) * smoothing
      pointerPitch += (targetPointerPitch - pointerPitch) * smoothing
      stage.rotation.y = automaticYaw + manualYaw + pointerYaw
      stage.rotation.x = -0.5236 + manualPitch + pointerPitch
        + (!reduceMotion ? Math.sin(elapsed * 0.3) * 0.15 : 0)
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      mount.removeEventListener('pointerdown', onPointerDown)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerup', stopDragging)
      mount.removeEventListener('pointercancel', stopDragging)
      mount.removeEventListener('pointerleave', onPointerLeave)
      mount.removeEventListener('keydown', onKeyDown)
      scene.traverse((object) => {
        if (!(object instanceof Mesh)) return
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material: Material) => material.dispose())
      })
      environment.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className={`animate-fade-up [animation-delay:160ms] ${className}`}>
      <div
        ref={mountRef}
        role="img"
        aria-label="Interactive rotating onno 3D character. Drag or use arrow keys to spin."
        tabIndex={0}
        className="absolute inset-0 touch-none cursor-grab outline-none active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900/40"
      />

      {status === 'loading' && (
        <div className="absolute inset-0 hidden items-center justify-center text-xs uppercase tracking-[0.2em] text-gray-700/60 lg:flex">
          Loading model
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 hidden items-center justify-center px-8 text-center text-sm text-gray-700/70 lg:flex">
          3D preview unavailable
        </div>
      )}
    </div>
  )
}
