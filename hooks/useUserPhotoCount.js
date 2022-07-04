import useSWR from 'swr'
import fetcher from 'libs/fetcher'

const useUserPhotoCount = (userId) => {

    const { data, error } = useSWR(`/api/counts/users/photos/${userId}`, fetcher)
    const loading = !data && !error;

    return {
        data,
        loading,
        error
    }
}

export default useUserPhotoCount
