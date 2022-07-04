import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const useCommentCount = (commentId) => {

    const { data, error } = useSWR(`/api/counts/comments/count-replies/${commentId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default useCommentCount