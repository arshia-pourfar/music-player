import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchData = (initialUrl = '', initialMethod = 'GET', initialBody = null, immediate = false, limit = null) => {
    const [url, setUrl] = useState(initialUrl);
    const [method, setMethod] = useState(initialMethod);
    const [body, setBody] = useState(initialBody);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Update URL with limit if provided
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

            setData(response.data);
        } catch (err) {
            setError(err);
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
// const { data: allMusicList, loading: allMusicLoading, error: allMusicError, setUrl, setMethod, setBody, fetchData } = useFetchData('/api/link', 'GET OR POST', null, true);

export default useFetchData;


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useFetchData = (url, method = 'GET', body = null) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         console.log('Fetching data from:', url); // اضافه کردن console.log برای دیباگ
//         const fetchData = async () => {
//             try {
//                 const response = await axios({
//                     method,
//                     url,
//                     data: body
//                 });
//                 console.log('Data fetched:', response.data); // اضافه کردن console.log برای دیباگ
//                 setData(response.data);
//             } catch (err) {
//                 console.error('Error fetching data:', err); // اضافه کردن console.log برای دیباگ
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [url, method, body]);

//     return { data, loading, error };
// };

// export default useFetchData;
///////////////////////////////////////////////////////////////////////////////
// با انعطاف بیشتر
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const useFetchData = (initialUrl, initialMethod = 'GET', initialBody = null, immediate = true) => {
//     const [url, setUrl] = useState(initialUrl);
//     const [method, setMethod] = useState(initialMethod);
//     const [body, setBody] = useState(initialBody);
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchData = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await axios({
//                 method,
//                 url,
//                 data: body
//             });
//             setData(response.data);
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     }, [url, method, body]);

//     useEffect(() => {
//         if (immediate) {
//             fetchData();
//         }
//     }, [fetchData, immediate]);

//     return { data, loading, error, setUrl, setMethod, setBody, fetchData };
// };

// export default useFetchData;

// ***************************************************************
// روش استفاده **************************************************
// ***************************************************************
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
// const { data, loading, error, setUrl, setMethod, setBody, fetchData } = useFetchData('', 'POST', null, false);

// const handleSubmit = (e) => {
//     e.preventDefault();
//     setUrl('http://localhost:3001/login');
//     setMethod('POST');
//     setBody({ username, password });
//     fetchData();
// };
/////////////////////////////////////////////////////////////////////////////////////////////
// // hooks/useFetchData.js
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useFetchData = (url) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // console.log('Fetching data from:', url); // اضافه کردن console.log برای دیباگ
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(url);
//                 // console.log('Data fetched:', response.data); // اضافه کردن console.log برای دیباگ
//                 setData(response.data);
//             } catch (err) {
//                 // console.error('Error fetching data:', err); // اضافه کردن console.log برای دیباگ
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [url]);

//     return { data, loading, error };
// };

// export default useFetchData;