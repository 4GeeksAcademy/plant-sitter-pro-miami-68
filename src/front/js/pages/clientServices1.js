import React, { useContext, useState, useEffect  } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import border from "../../img/border.png";
import { useNavigate } from "react-router-dom";

export const ClientServices1 = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [selectedPlants, setSelectedPlants] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!store.user) {
                await actions.getUser();
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handlePlantSelection = (plant) => {
        setSelectedPlants((prevPlants) =>
            prevPlants.includes(plant)
                ? prevPlants.filter((p) => p !== plant)
                : [...prevPlants, plant]
        );
    };

    const handleServiceSelection = (service) => {
        setSelectedServices((prevServices) =>
            prevServices.includes(service)
                ? prevServices.filter((s) => s !== service)
                : [...prevServices, service]
        );
    };

    const getTextColorClass = (item, selectedItems) => {
        return selectedItems.includes(item) ? "text-warning" : "text-white";
    };

    const handleNext = () => {
        actions.setJobPostDetails({
            startDate,
            endDate,
            selectedPlants,
            selectedServices,
        });
        navigate('/job-post1');
    };

    return (
        <div className="text-center m-5">
            <h1 className="diphylleia-regular">Welcome {store.user?.first_name}!</h1>
            <img className="divider" src={border} alt="divider" />
            <h3 className="diphylleia-regular mt-1"><strong>How frequently do you want help?</strong></h3>
            <div className="d-flex row client-services">
                <div className="col scheduler">
                    <div className="m-auto bg-white rounded p-2 calendar">
                        <p className="fs-4 m-0"><strong>Select dates</strong></p>
                        <div className="d-flex justify-content-center">
                            <div>
                                <h5>Start Date</h5>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div>
                                <h5>End Date</h5>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>
                        </div>
                    </div>
                </div>
                <p></p>
                <img className="divider m-auto" src={border} alt="divider" />
                <h3 className="diphylleia-regular mt-4"><strong>What kind of plants do you have that need care?</strong></h3>
                <div className="d-flex plant-types justify-content-center">
                    {[
                        { src: usual, label: "Standard House Plants" },
                        { src: succulents, label: "Succulents" },
                        { src: orchids, label: "Orchids" },
                        { src: carnivorous, label: "Carnivorous" },
                        { src: unusual, label: "Unusual / Rare" },
                        { src: landscape, label: "Landscape" },
                        { src: outdoors, label: "Outdoor Potted Plants" },
                        { src: veggies, label: "Vegetable Gardens" },
                    ].map((plant, index) => (
                        <div
                            key={index}
                            className={`selectPlantsClient ${selectedPlants.includes(plant.label) ? "selected" : ""}`}
                            onClick={() => handlePlantSelection(plant.label)}
                        >
                            <img className="plants img-fluid" src={plant.src} alt={plant.label} />
                            <p className={`plantLabel ${getTextColorClass(plant.label, selectedPlants)}`}><strong>{plant.label}</strong></p>
                        </div>
                    ))}
                </div>
                <img className="divider m-auto" src={border} alt="divider" />
                <h3 className="diphylleia-regular mt-4"><strong>What kind of services do you need?</strong></h3>
                <div className="d-flex justify-content-center plant-types">
                    {[
                        { src: watering, label: "Watering" },
                        { src: cleaning, label: "Cleaning" },
                        { src: pruning, label: "Pruning" },
                        { src: repotting, label: "Repotting" },
                        { src: pestControl, label: "Pest Control" },
                    ].map((service, index) => (
                        <div
                            key={index}
                            className={`selectServices ${selectedServices.includes(service.label) ? "selected" : ""}`}
                            onClick={() => handleServiceSelection(service.label)}
                        >
                            <img className="plants img-fluid" src={service.src} alt={service.label} />
                            <p className={`serviceLabel ${getTextColorClass(service.label, selectedServices)}`}><strong>{service.label}</strong></p>
                        </div>
                    ))}
                </div>
                <img className="divider m-auto" src={border} alt="divider" />
                <div className="container row mt-1 mb-5">
                    <button
                        className="btn btn-success m-auto col-2 rounded-pill"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};