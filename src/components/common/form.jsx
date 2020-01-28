import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        type={type}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      ></Input>
    );
  };

  renderButton = label => {
    return <button className="btn btn-primary">{label}</button>;
  };
  handleChange = ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    data[input.name] = input.value;
    let errors = this.validateProperty(input);
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors)) {
      this.doSubmit();
    }
  };
  validateProperty = ({ name, value }) => {
    const property = { [name]: value };
    const schema = { [name]: this.schema[name] };
    let errors = {};
    const result = Joi.validate(property, schema);
    if (result.error) {
      errors = { [name]: result.error.details[0].message };
    }
    return errors;
  };

  validate = () => {
    const errors = {};
    let result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
      allowUnknown: true
    });
    if (result.error) {
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    }
    return errors;
  };

  isValid = () => !Object.keys(this.validate()).length > 0;
}

export default Form;
