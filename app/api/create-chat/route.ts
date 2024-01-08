import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { fileKey, fileName } = body
		console.log('fileKey', fileKey)
		console.log('fileName', fileName)
		return NextResponse.redirect('/chat')
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
