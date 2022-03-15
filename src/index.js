import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from "react-redux";
import store, { createPlace, deletePlace, loadPlaces } from './store';

class App extends Component{

    constructor(){
        super();
        this.create = this.create.bind(this);
    } 

    async componentDidMount(){
        await this.props.startUp();
    }

    async create(){
        const placeName = document.getElementById('name').value
        const placeDescription = document.getElementById('description').value;

        const newPlace = {name: placeName, description: placeDescription};

        await this.props.create(newPlace);
    }

    async destroy(place){
        await this.props.delete(place);
    }

    render(){
        const places = this.props.places;

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


const _App = connect(
    state => state,
    (dispatch)=>{
        return{
            startUp: ()=>{
                dispatch(loadPlaces());
            },
            create: (newPlace)=>{
                dispatch(createPlace(newPlace));
            },
            delete: (place)=>{
                dispatch(deletePlace(place));
            }
        }
    }
)(App);

render(<Provider store={store}><_App/></Provider>, document.querySelector('#root'));
