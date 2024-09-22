import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

export const PlantSitterProfile = () => {
    const { id } = useParams(); // Get PlantSitter ID from URL
    const navigate = useNavigate();

    // State variables
    const [plantsitter, setPlantSitter] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [averageScore, setAverageScore] = useState(null);
    const [score, setScore] = useState(5); // Default score for new rating
    const [comment, setComment] = useState(''); // Default comment for new rating

    // Fetch PlantSitter details and ratings when component mounts
    useEffect(() => {
        // Fetch PlantSitter data
        fetch(`${process.env.BACKEND_URL}/api/plantsitters/${id}`)
            .then(response => response.json())
            .then(data => setPlantSitter(data))
            .catch(error => console.error('Error:', error));

        // Fetch Ratings
        fetch(`${process.env.BACKEND_URL}/api/plantsitters/${id}/ratings`)
            .then(response => response.json())
            .then(data => {
                setRatings(data.ratings);
                setAverageScore(data.average_score);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    // Handle form submission for rating
    const handleSubmit = e => {
        if (e.type === "keydown" && e.key !== "Enter") return
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to submit a rating.');
            navigate('/login');
            return;
        }
        fetch(`${process.env.BACKEND_URL}/api/plantsitters/${id}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ score, comment })
        })
            .then(response => {
                if (response.status === 201) {
                    alert('Rating submitted successfully.');
                    // Refresh the ratings
                    return fetch(`${process.env.BACKEND_URL}/api/plantsitters/${id}/ratings`)
                        .then(res => res.json())
                        .then(data => {
                            setRatings(data.ratings);
                            setAverageScore(data.average_score);
                        });
                } else {
                    return response.json().then(data => {
                        alert(`Error: ${data.msg}`);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container">
            {plantsitter ? (
                <>
                    <h1>{plantsitter.name}'s Profile</h1>
                    <p>Email: {plantsitter.email}</p>

                    {/* Display Average Rating */}
                    {averageScore ? (
                        <div>
                            <p>Average Rating:</p>
                            <ReactStars
                                count={5}
                                value={averageScore}
                                edit={false}
                                size={24}
                                isHalf={true}
                                activeColor="#ffd700"
                            />
                            <p>{averageScore.toFixed(1)} out of 5</p>
                        </div>
                    ) : (
                        <p>No ratings yet.</p>
                    )}

                    {/* Display List of Ratings */}
                    <h2>Ratings:</h2>
                    {ratings.length > 0 ? (
                        ratings.map(rating => (
                            <div key={rating.id} className="card mb-3">
                                <div className="card-body">
                                    <ReactStars
                                        count={5}
                                        value={rating.score}
                                        edit={false}
                                        size={20}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                    />
                                    <p className="card-text">{rating.comment}</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Submitted on {new Date(rating.timestamp).toLocaleString()}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No ratings to display.</p>
                    )}

                    {/* Rating Submission Form */}
                    <h2>Submit a Rating:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Score (1-5):</label>
                            <ReactStars
                                count={5}
                                value={score}
                                onChange={newRating => setScore(newRating)}
                                size={30}
                                isHalf={false}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Comment:</label>
                            <textarea
                                className="form-control"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit Rating
                        </button>
                    </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
