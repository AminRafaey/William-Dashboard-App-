import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const useUserPostCount = (userId) => {

    const { data, error } = useSWR(`/api/counts/users/bookmarks/${userId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default useUserPostCount
