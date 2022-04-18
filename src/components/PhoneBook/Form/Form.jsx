import PropTypes from "prop-types";
import { Button } from "components/Utilits";

import { Component } from "react";
import s from "./Form.module.scss";
import { nanoid } from "nanoid";


class Form extends Component { 
  state = {
    name: "",
    number: "",
  };
  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { addContacts } = this.props;
    const { name, number } = this.state;

    const contact = { id: nanoid(), name, number };
    addContacts(contact);

    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    const { onSubmitForm, onChangeInput } = this;
    return (
      <form className={s.form} onSubmit={onSubmitForm}>
        <label>
          <h3>Name</h3>
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onChangeInput}
          />
        </label>
        <label>
          <h3>Number</h3>
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onChangeInput}
          />
        </label>
        <Button title="Add contact" />
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  addContacts: PropTypes.func.isRequired,
};
