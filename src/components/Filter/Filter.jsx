import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <>
      <p>Find Contacts by name</p>
      <input type="text" name="filter" value={value} onChange={onChange} />
    </>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
