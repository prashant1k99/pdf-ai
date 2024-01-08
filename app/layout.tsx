import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
// import { dark } from '@clerk/themes'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/queryProvider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PDF AI',
	description: 'Easily handle your PDF files with AI',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<QueryProvider>
						<div className="h-dvh w-dvw overflow-hidden">{children}</div>
						<Toaster />
					</QueryProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
