const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null,
			privateData: null,
			users: [],
			plantSitters: [],
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
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
                        setStore({ token: data.access_token });
                        sessionStorage.setItem("token", data.access_token);
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
                        setStore({ token: data.access_token });
                        sessionStorage.setItem("token", data.access_token);
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
                extraInfo,
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
                formData.append("extra_info", extraInfo);
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


            // Fetch a specific job post by ID
            getJobPostById: async (job_post_id) => {
                const token = sessionStorage.getItem("token");
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/job_posts/${job_post_id}`, {
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