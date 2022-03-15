import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Provider } from "react-redux";
import store from './store';

class App extends Component{

    constructor(){
        super();
        this.state = {
            places: []
        };

        this.create = this.create.bind(this);
    } 

    async componentDidMount(){
        const places = (await axios.get('/api/places')).data;
        this.setState({places});
    }

    async create(){
        const placeName = document.getElementById('name').value
        const placeDescription = document.getElementById('description').value;

        const newPlace = {name: placeName, description: placeDescription};

        const place = (await axios.post('/api/places', newPlace)).data;
        const places = [...this.state.places,place];
        this.setState({places});

    }

    async destroy(place){
        await axios.delete(`/api/place/${place.id}`);
        const places = this.state.places.filter(_place=>_place.id !==place.id);
        this.setState({places});
    }

    render(){
        const places = this.state.places;

        return(
            <><div>
                <ul>
                    {places.map(place => {
                        return (<li key={place.id}> {place.name} <br></br> 
                            <button onClick={()=> this.destroy(place)}>Proven Not Haunted - Remove</button>
                         </li>);
                    })}
                </ul>
            </div>
            
            <div id="form">
                <form>
                    <label htmlFor='name'>Location: </label><br></br>
                    <input type='text' id='name' name ='name'></input><br></br>
                    <label htmlFor="description">Quick Summary:</label><br></br>
                    <input type="text" id="description" name="description"></input><br></br>
                    <input type="button" value='Want To Add A Haunted Location?' onClick={this.create}></input>
                </form>
            </div></>
        )
    };
}

render(<Provider store={store}><App/></Provider>, document.querySelector('#root'));
