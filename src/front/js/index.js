//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";


//import your own components
import Layout from "./layout";

// //import chat function
import ChatApp from '../dm/DMchatApp';
import '../styles/Chat.css';


//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
// ReactDOM.render(<DMChatApp />, document.getElementById('root'));

