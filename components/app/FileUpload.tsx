'use client'

import { deleteFile, readFile, uploadFile } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import { Inbox, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

const FileUpload = () => {
	const [isUploading, setIsUploading] = useState(false)

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			fileName,
			Key,
		}: {
			fileName: string
			Key: string
		}) => {
			try {
				const res = await fetch('/api/create-chat', {
					method: 'POST',
					body: JSON.stringify({ fileName, fileKey: Key }),
				})
				const data = await res.json()
				return data
			} catch (error) {
				console.log('Upload Err:', error)
				throw new Error('Upload failed')
			}
		},
	})

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'application/pdf': ['.pdf'],
		},
		maxFiles: 1,
		onDrop: async (acceptedFiles) => {
			setIsUploading(true)
			const file = acceptedFiles[0]
			if (!file) {
				setIsUploading(false)
				toast.error('No file')
				return
			}
			// File size max 10MB
			if (file.size > 10 * 1024 * 1024) {
				toast.error('File Too Large')
				setIsUploading(false)
				return
			}
			try {
				const data = await uploadFile(file)
				if (!data) {
					toast.error('Upload failed')
					return
				}
				console.log(data)
				mutate(data, {
					onSuccess: () => {
						toast.success('Upload Success')
						readFile(data.Key)
					},
					onError: () => {
						deleteFile(data.Key)
						toast.error('Upload failed')
					},
				})
			} catch (error) {
				console.log(error)
			} finally {
				setIsUploading(false)
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
				{isPending || isUploading ? (
					<>
						<Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
						<p className="mt-2 text-sm text-muted-foreground">
							{isPending ? 'Uploading...' : 'Processing...'}
						</p>
					</>
				) : (
					<>
						<Inbox className="w-12 h-12 text-gray-400" />
						<p className="mt-2 text-sm text-muted-foreground">Drop PDF here</p>
					</>
				)}
			</div>
		</div>
	)
}

export default FileUpload
