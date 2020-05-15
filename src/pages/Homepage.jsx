import Header from "./Header";
// import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";

export default class HomePage extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {
    fetch("http://localhost:8080/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <Header
          authenticated={authenticated}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        <div>
          {!authenticated ? (
            <h1>Welcome!</h1>
          ) : (
              <div>
                <h1>You have login succcessfully!</h1>
                <h2>Welcome {this.state.user.name}!</h2>
              </div>
            )}
        </div>
        <div>
          <form action="submit">
            <textarea name="usename" placeholder="username" id="username" cols="30" rows="10"></textarea>
            <textarea name="password" placeholder="password" id="password" cols="30" rows="10"></textarea>
            <button id="localSignIn" onClick={this._handleLocalSignIn}>Sign in locally</button>
          </form>
        </div>
      </div>
    );
  }

  _handleLocalSignIn = (event) => {
     event.preventDefault();
    const username = this.username;
    const password = this.password;
    console.log(username);
    console.log(password);
    axios.post('localhost:8080/auth/login', {
      username:username,
      password:password,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
}