import Feedback from 'components/Feedback/Feedback';
import { Component } from 'react';
import { Button } from 'components/Utilits';
import { BiArrowBack } from 'react-icons/bi';

import PhoneBook from './components/PhoneBook/PhoneBook';
import ImageFinder from './components/ImageFinder/ImageFinder';

const TYPES_HOMEWORK_TASKS = {
  feedback: 'feedback',
  phoneBook: 'phonebook',
  imageFinder: 'imagefinder',
};

class App extends Component {
  state = {
    type: '',
  };

  onChangeHWork = ({ target }) => {
    const text = target.textContent.toLowerCase();
    this.setState({ type: text });
  };

  render() {
    const { onChangeHWork } = this;
    const { type } = this.state;
    const { feedback, phoneBook, imageFinder } = TYPES_HOMEWORK_TASKS;
    return (
      <>
        {!type && (
          <>
            <Button title="Feedback" onClick={onChangeHWork} />
            <Button title="PhoneBook" onClick={onChangeHWork} />
            <Button title="ImageFinder" onClick={onChangeHWork} />
          </>
        )}
        {type && (
          <Button
            title={<BiArrowBack />}
            onClick={() => {
              this.setState({ type: '' });
            }}
          />
        )}
        {type === feedback && <Feedback />}
        {type === phoneBook && <PhoneBook />}
        {type === imageFinder && <ImageFinder />}
      </>
    );
  }
}

export default App;
