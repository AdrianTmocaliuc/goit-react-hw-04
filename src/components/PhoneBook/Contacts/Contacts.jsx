import PropTypes from 'prop-types';
import { Item } from 'components/Utilits';

import React from 'react';

function Contacts({ items, removeContact }) {
  return (
    <>
      <ul>
        {items &&
          items.map(item => {
            return (
              <Item
                key={item.id}
                contactsList={item}
                removeContact={removeContact}
              />
            );
          })}
      </ul>
    </>
  );
}

Contacts.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};

export default Contacts;
