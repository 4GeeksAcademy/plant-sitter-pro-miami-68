import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const ViewPlantSitterProfile = () => {
    const { actions } = useContext(Context);
    const { sitterId } = useParams();
    const [sitter, setSitter] = useState(null);

    useEffect(() => {
        const fetchSitter = async () => {
            const response = await actions.getPlantSitterById(sitterId);
            if (response.success) {
                setSitter(response.data);
            } else {
                console.log("Error fetching sitter data");
            }
        };

        fetchSitter();
    }, [sitterId]);

    if (!sitter) return <p>Loading...</p>;

    return (
        <div className="text-center m-2">
            <h1>{sitter.first_name} {sitter.last_name}</h1>
        </div>
    );
};