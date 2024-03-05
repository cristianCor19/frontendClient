import { BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import { UserProvider } from "./context/UserContext"
import { ProductProvider } from "./context/ProductContext"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PruebaPage from "./pages/PruebaPage"
import ProtectedRoute from "./ProtectedRoute"
import RecoveryPage from "./pages/RecoveryPage"
import UpdatePasswordRecovery from "./pages/UpdatePasswordRecovery"
import Portatiles from "./pages/Portatiles"
import OverviewProduct from "./pages/OverviewProduct"
import CartPage from "./pages/CartPage"
import ThanksPage from "./pages/ThanksPage"
import MonitoresPage from "./pages/MonitoresPage"
import PartesPcPage from "./pages/PartesPcPage"
import PerifericosPage from "./pages/PerifericosPage"
import ProductPage from "./pages/ProductPage"

function App(){
  
  return (
  <BrowserRouter>
    <UserProvider>
      <ProductProvider>
          
          <Navbar/>
            <div className=" bg-slate-200">
              <main className="container-main container-test-1">
                <Routes>
                  
                  <Route path='/' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/formRecovery' element={<RecoveryPage />} />
                  <Route path='/portatiles' element={<Portatiles />} />
                  <Route path='/monitores'  element={<MonitoresPage />} />
                  <Route path='/partesPc' element={<PartesPcPage />} />
                  <Route path='/perifericos' element={<PerifericosPage />} />
                  <Route path='/searchProduct' element={<ProductPage />} />
                  <Route path='/updatePasswordRecovery/:id' element={<UpdatePasswordRecovery />} />
                  <Route path='/overview/:id' element={<OverviewProduct />} />
                  <Route element={<ProtectedRoute />} >
                    <Route path='/cartPage' element={<CartPage/>} />
                    <Route path='/ThanksPurchase' element={<ThanksPage/>} />
                    <Route path='/prueba' element={<PruebaPage />} />
                  </Route>
                </Routes>

              </main>
            </div>
          
      </ProductProvider>
    </UserProvider>
  </BrowserRouter>
  )
}

export default App