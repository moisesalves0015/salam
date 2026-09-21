import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Environment, Text, ContactShadows } from '@react-three/drei';
import { Physics, RigidBody, InstancedRigidBodies } from '@react-three/rapier';

interface PlaceValue3DProps {
  units?: number;
  tens?: number;
  hundreds?: number;
  interactive?: boolean;
}

// Cubo de Unidade (1x1x1)
const UnitCube: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <RigidBody position={position} colliders="cuboid" restitution={0.2} friction={0.5}>
      <Box args={[0.9, 0.9, 0.9]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.1} roughness={0.4} />
      </Box>
    </RigidBody>
  );
};

// Barra de Dezena (1x10x1)
const TenRod: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <RigidBody position={position} colliders="cuboid" restitution={0.2} friction={0.5}>
      <Box args={[0.9, 9.8, 0.9]}>
        <meshStandardMaterial color="#34d399" metalness={0.1} roughness={0.4} />
      </Box>
      {/* Detalhes visuais dos 10 blocos */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i} position={[0, -4.5 + i, 0]}>
           <Box args={[0.92, 0.1, 0.92]}>
              <meshBasicMaterial color="#059669" opacity={0.3} transparent />
           </Box>
        </group>
      ))}
    </RigidBody>
  );
};

// Placa de Centena (10x10x1)
const HundredFlat: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <RigidBody position={position} colliders="cuboid" restitution={0.2} friction={0.5}>
      <Box args={[9.8, 9.8, 0.9]}>
        <meshStandardMaterial color="#60a5fa" metalness={0.1} roughness={0.4} />
      </Box>
    </RigidBody>
  );
};

export const PlaceValue3D: React.FC<PlaceValue3DProps> = ({ 
  units = 0, 
  tens = 0, 
  hundreds = 0,
  interactive = true 
}) => {
  
  return (
    <div className="w-full h-[400px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner border-4 border-slate-800">
      <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white font-fredoka flex gap-4">
        <div>Centenas: <span className="text-blue-400 font-bold">{hundreds}</span></div>
        <div>Dezenas: <span className="text-emerald-400 font-bold">{tens}</span></div>
        <div>Unidades: <span className="text-amber-400 font-bold">{units}</span></div>
      </div>
      
      <Canvas shadows camera={{ position: [0, 8, 15], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        <Environment preset="city" />

        <Physics>
          {/* Floor */}
          <RigidBody type="fixed" position={[0, -0.5, 0]}>
            <Box args={[30, 1, 30]} receiveShadow>
              <meshStandardMaterial color="#1e293b" />
            </Box>
          </RigidBody>

          {/* Wall to prevent blocks falling backwards */}
          <RigidBody type="fixed" position={[0, 5, -5]}>
            <Box args={[30, 10, 1]} />
          </RigidBody>

          <Suspense fallback={null}>
            {/* Render Hundreds */}
            {Array.from({ length: Math.min(hundreds, 5) }).map((_, i) => (
              <HundredFlat key={`h-${i}`} position={[-6 + (i * 0.5), 5 + i * 2, 0]} />
            ))}

            {/* Render Tens */}
            {Array.from({ length: Math.min(tens, 15) }).map((_, i) => (
              <TenRod key={`t-${i}`} position={[0 + (i * 1.5), 6 + i, 0]} />
            ))}

            {/* Render Units */}
            {Array.from({ length: Math.min(units, 20) }).map((_, i) => (
              <UnitCube key={`u-${i}`} position={[5 + (i % 3), 4 + i, (i % 2)]} />
            ))}
          </Suspense>
        </Physics>

        <OrbitControls 
          enablePan={false} 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={10}
          maxDistance={25}
        />
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={20} blur={2} far={10} />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <span className="bg-black/50 text-white/50 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          Arraste a tela para girar • Role para zoom
        </span>
      </div>
    </div>
  );
};
