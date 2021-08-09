import React, { Component } from 'react';
import {connect} from 'react-redux';
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

 export class Trips extends Component {
     constructor(props) {
         super(props);

         this.onTripUpdate =  this.onTripUpdate.bind(this);
         this.onTripDelete = this.onTripDelete.bind(this);
         this.onSearchChange = this.onSearchChange.bind(this);
         this.goToTrip =  this.goToTrip.bind(this);

         this.state = { 
             trips: [],
             loading : true,
             failed: false,
             error: '',
             sortValue: '',
             inputValue: '',
          };
     }

     componentDidMount(){
        this.props.getAllTrips();
     }

     componentDidUpdate(prevProps){
        if(prevProps.trips.data != this.props.trips.data){
            this.setState({trips: this.props.trips.data});
        }
     }

     onTripUpdate(id){
        const {history} = this.props;
        history.push(`/update/${id}`);
    }

    onTripDelete(id){
        const {history} = this.props;
        history.push('/delete/'+id);
    }

    goToTrip(id){
        const {history} = this.props;
        history.push('/trip/'+id);
    }

    // onSearchChange = (event) => {
    //     console.log("changed", event.target.value);
    //     this.setState({
    //         inputValue: event.target.value
    //     })
    // }
    

     renderAllTripsTable(trips) {
         return(
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
                 {
                     trips.map(trip => (
                        <tr key={trip.id}>
                            <th>{trip.name}</th>
                            <th>{trip.description}</th>
                            <th>{new Date(trip.dateStarted).toLocaleDateString()}</th>
                            <th>{trip.dateCompleted ? (new Date(trip.dateCompleted).toLocaleDateString()) : '-' }</th>
                            <th>
                                <div className="form-group">
                                    <button style={{margin:10}} onClick={() => this.onTripUpdate(trip.id)} className="btn btn-success" >
                                        Update
                                    </button>
                                    <button style={{margin:10}} onClick={() => this.onTripDelete(trip.id)} className="btn btn-danger" >
                                        Delete
                                    </button>
                                    <button style={{margin:10}} onClick={() => this.goToTrip(trip.id)} className="btn btn-primary" >
                                        View Trip
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
                                                placeholder={trip.name}
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
                        ))
                 }                
             </tbody>
         </table>
         )         
     }

        
        
  

     render() {

        // let content = this.state.loading ? (
        //     <em>Loading...</em>
        // ):
        // (
        //     this.state.failed ? (                
        //             <em className="text-danger">{this.state.error}</em>
        //     ):(
        //         this.renderAllTripsTable(this.state.trips)
        //     )
            
        // )
        let content = this.props.trips.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ):(
            this.state.trips.length && this.renderAllTripsTable(this.state.trips)
        );

        // const filteredList = 
        //     this.state.trips.filter(trip =>  {
        //         return trip.name.toLowerCase().includes(this.state.inputValue.toLowerCase());
        //     })

         return (
             <div>
                 <h1>All Trips</h1>
                 {/* <input
                    className="Search"
                    type = "text"
                    placeholder="Search Trips"
                    value = {this.state.inputValue}
                    onChange = {this.onSearchChange}
                    // trips = {this.sortValue(filteredList)}
                 />
                 <button className="btn btn-primary" >Search</button> */}
                 <div>
                     {content}
                 </div>
             </div>
         );
     }
 }
 
const mapStateToProps = ({trips}) => ({
    trips
});

export default connect(mapStateToProps, {getAllTrips})(Trips);