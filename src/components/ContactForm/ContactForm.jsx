import { useState } from 'react';
import { Form, Label, Button } from './ContactForm.styled';
import { nanoid } from 'nanoid';
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from 'redux/contactSlice';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const contactItem = useGetContactsQuery();
  const contactItems = contactItem.data;
  const [addContact] = useCreateContactMutation();
  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const addNewContact = ({ name, phone }) => {
    const newContact = {
      name,
      phone,
      id: nanoid(),
    };
    console.log(contactItems);
    if (
      contactItems.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts!`);
    }
    return addContact(newContact);
  };

  const handleSubmit = event => {
    event.preventDefault();
    addNewContact({ name, phone });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}