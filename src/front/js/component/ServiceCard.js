import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";

export const ServiceCard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [servicePreferences, setServicePreferences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }
            const res = await actions.getPlantSitter();
            if (res.success && res.data) {
                setServicePreferences(res.data.service_preferences || []);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(servicePreferences);

    return (
        <div className="container plantImageWrapper p-0">   
            {servicePreferences.map((image, index) => {
                if(image == "watering") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={watering}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "cleaning") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={cleaning}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "pruning") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={pruning}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "repotting") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={repotting}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "pestControl") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={pestControl}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                })}
        </div>
    );
};
