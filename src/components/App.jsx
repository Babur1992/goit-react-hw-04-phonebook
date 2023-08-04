
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactForm } from './PhoneBook/PhoneBook';
import { ContactsList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const contactsFormSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    const isInName = newContact.name.toLowerCase();
    const isDuplicate = contacts.find(
      contact => contact.name.toLowerCase() === isInName
    );

    if (isDuplicate) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const getVisibleNameFilter = () => {
    const normalFilter = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterName = getVisibleNameFilter();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={contactsFormSubmitHandler} />

      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ul>
          <ContactsList contacts={filterName} onDelContact={deleteContact} />
        </ul>
      </div>
    </div>
  );
};


