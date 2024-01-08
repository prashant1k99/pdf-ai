'use client'

import { Inbox } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

type Props = {}

const FileUpload = (props: Props) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone()

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
