import React, { Component } from "react";
import axios from "axios";
import Hero from "./Hero";

class Heroes extends Component {
  state = {
    allAvengers: [],
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.allAvengers.map((avenger) => (
            <div className="col" key={avenger.id}>
              <Hero
                key={avenger.id}
                avenger={avenger}
                onDelete={() => this.deleteAvenger(avenger.id)}
                onLike={() => this.likeAvenger(avenger)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    let { data } = await axios.get(
      "https://hero-api-demo.herokuapp.com/api/heroes" // replace with your API url
    );
    console.log(data);

    let avengers = data.map((avenger) => {
      return {
        id: avenger._id,
        imgUrl: avenger.imgUrl,
        name: avenger.name,
        birthname: avenger.birthname,
        likeCount: avenger.likeCount,
        movies: avenger.movies,
      };
    });

    this.setState({ allAvengers: avengers });
  }

  async likeAvenger(avenger) {
    try {
      await axios.put(`https://hero-api-demo.herokuapp.com/api/heroes/${avenger.id}`, { // replace with your API url
        likeCount: avenger.likeCount + 1,
      });
      let allAvengers = [...this.state.allAvengers];
      let index = allAvengers.indexOf(avenger);
      allAvengers[index] = { ...avenger };
      allAvengers[index].likeCount++;
      this.setState({ allAvengers: allAvengers });
      console.log(allAvengers);
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteAvenger(heroIdToBeDeleted) {
    let newAvengersArray = this.state.allAvengers.filter(
      (avenger) => avenger.id !== heroIdToBeDeleted
    );
    console.log(newAvengersArray);
    await axios.delete(
      `https://hero-api-demo.herokuapp.com/api/heroes/${heroIdToBeDeleted}`, // replace with your API url
      {
        // replace token with the token you generated from /api/auth
        headers: {
          "x-jwt-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzU0NTJkZmUwNmY5MDc2YzlhODEzOCIsImVtYWlsIjoia3JpcGFAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTk3MzI3NjQ0fQ.hNkpJBSzvNNxWiwL84n80i-dbD3YvCwKDAkejdT2f5s",
        },
      }
    );
    this.setState({ allAvengers: newAvengersArray });
  }
}

export default Heroes;
