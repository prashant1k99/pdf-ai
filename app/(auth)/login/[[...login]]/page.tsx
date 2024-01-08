import { SignIn } from '@clerk/nextjs'
const LogInPage = () => {
	return (
		<div className="h-full w-full flex justify-center items-center bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100">
			<SignIn />
		</div>
	)
}

export default LogInPage
