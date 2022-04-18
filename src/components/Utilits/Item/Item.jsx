import { Button } from '..';
import s from './Item.module.scss';
import PropTypes from 'prop-types';

export const Item = ({
  statistic,
  buttonText,
  handleClick,
  contactsList = {},
  removeContact,
}) => {
  const { name, number, id } = contactsList;

  return (
    <>
      {buttonText && (
        <button type="button" onClick={handleClick}>
          {buttonText}
        </button>
      )}
      {statistic && (
        <li style={{ textTransform: 'capitalize' }}>
          {statistic[0]}: {statistic[1]}
        </li>
      )}
      {name && number && (
        <li className={s.item} id={id}>
          {name}: {number}
          <Button title="Delete" onClick={removeContact} />
        </li>
      )}
    </>
  );
};

Item.propTypes = {
  statistic: PropTypes.array,
  buttonText: PropTypes.string,
  handleClick: PropTypes.func,
  contactsList: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  removeContact: PropTypes.func,
};
