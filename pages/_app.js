//? SET 'refreshInterval: 3000' IN <SWRConfig value={{fetcher: fetcher}}> to continually update the data
//? WE USE A GLOBAL FETCHER FOR SWR, INSTEAD OF CALLING IT EACH TIME WE USE SWR

import initAuth from 'libs/initAuth'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'next-themes'
import fetcher from 'libs/fetcher'
import '../styles/globals.css'
import "@fontsource/inter/100.css"
import "@fontsource/inter/200.css"
import "@fontsource/inter/300.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/variable.css"

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

initAuth()

function MyApp({ Component, pageProps }) {

    //? NEXT.JS IMPLEMENTATION OF PERSISTENT LAYOUTS
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <SWRConfig value={{fetcher: fetcher}}>
            <ThemeProvider attribute="class">
                {getLayout(<Component {...pageProps} />)} 
            </ThemeProvider>
        </SWRConfig>
    )
}

export default MyApp
