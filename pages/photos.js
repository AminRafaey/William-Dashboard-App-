//? SHOWS EVERY IMAGE POSTED IN THE APP BY USERS, SORTED BY DATE
//? USES A CHECKBOX COMPONENT TO SHOW OR DISABLE IMAGES IN THE MAIN APP
//? useSWR FETCHES THE DATA FROM THE API AND DISPLAYS THE WAITING COMPONENT WHILE WE FETCH THE DATA
//? AUTHENTICATION STATUS IS CHECKED ON THE SERVER. UNAUTHED USERS ARE SHOWN THE LOGIN PAGE

import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import useSWR from 'swr'
import fetcher from 'libs/fetcher'
import Layout from 'layouts/layout'
import Waiting from 'components/await-data'
import Title from 'components/title'

import ListItem from 'components/list-item-photo'

const Photos = () => {

    const { data, error } = useSWR('/api/photos/fetch-all', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <Waiting/>

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <div className="flex items-center justify-between flex-shrink-0 w-full h-24 px-4">
                <Title title="Photos"/>
            </div>
            <div className="grid w-full grid-cols-5 gap-5 px-4">
                {data && data.map(photo => (
                    <ListItem
                        key={photo._id}
                        photo={photo.photo}
                        photoId={photo._id}
                        createdAt={photo.createdAt}
                        posterAvatar={photo.userData[0]?.photoUrl}
                        posterName={photo.userData[0]?.name}
                        isPublished={photo.published}
                    />
                ))}
            </div>
        </div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async ({ AuthUser, req }) => {})
const PhotosWithAuth = withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN, })(Photos)

//? NEXT.JS PERSISTENT LAYOUTS
PhotosWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default PhotosWithAuth
