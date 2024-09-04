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

    let plantList = [...preferredPlants]
    console.log(preferredPlants);

    // const plantListImages = (plantList.map((image, index) => {
    //     if(image == standard) {return image = {usual}};
    //     if(image == orchids) {return image = {orchids}};
    //     if(image == succulents) {return image = {succulents}};
    //     if(image == unusual) {return image = {unusual}};
    //     if(image == carnivorous) {return image = {carnivorous}};
    //     if(image == landscape) {return image = {landscape}};
    //     if(image == outdoor) {return image = {outdoors}};
    //     if(image == veggies) {return image = {veggies}};
    // }));

    // const arrayOfPlantPictures = [];

    // if (preferredPlants.includes(standard)) {
    //     const standard = {usual};
    //     arrayOfPlantPictures.push(standard);
    // }
    // if (preferredPlants.includes(succulents)) {
    //     const succulents = {succulents};
    //     arrayOfPlantPictures.push(succulents);
    // }
    // if (preferredPlants.includes(orchids)) {
    //     const orchids = {orchids};
    //     arrayOfPlantPictures.push(orchids);
    // }
    // if (preferredPlants.includes(carnivorous)) {
    //     const carnivorous = {carnivorous};
    //     arrayOfPlantPictures.push(carnivorous);
    // }
    // if (preferredPlants.includes(unusual)) {
    //     const unusual = {unusual};
    //     arrayOfPlantPictures.push(unusual);
    // }
    // if (preferredPlants.includes(landscape)) {
    //     const landscape = {landscape};
    //     arrayOfPlantPictures.push(landscape);
    // }
    // if (preferredPlants.includes(outdoor)) {
    //     const outdoor = {outdoors};
    //     arrayOfPlantPictures.push(outdoor);
    // }
    // if (preferredPlants.includes(veggies)) {
    //     const veggies = {veggies};
    //     arrayOfPlantPictures.push(veggies);
    // }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container p-0">   
            {preferredPlants.map((image, index) => {
                
                return (
                    <div className="selectPlants" key={index}>
                        <div className="plantImageContainer plants" >
                            <button 
                                className="btn editButton" 
                                onClick={() => {
                                    navigate("/provider-profile")
                                }}
                            >
                                <i className="fas fa-pencil-alt"></i>
                            </button>
                            <img 
                                src={image} 

                                alt={`Picture of plant type ${image}`}
                            />
                        </div>
                        <p className="text-white mb-0"><strong>{image}</strong></p>
                    </div>
                    )
                })}
        </div>
    );
};
