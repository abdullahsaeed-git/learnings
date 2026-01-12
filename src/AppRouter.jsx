import React, { useState } from 'react'
import { createBrowserRouter, Route, Router, Routes, } from 'react-router'
import App from './App'
import { BrowserRouter } from 'react-router'
import Home from './pages/Home';
import BulughalMaram from './pages/Bulugh-al-Maram';
import BMSingleBook from './pages/BMSingleBook';
import BMMain from './pages/BM-main';
import BMSingleChapter from './pages/BMSingleChapter';
import BMSingleHadith from './pages/BMSingleHadith';
import Sahaba from './pages/Sahaba';
import SingleSahabi from './pages/SingleSahabi';
import BMEditHadith from './pages/BMEditHadith';


function AppRouter() {

  
    const [urduText, setUrduText] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Sahaba />}>
          <Route path="/sahaba/:sahabiSlug" element={<SingleSahabi />} />
        </Route>
        <Route element={<BulughalMaram />}>
          <Route path="/bulugh-al-maram" element={<BMMain />} />
          <Route
            path="/bulugh-al-maram/:bookId"
            element={
              <BMSingleBook urduText={urduText} setUrduText={setUrduText} />
            }
          />
          <Route
            path="/bulugh-al-maram/chapter/:chapterId"
            element={
              <BMSingleChapter urduText={urduText} setUrduText={setUrduText} />
            }
          />
          <Route
            path="/bulugh-al-maram/hadith-detail/:hadithId"
            element={
              <BMSingleHadith urduText={urduText} setUrduText={setUrduText} />
            }
          />
          <Route
            path="/bulugh-al-maram/hadith-detail/:hadithId/edit"
            element={
              <BMEditHadith urduText={urduText} setUrduText={setUrduText} />
            }
          />
        </Route>
        <Route element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter