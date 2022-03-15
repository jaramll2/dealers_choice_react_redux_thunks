import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

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

const loadPlaces = ()=>{
    return async (dispatch)=>{
        const places = (await axios.get('/api/places')).data;
        dispatch({
            type: 'LOAD',
            places 
        })
    };
};

const createPlace = (newPlace)=>{
    return async(dispatch)=>{
        const place = (await axios.post('/api/places', newPlace)).data;
        dispatch({ 
            type: 'CREATE',
            place
        })
    };
};

const deletePlace = (place)=>{
    return async(dispatch)=>{
        await axios.delete(`/api/place/${place.id}`);
        dispatch({
            type: 'DELETE',
            place
        })
    }
};

//create store
const store = createStore(reducer,applyMiddleware(thunk));

export default store;

export {
    loadPlaces,
    createPlace,
    deletePlace
}