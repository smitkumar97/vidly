import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);
    // console.log(error);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    // const errors = {};
    // const { data } = this.state;
    // if (data.username.trim() === "")
    //   errors.username = "Username is Required";
    // if (data.password.trim() === "")
    //   errors.password = "Password is Required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
    // if (error) return null;
    // return error.details[0].message;

    // if (name === "username") {
    //   if (value.trim() === "") return "Username IS Required";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password IS Required";
    // }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessege = this.validateProperty(input);
    if (errorMessege) errors[input.name] = errorMessege;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
      errors,
    });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className='btn btn-primary'>
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
