import { Component } from 'react';
import s from './ImageGallery.module.scss';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PicApiPixabay from 'components/ImageFinder/Services/SearchImagesAPI';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { Rings } from 'react-loader-spinner';
const pictures = new PicApiPixabay();

class ImageGallery extends Component {
  state = {
    images: [],
    loading: true,
    loadMore: false,
    modalShow: false,
    largeImage: '',
  };

  async componentDidMount() {
    // console.log(await pictures.getPics());
    const { totalHits, hits } = await pictures.getPics();

    this.setState({
      images: hits,
      loading: false,
      loadMore: true,

      // loadMore: totalHits <= 3 ? false : true,
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.images);
    // console.log(this.state.images);
    if (prevProps.inputText !== this.props.inputText) {
      pictures.searchQuery = this.props.inputText;
      const { totalHits, hits } = await pictures.getPics();
      this.setState({
        images: hits,
        loading: false,
        loadMore: true,
        // loadMore: totalHits <= 25 ? false : true,
      });
    }
  }

  onClickImage = e => {
    this.setState({ modalShow: true });
    // console.dir(e.currentTarget.id);
    this.setState({ largeImage: e.currentTarget.id });
  };

  toggleModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };
  toggleLoader = () => {
    this.setState({ loader: !this.state.loadMore });
  };

  onClickLoadMore = async () => {
    this.setState({ loadMore: false });
    pictures.incrementPage();
    const { hits } = await pictures.getPics();

    this.setState({ images: [...this.state.images, ...hits], loadMore: true });
  };

  render() {
    const { loading, images, largeImage, loadMore, modalShow } = this.state;
    const { onClickLoadMore, onClickImage, toggleModal } = this;

    return (
      <>
        <ul className={s.imageGallery}>
          {!!images && (
            <ImageGalleryItem images={images} onClick={onClickImage} />
          )}
        </ul>
        {loadMore ? (
          <Button onClick={onClickLoadMore}>Load more...</Button>
        ) : (
          <Loader />
        )}
        {loading && <Loader />}
        {modalShow && <Modal onClose={toggleModal} largeImage={largeImage} />}
      </>
    );
  }
}

export default ImageGallery;
