
import PropTypes from 'prop-types';

export const ContactsList = ({ contacts, onDelContact }) => {
  return (
    <>
      {contacts.map(({ number, name, id }) => (
        <li key={id}>
          <p>{`${name}: ${number}`}</p>
          <button
            onClick={() => {
              onDelContact(id);
            }}
          >
            delete
          </button>
        </li>
      ))}
    </>
  );
};
ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelContact: PropTypes.func.isRequired,
};
