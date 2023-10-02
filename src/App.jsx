


// import 'antd/dist/antd.css'
import {} from 'antd'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppHeader from './Components/Header'
import PageContent from './Components/Pagecontent'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppHeader/>
   <PageContent/>
   <Footer/>
      </BrowserRouter>
   
    </div>
  )
}


export default App





