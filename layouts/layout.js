//? DASHBOARD LAYOUT
//? WE WRAP OUR LAYOUT IN THE MANTINE AND MANTINE NOTIFICATION PROVIDERS HERE INSTEAD OF _APP.JS SO THAT WE HAVE ACCESS TO THE USETHEME THEME PARAMETER AND THEREFORE CAN CHANGE THE COLOUR OF OUR NOTIFICATIONS BASED ON THE USER'S SELECTED THEME

import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { useTheme } from 'next-themes'

import Head from 'next/head'
import Sidebar from 'components/sidebar'
import Header from 'components/header'

const NewLayout = ({ children }) => {

    const { theme } = useTheme()

    return (
        <MantineProvider theme={{ colorScheme: theme }}>
            <NotificationsProvider>
                <Head>
                    <title>ReactStartupKit Dashboard</title>
                    <meta name="description" content="Description" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="flex flex-row w-screen h-screen bg-white dark:bg-bgdark">
                    <Sidebar/>
                    <div className="flex flex-col items-start justify-start w-full h-full">
                        <Header/>
                        <main className="flex w-full h-full overflow-hidden">{children}</main>
                    </div>
                </div>
            </NotificationsProvider>
        </MantineProvider>
    )
}

export default NewLayout
