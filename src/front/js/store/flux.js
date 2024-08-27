const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null,
			privateData: null,
			users: [],
			plantSitters: [],
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
            signup: async (email, password, phone, first_name, last_name, address_line_1, address_line_2, city, country, zip_code) => {
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
            getUser: async (id) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
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
            updateUser: async (id, email, phone, first_name, last_name, address_line_1, address_line_2, city, country, zip_code, password = null) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
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
                            country, 
                            zip_code, 
                            password 
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

            // Delete user
            deleteUser: async (id) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
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




            // Create a new plant sitter
            createPlantSitter: async (profile_picture_url, bio, professional_experience, additional_info, preferred_plants, service_preferences) => {
                const store = getStore();
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/plant_sitters", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${store.token}`
                        },
                        body: JSON.stringify({
                            profile_picture_url,
                            bio,
                            professional_experience,
                            additional_info,
                            preferred_plants,
                            service_preferences
                        })
                    });
                    
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ plantSitter: data });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error creating plant sitter", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Update plant sitter data
            updatePlantSitter: async (id, profile_picture_url, bio, professional_experience, additional_info, preferred_plants, service_preferences) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/plant_sitter/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${store.token}`
                        },
                        body: JSON.stringify({
                            profile_picture_url,
                            bio,
                            professional_experience,
                            additional_info,
                            preferred_plants,
                            service_preferences
                        })
                    });
                    
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ plantSitter: data.plant_sitter });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error updating plant sitter", error);
                    return { success: false, error: "An unexpected error occurred" };
                }
            },

            // Get a single plant sitter by ID
            getPlantSitter: async (id) => {
                const store = getStore();
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/plant_sitter/${id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ plantSitter: data.plant_sitter });
                        return { success: true, data };
                    } else {
                        const errorData = await resp.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    console.log("Error fetching plant sitter", error);
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

			//log out
			logout: () => {
				setStore({ token: null, user: null });
				sessionStorage.removeItem('token');
			}
		}
	};
}

export default getState;