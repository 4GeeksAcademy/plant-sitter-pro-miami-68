import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { ProviderProfile } from "./pages/providerProfile";
// import { ProviderPlantTypes } from "./pages/providerPlantTypes";
import { ProviderMapPage } from "./pages/providerMapPage";
import injectContext from "./store/appContext";
import { ProviderSignUp1 } from "./pages/providerSignUp1";
import { ProviderSignUp2 } from "./pages/providerSignUp2";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ProviderServices } from "./pages/providerServices";
import { ProviderProfileCompleted } from "./pages/providerProfileCompleted";
import { ClientMapPage } from "./pages/clientMapPage";
import { ClientSignUp1 } from "./pages/clientSignUp1";
import { ClientSignUp2 } from "./pages/clientSignUp2";
import { ClientServices1 } from "./pages/clientServices1";
import { JobPost1 } from "./pages/jobPost1";
import { JobPost2 } from "./pages/jobPost2";
import { SignUp } from "./component/SignUp";
import { Login } from "./component/login";
import { ViewJobs } from "./pages/viewJobs";
import { HowItWorks } from "./pages/howItWorks";
import { Blog } from "./pages/blog";

import WateringService from "./pages/WateringService";
import RepottingService from "./pages/RepottingService";
import PruningService from "./pages/PruningService";
import PestControlService from "./pages/PestControlService";
import PlantCleaningService from "./pages/PlantCleaningService";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<HowItWorks/>} path="/how-it-works" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ProviderServices />} path="/provider-services" />
                        <Route element={<ClientServices1 />} path="/client-services1" />
                        <Route element={<JobPost1 />} path="/job-post1" />
                        <Route element={<JobPost2 />} path="/job-post2" />
                        <Route element={<ProviderProfile />} path="/provider-profile" />
                        <Route element={<ProviderProfileCompleted />} path="/provider-profile-completed" />
                        <Route element={<ProviderMapPage />} path="/provider-map" />
                        <Route element={<ClientMapPage />} path="/client-map" />
                        <Route element={<ProviderSignUp1 />} path="/provider-signup1" />
                        <Route element={<ClientSignUp1 />} path="/client-signup1" />
                        <Route element={<ProviderSignUp2 />} path="/provider-signup2" />
                        <Route element={<ClientSignUp2 />} path="/client-signup2" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<ViewJobs />} path="/view-jobs" />
                        <Route element={<Blog />} path="/blog" />
                        <Route element={<WateringService />} path="/watering" />
                        <Route element={<RepottingService />} path="/repotting" />
                        <Route element={<PruningService />} path="/pruning" />
                        <Route element={<PestControlService />} path="/pestcontrol" />
                        <Route element={<PlantCleaningService />} path="/plantcleaning" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
