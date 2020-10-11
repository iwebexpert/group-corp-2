import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import "./Profile.css";
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.style = {
      fontFamily: "Courier Prime",
      width: "100%",
      marginTop: "25px",
      display: "flex",
      justifyContent: "space-around",
      flexDirectiom: "colomn",
      height: "500px",
    };
  }

  render() {
    const { infoProfile } = this.props;
    return infoProfile ? (
      <div style={this.style}>
        <Paper
          elevation={3}
          style={{
            width: "35%",
            height: "50%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage:
              "url('https://f4.bcbits.com/img/0021680973_10.jpg')",
          }}
        ></Paper>
        <Paper elevation={3} style={{ width: "56%", height: "80%" }}>
          <div className="infoUser">
            <h1>Login: {infoProfile.name}</h1>
            <h1>Age: {infoProfile.age}</h1>
            <h1>City: {infoProfile.city}</h1>
            <h1>Main chat: {infoProfile.mainChat}</h1>
          </div>
        </Paper>
      </div>
    ) : (
      <div>Данные загружаются</div>
    );
  }
}
