'use client';
import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import 'react-split/style.css'; // 
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
    <Split
      direction="vertical"
      sizes={[70, 30]}
      minSize={100}
      gutterSize={5}
      className="flex-grow flex flex-col"
    >
      {/* Tldraw Component */}
      <div className="w-full h-full relative">
        <Tldraw components={{ SharePanel: () => <MakeRealButton /> }} />
      </div>

      {/* Mermaid Component */}
      <div className="w-full h-full overflow-auto">
        <Mermaid chart={mermaidChart} name="chart" />
      </div>
    </Split>
  </main>
  );
}
