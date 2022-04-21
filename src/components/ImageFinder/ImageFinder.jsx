import { useCallback, useEffect, useReducer } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PicApiPixabay from './Services/SearchImagesAPI';
import Searchbar from './components/Searchbar/Searchbar';

import ImageGallery from './components/ImageGallery/ImageGallery';
import {
  keyStatus,
  INITIAL_STATE,
  initialTypes,
  reducer,
  init,
} from './components/Reducer/Reducer';
import Loader from './components/Loader/Loader';
import s from './ImageFinder.module.scss';

const pictures = new PicApiPixabay();

function ImageFinder() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, init);

  const { images, loadMore, inputText, status, totalImages } = state;

  const actionSetImages = arrayImages => {
    return { type: initialTypes.images, payload: arrayImages };
  };

  const actionLoadMore = test => {
    return { type: initialTypes.loadMore, payload: test };
  };
  const actionStatus = payload => {
    return { type: initialTypes.status, payload };
  };
  const actionInputText = text => {
    return { type: initialTypes.inputText, payload: text };
  };
  const actionTotalImages = images => {
    return { type: initialTypes.totalImages, payload: images };
  };

  const axiosData = useCallback(async () => {
    pictures.searchQuery = inputText;
    dispatch(actionStatus(keyStatus.loading));
    const { total, totalHits, hits } = await pictures.getPics();

    dispatch(actionSetImages(hits));
    dispatch(actionLoadMore(true));
    dispatch(actionStatus(!!hits.length ? keyStatus.update : keyStatus.bad));
    dispatch(actionTotalImages(totalHits));
    if ((pictures.page = 1) && !!!inputText) {
      Notify.success(`We've got${total} results `);
    }

    if (!!hits.length && inputText) {
      Notify.success(`We've got ${totalHits} results `);
    }
  }, [inputText]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  const onSubmitForm = inputText => {
    dispatch(actionSetImages([]));
    dispatch(actionStatus(keyStatus.update));
    dispatch(actionInputText(inputText));
  };

  const onClickLoadMore = async () => {
    dispatch(actionLoadMore());
    pictures.incrementPage();
    const { totalHits, hits } = await pictures.getPics();
    const totalImages = images.length + 12;

    dispatch(actionSetImages([...images, ...hits]));
    dispatch(actionLoadMore(totalImages >= totalHits ? false : true));
  };

  return (
    <div className={s.imageFinder}>
      <Searchbar onSubmit={onSubmitForm} />
      {status === keyStatus.update && (
        <ImageGallery
          images={images}
          loadMore={loadMore}
          onClickLoadMore={onClickLoadMore}
          totalImages={totalImages}
        />
      )}
      {status === keyStatus.loading && <Loader />}
      {status === keyStatus.bad && (
        <h2 style={{ margin: ' 0 auto' }}>
          On "{inputText} " nothing found &#x2639;
        </h2>
      )}
    </div>
  );
}

export default ImageFinder;
