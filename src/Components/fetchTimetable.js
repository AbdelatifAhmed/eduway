// src/hooks/useFetchTimetable.js
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivatet';
import useAuth from '../hooks/useAuth';

const useFetchTimetable = () => {
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const {Auth} = useAuth()
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Auth?.dataDetails?.roles[0]==='Student')
                    {
                        const response = await axiosPrivate.get(`api/student/schedule`);
                        setTimetable(response?.data?.data);
                    }
                    else {
                        const response = await axiosPrivate.get(`/api/schedule/T`);
                        setTimetable(response?.data?.data);
                    }
               
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ axiosPrivate]);

    return { timetable, loading, error };
};

export default useFetchTimetable;
