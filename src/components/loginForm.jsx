import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import authService from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;

    try {
      await authService.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { username: ex.response.data };
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Submit")};
        </form>
      </div>
    );
  }
}

export default LoginForm;
