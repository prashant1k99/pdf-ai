import { generateFileUploadURL } from '@/actions/aws'

export async function uploadFile(file: File) {
	try {
		const url = await generateFileUploadURL({
			fileName: file.name,
		})
		console.log('uploadURl', url)
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()

			xhr.open('PUT', url, true)
			xhr.upload.onprogress = function (e) {
				if (e.lengthComputable) {
					console.log('Upload progress:', e.loaded / e.total)
				}
			}
			xhr.onload = function () {
				if (xhr.status === 200) {
					resolve(xhr.response)
				} else {
					reject(new Error('Upload failed: ' + xhr.status))
				}
			}
			xhr.onerror = function () {
				reject(new Error('Network error'))
			}
			xhr.send(file)
		})
	} catch (err) {
		console.log(err)
	}
}
