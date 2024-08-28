import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchData = (
    initialUrl = '',
    initialMethod = 'GET',
    initialBody = null,
    immediate = false,
    limit = null
) => {
    const [url, setUrl] = useState(initialUrl);
    const [method, setMethod] = useState(initialMethod);
    const [body, setBody] = useState(initialBody);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formattedUrl = limit ? `${url}/${limit}` : url;

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                url: formattedUrl,
                method,
                data: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setData(response.data || []);
        } catch (err) {
            setError({
                message: err.message,
                status: err.response?.status || 'Network Error',
                details: err.response?.data || null
            });
        } finally {
            setLoading(false);
        }
    }, [formattedUrl, method, body]);

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, loading, error, setUrl, setMethod, setBody, fetchData };
};

export default useFetchData;

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const useFetchData = (initialUrl = '', initialMethod = 'GET', initialBody = null, immediate = false, limit = null) => {
//     const [url, setUrl] = useState(initialUrl);
//     const [method, setMethod] = useState(initialMethod);
//     const [body, setBody] = useState(initialBody);
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     // Update URL with limit if provided
//     const formattedUrl = limit ? `${url}/${limit}` : url;

//     const fetchData = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios({
//                 url: formattedUrl,
//                 method,
//                 data: body,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             setData(response.data);
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     }, [formattedUrl, method, body]);


//     useEffect(() => {
//         if (immediate) {
//             fetchData();
//         }
//     }, [fetchData, immediate]);

//     return { data, loading, error, setUrl, setMethod, setBody, fetchData };
// };
// // const { data: allMusicList, loading: allMusicLoading, error: allMusicError, setUrl, setMethod, setBody, fetchData } = useFetchData('/api/link', 'GET OR POST', null, true);

// export default useFetchData;
