import React from 'react';
import { Mafs, Coordinates, Point, Text, Polygon, Theme } from 'mafs';
import 'mafs/core.css';
import { MafsVisualization } from '../../types';

interface MafsVisualsProps {
  data: MafsVisualization;
}

export const MafsVisuals: React.FC<MafsVisualsProps> = ({ data }) => {
  if (data.type === 'number-line') {
    const vals = Array.isArray(data.value) ? data.value : [data.value];
    return (
      <div className="bg-slate-900 rounded-2xl p-4 overflow-hidden border border-slate-700">
        <Mafs height={150} viewBox={{ x: [-0.1, 1.1], y: [-0.5, 0.5] }} pan={false} zoom={false}>
          <Coordinates.Cartesian 
            xAxis={{ lines: 0.1, labels: (n) => n.toFixed(1) }} 
            yAxis={false} 
          />
          {vals.map((v, i) => (
            <React.Fragment key={i}>
              <Point x={v} y={0} color={Theme.blue} />
              <Text x={v} y={0.2} attach="bottom" color={Theme.blue} size={20}>
                {v.toFixed(1)}
              </Text>
            </React.Fragment>
          ))}
        </Mafs>
      </div>
    );
  }

  if (data.type === 'grid-100') {
    const paintedCount = Array.isArray(data.value) ? data.value[0] : data.value;
    const polys = [];
    for (let i = 0; i < 100; i++) {
      // 10x10 grid, top-left is 0,0, but mafs is bottom-left, so we'll just draw it
      const x = i % 10;
      const y = 9 - Math.floor(i / 10);
      const isPainted = i < paintedCount;
      polys.push(
        <Polygon 
          key={i}
          points={[[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]]} 
          color={isPainted ? Theme.blue : Theme.foreground} 
          fillOpacity={isPainted ? 0.6 : 0.1} 
        />
      );
    }
    return (
      <div className="bg-slate-900 rounded-2xl p-4 overflow-hidden border border-slate-700 flex justify-center">
        <Mafs height={300} viewBox={{ x: [0, 10], y: [0, 10] }} pan={false} zoom={false}>
          {polys}
        </Mafs>
      </div>
    );
  }

  if (data.type === 'grid-10') {
    const paintedCount = Array.isArray(data.value) ? data.value[0] : data.value;
    const polys = [];
    for (let i = 0; i < 10; i++) {
      const isPainted = i < paintedCount;
      polys.push(
        <Polygon 
          key={i}
          points={[[i, 0], [i + 1, 0], [i + 1, 1], [i, 1]]} 
          color={isPainted ? Theme.green : Theme.foreground} 
          fillOpacity={isPainted ? 0.6 : 0.1} 
        />
      );
    }
    return (
      <div className="bg-slate-900 rounded-2xl p-4 overflow-hidden border border-slate-700 flex justify-center">
        <Mafs height={100} viewBox={{ x: [0, 10], y: [0, 1] }} pan={false} zoom={false}>
          {polys}
        </Mafs>
      </div>
    );
  }

  return null;
};
