import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import wilting from "../../img/wilting.png";
import helping from "../../img/helping.png";
import arrow from "../../img/arrow.png";
import houseplants from "../../img/houseplants2.jpg";
import PlantSitterCarousel from "../component/PlantSitterCard";
import ServicesCarousel from "../component/ServicesCarousel";
import watering from "../../img/watering.png";
import cleaning from "../../img/cleaning.png";
import pruning from "../../img/pruning.png";
import repotting from "../../img/repotting.png";
import pestControl from "../../img/pestControl.png";
import border from "../../img/border.png";
import { useNavigate } from "react-router-dom";

export const Blog = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	return (
		<div className="text-center container-fluid mt-5">
            <h1 className="diphylleia-regular blog-header mb-4"><strong>Plants in the News</strong></h1>
            <img className="divider m-auto" src={border}></img>
            <div className="d-flex justify-content-center mt-4">
                <div className="justify-content-center p-4">
                    <img className="article" src="https://www.treehugger.com/thmb/TmxYrlPJs04hipYG9fjqBCFmRRg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/touchingplantleaveswhilewatering-6350438e816a421fb34f27d930d9e17a.jpg" />
                    <a href="https://www.treehugger.com/how-water-houseplants-correctly-4858755"><h1 className="diphylleia-regular fs-2 text-center text-black">How to Water Houseplants</h1></a>
                </div>
                <div className="justify-content-center p-4">
                    <img className="article" src="https://media.npr.org/assets/img/2024/05/06/gettyimages-1231726401-6a6b355a790037f8ec7a942520b86f6eb365ed7a.jpg?s=1100&c=85&f=webp" />
                    <a href="https://www.npr.org/2024/05/06/1249310672/plant-intelligence-the-light-eaters-zoe-schlanger"><h1 className="diphylleia-regular fs-2 text-center text-black">Plants are Intelligent!</h1></a>
                </div>
                <div className="justify-content-center p-4">
                    <img className="article" src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/8815e381-94e2-4223-9a6e-275dfc2a451c/SuzanneSimard_2016T-embed.jpg?quality=89&w=600" />
                    <a href="https://ted2sub.org/talks/suzanne_simard_how_trees_talk_to_each_other"><h1 className="diphylleia-regular fs-2 text-center text-black">Trees Talk to Each Other</h1></a>
                </div>
                <div className="justify-content-center p-4">
                    <img className="article" src="https://th-thumbnailer.cdn-si-edu.com/hRAkck36UvCB0HHYqpQvz3TTCtQ=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/7f/af/7faf3de4-f6bf-4423-a4e3-5b3e29eb117b/cogongrass-imperata-cylindrica-in-bloom-in-early.jpeg" />
                    <a href="https://www.smithsonianmag.com/smart-news/worlds-worst-invasive-weed-sold-us-garden-centers-180978481/"><h1 className="diphylleia-regular fs-2 text-center text-black">Beware Buying Invasives</h1></a>
                </div>
            </div>
        </div>
	);
};

