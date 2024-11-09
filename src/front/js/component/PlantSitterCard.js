import React from "react";
import profilepic from "../../img/profilePicture.png";

const PlantSitterCard = ({ sitter }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card" style={{ backgroundColor: "rgb(70, 108, 70)", borderRadius: "15px", minHeight: "100%" }}>
                <img
                    src={sitter.profile_picture_url || profilepic}
                    alt={`${sitter.first_name} ${sitter.last_name}`}
                    className="card-img-top"
                    style={{
                        borderRadius: "25px",
                        width: "90%",
                        height: "375px",
                        objectFit: "cover",
                        margin: "auto",
                        marginTop: "20px"
                    }}
                />
                <div className="card-body">
                    <h3 className="card-title text-white diphylleia-regular fs-2">
                        <strong>{sitter.first_name} {sitter.last_name}</strong>
                    </h3>
                    <div className="card-text text-white fs-5">
                        <strong>Location:</strong> {sitter.location || 'Location not provided'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantSitterCard;



//Oneil's old code
// import React from "react";
// import "../../styles/PlantSitterCard.css";

// const PlantSitterCard = ({ name, title, image, tags }) => {
//   return (
//     <div className="plant-sitter-card">
//       <img src={image} alt={name} className="card-image" />
//       <div className="card-body">
//         <h5 className="card-name">{name}</h5>
//         <p className="card-title">{title}</p>
//         <div className="card-tags">
//           {tags && tags.map((tag, index) => (
//             <span key={index} className="badge badge-secondary">
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlantSitterCard;
