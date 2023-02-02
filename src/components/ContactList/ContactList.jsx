import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

export const ContactList = ({ contacts }) => {
  const contactItems = useSelector(state => state.filter.value);
  const normalizedItems = contactItems.toLowerCase();
  const currentContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(normalizedItems)
  );

  return (
    <ul>
      {currentContacts.map(({ name, phone, id }) => {
        return <ContactItem key={nanoid()} name={name} phone={phone} id={id} />;
      })}
    </ul>
  );
};

ContactList.propTypes = {
  currentContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};