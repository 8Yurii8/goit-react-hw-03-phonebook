import React from 'react';
import PropTypes from 'prop-types';
import css from './style.module.css';

function ContactList({ contacts, filter, onDeleteContact }) {
  const filterCor = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterCor)
  );

  return (
    <ul>
      {visibleContacts.map(contact => (
        <li key={contact.id} className={css.list}>
          {`${contact.name}: ${contact.number}  `}
          <button onClick={() => onDeleteContact(contact.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
