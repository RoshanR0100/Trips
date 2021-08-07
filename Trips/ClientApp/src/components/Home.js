import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Trips Manager</h1>
        <p>Welcome to trips manager, where you can:</p>
        <ul>
          <p>Post a trip</p>
          <p>Update a trip</p>
          <p>Delete a trip</p>
          <p>View trips</p>
        </ul>
      </div>
    );
  }
}
