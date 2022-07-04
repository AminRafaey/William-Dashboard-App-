//? SIMPLE EMAIL LOGIN COMPONENT THAT REDIRECTS TO OUR APP WHEN THE USER IS AUTHORISED


import { useRef, useState } from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import { signInWithEmail } from 'libs/authUtils'
import { LockClosedOutline, MailOutline } from 'react-ionicons'

import Layout from 'layouts/auth-layout'
import Loading from 'components/icons/loading-spinner';

const Login = () => {

    const [loading, setLoading] = useState(false);

    const emailRef = useRef()
    const passwordRef = useRef()

    async function handleLogin() {
        try {
            setLoading(true)
            await signInWithEmail(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
        }
        catch (error) {
            console.log("email signup error: ",error)
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-start p-4 space-y-4 border rounded-lg bg-itemdark border-borderdark w-96">
            <h1 className="text-xl font-bold tracking-tight text-gray-200">Login</h1>
            <div className="relative w-full">
                <span className="absolute flex items-center justify-center w-5 h-full ml-3">
                    <MailOutline
                        color={'#30363D'}
                        height="24px"
                        width="24px"
                    />
                </span>
                <input
                    required
                    type="email"
                    ref={emailRef}
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className="w-full h-10 p-2 pl-10 font-light placeholder-gray-600 border rounded text-inputtext border-inputborder bg-inputbg focus:border-highlight focus:ring-1 focus:ring-highlight focus:outline-none"
                />
            </div>
            <div className="relative w-full">
                <span className="absolute flex items-center justify-center w-5 h-full ml-3">
                    <LockClosedOutline
                        color={'#30363D'}
                        height="24px"
                        width="24px"
                    />
                </span>
                <input
                    required
                    type="password"
                    ref={passwordRef}
                    autoComplete="none"
                    placeholder="Enter your password"
                    className="w-full h-10 p-2 pl-10 font-light placeholder-gray-600 border rounded text-inputtext border-inputborder bg-inputbg focus:border-highlight focus:ring-1 focus:ring-highlight focus:outline-none"
                />
            </div>
            <button
                onClick={handleLogin}
                className="flex flex-row items-center justify-center w-full h-10 border rounded text-inputtext border-inputborder bg-itemdark"
            >
                <span className="text-sm font-bold tracking-tight text-white">{!loading ? 'Log in' : <Loading width='4' height='4' stroke='2'/>}</span>
            </button>
        </div>
    )
}

const LoginWithAuth = withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
    whenUnauthedAfterInit: AuthAction.RENDER,
})(Login)

LoginWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default LoginWithAuth
