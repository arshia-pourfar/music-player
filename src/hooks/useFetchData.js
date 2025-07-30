import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://music-player-eight-red.vercel.app'; // دامنه ثابت API اینجا

const useFetchData = (
    endpoint = '',
    initialMethod = 'GET',
    initialBody = null,
    immediate = false,
    limit = null
) => {
    const [method, setMethod] = useState(initialMethod);
    const [body, setBody] = useState(initialBody);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formattedUrl = limit ? `${API_BASE_URL}${endpoint}/${limit}` : `${API_BASE_URL}${endpoint}`;

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

    return { data, loading, error, setMethod, setBody, fetchData };
};

export default useFetchData;
