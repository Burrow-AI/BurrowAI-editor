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
      <div className="flex-grow">
        <Tldraw components={{ SharePanel: () => <MakeRealButton /> }} />
      </div>

      {/* Mermaid Component */}
      <div className="mt-4">
        <Mermaid chart={mermaidChart} name="chart" />
      </div>
    </main>
  );
}
