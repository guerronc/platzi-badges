import React from 'react';

import { Link } from "react-router-dom";
import './styles/BadgesList.css';

class BadgesListItem extends React.Component {
  render() {

    console.log('BadgesListItemApi:', this.props.badge);
    return (
      <div className="BadgesListItem">
        <img
          className="BadgesListItem__avatar"
          src={this.props.badge.image}
          alt={`${this.props.badge.name}`}
        />

        <div>
          <strong>
            {this.props.badge.name} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.name}
          <br />
          {this.props.badge.species}
        </div>
      </div>
    );
  }
}



class BadgesList extends React.Component {
  render() {
    console.log('this.props.badges: ', this.props.badges)
    if(this.props.badges.length === 0){
      return(
        <div>
          <h3>No badges were found</h3>
          <Link className='btn btn-primary' to='/badges/new'>New</Link>
        </div>
      );
    }
    return (
      <div className="BadgesList">
        <ul className="list-unstyled">
          {this.props.badges.map(badge => {
            return (
              <li key={badge.id}>
                <BadgesListItem badge={badge} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BadgesList;
