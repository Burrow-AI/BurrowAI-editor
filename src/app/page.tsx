'use client';
import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'

import { Mermaid } from './components/Mermaid';


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
    <main>
       <Mermaid chart={mermaidChart} name="chart" />
    {/* <div style={{ position: 'fixed', inset: 0 }}>
 
    <Tldraw components={{ SharePanel: () => <MakeRealButton /> }}>

    </Tldraw>
  </div> */}
  </main>
  );
}
