import { useEffect } from 'react'

import './App.css'
import IMSAI from './components/IMSAI'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {  

  useEffect(()=>{
    console.log('Render APP');
  }, [])

  return (
    <>
      <Header />
      <div className="pc-container">
          <IMSAI />
      </div>
      <Footer />
    </>
  )
}

export default App
