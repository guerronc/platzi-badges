import React, { Component } from "react";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import api from "../api";
import BadgeDetails from "./BadgeDetails";

class BadgeDetailsContainer extends Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const {
        match: {
          params: { badgeId }
        }
      } = this.props;

      this.setState({
        loading: true,
        error: null
      });

      const data = await api.badges.read(badgeId);

      this.setState({
        loading: false,
        data: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  handleOpenModal = e => {
    this.setState({
      modalIsOpen: true
    });
  };

  handleCloseModal = e => {
    this.setState({
      modalIsOpen: false
    });
  };

  handleDeleteBadge = async e => {
    try {
      const {
        match: {
          params: { badgeId }
        }
      } = this.props;

      this.setState({
        loading: true,
        error: null
      });

      await api.badges.remove(badgeId);

      this.props.history.push('/badges');

      this.setState({
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  render() {
    console.log("State:", this.state);
    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    const { data } = this.state;

    return (
      <BadgeDetails
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteBadge={this.handleDeleteBadge}
        data={data}
      />
    );
  }
}

export default BadgeDetailsContainer;
