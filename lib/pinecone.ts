import { Pinecone } from '@pinecone-database/pinecone'

let pinecone: Pinecone | null = null

export const getPinecone = async (): Promise<Pinecone> => {
	if (pinecone === null) {
		pinecone = new Pinecone({
			environment: process.env.PINECONE_ENVIRONMENT!,
			apiKey: process.env.PINECONE_API_KEY!,
		})
	}

	return pinecone
}

export const loadS3IntoPinecone = async (fileKey: string) => {}
