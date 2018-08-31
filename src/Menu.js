import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {
    
    state = {
        query : '',
        filtredPlaces : [],
        markers : []
    }
    
    hideAllMarkers = () => {
        this.props.markers.forEach(marker => {
            marker.setVisible(false);
        });
    }
    
    updateQuery = (query) => {
        this.setState({ query })
        
        const matches = new RegExp(escapeRegExp(query), 'i');
        let allPlaces = this.props.places;
        let filtredPlaces;
        
        if(this.state.query && (this.state.query === '')) {
            this.setState({filtredPlaces});
            this.props.filterPlaces(filtredPlaces);
            
        } else {
            filtredPlaces = allPlaces.filter((place) => matches.test(place.venue.name));
            this.setState({filtredPlaces});
            this.props.filterPlaces(filtredPlaces);
            this.hideAllMarkers()
            
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
                    this.state.filtredPlaces.length > 0 && (                
                        <ul>
                            {
                                this.state.filtredPlaces.map(place=> (

                                    <li key={place.venue.id}>{place.venue.name}</li>
                                                        
                                ))
                            } 
                        </ul>
                    )
                }

                {  
                    this.state.filtredPlaces.length === 0 && (
                        <div>Sorry!!</div>
                    )
                }
            </aside>
        );
    }
}
  
export default Menu;