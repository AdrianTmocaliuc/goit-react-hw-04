import Feedback from 'components/Feedback/Feedback';
import { useState } from 'react';
import { Button } from 'components/Utilits';
import { BiArrowBack } from 'react-icons/bi';

import PhoneBook from './components/PhoneBook/PhoneBook';
import ImageFinder from './components/ImageFinder/ImageFinder';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import HomePage from 'components/HomePage/HomePage';
import PublicRoute from 'components/PublicRoute/PublicRoute';

const App = () => {
  const [isView, setIsView] = useState(false);
  const navigate = useNavigate();

  const onChangeHWork = ({ target }) => {
    const text = target.textContent.toLowerCase();
    console.log('navigate', navigate);
    navigate(`/${text}`);
  };

  return (
    <>
      {isView ? (
        <nav>
          <Button title="Feedback" onClick={onChangeHWork} />
          <Button title="PhoneBook" onClick={onChangeHWork} />
          <Button title="ImageFinder" onClick={onChangeHWork} />
        </nav>
      ) : null}
      <Routes>
        <Route
          path="/"
          element={<HomePage setIsView={() => setIsView(true)} />}
        />
        <Route
          path="feedback"
          element={
            <PrivateRoute isView>
              <Feedback />
            </PrivateRoute>
          }
        />
        <Route
          path="phonebook"
          element={
            <PrivateRoute isView>
              <PhoneBook />
            </PrivateRoute>
          }
        />
        <Route
          path="imagefinder"
          element={
            <PrivateRoute isView>
              <ImageFinder />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
