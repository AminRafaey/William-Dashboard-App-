import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const usePostLikeCount = (postId) => {

    const { data, error } = useSWR(`/api/counts/posts/likes/${postId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default usePostLikeCount
