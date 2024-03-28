import React from 'react'
import Hero from '../components/hero/Hero'
import Popular from '../components/popular/Popular'
import Offers from '../components/offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import { useState, useRef } from 'react'
import Slider from '../components/Sliders/Slider'

function Shop() {

  const newCollectionsRef = useRef(null);
  const [showNewCollections, setShowNewCollections] = useState(false)

  const navigateToNewCollections = () => {
    setShowNewCollections(true);
    if (newCollectionsRef.current) {
      newCollectionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
       <Hero navigateToNewCollections={navigateToNewCollections} />
      <Popular/>
      <Offers/>
      <div ref={newCollectionsRef}>
        {showNewCollections && <NewCollections />}
      </div>
      <NewsLetter/>
      
    </div>
  )
}

export default Shop