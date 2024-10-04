'use client';
import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'


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
