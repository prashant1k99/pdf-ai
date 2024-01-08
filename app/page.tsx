import FileUpload from '@/components/app/FileUpload'
import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
	const { userId } = await auth()

	const isSignedIn = !!userId

	return (
		<div className="h-full max-w-full bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 p-4">
			<div className="flex h-full items-center justify-center">
				<div className="flex flex-col items-center text-center">
					<div className="flex items-center">
						<h1 className="mr-3 text-3xl font-semibold text-primary">
							Chat with your PDF
						</h1>
						<UserButton afterSignOutUrl="/" />
					</div>
					<div className="flex mt-4">
						{isSignedIn && <Button>Go to Chats</Button>}
					</div>
					<p className="max-w-3xl text-muted-foreground">
						Chat with your PDF is a tool that allows you to chat with your PDFs.
						You can use it to discuss a PDF with your friends, or to leave notes
						for yourself.
					</p>
					<div className="w-full mt-4">
						{!isSignedIn ? (
							<Button asChild>
								<Link href="/login">
									<LogIn className="mr-2 w-4 h-4" />
									Authenticate
								</Link>
							</Button>
						) : (
							<FileUpload />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
