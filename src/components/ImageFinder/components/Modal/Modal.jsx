import { useEffect, useCallback } from 'react';
import s from './Modal.module.scss';
import PropTypes from 'prop-types';

import React from 'react';

function Modal({ largeImage, onClose }) {
  //useEffectSnippet

  // const backDropEvent = useCallback(() => {
  // }, []);

  const backdropCloseByEscape = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', backdropCloseByEscape);

    return () => {
      window.removeEventListener('keydown', backdropCloseByEscape);
    };
  }, [backdropCloseByEscape]);

  const closeOnBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={s.Overlay} onClick={closeOnBackDropClick}>
        <div className={s.Modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>
    </>
  );
}

export default Modal;

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
