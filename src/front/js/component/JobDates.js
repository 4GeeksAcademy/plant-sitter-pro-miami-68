import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import ShovelAnimation from './ShovelAnimation';

export const JobDates = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const startDate = store.jobPostDetails.startDate?.toLocaleDateString();
    const endDate = store.jobPostDetails.endDate?.toLocaleDateString();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <ShovelAnimation />;
    }

    return (
        <div className="dates rounded">   
            <div className='dateWrapper'>
                <div>Start date:</div>
                <div>{startDate}</div>
            </div>
            <div className='dateWrapper'>
                <div>End date:</div>
                <div>{endDate}</div>
            </div>
        </div>
    );
};