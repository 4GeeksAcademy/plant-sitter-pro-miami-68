const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: sessionStorage.getItem("token") || null,
            privateData: null,
            users: [],
            plantSitters: [],
            appliedJobs: [],
            jobPostDetails: [],
            jobPost: null,
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            },


            logToken: (access_token) => {
                setStore({ token: access_token });
                sessionStorage.setItem("token", access_token);
            },


            // Sign up a new user
            signup: async (email, password, phone, first_name, last_name, address_line_1, address_line_2, city, state, country, zip_code) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password,
                            phone,
                            first_name,
                            last_name,
                            address_line_1,
                            address_line_2,
                            city,
                            state,
                            country,
                            zip_code
                        })
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        getActions().logToken(data.access_token)
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error signing up", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            //E-mail verification
            verifyEmail: async (token) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/verify/${token}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await resp.json();
                    if (resp.ok) {
                        return { success: true, data };
                    } else {
                        return { success: false, error: data.error };
                    }
                } catch (error) {
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            resetPassword: async (token, new_password) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/reset_password`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token, new_password })
                    });
                    const data = await resp.json();
                    if (resp.ok) {
                        return { success: true, data };
                    } else {
                        return { success: false, error: data.error };
                    }
                } catch (error) {
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            // Log in an existing user
            login: async (email, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
                    if (resp.ok) {
                        const data = await resp.json();

                        getActions().logToken(data.access_token)

                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error logging in", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Get current user data
            getUser: async () => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ user: data });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error fetching user data", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Update user data
            updateUser: async (email, phone, first_name, last_name, address_line_1, address_line_2, city, state, country, zip_code) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${store.token}`
                        },
                        body: JSON.stringify({
                            email,
                            phone,
                            first_name,
                            last_name,
                            address_line_1,
                            address_line_2,
                            city,
                            state,
                            country,
                            zip_code,
                        })
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ user: data.user });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error updating user", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            //change Plant Sitter password
            updatePassword: async (currentPassword, newPassword) => {
                const store = getStore();
                const token = sessionStorage.getItem("token");

                // Check if the token is available
                if (!token) {
                    return { success: false, error: "You are not logged in." };
                }

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            current_password: currentPassword,
                            new_password: newPassword
                        })
                    });

                    const result = await response.json();
                    if (response.ok) {
                        return { success: true };
                    } else {
                        return { success: false, error: result.error || "Unable to update password" };
                    }
                } catch (error) {
                    console.error("Error updating password:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Delete user
            deleteUser: async () => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });
                    if (resp.ok) {
                        setStore({ token: null, user: null });
                        sessionStorage.removeItem('token');
                        return { success: true };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error deleting user", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            // Create or update plant sitter
            createOrUpdatePlantSitter: async (
                profile_picture,
                professional_experience,
                preferred_plants,
                service_preferences,
                intro,
                current_plants,
                client_info,
                extra_info
            ) => {
                const store = getStore();
                const token = sessionStorage.getItem("token");

                const body = {
                    professional_experience,
                    preferred_plants,
                    service_preferences,
                    intro,
                    current_plants,
                    client_info,
                    extra_info
                };

                if (profile_picture) {
                    body.profile_picture = profile_picture;
                }

                try {
                    let resp;
                    if (store.plantSitter && store.plantSitter.id) {
                        resp = await fetch(`${process.env.BACKEND_URL}/api/plant_sitter`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify(body)
                        });
                    } else {
                        resp = await fetch(`${process.env.BACKEND_URL}/api/plant_sitters`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify(body)
                        });
                    }

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ plantSitter: data });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error creating/updating plant sitter:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Get a single plant sitter
            getPlantSitter: async () => {
                const store = getStore();
                const token = sessionStorage.getItem("token");

                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/plant_sitter`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ plantSitter: data });
                        return { success: true, data };
                    } else if (resp.status === 404) {
                        return { success: false, error: "Plant sitter not found" };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error || "Error fetching plant sitter" };
                    }
                } catch (error) {
                    console.error("Error fetching plant sitter:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Get all plant sitters
            getAllPlantSitters: async () => {
                const store = getStore();
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/plant_sitters", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ plantSitters: data.plant_sitters });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error fetching plant sitters", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Delete plant sitter
            deletePlantSitter: async (id) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/plant_sitter/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });
                    if (resp.ok) {
                        const updatedSitters = store.plantSitters.filter(sitter => sitter.id !== id);
                        setStore({ plantSitters: updatedSitters });
                        return { success: true };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error deleting plant sitter", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            //Search Plant Sitter using zipcode
            searchSitters: async (zipCode) => {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/search-sitters`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ zip_code: zipCode }),
                    });
                    const data = await res.json();
                    if (data.success) {
                        setStore({ sitters: data.data });
                        return { success: true };
                    } else {
                        return { success: false };
                    }
                } catch (error) {
                    console.error("Error searching sitters:", error);
                    return { success: false };
                }
            },

            //get plantsitter by id
            getPlantSitterById: async (id) => {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/plant_sitter/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await res.json();
                    if (res.ok) {
                        return { success: true, data };
                    } else {
                        console.error("Failed to fetch plant sitter by ID");
                        return { success: false };
                    }
                } catch (error) {
                    console.error("Error fetching plant sitter:", error);
                    return { success: false };
                }
            },

            // Fetch a specific plant sitter by ID without a token
            getPlantSitterByIdPublic: async (sitter_id) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/plant_sitters/${sitter_id}`, {
                        method: "GET"
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ plantSitters: data });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error fetching plant sitter:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            //save JobPost Details
            setJobPostDetails: (details) => {
                setStore({ jobPostDetails: details });
            },

            // Create JobPost
            createJobPost: async (
                startDate,
                endDate,
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                country,
                selectedServices,
                selectedPlants,
                intro,
                picture,
                moreAboutPlants,
                moreAboutServices,
                jobDuration
            ) => {
                const store = getStore();
                const token = sessionStorage.getItem("token");

                const formData = new FormData();
                formData.append("start_date", startDate);
                formData.append("end_date", endDate);
                formData.append("address_line_1", addressLine1);
                formData.append("address_line_2", addressLine2 || "");
                formData.append("city", city);
                formData.append("state", state);
                formData.append("zip_code", zipCode);
                formData.append("country", country || "United States");
                formData.append("service_preferences", JSON.stringify(selectedServices));
                formData.append("my_plants", JSON.stringify(selectedPlants));
                formData.append("intro", intro);
                formData.append("more_about_plants", moreAboutPlants);
                formData.append("more_about_services", moreAboutServices);
                formData.append("job_duration", jobDuration);

                if (picture) {
                    formData.append("profile_picture", picture);
                }

                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/job_posts", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        body: formData
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error creating job post:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            //Update JobPost
            updateJobPost: async (
                jobPostId,
                startDate,
                endDate,
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                country,
                selectedServices,
                selectedPlants,
                intro,
                picture,
                moreAboutPlants,
                moreAboutServices,
                jobDuration
            ) => {
                const store = getStore();
                const token = sessionStorage.getItem("token");
            
                const formData = new FormData();
                formData.append("start_date", startDate);
                formData.append("end_date", endDate);
                formData.append("address_line_1", addressLine1);
                formData.append("address_line_2", addressLine2 || "");
                formData.append("city", city);
                formData.append("state", state);
                formData.append("zip_code", zipCode);
                formData.append("country", country || "United States");
                formData.append("service_preferences", JSON.stringify(selectedServices));
                formData.append("my_plants", JSON.stringify(selectedPlants));
                formData.append("intro", intro);
                formData.append("more_about_plants", moreAboutPlants);
                formData.append("more_about_services", moreAboutServices);
                formData.append("job_duration", jobDuration);
            
                if (picture) {
                    formData.append("profile_picture", picture);
                }
            
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${jobPostId}`, {
                        method: "PUT",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        body: formData
                    });
            
                    if (resp.ok) {
                        const data = await resp.json();
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error updating job post:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },
            // Delete Job Post
            deleteJobPost: async (job_post_id) => {
                // Retrieve the token from sessionStorage
                const token = sessionStorage.getItem("token");
                
                // Check if token exists; if not, log an error and return an appropriate response
                if (!token) {
                    console.error("Token is missing from sessionStorage.");
                    return { success: false, error: "No token found, unable to delete the job post." };
                }
            
                // Proceed to try-catch block for the API request
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${job_post_id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json", // Added this header for completeness
                        },
                    });
            
                    if (resp.ok) {
                        const data = await resp.json();
                        const store = getStore();
                        const updatedJobPosts = store.jobPostDetails.filter(post => post.id !== job_post_id);
                        setStore({ jobPostDetails: updatedJobPosts });
            
                        return { success: true, message: "Job post deleted successfully" };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error || "Failed to delete job post" };
                    }
                } catch (error) {
                    console.error("Error deleting job post:", error);
                    return { success: false, error: "An unexpected error occurred while deleting the job post." };
                }
            },
            
            

            //get the jobpost of the current user
            getUserOwnedJobs: async () => {
                const token = sessionStorage.getItem("token");
                if (!token) return { success: false, message: "User not logged in" };
            
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/job_posts/user`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
            
                    if (!res.ok) {
                        const errorData = await res.json();
                        return { success: false, message: errorData.message };
                    }
            
                    const data = await res.json();
                    return { success: true, data: data };
                } catch (error) {
                    console.error("Error fetching user job posts", error);
                    return { success: false, message: "There was an error fetching job posts" };
                }
            },


            // Fetch a specific job post by ID
            getJobPostById: async (job_post_id) => {
                const token = sessionStorage.getItem("token");
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts_with_token/${job_post_id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ jobPost: data });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error fetching job post:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            // Fetch a specific job post by ID without a token
            getJobPostByIdPublic: async (job_post_id) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${job_post_id}`, {
                        method: "GET"
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ jobPost: data });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error fetching job post:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            clearJobPostId: async () => {
                const store = getStore()
                console.log(store.jobPostDetails, "clear jobpost id log in jobpost details from the store");
                setStore({jobPostDetails: null})
            },

            
            

            // // Fetch all job posts
            // getJobPosts: async () => {
            //     const token = sessionStorage.getItem("token");
            //     try {
            //         const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts`, {
            //             method: "GET",
            //             headers: {
            //                 "Authorization": `Bearer ${token}`,
            //             },
            //         });

            //         if (resp.ok) {
            //             const data = await resp.json();
            //             return { success: true, data };
            //         } else {
            //             const errorData = await resp.json();
            //             return { success: false, error: errorData.error };
            //         }
            //     } catch (error) {
            //         console.error("Error fetching job posts:", error);
            //         return { success: false, error: "An unexpected error occurred" };
            //     }
            // },

            //Fetch all job posts for the current user
            getUserJobPosts: async () => {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/job_posts/user`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });
                    const data = await res.json();
                    if (res.ok) {
                        return { success: true, data };
                    } else {
                        return { success: false, message: data.message };
                    }
                } catch (error) {
                    console.error("Error fetching job posts:", error);
                    return { success: false, message: "Error fetching job posts." };
                }
            },

            //Search jobpost using zip code
            searchJobPosts: async (zipCode, distance) => {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/search-job-posts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ zip_code: zipCode, distance: distance }),
                    });
                    
                    if (res.ok) {
                        const data = await res.json();
                        setStore({ jobPosts: data.data });
                        return { success: true };
                    } else {
                        return { success: false };
                    }
                } catch (error) {
                    console.error("Error searching job posts:", error);
                    return { success: false };
                }
            },

            //search for jobposts in provider landing page
            searchJobPostsInSession: async (zipCode, distance) => {
                const token = sessionStorage.getItem("token");
            
                if (!token) {
                    return { success: false, error: "You are not logged in." };
                }
            
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/api/search-job-posts-insession`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ zip_code: zipCode, distance: distance }),
                    });
            
                    if (res.ok) {
                        const data = await res.json();
                        setStore({ jobPosts: data.data });
                        return { success: true };
                    } else {
                        const errorData = await res.json();
                        return { success: false, error: errorData.message || "Error searching job posts" };
                    }
                } catch (error) {
                    console.error("Error searching job posts:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Fetch owned jobs
            getUserOwnedJobs: async () => {
                const token = sessionStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user/owned-jobs`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    return { success: true, data };
                } catch (error) {
                    console.error("Error fetching owned jobs:", error);
                    return { success: false, error: "Failed to fetch owned jobs" };
                }
            },

            //apply for a jobpost as a plantsitter
            applyForJob: async (jobPostId) => {
                const token = sessionStorage.getItem("token");
            
                if (!token) {
                    return { success: false, error: "You are not logged in." };
                }
            
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/jobs/${jobPostId}/accept`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
            
                    if (resp.ok) {
                        const data = await resp.json();
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error applying for job:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            // Fetch the jobs that the plant sitter has applied for
            getUserAppliedJobs: async () => {
                const token = sessionStorage.getItem("token");
            
                if (!token) {
                    return { success: false, error: "You are not logged in." };
                }
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user/applied-jobs`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        return { success: true, data };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error fetching applied jobs:", error);
                    return { success: false, error: "An unexpected error occurred." };
                }
            },

            //Checks the assigment of an application for a jobpost
            checkAssignment: async (job_post_id) => {
                try {
                    const token = sessionStorage.getItem("token");
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${job_post_id}/check_assignment`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    if (resp.ok) {
                        const data = await resp.json();
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error checking assignment:", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            //Fetch applicants for a job post
            getJobApplicants: async (jobPostId) => {
                const token = sessionStorage.getItem("token");
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/jobs/${jobPostId}/applicants`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        return { success: true, data };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.message || "Error fetching applicants" };
                    }
                } catch (error) {
                    return { success: false, error: "An error occurred while fetching applicants" };
                }
            },

            // Update job assignment status
            updateAssignmentStatus: async (assignmentId, status) => {
                const token = sessionStorage.getItem("token");

                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${assignmentId}/update-status`, {
                        method: "PUT",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ status })
                    });
                    if (resp.ok) {
                        return { success: true };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    return { success: false, error: "An unexpected error occurred" };
                }
            },


            // Fetch job assignment for job owner
            getAssignmentForOwner: async (jobPostId) => {
                const token = sessionStorage.getItem("token");
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${jobPostId}/owner_assignment`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        return { success: true, data };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error fetching assignment for owner:", error);
                    return { success: false, error: "An unexpected error occurred." };
                }
            },


            // Mark job assignment as completed
            markJobAsCompleted: async (assignmentId) => {
                const token = sessionStorage.getItem("token");

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${assignmentId}/mark-completed`, {
                        method: "PUT",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return { success: true, data };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error marking job as completed:", error);
                    return { success: false, error: "An unexpected error occurred." };
                }
            },


            getUserCompletedJobs: async () => {
                const token = sessionStorage.getItem("token");
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user/completed-jobs`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        return { success: true, data };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.error("Error fetching completed jobs:", error);
                    return { success: false, error: "An unexpected error occurred." };
                }
            },


            //refresh token
            refreshAccessToken: async () => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/refresh`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ token: data.access_token });
                        sessionStorage.setItem("token", data.access_token);
                    } else {
                        console.error("Error refreshing token");
                    }
                } catch (error) {
                    console.error("Error refreshing token:", error);
                }
            },


            //log out
            logout: () => {
                setStore({ token: null, user: null, plantSitter: null });
                sessionStorage.removeItem('token');
            }
        }
    };
}

export default getState;
