const keyStatus = {
  loading: 'loading',
  update: 'update',
  error: 'error',
  bad: 'bad',
  results: 'results',
};

const INITIAL_STATE = {
  images: [],
  loadMore: false,
  inputText: '',
  status: keyStatus.update,
  totalImages: 0,
};

const initialTypes = {
  images: 'images',
  loadMore: 'loadMore',
  inputText: 'inputText',
  status: 'status',
  totalImages: 'totalImages',
  reset: 'reset',
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case initialTypes.images:
      return { ...state, images: [...payload] };
    case initialTypes.loadMore:
      return { ...state, loadMore: payload };
    case initialTypes.status:
      return { ...state, status: payload };
    case initialTypes.inputText:
      return { ...state, inputText: payload };
    case initialTypes.totalImages:
      return { ...state, totalImages: payload };
    case initialTypes.reset:
      return INITIAL_STATE;

    default:
      break;
  }
}

function init(params) {
  return { ...params };
}

export { INITIAL_STATE, initialTypes, keyStatus, reducer, init };
