import React, { useState, useEffect } from "react";
import getState from "./flux.js";
import { jwtDecode } from "jwt-decode";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * EDIT THIS!
			 * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
			 * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
			 * store, instead use actions, like this:
			 **/
			state.actions.getMessage(); // <---- calling this function from the flux.js actions
			handleTokenRefresh();
		}, []);

		    // Function to handle the token refresh process
			const handleTokenRefresh = () => {
				const token = sessionStorage.getItem("token");
				if (token) {
				  const decodedToken = jwtDecode(token);
				  const expirationTime = decodedToken.exp * 1000;
		  
				  const currentTime = Date.now();
				  const timeLeft = expirationTime - currentTime;
		  
				  if (timeLeft > 0) {
					setTimeout(() => {
					  state.actions.refreshAccessToken();
					}, timeLeft - 60000);
				  } else {
					state.actions.logout();
				  }
				}
			  };

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;

function PlantSitterCard() {
  const [plantSitters, setPlantSitters] = useState([]);

  useEffect(() => {
    // Fetch data from an API
    fetch('/api/plant-sitters')
      .then(response => response.json())
      .then(data => setPlantSitters(data));
  }, []);

  return (
    <div>
      {plantSitters.map(sitter => (
        <div key={sitter.id}>
          {/* Render sitter information */}
        </div>
      ))}
    </div>
  );
}
};

export default injectContext;