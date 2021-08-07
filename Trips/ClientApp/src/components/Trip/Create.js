import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-router-bootstrap';

export class Create extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null
        }
    }

        onChangeName(e){
            this.setState({
                name: e.target.value
            });
        }

        onChangeDesc(e){
            this.setState({
                description: e.target.value
            });
        }

        onChangeStartDate(e){
            this.setState({
                dateStarted: e.target.value
            });
        }

        onChangeEndDate(e){
            this.setState({
                dateCompleted: e.target.value
            });
        }

        onSubmit(e){
            e.preventDefault()
            const {history} = this.props;

            let tripObject ={
                Id : Math.floor(Math.random()*1000),
                name : this.state.name,
                description : this.state.description,
                dateStarted : this.state.dateStart,
                dateCompleted : this.state.dateCompleted,
            }

            axios.post("api/Trips/AddTrip", tripObject).then(result => {
                history.push('/trips');
            })
        }

    render(){
        return(
            <div className="trip-form">
                <h3>Add new trip</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Trip name:</label>
                        <input type="text" value = {this.state.name} className="form-control" onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Trip description:</label>
                        <textarea type = "text" className="form-control" value = {this.state.description} type="text"  onChange={this.onChangeDesc} />
                    </div>
                    <div className="row">
                       <div className="col col=md-6 col-sm-6 col-xs-12">
                           <div className="form-group">
                                <label>Date started: </label>
                                <input type="date" value = {this.state.dateStarted} className="form-control" 
                                onChange={this.onChangeStartDate}
                                />                                <label>Date completed: </label>
                                <input type="date" value = {this.state.dateCompleted} className="form-control"  onChange={this.onChangeEndDate} />   
                            </div>
                       </div>
                    </div>
                    <input variant="Primary" type="submit" className="btn btn-primary" value="Add Trip" />                
                </form>
            </div>
        );
    }
}