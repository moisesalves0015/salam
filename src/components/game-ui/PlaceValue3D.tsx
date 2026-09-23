import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Environment, ContactShadows, Sparkles } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Plus } from 'lucide-react';


interface PlaceValue3DProps {
  units?: number;
  tens?: number;
  hundreds?: number;
  interactive?: boolean;
}

const UnitCube: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <RigidBody position={position} colliders="cuboid" restitution={0.2} friction={0.5}>
    <Box args={[0.9, 0.9, 0.9]}>
      <meshStandardMaterial color="#fbbf24" metalness={0.1} roughness={0.4} />
    </Box>
  </RigidBody>
);

const TenRod: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <RigidBody position={position} colliders="cuboid" restitution={0.2} friction={0.5}>
    <Box args={[0.9, 9.8, 0.9]}>
      <meshStandardMaterial color="#34d399" metalness={0.1} roughness={0.4} />
    </Box>
    {Array.from({ length: 10 }).map((_, i) => (
      <group key={i} position={[0, -4.5 + i, 0]}>
         <Box args={[0.92, 0.1, 0.92]}>
            <meshBasicMaterial color="#059669" opacity={0.3} transparent />
         </Box>
      </group>
    ))}
  </RigidBody>
);

const HundredFlat: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <RigidBody position={position} colliders="cuboid" restitution={0.2} friction={0.5}>
    <Box args={[9.8, 9.8, 0.9]}>
      <meshStandardMaterial color="#60a5fa" metalness={0.1} roughness={0.4} />
    </Box>
    {/* Grid lines to make it look like 100 blocks */}
    {Array.from({ length: 10 }).map((_, i) => (
      <group key={`h-line-${i}`}>
         <Box position={[-4.5 + i, 0, 0]} args={[0.1, 9.8, 0.92]}>
            <meshBasicMaterial color="#3b82f6" opacity={0.3} transparent />
         </Box>
         <Box position={[0, -4.5 + i, 0]} args={[9.8, 0.1, 0.92]}>
            <meshBasicMaterial color="#3b82f6" opacity={0.3} transparent />
         </Box>
      </group>
    ))}
  </RigidBody>
);

export const PlaceValue3D: React.FC<PlaceValue3DProps> = ({ 
  units: initialUnits = 0, 
  tens: initialTens = 0, 
  hundreds: initialHundreds = 0,
  interactive = true 
}) => {
  const [units, setUnits] = useState(initialUnits || 0);
  const [tens, setTens] = useState(initialTens || 0);
  const [hundreds, setHundreds] = useState(initialHundreds || 0);
  
  const [isFusing, setIsFusing] = useState(false);

  useEffect(() => {
    setUnits(initialUnits || 0);
    setTens(initialTens || 0);
    setHundreds(initialHundreds || 0);
  }, [initialUnits, initialTens, initialHundreds]);


  // Auto-regroup logic with delays for fusion animation
  useEffect(() => {
    if (units >= 10) {
      setIsFusing(true);
      
      setTimeout(() => {
        setUnits(prev => prev - 10);
        setTens(prev => prev + 1);
        setIsFusing(false);
      }, 500); // 500ms delay to simulate fusion
    }
  }, [units]);

  useEffect(() => {
    if (tens >= 10) {
      setIsFusing(true);
      
      setTimeout(() => {
        setTens(prev => prev - 10);
        setHundreds(prev => prev + 1);
        setIsFusing(false);
      }, 500);
    }
  }, [tens]);

  const addUnit = () => setUnits(u => u + 1);
  const addTen = () => setTens(t => t + 1);
  const addHundred = () => setHundreds(h => h + 1);

  const total = hundreds * 100 + tens * 10 + units;

  return (
    <div className="w-full h-[400px] sm:h-[500px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner border-4 border-slate-800 flex flex-col">
      {/* HUD (Heads Up Display) */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
        
        {/* Total Board */}
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 shadow-xl pointer-events-auto flex flex-col items-center">
          <span className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Total</span>
          <span className="text-white font-fredoka text-3xl font-black">{total.toLocaleString('pt-BR')}</span>
        </div>

        {/* Interactive Controls */}
        {interactive && (
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={addHundred}
              className="bg-blue-500/80 hover:bg-blue-500 backdrop-blur-md text-white font-bold p-3 rounded-xl border border-blue-400 shadow-lg transition flex flex-col items-center gap-1 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[10px] uppercase">Centena</span>
            </button>
            <button 
              onClick={addTen}
              className="bg-emerald-500/80 hover:bg-emerald-500 backdrop-blur-md text-white font-bold p-3 rounded-xl border border-emerald-400 shadow-lg transition flex flex-col items-center gap-1 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[10px] uppercase">Dezena</span>
            </button>
            <button 
              onClick={addUnit}
              className="bg-amber-500/80 hover:bg-amber-500 backdrop-blur-md text-white font-bold p-3 rounded-xl border border-amber-400 shadow-lg transition flex flex-col items-center gap-1 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[10px] uppercase">Unidade</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="flex-1 relative">
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

          {isFusing && <Sparkles count={100} scale={10} size={5} speed={2} opacity={0.8} color="#fbbf24" />}

          <Physics>
            <RigidBody type="fixed" position={[0, -0.5, 0]}>
              <Box args={[30, 1, 30]} receiveShadow>
                <meshStandardMaterial color="#1e293b" />
              </Box>
            </RigidBody>

            <RigidBody type="fixed" position={[0, 5, -5]}>
              <Box args={[30, 10, 1]} />
            </RigidBody>

            <Suspense fallback={null}>
              {Array.from({ length: Math.min(hundreds, 10) }).map((_, i) => (
                <HundredFlat key={`h-${i}`} position={[-6 + (i * 0.5), 5 + i * 2, 0]} />
              ))}

              {Array.from({ length: Math.min(tens, 15) }).map((_, i) => (
                <TenRod key={`t-${i}`} position={[0 + (i * 1.5), 6 + i, 0]} />
              ))}

              {/* During fusion, we could jiggle them, but for now they fall naturally */}
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
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <span className="bg-black/50 text-white/50 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          Arraste a tela para girar • Role para zoom
        </span>
      </div>
    </div>
  );
};
