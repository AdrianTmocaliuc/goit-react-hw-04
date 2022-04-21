export const keyStatus = {
  loading: 'loading',
  update: 'update',
  error: 'error',
  bad: 'bad',
  results: 'results',
};

export const INITIAL_STATE = {
  images: [],
  loadMore: false,
  inputText: '',
  status: keyStatus.update,
  totalImages: 0,
};

export const initialTypes = {
  images: 'images',
  loadMore: 'loadMore',
  inputText: 'inputText',
  status: 'status',
  totalImages: 'totalImages',
  reset: 'reset',
};

export function reducer(state, action) {
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

export function init(params) {
  return { ...params };
}
