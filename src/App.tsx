import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import MenuPage from './pages/MenuPage';
import ItemDetailPage from './pages/ItemDetailPage';
import store from './redux/store';
import TopNavMenu from './components/TopNavMenu';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <TopNavMenu />
        {/* Include the Header here if it's global for all pages */}
        <Routes>
          <Route path="/" element={<MenuPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
