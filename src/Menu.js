import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {

    state = {
        query : '',
        filtredPlaces : [],
        allPlaces : []
    }
    

    updateQuery = (query) => {
        this.setState({ query })
        
        let allPlaces = this.props.places
        let filtredPlaces

        if(this.state.query && (this.state.query !== '')) {
            const matches = new RegExp(escapeRegExp(query), 'i');
            filtredPlaces = allPlaces.filter((place) => matches.test(place.venue.name))
            this.setState({places: filtredPlaces})
        } else {
            this.setState({places: allPlaces})
        }
    }

    render() {

        
        
        return (
            <aside className="menu">
                <h2 className="list-title">List of Taxicab services</h2>
                <div className="search-box">
                    <input id="filter-input" autoFocus type="text" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Type to filter the list"></input>
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