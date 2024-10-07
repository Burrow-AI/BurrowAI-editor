import { useEditor, useToasts, getSvgAsImage} from '@tldraw/tldraw'
import { useCallback } from 'react'
import { blobToBase64 } from '../lib/blobToBase64'

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
			const svg = await editor.getSvg(selectedShapes, {
				scale: 1,
				background: true,
			})


			// const svgStr = await editor.getSvgString(selectedShapes, {
			// 	scale: 1,
			// 	background: true,
			// })
		  const serializer = new XMLSerializer();
          const svgString = serializer.serializeToString(svg);
			console.log("svg", svgString)

			const blob = await getSvgAsImage(editor, svgString, {
				height: 500,
				type: 'png',
				quality: 1.8,
				scale: 1,
				width: 500
			})

			console.log("blob", blob)

			const dataUrl = await blobToBase64(blob)

			console.log("dataurl", dataUrl)



		//	console.log("snap", snap)
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


