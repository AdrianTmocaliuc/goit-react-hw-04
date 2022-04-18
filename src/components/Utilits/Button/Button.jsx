import { Component } from 'react';
import s from './Button.module.scss';
import PropTypes from 'prop-types';

export class Button extends Component {
  state = {};
  render() {
    const { title, onClick } = this.props;
    return (
      <>
        <button className={s.button} onClick={onClick}>
          {title}
        </button>
      </>
    );
  }
}

Button.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
};
