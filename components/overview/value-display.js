import CountUp from 'react-countup';

const ValueDisplay = ({ value }) => {

    return (
        <span className="text-6xl font-bold tracking-tight text-center text-gray-800 dark:text-zinc-200">
            {value && 
                <CountUp
                    start={0} 
                    end={value} 
                    duration={3}
            />}
        </span>
    )
}

export default ValueDisplay
