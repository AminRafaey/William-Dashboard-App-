//? USED IN MOST PAGES AND COMPONENTS TO SHOW A LOADING STATUS

import Loading from 'components/icons/loading-spinner'

const AwaitingData = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Loading width='8' height='8' stroke='4'/>
        </div>
    )
}

export default AwaitingData
