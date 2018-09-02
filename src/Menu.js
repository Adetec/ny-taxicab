import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {
    
    state = {
        query : '',
        filtredPlaces : [],
        markers : [],
        onLoad : true,
        notFound : 'Sorry, not found !'
    }
    
    hideAllMarkers = () => {
        this.props.markers.forEach(marker => {
            marker.setVisible(false);
        });
    }

    infoWin = (id) => {
        this.props.markers.map((marker) => {
            if(marker.id === id) {
                window.google.maps.event.trigger(marker, 'click');
            }
            return marker
        });
    }
    emptySearchQuery = () => {
        document.getElementById('filter-input').value = '';
        this.updateQuery('')
    }
    
    updateQuery = (query) => {
        this.setState({ query, onLoad : false })
        this.hideAllMarkers();
        const matches = new RegExp(escapeRegExp(query), 'i');
        let allPlaces = this.props.places;
        let filtredPlaces;
        
        if(this.state.query && (this.state.query === '')) {
            this.setState({filtredPlaces});
            this.props.filterPlaces(filtredPlaces);
            this.setState({onLoad : true})
            
        } else {
            filtredPlaces = allPlaces.filter((place) => matches.test(place.venue.name));
            this.setState({filtredPlaces});
            this.props.filterPlaces(filtredPlaces);
            this.props.markers.filter(marker => {
                    filtredPlaces.map((place) => {
                        return marker.id === place.venue.id && marker.setVisible(true);
                        
                    });
                    return marker;
                });
            
        }
    }
    
    render() {
        
        return (
            <aside className="menu">
                <h2 className="list-title">List of Taxicab services</h2>
                <div className="search-box">
                    <input id="filter-input" autoFocus type="text" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Type to filter the list"></input>
                    <div onClick={() => this.emptySearchQuery()} id="filter-button">x</div>
                </div>
                
                {
                    this.state.onLoad === true && (                
                        <ul>
                            {
                                this.props.places.map(place=> (

                                    <li onClick={()=>this.infoWin(place.venue.id)} key={place.venue.id}>{place.venue.name}</li>
                                                        
                                ))
                            } 
                        </ul>
                    )
                }

                {
                    this.state.filtredPlaces.length > 0 && (                
                        <div>
                            <ul>
                                {
                                    this.state.filtredPlaces.map(place=> (
                                        
                                        <li onClick={()=>this.infoWin(place.venue.id)} key={place.venue.id}>{place.venue.name}</li>
                                        
                                    ))
                                } 
                            </ul>
                            {
                                this.state.filtredPlaces.length > 1 && (
                                    <div>{this.state.filtredPlaces.length} places of {this.props.places.length}</div>
                                )
                            }
                            {
                                this.state.filtredPlaces.length === 1 && (
                                    <div>{this.state.filtredPlaces.length} place of {this.props.places.length}</div>
                                )
                            }
                            
                        </div>
                    )
                }
                {  
                    this.state.filtredPlaces === 0 && (
                        <div>{this.notFound}</div>
                    )
                }

            </aside>
        );
    }
}
  
export default Menu;