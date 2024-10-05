'use client';
import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'




const Mermaid = dynamic(() => import('./components/Mermaid').then((mod) => mod.Mermaid), {
  ssr: false,
});



const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const mermaidChart = `
  graph LR
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great]
    B -->|No| D[Fix it]
    D --> B
`;


export default function App() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Tldraw Component */}
      <div className="flex-grow h-0 relative">
        <Tldraw components={{ SharePanel: () => <MakeRealButton /> }} />
      </div>

      {/* Mermaid Component */}
      <div className="flex-shrink-0 h-64 mt-4 overflow-auto">
        <div className="transform scale-75 origin-top-left">
          <Mermaid chart={mermaidChart} name="chart" />
        </div>
      </div>
    </main>
  );
}
