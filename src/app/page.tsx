'use client';
import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'
import mermaid from 'mermaid';


mermaid.initialize({
  startOnLoad: true, // Automatically render diagrams on page load
  theme: 'default',  // Choose a theme: default, forest, dark, neutral
});
const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})



export default function App() {
  return (
    <main>
    <div style={{ position: 'fixed', inset: 0 }}>
 
    <Tldraw components={{ SharePanel: () => <MakeRealButton /> }}>

    </Tldraw>
  </div>
  </main>
  );
}
