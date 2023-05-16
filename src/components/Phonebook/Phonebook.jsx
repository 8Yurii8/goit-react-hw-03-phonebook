import React, { Component } from 'react';

import { Filter } from './filter';

import css from './style.module.css';

import ContactList from './ContactList';

import ContactForm from './ContactForm';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = ({ name, number }) => {
    if (this.isContactExist(name, number)) {
      alert(`name ${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  isContactExist = (name, number) => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.section}>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        {contacts.length > 0 ? (
          <div>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={contacts}
              filter={filter}
              onDeleteContact={id => this.deleteContacts(id)}
            />
          </div>
        ) : (
          <p>No contacts yet.</p>
        )}
      </div>
    );
  }
}

export default Phonebook;
