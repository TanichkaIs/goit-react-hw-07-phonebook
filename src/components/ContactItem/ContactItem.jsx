import { Item, Button } from './ContactItem.styled';
import { useDeleteContactMutation } from 'redux/contactSlice';

export const ContactItem = ({ name, phone, id }) => {
  const [deleteContact] = useDeleteContactMutation();
  return (
    <>
      <Item>
        <p>
          {name}: {phone}
        </p>
        <Button type="button" onClick={() => deleteContact(id)}>
          Delete
        </Button>
      </Item>
    </>
  );
};