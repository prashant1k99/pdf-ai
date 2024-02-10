import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { fileKey, fileName } = body

		return NextResponse.json({
			status: 'success',
		})
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
