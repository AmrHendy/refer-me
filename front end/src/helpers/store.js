import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

let initialState = {
  loggedInUser: {
    firstName: null,
    lastName: null,
    email: null,
    imagePath: null
  },

  filteredJobs: [ {
                  company: 'Google', 
                  office: {city: 'Alexandria', Country: 'Egypt'},
                  employees: [
                    {userId: 1, firstName: 'Essam', lastName: 'Khamis', position: 'CEO'},
                    {userId: 2, firstName: 'Mohamed', lastName: 'Shaban', position: 'CEO'},
                    {userId: 3, firstName: 'Essam', lastName: 'Khamis', position: 'CEO'},
                    {userId: 4, firstName: 'Mohamed', lastName: 'Shaban', position: 'CEO'},
                    ]
                  },
              ], 
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

export default store;
