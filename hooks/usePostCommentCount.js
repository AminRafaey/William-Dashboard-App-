import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const usePostCommentCount = (postId) => {

    const { data, error } = useSWR(`/api/counts/posts/comments/${postId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default usePostCommentCount
