import React from "react";
import profilepic from "../../img/profilePicture.png";

const PlantSitterCard = ({ sitter }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <img
                    src={sitter.profile_picture_url || profilepic}
                    alt="Plant Sitter"
                    className="card-img-top"
                />
                <div className="card-body">
                    <h3 className="card-title">
                        {sitter.first_name} {sitter.last_name}
                    </h3>
                    <p className="card-text">{sitter.location}</p>
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
