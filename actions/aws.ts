'use server'

import AWS from 'aws-sdk'
import { currentUser } from '@clerk/nextjs'

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'ap-south-1',
})
const s3 = new AWS.S3({
	params: {
		Bucket: process.env.AWS_BUCKET_NAME,
	},
	signatureVersion: 'v4',
})

export const generateFileUploadURL = async ({
	fileName,
}: {
	fileName: string
}) => {
	const user = await currentUser()
	if (!user) throw new Error('Authentication required')

	const uniqueFileName =
		Date.now().toString() + '-' + fileName.replace(/\s/g, '_')

	const Key = 'uploads/' + user.id + '/' + uniqueFileName

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME, // replace with your bucket name
		Key,
		Expires: 60 * 60, // expiry time
	}

	try {
		const uploadURL = await s3.getSignedUrlPromise('putObject', params)
		return { uploadURL, Key, fileName: uniqueFileName }
	} catch (error) {
		console.log('Error creating a pre-signed URL', error)
		throw error
	}
}

export const deleteFileFromBucket = async (Key: string) => {
	const bucketName = process.env.AWS_BUCKET_NAME

	if (!bucketName) {
		throw new Error('AWS_BUCKET_NAME is not defined')
	}

	const params = {
		Bucket: bucketName,
		Key,
	}

	try {
		await s3.deleteObject(params).promise()
	} catch (error) {
		console.log('Error deleting object', error)
		throw error
	}
}

export const readFileFromBucket = async (Key: string) => {
	const bucketName = process.env.AWS_BUCKET_NAME

	if (!bucketName) {
		throw new Error('AWS_BUCKET_NAME is not defined')
	}

	const params = {
		Bucket: bucketName,
		Key,
	}

	try {
		const data = await s3.getObject(params).promise()
		console.log('Data', data)
		return data.Body
	} catch (error) {
		console.log('Error reading object', error)
		throw error
	}
}

export const readFileFromBucketSignedURL = async (Key: string) => {
	const bucketName = process.env.AWS_BUCKET_NAME

	if (!bucketName) {
		throw new Error('AWS_BUCKET_NAME is not defined')
	}

	const params = {
		Bucket: bucketName,
		Key,
	}

	try {
		const url = await s3.getSignedUrlPromise('getObject', params)
		return url
	} catch (error) {
		console.log('Error reading object', error)
		throw error
	}
}
