import axios from 'axios'
import { useState, useEffect } from 'react'

const useAxiosFetch = (dataURL) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, { cancelToken: source.token });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null)
                }
            } catch (error) {
                if (isMounted) {
                    setData([])
                    setFetchError(error)
                }
            } finally {
                isMounted && setTimeout(() => {
                    setIsLoading(false)
                }, 2000);
            }
        }
        fetchData(dataURL);

        const cleanUp = () => {
            // console.log('clean up function')
            isMounted = false
            source.cancel()
        }
        return cleanUp;
    }, [dataURL]);
    return { data, fetchError, isLoading }
}

export default useAxiosFetch