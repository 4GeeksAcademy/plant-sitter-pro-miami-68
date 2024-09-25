import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import calendar from "../../img/calendar.png";
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import succulents from "../../img/succulents.jpg";
import orchids from "../../img/orchids.jpg";
import unusual from "../../img/unusual.jpg";
import carnivorous from "../../img/carnivorous.jpg";
import usual from "../../img/usual.jpg";
import landscape from "../../img/landscape.jpg";
import outdoors from "../../img/outdoors.jpg";
import veggies from "../../img/veggies.jpg";
import { JobDates } from "../component/JobDates";
import Picker from 'emoji-picker-react'; 
import io from 'socket.io-client';
import axios from 'axios';
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
// import DMchatApp from '../dm/DMchatApp'; 

export const PublishedJobPosts = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const [gifs, setGifs] = useState([]);
    const [isGifPickerVisible, setIsGifPickerVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [readReceipt, setReadReceipt] = useState({});
    const [isMediaMenuOpen, setMediaMenuOpen] = useState(false);
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
    const [jobDuration, setJobDuration] = useState("");
    const [jobServices, setJobServices] = useState([]);
    const [jobPlants, setJobPlants] = useState([]);
    const firstName = store.user?.first_name;
    const lastName = store.user?.last_name;
    const { job_post_id } = useParams();

    const profilePicUrl = store.user?.profile_picture || "default_profile_picture_url.jpg";
    const profileName = store.user?.first_name + " " + store.user?.last_name || "User";
    const lastSeen = "Last seen 2 hours ago";

    const socket = io('https://your-socket-url');

    useEffect(() => {
        socket.on('receive_message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('send_message', { message, sender: 'You' });
            setMessage(''); // Clear the input field after sending
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        console.log('Emoji Object:', emojiObject); // Debugging: log the emoji object
        if (emojiObject && emojiObject.emoji) {
            setMessage((prevMessage) => prevMessage + emojiObject.emoji); // Append the selected emoji to the message
        }
    };
    
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!store.user) {
                await actions.getUser();
            }

            const res = await actions.getJobPostById(job_post_id);
            if (res.success && res.data) {
                setStartDate(res.data.start_date);
                setEndDate(res.data.end_date);
                setAddressLine1(res.data.address_line_1);
                setAddressLine2(res.data.address_line_2);
                setCity(res.data.city);
                setState(res.data.state);
                setZipCode(res.data.zip_code);
                setCountry(res.data.country);
                setIntro(res.data.intro);
                setPicture(res.data.profile_picture_url);
                setMoreAboutPlants(res.data.more_about_your_plants);
                setMoreAboutServices(res.data.more_about_services);
                setJobDuration(res.data.job_duration);
                setJobServices(JSON.parse(res.data.service_preferences));
                setJobPlants(JSON.parse(res.data.my_plants));
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                text: message, // Contains both text and emojis
                timestamp: new Date().toLocaleTimeString(),
                senderId: store.user.id,
                isRead: false,
                type: 'text',
            };
            
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Add message to the array
            setMessage(''); // Clear the message input after sending
        }
    };
    
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const markMessagesAsRead = () => {
        const updatedMessages = messages.map((msg) => ({ ...msg, isRead: true }));
        setMessages(updatedMessages);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const chatBodyStyles = {
        flex: '1',
        overflowY: 'scroll',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        backgroundImage: `url('https://cdn.prod.website-files.com/64876ae345f1e27598fafc02/6686662215fbf514fbfb55fc_dandelion-1452219_1280.jpg')`, // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    

    const apiKey = 'YOUR_GIPHY_API_KEY'; // Replace with your Giphy API Key

    const handleSearch = async () => {
      try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
          params: {
            api_key: apiKey,
            q: searchTerm,
            limit: 10,
          },
        });
        setGifs(response.data.data);
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
    };

    const sendGif = (gifUrl) => {
        setMessages([...messages, { gifUrl, type: 'gif', senderId: 1, timestamp: new Date().toLocaleTimeString() }]);
        setIsGifPickerVisible(false); // Close the GIF picker after selection
      };


      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const fileUrl = URL.createObjectURL(file); // Create a URL for the file
          setSelectedFile(file);
          console.log("Selected file:", file);
      
          // Add the file URL to the messages array
          setMessages([...messages, { fileName: file.name, fileUrl, type: 'file', senderId: store.user.id, timestamp: new Date().toLocaleTimeString() }]);
        }
      };
      
      const emojiMapping = {
        ':smile:': '😊',
        ':thumbsup:': '👍',
        // Add more mappings as needed
    };
    
    const getEmoji = (emojiName) => {
        return emojiMapping[emojiName] || emojiName; // Return the mapped emoji or the original name if not found
    };
    

      
    return (
        <div
            className="text-center d-grid mt-4"
            style={{ minWidth: '100%', justifyContent: 'center' }}
        >
            <h1 className="mb-5 mt-3 diphylleia-regular jobs"><strong>This is how your job post will appear</strong></h1>
            <div className="row" style={{ padding: "20px", margin: "30px", border: "2px solid black", borderRadius: "15px" }}>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h1 className="text-white mb-4 diphylleia-regular jobs"><strong>{firstName} {lastName}</strong></h1>
                    <div
                        className="profile-picture m-auto mb-4"//remember to edit 
                        style={{
                            backgroundImage: picture ? `url(${picture})` : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                    </div>
                    <div data-mdb-input-init className="form-outline form-white">
                        <h2 className="diphylleia-regular text-white mb-4"><strong>Plant Owner</strong></h2>
                        <p className="fs-3">🌿</p>
                        <h3 className="text-white diphylleia-regular mt-1 mb-3 jobs">Job Location</h3>
                        <h3 className="text-white">{addressLine1}</h3>
                        <h3 className="text-white">{addressLine2}</h3>
                        <h3 className="text-white mb-5 jobs">{city}, {state} {zipCode}</h3>
                        <p className="fs-4 mt-4 bg-white text-black description">{intro}</p>
                        <h2 className="diphylleia-regular text-white mt-3"><strong>Services</strong></h2>
                        <label className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help with:</strong></label>
                        <div className="container plantImageWrapper p-0">
                            {jobServices.map((image, index) => {
                                if (image == "Watering") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={watering}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Cleaning") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={cleaning}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Pruning") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={pruning}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Repotting") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={repotting}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Pest Control") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={pestControl}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Plant Types</strong></h2>
                    <label className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I have these kinds of plants:</strong></label>
                    <div className="d-flex justify-content-center">
                        <div className="container plantImageWrapper p-0">
                            {jobPlants.map((image, index) => {
                                if (image == "Standard House Plants") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={usual}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Outdoor Potted Plants") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={outdoors}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Succulents") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={succulents}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Orchids") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={orchids}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Unusual / Rare") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={unusual}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Carnivorous") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={carnivorous}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Landscape") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={landscape}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                                if (image == "Vegetable Gardens") {
                                    return (
                                        <div className="selectPlants" key={index}>
                                            <div className="plantImageContainer plants">
                                                <img
                                                    src={veggies}
                                                    className="selectPlantsCompleted"
                                                    alt={`Picture of plant type ${image}`}
                                                />
                                            </div>
                                            <p className="text-white mb-0"><strong>{image}</strong></p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <label className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>About my plants and their needs:</strong></label>
                    <div className="input-group mb-1">
                        <p className="fs-4 bg-white text-black description">{moreAboutPlants}</p>
                    </div>
                    <label className="form-label diphylleia-regular fs-5 mt-3 text-white"><strong>More about what I need:</strong></label>
                    <div className="input-group mb-1">
                        <p className="fs-4 bg-white text-black  description">{moreAboutServices}</p>
                    </div>
                </div>
                <div className="col bckgrnd rounded p-3 m-2">
                    <h2 className="diphylleia-regular text-white"><strong>Duration</strong></h2>
                    <label className="form-label diphylleia-regular fs-5 mt-2 text-white"><strong>I need help on these dates:</strong></label>
                    <JobDates />
                    <label className="form-label diphylleia-regular fs-5 text-white"><strong>Other things to know about this job's duration:</strong></label>
                    <div className="input-group mb-2">
                        <p className="fs-4 bg-white text-black description">{jobDuration}</p>
                    </div>
                    <div className="w-100">
                        <i
                            className="fa-regular fa-message btn"
                            style={{ position: "absolute", right: "100px", fontSize: "80px" }}
                            title="This is where you will communicate with applicants"
                            onClick={toggleChat}
                        />
                    </div>

                    {isChatOpen && (
                        <div className="chat-popup" style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000,
                            width: '500px',
                            height: '600px',
                            backgroundColor: '#1f2c34',
                            border: '1px solid black',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'white',
                        }}>
                            <div className="chat-header" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                backgroundColor: 'green',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={'https://rickandmortyapi.com/api/character/avatar/1.jpeg'} alt="Profile" style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        marginRight: '10px'
                                    }} />
                                    <div>
                                        <h5 style={{ color: 'white' }}>{profileName}</h5>
                                        <p style={{ fontSize: '0.9em', color: 'lightgray' }}>{lastSeen}</p>
                                    </div>
                                </div>
                                <button onClick={toggleChat} style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    color: 'white'
                                }}>✖</button>
                            </div>

                            <div className="chat-body" style={chatBodyStyles} onClick={markMessagesAsRead}>
                                {messages.length > 0 ? (
                                    messages.map((msg, index) => {
                                        const isSender = msg.senderId === store.user.id;

                                        return (
                                            <div key={index} style={{ display: 'flex', justifyContent: isSender ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                                                <div style={{ backgroundColor: isSender ? '#dcf8c6' : '#fff', color: 'black', padding: '10px', borderRadius: '20px', maxWidth: '60%', textAlign: isSender ? 'right' : 'left', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>

                                                    {msg.type === 'file' ? (
                                                        <div>
                                                            <strong>📎 {msg.fileName}</strong>
                                                            <br />
                                                            {msg.fileName.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                                                // Show image preview for image files and make it clickable to download
                                                                <a href={msg.fileUrl} download={msg.fileName} target="_blank" rel="noopener noreferrer">
                                                                    <img src={msg.fileUrl} alt={msg.fileName} style={{ width: '100px', marginTop: '10px', cursor: 'pointer' }} />
                                                                </a>
                                                            ) : (
                                                                // Show clickable link to download the file
                                                                <a href={msg.fileUrl} download={msg.fileName} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                                                                    Download {msg.fileName}
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        // Display text and emojis here
                                                        msg.type === 'text' && <span>{msg.text}</span>

                                                    )}

                                                    <div style={{ fontSize: '0.8em', color: 'gray', marginTop: '5px' }}>
                                                        {msg.timestamp}
                                                        {msg.isRead ? ' - Read' : ' - Unread'}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>No messages yet.</p>
                                )}
                            </div>

                            <div className="chat-footer" style={{
                                marginTop: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '10px',
                                backgroundColor: '#1f2c34',
                                borderTop: '1px solid #ccc'
                            }}>
                                {isGifPickerVisible && (
                        <div className="gif-picker" style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for GIFs"
                                style={{ padding: '10px', width: '80%' }}
                            />
                            <button onClick={handleSearch} style={{ padding: '10px', marginLeft: '10px' }}>
                                Search
                            </button>

                            <div className="gif-results" style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
                                {gifs.map((gif) => (
                                    <img
                                        key={gif.id}
                                        src={gif.images.fixed_height.url}
                                        alt={gif.title}
                                        style={{ width: '100px', height: '100px', cursor: 'pointer', margin: '5px' }}
                                        onClick={() => sendGif(gif.images.fixed_height.url)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Write a message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)} // Make sure this correctly updates the message state
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        style={{
                                            flex: '1',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            backgroundColor: '#3a4a52',
                                            color: 'white',
                                            height: '40px',
                                        }}
                                    />

                                    <button
                                        style={{
                                            padding: '10px 20px',
                                            marginLeft: '10px',
                                            borderRadius: '5px',
                                            backgroundColor: message.trim() ? '#1a73e8' : '#333',
                                            color: message.trim() ? 'white' : '#555',
                                            border: 'none',
                                            cursor: message.trim() ? 'pointer' : 'not-allowed',
                                            fontSize: '16px'
                                        }}
                                        onClick={sendMessage}
                                        disabled={!message.trim()}
                                    >
                                        Send
                                    </button>
                                </div>
                                
                                {isEmojiPickerVisible && (
                                    <Picker
                                        onEmojiClick={onEmojiClick}
                                        pickerStyle={{ width: '20%', height: '20%'}} // Adjust the width of the emoji picker
                                    />
                                )}

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>

                                    <button style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#ccc',
                                        fontSize: '24px',
                                        marginRight: '10px'
                                    }} title="Attach File" onClick={() => document.getElementById('fileInput').click()}>
                                        <i className="fa fa-paperclip"></i>
                                        <input
                                            type="file"
                                            style={{ display: 'none' }} // Hide the input
                                            id="fileInput"
                                            onChange={(e) => handleFileChange(e)} // Handle file selection
                                        />
                                    </button>

                                    <button style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#ccc',
                                        fontSize: '24px',
                                        marginRight: '10px'
                                    }} title="Send GIF"
                                        onClick={() => setIsGifPickerVisible(!isGifPickerVisible)} // Toggle GIF picker visibility
                                    >
                                        GIF
                                    </button>
                                    

                                    <button style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#ccc',
                                        fontSize: '24px',
                                        marginRight: '10px'
                                    }} title="Emoji"
                                        onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)} // Toggle Emoji Picker visibility
                                    >
                                        <i className="fa fa-smile"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    

                    <button
                        title="This will be active for applicants"
                        className="apply-now"
                        type="button"
                    >
                        <strong>Apply Now</strong>
                    </button>
                </div>
            </div>
            <div className="container-fluid row mb-2">
                <div className="col-4"></div>
                <button
                    className="btn btn-success mb-3 mt-3 col-2 rounded-pill"
                    onClick={() => {
                        actions.setJobPostDetails({ id: job_post_id });
                        navigate("/client-services1");
                    }}
                >
                    Edit <i className="fas fa-pencil-alt"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-success mb-3 mt-3 col-2 rounded-pill"
                    onClick={() => navigate('/job-posts')}
                >
                    Publish
                </button>
                <div className="col-4"></div>
            </div>
        </div >
    );
};
