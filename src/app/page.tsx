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
  const [activeTab, setActiveTab] = useState('dbschema');
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
        <Tldraw persistenceKey="burrow-draw" components={{ SharePanel: () => <MakeRealButton /> }} />
      </div>

      {/* Mermaid Component */}
      <div className="flex-shrink-0 relative overflow-hidden border-t-2 border-gray-300"
        style={{ height: `${mermaidHeight}px` }}>
           <div 
          className="absolute inset-x-0 top-0 h-4 bg-gray-200 cursor-ns-resize" 
          onMouseDown={handleMouseDown}
        ></div>
         {/* Tabs */}
         <div className="bg-gray-200 p-2">
          <button 
            className={`px-4 py-2 mr-2 ${activeTab === 'mermaid' ? 'bg-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab('mermaid')}
          >
            DB Schema
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'other' ? 'bg-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab('other')}
          >
            Other Tab
          </button>
        </div>
         {/* Tabs */}
        
        <div className="h-full overflow-auto p-4">
        {activeTab === 'dbschema' &&(
          <Mermaid chart={mermaidChart} name="chart" /> )}
        
        {activeTab === 'other' && (
           <div className="w-full h-full p-4">
           <h2 className="text-xl font-bold">Other Content</h2>
           <p>This is a placeholder for other content or components you might want to add.</p>
         </div>
        )}
        </div>
      </div>
    </main>
  );
}
