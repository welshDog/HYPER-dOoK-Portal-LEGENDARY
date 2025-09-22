// ========================================
// Crystal 3D View - Interactive 3D Constellation
// ========================================

'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei'
import * as THREE from 'three'
import { useCrystalStore } from '../../store'
import { generateCrystalPositions } from '../../lib/utils'

// Crystal 3D Component
function Crystal3D({ crystal, position, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
    }
  })

  // Crystal geometry based on category
  const geometry = useMemo(() => {
    switch (crystal.category.id) {
      case 'work':
        return <Box args={[0.8, 0.8, 0.8]} />
      case 'personal':
        return <Sphere args={[0.5]} />
      default:
        return <Box args={[0.6, 1.2, 0.6]} />
    }
  }, [crystal.category.id])

  // Crystal material based on status
  const material = useMemo(() => {
    const colors = {
      new: '#00D4FF',
      'in-progress': '#0EA5E9',
      completed: '#22C55E',
      celebrated: '#EC4899',
      archived: '#6B7280'
    }

    return (
      <meshStandardMaterial
        color={colors[crystal.status.type] || colors.new}
        transparent
        opacity={0.8}
        roughness={0.2}
        metalness={0.8}
      />
    )
  }, [crystal.status.type])

  return (
    <group position={position}>
      <mesh 
        ref={meshRef} 
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        {geometry}
        {material}
      </mesh>

      {/* Crystal label */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="#1A202C"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
      >
        {crystal.title.substring(0, 20)}...
      </Text>
    </group>
  )
}

// Connection lines between crystals
function Connections({ crystals }: { crystals: any[] }) {
  const positions = useMemo(() => generateCrystalPositions(crystals.length), [crystals.length])

  return (
    <group>
      {crystals.map((crystal, i) => {
        return crystals.slice(i + 1).map((otherCrystal, j) => {
          const actualJ = i + j + 1
          const distance = new THREE.Vector3(...positions[i]).distanceTo(new THREE.Vector3(...positions[actualJ]))

          // Only show connections for nearby crystals
          if (distance > 4) return null

          const points = [
            new THREE.Vector3(...positions[i]),
            new THREE.Vector3(...positions[actualJ])
          ]

          return (
            <line key={`${i}-${actualJ}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    ...positions[i],
                    ...positions[actualJ]
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color="#8B5CF6" 
                transparent 
                opacity={0.3}
                linewidth={2}
              />
            </line>
          )
        })
      })}
    </group>
  )
}

// Main 3D Scene
function Scene() {
  const { crystals, selectCrystal } = useCrystalStore()
  const positions = useMemo(() => generateCrystalPositions(crystals.length), [crystals.length])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Crystals */}
      {crystals.map((crystal, index) => (
        <Crystal3D
          key={crystal.id}
          crystal={crystal}
          position={positions[index]}
          onClick={() => selectCrystal(crystal)}
        />
      ))}

      {/* Connections */}
      <Connections crystals={crystals} />

      {/* Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxDistance={20}
        minDistance={5}
      />
    </>
  )
}

export function Crystal3DView() {
  const { crystals } = useCrystalStore()

  if (crystals.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-broski-purple/20 flex items-center justify-center">
            <span className="text-2xl">🌌</span>
          </div>
          <h3 className="text-xl font-bold text-text-primary-light mb-2">
            Your 3D Crystal Constellation
          </h3>
          <p className="text-text-muted-light">
            Create crystals to see your beautiful 3D memory universe!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}
      >
        <Scene />
      </Canvas>

      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm">
        <div>🖱️ Click and drag to rotate</div>
        <div>🔍 Scroll to zoom</div>
        <div>💎 Click crystals to select</div>
      </div>

      {/* Stats */}
      <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3 text-sm">
        <div className="font-semibold text-text-primary-light mb-1">
          Crystal Universe
        </div>
        <div className="text-text-muted-light">
          {crystals.length} crystals floating in 3D space
        </div>
      </div>
    </div>
  )
}