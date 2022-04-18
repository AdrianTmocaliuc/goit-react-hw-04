import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import s from './ImageFinder.module.scss';

class ImageFinder extends Component {
  state = {
    inputText: '',
  };

  onSubmitForm = inputText => {
    this.setState({ inputText });
  };

  render() {
    const { inputText } = this.state;
    return (
      <div className={s.imageFinder}>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery inputText={inputText} />
      </div>
    );
  }
}

export default ImageFinder;
