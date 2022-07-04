//? DATA FETCHING FILE FOR SWR

import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export default fetcher