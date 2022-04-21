import s from './ImageGalleryItem.module.scss';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(el => {
    return (
      <li key={nanoid()} id={el.largeImageURL} className={s.ImageGalleryItem}>
        <img
          data-largeimage={el.largeImageURL}
          onClick={onClick}
          className={s.ImageGalleryItem_image}
          src={el.webformatURL}
          alt={el.tags}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
