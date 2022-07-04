import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const usePostBookmarkCount = (postId) => {

    const { data, error } = useSWR(`/api/counts/posts/bookmarks/${postId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default usePostBookmarkCount
