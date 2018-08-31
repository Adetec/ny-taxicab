import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {
    

    render() {
        
      return (
        <aside className="menu">
            <h2 className="list-title">List of Taxicab services</h2>
            <div className="search-box">
                <input id="filter-input" autoFocus type="text" placeholder="Type to filter the list"></input>
                <div id="filter-button">Filter</div>
            </div>
            <ul places={this.props.places}> 
               {
                   this.props.places.map(place=> (

                       <li>{place.venue.name}</li>
                                           
                   ))

               } 
            </ul>
        </aside>
      );
    }
}
  
export default Menu;