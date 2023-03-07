import { Routes,Route, BrowserRouter } from 'react-router-dom';
import RegisterClient from './pages/registerClient';
import RegisterShop from './pages/registerShop';
import AllShops from './pages/allShops';
import LoginShop from './pages/loginShop';
import LoginClient from './pages/loginClient';
import LastOrdersShop from './pages/lastOrders';
import MyOrdersClient from './pages/lastOrdersClient';
import Client from './pages/client';
import Shop from './pages/shop';
import Home from './pages/home';
import { OneShop} from './pages/oneShop';

function App() {
  return (
    <>
      <BrowserRouter>    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/shop/login' element={<LoginShop/>} />
        <Route path='/client/login' element={<LoginClient />} />
        <Route path='/client/register' element={<RegisterClient/>} />
        <Route path='/shop/register' element={<RegisterShop/>} />
        <Route path='/client/lastorders' element={<MyOrdersClient/>} />
        <Route path='/client/:shopid' element={<OneShop/>} />
        <Route path='/client/neworder/:orderid/:shopid' element={<Client/>} />
        <Route path='/client/shops' element={<AllShops/>} />
        <Route path='/shop/currentclients' element={<Shop />} />
        <Route path='/shop/lastorders' element={<LastOrdersShop />} />
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
        
        