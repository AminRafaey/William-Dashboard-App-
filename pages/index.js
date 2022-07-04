//? OUR APP BASE URL IS SET TO OVERVIEW.JS IN LIBS/INITAUTH.JS, SO THIS PAGE REFIRECTS TO THE APP (OVERVIEW) IF THE USER IS LOGGED IN, OR TO THE LOGIN PAGE IF NOT
import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import Layout from 'layouts/layout'

const Home = () => {
    return (
        <div className="font-bold">Redirect</div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async () => {

})
const HomeWithAuth = withAuthUser({ 
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenAuthed: AuthAction.REDIRECT_TO_APP, 
})(Home)
HomeWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default HomeWithAuth

