import React from 'react'
import { createBrowserRouter, Route, Router, Routes, } from 'react-router'
import App from './App'
import { BrowserRouter } from 'react-router'
import Home from './pages/home';
import BulughalMaram from './pages/Bulugh-al-Maram';
import BMSingleBook from './pages/BMSingleBook';
import BMMain from './pages/BM-main';
import BMSingleChapter from './pages/BMSingleChapter';
import BMSingleHadith from './pages/BMSingleHadith';
import Sahaba from './pages/Sahaba';
import SingleSahabi from './pages/SingleSahabi';


function AppRouter() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element  ={<Home/>} />
    <Route element= {<Sahaba/>}>
    <Route path='/sahaba/:sahabiSlug' element = {<SingleSahabi/>} />
    </Route>
    <Route element  ={<BulughalMaram/>} >
    <Route path='/bulugh-al-maram' element = {<BMMain/>}/>
    <Route path='/bulugh-al-maram/:bookSlug' element = {<BMSingleBook/>}/>
    <Route path='/bulugh-al-maram/:bookSlug/:chapterSlug' element = {<BMSingleChapter/>}/>
    <Route path='/bulugh-al-maram/:bookSlug/:chapterSlug/:hadithId' element = {<BMSingleHadith/>}/>
    </Route>
    <Route element = {<App/>}>
    
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter