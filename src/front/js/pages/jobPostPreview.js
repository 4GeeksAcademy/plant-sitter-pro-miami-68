import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import calendar from "../../img/calendar.png"
import { JobPlants } from "../component/JobPlants";
import { JobServices } from "../component/JobServices";


export const JobPost2= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [picture, setPicture] = useState(null);
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("United States");
    const [intro, setIntro] = useState("");
    const [moreAboutPlants, setMoreAboutPlants] = useState("");
    const [moreAboutServices, setMoreAboutServices] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [jobDuration, setJobDuration] = useState("");
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;
    const { job_post_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }

            const res = await actions.getJobPostById(job_post_id);
            if (res.success && res.data) {
                setStartDate(res.data.startDate);
                setEndDate(res.data.endDate);
                setAddressLine1(res.data.addressLine1);
                setAddressLine2(res.data.addressLine2);
                setCity(res.data.city);
                setState(res.data.state);
                setZipCode(res.data.zipCode);
                setCountry(res.data.country);
                setIntro(res.data.intro);
                setPicture(res.data.profile_picture_url);
                setMoreAboutPlants(res.data.moreAboutPlants);
                setMoreAboutServices(res.data.moreAboutServices);
                setExtraInfo(res.data.extraInfo);
                setJobDuration(res.data.jobDuration);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

	return (
		<div className="text-center m-2 mt-4">
            <div className="row container-fluid mt-4">
                <h1 className="mb-5 mt-3 diphylleia-regular jobs"><strong>This is how your job post will appear</strong></h1>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white mb-4"><strong>About Me</strong></h2>
                    <img 
                        className="m-auto" 
                        style={{
                            maxHeight: '250px'
                        }}
                        src={picture}
                    />
                    <div data-mdb-input-init className="form-outline form-white">
                        <h1 className="text-white mb-3 diphylleia-regular jobs"><strong>{firstName} {lastName}</strong></h1>
                        <h3 className="text-white mb-3 diphylleia-regular jobs"><strong>{city}, {state}</strong></h3>
                        <p className="fs-4 mt-4 text-white description">{intro}</p>
                        <h2 className="diphylleia-regular text-white mt-3"><strong>Services</strong></h2>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help with:</strong></label>
                        <JobServices />
                    </div>
                </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                        <h2 className="diphylleia-regular text-white"><strong>Plant Types</strong></h2>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I have these kinds of plants:</strong></label>
                        <div className="d-flex justify-content-center">
                            <JobPlants />
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>About my plants and their needs:</strong></label>
                        <div className="input-group mb-1">
                            <p className="fs-4 text-white description">{moreAboutPlants}</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>More about what I need:</strong></label>
                        <div className="input-group mb-1">
                            <p className="fs-4 text-white description">{moreAboutServices}</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>Also...</strong></label>
                        <div className="input-group mb-1">
                            <p className="fs-4 text-white description">{extraInfo}</p>
                        </div>
                    </div>
                    <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Duration</strong></h2>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help on these dates:</strong></label>
                        <div className="mt-3 mb-3">
                            <img src={calendar} className="plants img-fluid"/>  
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Other things to know about this job's duration:</strong></label>
                        <div className="input-group mb-2">
                            <p className="fs-4 text-white description">{jobDuration}</p>
                        </div>
                        <label for="basic-url" className="form-label diphylleia-regular fs-5 text-white"><strong>Lastly...</strong></label>
                        <div className="input-group mb-3">
                            <p className="fs-4 text-white description">There is a chance that my trip could be extended for a week.</p>
                        </div>
                    </div>
            </div>
            <button
                type="submit" 
                className="btn mb-3 mt-3 col-2 rounded-pill"
                onClick={
                    () => {
                        navigate('/')
                    }
                }
            >
                Submit
            </button>
        </div>
	);
};