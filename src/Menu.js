import React, { Component } from 'react';
// Import escape string RegExp
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {
    
    state = {
        query : '',
        filtredPlaces : [],
        markers : [],
        onLoad : true,
    }
    // This will hide all markers in the map
    hideAllMarkers = () => {
        this.props.markers.forEach(marker => {
            marker.setVisible(false);
        });
    }
    //this will open infoWindow when click event is trigged
    infoWin = (id) => {
        this.props.markers.map((marker) => {
            if(marker.id === id) {
                window.google.maps.event.trigger(marker, 'click');
            }
            return marker
        });
    }

    //This will empty the text typed by user in the search input
    emptySearchQuery = () => {
        document.getElementById('filter-input').value = '';
        this.updateQuery('')
    }
    
    // This will update the list when filter is applied
    updateQuery = (query) => {
        this.setState({ query, onLoad : false })// Update the query state and remove default locations list
        this.hideAllMarkers();// Hide all markers
        const matches = new RegExp(escapeRegExp(query), 'i');// Create regExp variable
        let allPlaces = this.props.places;// Get places from parent component
        let filtredPlaces;
        // Check what user types
        if(this.state.query && (this.state.query === '')) {//Query is empty
            this.setState({filtredPlaces});//restore all places
            this.props.filterPlaces(filtredPlaces);//Call parent function to restore places
            this.setState({onLoad : true});//Display All places in the list
            
        } else {
            filtredPlaces = allPlaces.filter((place) => matches.test(place.venue.name));// Check if query matches location names
            this.setState({filtredPlaces});// Add just places that matches
            this.props.filterPlaces(filtredPlaces);// Call parent function to filter props places
            this.props.markers.filter(marker => {// Loop through each marek to filter with places
                filtredPlaces.map((place) => {// Loop through each place to check if that match
                    return marker.id === place.venue.id && marker.setVisible(true);// If true display its own marker
                    
                });
                return marker;
            });
        }
    }
    
    render() {
        
        return (
            <aside tabIndex="1" aria-label="Places list menu" className="menu">
                <h2 id="lst-title" className="list-title">List of Taxicab services</h2>
                <div className="search-box" role="group" aria-label="Search box">
                    <input id="filter-input"  type="text" role="search" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Type to filter the list"></input>
                    <div onClick={() => this.emptySearchQuery()} id="filter-button" role="button" aria-label="Reset fitltred query">x</div>
                </div>
                
                {
                    // If query is empty or page is loaded, render all places
                    this.state.onLoad === true && (                
                        <ul id="list" tabIndex="2" role="group" aria-labelledby="lst-title">
                            {
                                this.props.places.map(place=> (

                                    <li role="menuitem" aria-labelledby="list"  onClick={()=>this.infoWin(place.venue.id)} key={place.venue.id}>{place.venue.name}</li>
                                                        
                                ))
                            } 
                        </ul>
                    )
                }

                {
                    // If query matches at least one place, render filtred list
                    this.state.filtredPlaces.length > 0 && (                
                        <div>
                            <ul id="list" tabIndex="2" role="group" aria-labelledby="lst-title">
                                {
                                    this.state.filtredPlaces.map(place=> (
                                        
                                        <li onClick={()=>this.infoWin(place.venue.id)} key={place.venue.id}>{place.venue.name}</li>
                                        
                                    ))
                                } 
                            </ul>
                            {
                                // If there are more then one place, display places in plural
                                this.state.filtredPlaces.length > 1 && (
                                    <div>{this.state.filtredPlaces.length} places of {this.props.places.length}</div>
                                )
                            }
                            {
                                // If there is just one place, display place without plural
                                this.state.filtredPlaces.length === 1 && (
                                    <div>{this.state.filtredPlaces.length} place of {this.props.places.length}</div>
                                )
                            }
                            
                        </div>
                    )
                }
            </aside>
        );
    }
}
  
export default Menu;