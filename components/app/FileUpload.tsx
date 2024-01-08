'use client'

import { uploadFile } from '@/lib/s3'
import { Inbox } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

const FileUpload = () => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'application/pdf': ['.pdf'],
		},
		maxFiles: 1,
		onDrop: async (acceptedFiles) => {
			const file = acceptedFiles[0]
			if (!file) {
				alert('No file')
				return
			}
			// File size max 10MB
			if (file.size > 10 * 1024 * 1024) {
				alert('File too large')
				return
			}
			try {
				const data = await uploadFile(file)
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		},
	})

	return (
		<div className="p-2 bg-white rounded-xl">
			<div
				{...getRootProps({
					className:
						'border-dashed border-2 rounded-xl cursor-ppointer bg-gray-50 py-8 flex flex-col items-center justify-center',
				})}>
				<input {...getInputProps()} />
				<>
					<Inbox className="w-12 h-12 text-gray-400" />
					<p className="mt-2 text-sm text-muted-foreground">Drop PDF here</p>
				</>
			</div>
		</div>
	)
}

export default FileUpload
