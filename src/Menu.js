import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {
    
    state = {
        places : this.props.places,
        query : '',
        filtredPlaces : [],
        allPlaces : []
    }
    
    
    updateQuery = (query) => {
        this.setState({ query })
        
        let allPlaces = this.props.places
        let filtredPlaces
        const matches = new RegExp(escapeRegExp(query), 'i');
        
        if(this.state.query && (this.state.query === '')) {
            this.setState({places: allPlaces});
            this.props.filterPlaces(filtredPlaces);
        } else {
            filtredPlaces = allPlaces.filter((place) => matches.test(place.venue.name));
            this.setState({places: filtredPlaces});
            this.props.filterPlaces(filtredPlaces);
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
                {
                    this.props.places.length > 0 && (

                    
                
                <ul> 
                
                {
                    this.props.places.map(place=> (

                        <li key={place.venue.id}>{place.venue.name}</li>
                                            
                    ))

                } 
                </ul>
                    )}
                {
                  
                    this.props.places.length === 0 && (

                    
                
                <div>Sorry!!</div>
                    )}
            </aside>
        );
    }
}
  
export default Menu;