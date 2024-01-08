import { SignUp } from '@clerk/nextjs'
const RegisterPage = () => {
	return (
		<div className="h-full w-full flex justify-center items-center bg-gradient-to-b from-indigo-200 via-red-200 to-yellow-100">
			<SignUp />
		</div>
	)
}

export default RegisterPage
