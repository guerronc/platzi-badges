import React from "react";
import { Link } from "react-router-dom";

import "./styles/Badges.css";
import confLogo from "../images/badge-header.svg";
import BadgesList from "../components/BadgesList";

import Api from "../api";

class Badges extends React.Component {
  state = {
    loading: true,
    error: null,
    data: {
      results: []
    },
    nextPage: 1
  };

  componentDidMount() {
    this.fetchCharacter();
  }

  fetchCharacter = async () => {
    this.setState({
      loading: true,
      error: null
    });
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        data: {
          info: data.info,
          results: [].concat(
            this.state.data.results, data.results
          )
        },
        loading: false,
        nextPage: this.state.nextPage + 1
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  render() {
    if (this.state.loading) {
      return "Loading...";
    }

    if (this.state.error) {
      return `Error: ${this.state.error.message}`;
    }

    console.log("2/4. render()");
    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>
          <BadgesList badges={this.state.data.results} />
          {
            !this.state.loading &&(
              <button className='btn btn-primary' onClick={()=>this.fetchCharacter()}>Load more</button>
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
