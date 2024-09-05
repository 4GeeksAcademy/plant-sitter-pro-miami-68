import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";

export const PlantCard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [preferredPlants, setPreferredPlants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }
            const res = await actions.getPlantSitter();
            if (res.success && res.data) {
                setPreferredPlants(res.data.preferred_plants || []);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container plantImageWrapper p-0">   
            {preferredPlants.map((image, index) => {
                if(image == "standard") {
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
                if(image == "outdoor") {
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
                if(image == "succulents") {
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
                if(image == "orchids") {
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
                if(image == "unusual") {
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
                if(image == "carnivorous") {
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
                if(image == "landscape") {
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
                if(image == "veggies") {
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
