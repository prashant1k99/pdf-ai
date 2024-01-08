import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
// import { dark } from '@clerk/themes'
import { Inter } from 'next/font/google'
import './globals.css'

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
					<div className="h-dvh w-dvw overflow-hidden">{children}</div>
				</body>
			</html>
		</ClerkProvider>
	)
}
