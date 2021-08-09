import React, {Component} from 'react';
import axios from 'axios';
import {getAllTrips} from '../../actions/tripActions';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';


const mapContainerStyle = {
    height: "400px",
    width: "800px"
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const onLoad = ref => this.searchBox = ref;

  const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

export class SingleTrip extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        axios.get("api/Trips/SingleTrip/"+id).then(trip => {
            const response = trip.data;

            this.setState({
                name: response.name,
                description: response.description,
                dateStarted: new Date(response.dateStarted).toISOString().slice(0,10),
                dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0,10) : null
            })
        })
    }

    render(){
        return (
            <div>
                <table className="table table-striped">
             <thead>
                <tr>
                   <th>Name</th> 
                   <th>Description</th>
                   <th>Date Started</th>
                   <th>Date Completed</th>
                   <th>Action</th>
                </tr>
             </thead>
             <tbody>
                        <tr>
                            <th>{this.state.name}</th>
                            <th>{this.state.description}</th>
                            <th>{new Date(this.state.dateStarted).toLocaleDateString()}</th>
                            <th>{this.state.dateCompleted ? (new Date(this.state.dateCompleted).toLocaleDateString()) : '-' }</th>
                            <th>
                                <div className="form-group">
                                    <button onClick={() => this.onTripUpdate(this.state.id)} className="btn btn-success" >
                                        Update
                                    </button>
                                    <button onClick={() => this.onTripDelete(this.state.id)} className="btn btn-danger" >
                                        Delete
                                    </button>
                                </div>
                            </th>
                            <th>
                                <LoadScript
                                    googleMapsApiKey="AIzaSyAbMaXGZ9HciFSq6gJc_Fn0oi9-gNFpQV0"
                                    libraries = "places"
                                >                                    
                                        <GoogleMap
                                            id="searchbox-example"
                                            mapContainerStyle={mapContainerStyle}
                                            zoom={2.5}
                                            center={center}
                                        >
                                            <StandaloneSearchBox
                                            onLoad={onLoad}
                                            onPlacesChanged={
                                                onPlacesChanged
                                            }
                                            >
                                            <input
                                                type="text"
                                                placeholder={this.state.name}
                                                style={{
                                                boxSizing: `border-box`,
                                                border: `1px solid transparent`,
                                                width: `240px`,
                                                height: `32px`,
                                                padding: `0 12px`,
                                                borderRadius: `3px`,
                                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                                fontSize: `14px`,
                                                outline: `none`,
                                                textOverflow: `ellipses`,
                                                position: "absolute",
                                                left: "50%",
                                                marginLeft: "-120px"
                                                }}
                                            />
                                            </StandaloneSearchBox>
                                        </GoogleMap>
                                                                                                            
                                </LoadScript>
                            </th>
                        </tr>                             
             </tbody>
         </table>
            </div>
        )
    }
}