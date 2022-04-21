import { Section } from 'components/Utilits';
import { useEffect, useState } from 'react';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import Form from './Form/Form';

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

export default PhoneBook;
