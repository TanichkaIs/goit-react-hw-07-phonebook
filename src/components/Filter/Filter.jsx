import { Label, Input } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/contactSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const onChangeFilter = event => {
    return dispatch(setFilter(event.target.value));
  };

  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        placeholder="Enter name"
        name="filter"
        // value={filteredItems}
        onChange={onChangeFilter}
      />
    </Label>
  );
};