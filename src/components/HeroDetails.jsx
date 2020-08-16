import React, { Component } from "react";

class HeroDetails extends Component {
  render() {
    return (
      <div>
        <h1>Hero Details - {this.props.match.params.id} </h1>
        <button onClick={this.goHome}>Go Home</button>
      </div>
    );
  }

  goHome = () => {
    this.props.history.push("/");
  };
}

export default HeroDetails;
