import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

neonConfig.fetchConnectionCache = true

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined')
}

export const psql = neon(process.env.DATABASE_URL)

export const db = drizzle(psql)
