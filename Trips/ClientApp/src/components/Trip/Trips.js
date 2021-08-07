import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllTrips} from '../../actions/tripActions';

 export class Trips extends Component {
     constructor(props) {
         super(props);

         this.onTripUpdate =  this.onTripUpdate.bind(this);
         this.onTripDelete = this.onTripDelete.bind(this);

         this.state = { 
             trips: [],
             loading : true,
             failed: false,
             error: ''
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
                                    <button onClick={() => this.onTripUpdate(trip.id)} className="btn btn-success" >
                                        Update
                                    </button>
                                    <button onClick={() => this.onTripDelete(trip.id)} className="btn btn-danger" >
                                        Delete
                                    </button>
                                </div>
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

         return (
             <div>
                 <h1>All Trips</h1>
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