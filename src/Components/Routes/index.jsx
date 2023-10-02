import {Routes,Route} from 'react-router-dom'
import Home from '../../Pages/Home'
import Category from '../../Pages/Category'

const AppRoutes=()=>{
return (
    
    <Routes>
        <Route path='/' element={<Category/>} ></Route>
        <Route path='/:categoryId' element={<Category/>} ></Route>
    </Routes>
   
)
}

export default AppRoutes