import {
	generateFileUploadURL,
	deleteFileFromBucket,
	readFileFromBucket,
} from '@/actions/aws'

export async function uploadFile(
	file: File
): Promise<{ Key: string; fileName: string }> {
	try {
		const {
			uploadURL,
			Key,
			fileName: _fileName,
		} = await generateFileUploadURL({
			fileName: file.name,
		})
		console.log('uploadURl', uploadURL)
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()

			xhr.open('PUT', uploadURL, true)
			xhr.upload.onprogress = function (e) {
				if (e.lengthComputable) {
					console.log('Upload progress:', e.loaded / e.total)
				}
			}
			xhr.onload = function () {
				if (xhr.status === 200) {
					resolve({
						Key,
						fileName: _fileName,
					})
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
		console.error('Error generating upload URL:', err)
		return Promise.reject(err)
	}
}

export async function deleteFile(Key: string) {
	try {
		await deleteFileFromBucket(Key)
	} catch (err) {
		console.error('Error generating upload URL:', err)
		return Promise.reject(err)
	}
}

export const readFile = async (Key: string) => {
	try {
		const data = await readFileFromBucket(Key)
		if (!data) {
			throw new Error('No data')
		}
		const dataAsString = data.toString('utf-8') // Convert buffer to string
		console.log(JSON.stringify(dataAsString))
	} catch (err) {
		console.error('Error generating upload URL:', err)
		return Promise.reject(err)
	}
}
