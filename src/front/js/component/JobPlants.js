import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";
import ShovelAnimation from './ShovelAnimation';

export const JobPlants = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const chosenPlants = [store.jobPostDetails.selectedPlants];
    const chosenPlantsArray = chosenPlants[0];


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
            {chosenPlantsArray.map((image, index) => {
                if(image == "Standard House Plants") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={usual}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "Outdoor Potted Plants") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={outdoors}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "Succulents") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={succulents}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "Orchids") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={orchids}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "Unusual / Rare") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={unusual}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "Carnivorous") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={carnivorous}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "Landscape") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={landscape}
                                    className="selectPlantsCompleted"
                                    alt={`Picture of plant type ${image}`}
                                />
                            </div>
                            <p className="text-white mb-0"><strong>{image}</strong></p>
                        </div>
                    )
                }
                if(image == "Vegetable Gardens") {
                    return (
                        <div className="selectPlants" key={index}>
                            <div className="plantImageContainer plants" >
                                <img 
                                    src={veggies}
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
