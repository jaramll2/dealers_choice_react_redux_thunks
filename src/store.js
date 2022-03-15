import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//action type
const LOAD = 'LOAD';

//reducer
const reducer = (state=[],action)=>{
    if(action.type === 'LOAD'){
        return action.places;
    }

    return state;
}

//create store
const store = createStore(reducer,applyMiddleware(thunk));

// const load = ()=> {
//     return async(dispatch)=>{
//       const places = (await axios.get('/api/places')).data;
      
//       return dispatch({
//         type: 'LOAD',
//         places: places
//       });
//     }
//   };

export default store;

// export{
//     load,
// }
