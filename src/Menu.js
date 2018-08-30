import React, { Component } from 'react';


class Menu extends Component {
    render() {
      return (
        <aside className="menu">
            <h2 className="list-title">List of Taxicab services</h2>
            <div className="search-box">
                <input id="filter-input" autoFocus type="text" placeholder="Type to filter the list"></input>
                <button id="filter-button">Filter</button>
            </div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
            </ul>
        </aside>
      );
    }
}
  
export default Menu;