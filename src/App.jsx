import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Upload from './components/Upload/Upload'
function App() {

  return (
    <>
        <Header/>
        <Hero/>
        <Upload/>
    </>
  )
}

export default App
