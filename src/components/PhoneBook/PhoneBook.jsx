import { Section } from 'components/Utilits';
import { Component, useEffect, useState } from 'react';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import Form from './Form/Form';

import React from 'react';
const getContacts = localStorage.getItem('Contacts');

function PhoneBook() {
  const [contacts, setContacts] = useState(JSON.parse(getContacts) || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = contact => {
    const inputName = contact.name.toLowerCase();
    const names = contacts.map(item => item.name.toLowerCase());

    if (names.includes(inputName)) {
      alert(`"${contact.name}" is already in contacts !`);
      return;
    }
    setContacts([...contacts, contact]);
  };

  const removeContact = e => {
    const id = e.target.parentNode.id;

    setContacts(
      contacts.filter(elem => {
        return elem.id !== id;
      })
    );
  };

  const filterContacts = () => {
    if (contacts) {
      return contacts.filter(elem => {
        return elem.name.toLowerCase().includes(filter.toLowerCase());
      });
    }
  };

  const onFilterInput = ({ target: { value: filter } }) => {
    setFilter(filter);
  };

  return (
    <div>
      <Section title="Phonebook">
        <Form addContacts={addContacts} />
      </Section>
      <Section>
        <Filter filter={filter} onFilterInput={onFilterInput} />
      </Section>
      <Section title="Contacts">
        <Contacts items={filterContacts()} removeContact={removeContact} />
      </Section>
    </div>
  );
}

class OldPhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const getContacts = localStorage.getItem('Contacts');
    const contactsParse = JSON.parse(getContacts);
    //????????
    console.log(contactsParse);
    if (contactsParse) {
      this.setState({ contacts: contactsParse });
    }
    //????????
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = contact => {
    const { contacts } = this.state;
    const inputName = contact.name.toLowerCase();
    const names = contacts.map(item => item.name.toLowerCase());

    if (names.includes(inputName)) {
      alert(`"${contact.name}" is already in contacts !`);
      return;
    }
    this.setState({ contacts: [...contacts, contact] });
  };

  removeContact = e => {
    const id = e.target.parentNode.id;

    const { contacts } = this.state;

    // const index = contacts.map((item) => item.id).indexOf(id);
    // this.setState({ contacts: [...contacts].splice(index, 1) });

    this.setState({
      contacts: contacts.filter(elem => {
        return elem.id !== id;
      }),
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    if (contacts) {
      return contacts.filter(elem => {
        return elem.name.toLowerCase().includes(filter.toLowerCase());
      });
    }
  };

  onFilterInput = ({ target: { value: filter } }) => {
    this.setState({ filter });
  };

  render() {
    const { filter } = this.state;

    const { addContacts, filterContacts, onFilterInput, removeContact } = this;
    return (
      <>
        <div>
          <Section title="Phonebook">
            <Form addContacts={addContacts} />
          </Section>
          <Section>
            <Filter filter={filter} onFilterInput={onFilterInput} />
          </Section>
          <Section title="Contacts">
            <Contacts items={filterContacts()} removeContact={removeContact} />
          </Section>
        </div>
      </>
    );
  }
}

export default PhoneBook;
