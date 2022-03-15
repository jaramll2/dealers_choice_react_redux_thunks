import { createStore, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';
//import axios from 'axios';

const initialState = {
    places: []
}

const LOAD = 'LOAD';
const CREATE = 'CREATE';
const DELETE = 'DELETE';

const reducer = (state = initialState,action)=>{
    if(action.type === LOAD){
        state = {...state, places: action.places};
    }
    if(action.type === CREATE){
        state = {...state, places: [...state.places, action.place]};
    }
    if(action.type === DELETE){
        const places = state.places.filter(_place=>_place.id !==action.place.id);
        state = {...state,places};
    }
    return state;
};

//create store
const store = createStore(reducer);

export default store;
