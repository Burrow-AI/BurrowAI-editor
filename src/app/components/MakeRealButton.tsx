import { useEditor, useToasts } from '@tldraw/tldraw'
import { useCallback } from 'react'
//import { makeReal } from '../lib/makeReal'

export function MakeRealButton() {
	const editor = useEditor()
	const { addToast } = useToasts()

	const handleClick = useCallback(async () => {
		console.log("gere")
		try {
			// const input = document.getElementById('openai_key_risky_but_cool') as HTMLInputElement
			// const apiKey = input?.value ?? null
			// if (!apiKey) throw Error('Make sure the input includes your API Key!')
			console.log("editor", editor)
			const selectedShapes = editor.getSelectedShapes()
			console.log("selected shapes", selectedShapes)
			//await makeReal(editor, apiKey)
		} catch (e) {
			console.error(e)
			addToast({
				icon: 'cross-2',
				title: 'Something went wrong',
				description: (e as Error).message.slice(0, 100),
			})
		}
	}, [editor, addToast])

	return (
		<button  onClick={handleClick} className="draw-fast-button">
			Generate 
		</button>
	)
}
