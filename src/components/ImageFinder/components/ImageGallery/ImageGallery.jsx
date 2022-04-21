import { useState } from 'react';
import s from './ImageGallery.module.scss';
import ImageGalleryItem from './../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

import React from 'react';

function ImageGallery({ images, loadMore, onClickLoadMore, totalImages }) {
  const [modalShow, setModalShow] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const onClickImage = e => {
    setModalShow(true);
    setLargeImage(e.target.dataset.largeimage);
    // console.log(e.target.dataset.largeimage);
  };

  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  return (
    <>
      <ul className={s.imageGallery}>
        <ImageGalleryItem images={images} onClick={onClickImage} />
      </ul>
      {images.length >= totalImages ? null : loadMore ? (
        <Button onClick={onClickLoadMore}>Load more...</Button>
      ) : (
        <Loader />
      )}
      {modalShow && <Modal onClose={toggleModal} largeImage={largeImage} />}
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  modalShow: PropTypes.bool,
  largeImage: PropTypes.string,
  images: PropTypes.array.isRequired,
  loadMore: PropTypes.bool.isRequired,
  totalImages: PropTypes.number.isRequired,
  onClickLoadMore: PropTypes.func.isRequired,
};
