'use client';
import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'
import { useCallback, useEffect, useRef, useState } from 'react';




const Mermaid = dynamic(() => import('./components/Mermaid').then((mod) => mod.Mermaid), {
  ssr: false,
});



const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const mermaidChart = `
 erDiagram
    USER ||--o{ ORDER : places
    USER {
        int id
        string username
        string email
        string passwordHash
        datetime createdAt
        datetime updatedAt
    }
    ORDER {
        int id
        datetime orderDate
        float totalAmount
        int userId
        datetime createdAt
        datetime updatedAt
    }
`;


export default function App() {
  const [mermaidHeight, setMermaidHeight] = useState(256); // Initial height
  const isResizing = useRef(false);
  const startY = useRef(0);

  const handleMouseDown = useCallback((e) => {
    isResizing.current = true;
    startY.current = e.clientY;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing.current) return;
    const deltaY = startY.current - e.clientY;
    setMermaidHeight((prevHeight) => Math.max(100, prevHeight + deltaY)); // Minimum height of 100px
    startY.current = e.clientY;
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  
  return (
    <main className="flex flex-col min-h-screen">
      {/* Tldraw Component */}
      <div className="flex-grow h-0 relative">
        <Tldraw components={{ SharePanel: () => <MakeRealButton /> }} />
      </div>

      {/* Mermaid Component */}
      <div className="flex-shrink-0 relative overflow-hidden border-t-2 border-gray-300"
        style={{ height: `${mermaidHeight}px` }}>
           <div 
          className="absolute inset-x-0 top-0 h-4 bg-gray-200 cursor-ns-resize" 
          onMouseDown={handleMouseDown}
        ></div>
        
        <div className="h-full overflow-auto p-4">
          <Mermaid chart={mermaidChart} name="chart" />
        </div>
      </div>
    </main>
  );
}
