import React from 'react'
import MainBanner from '../components/MainBanner.jsx'
import Categories from '../components/Categories.jsx'
import BestSellers from '../components/BestSellers.jsx'
import BottomBanner from '../components/BottomBanner.jsx'
import NewsLetter from '../components/NewsLetter.jsx'


const Home = () => {
    
  return (
    <div>
      <MainBanner />
      <Categories/>
      <BestSellers/>
      <BottomBanner/>
      <NewsLetter/>
    </div>
  )
}


export default Home