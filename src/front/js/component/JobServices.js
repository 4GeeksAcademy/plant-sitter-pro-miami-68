import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import ShovelAnimation from './ShovelAnimation';

export const JobServices = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const chosenServices = [store.jobPostDetails.selectedServices];
    const chosenServicesArray = chosenServices[0];

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
        <div className="container plantImageWrapper p-0">   
            {chosenServicesArray.map((image, index) => {
                if(image == "Watering") {
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
                if(image == "Cleaning") {
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
                if(image == "Pruning") {
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
                if(image == "Repotting") {
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
                if(image == "Pest Control") {
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