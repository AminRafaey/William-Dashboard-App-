import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const useCommentLikeCount = (commentId) => {

    const { data, error } = useSWR(`/api/counts/comments/count-likes/${commentId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default useCommentLikeCount