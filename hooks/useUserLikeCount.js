import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const useUserLikeCount = (userId) => {

    const { data, error } = useSWR(`/api/counts/users/likes/${userId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default useUserLikeCount
