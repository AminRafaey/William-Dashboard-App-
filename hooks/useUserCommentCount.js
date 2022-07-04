import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const useUserCommentCount = (userId) => {

    const { data, error } = useSWR(`/api/counts/users/comments/${userId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default useUserCommentCount
