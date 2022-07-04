//? BASIC CENTERED LAYOUT FOR THE AUTH SIGN-IN SCREEN

const AuthLayout = ({children}) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-bgdark">
            {children}
        </div>
    )
}

export default AuthLayout
