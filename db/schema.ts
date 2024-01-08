import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum', [
	'system',
	'user',
	'api',
])

export const messagesTypeEnum = pgEnum('messages_type_enum', [
	'question',
	'answer',
	'file',
])

export const chats = pgTable('chats', {
	id: serial('id').primaryKey(),
	pdfName: text('pdf_name').notNull(),
	pdfUrl: text('pdf_url').notNull(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	fileKey: text('file_key').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	chatId: integer('chat_id')
		.references(() => chats.id)
		.notNull(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	message: text('message').notNull(),
	messageType: messagesTypeEnum('message_type').notNull().default('question'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	role: userSystemEnum('role').default('user'),
})
