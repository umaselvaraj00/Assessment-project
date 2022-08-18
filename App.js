import{BrowserRouter,Routes,Route,NavLink,Link} from 'react-router-dom';
import {createContext, useState} from 'react';
import Order from './Order';
import './App.css';
import Cart from "./Cart"
import Product from "./Product";
export const appContext = createContext("");


function App()
{
    const initialCart=[];
    const [cart, setCart]=useState(initialCart);
    return(
       
        <BrowserRouter>
       
        
            <appContext.Provider
                value={{addToCart:cart, setAddToCart:(addToCart)=>{setCart(addToCart);
                }
                }}>
                <div className='app'>
                <h1 className='head'>ASSESSMENT</h1>
                <ul className='col'>
                    <li className='Link'>                     
                        <NavLink className="Link" to ="/">{" "}Order</NavLink> 
                    </li>  <br></br> 
                    <li className='Link'>
                        <Link className="Link" to="product">{" "}Product</Link>
                    </li>   
                    <li className='Link'>
                        <Link className="Link" to="cart">{" "}AddToCart</Link>
                    </li>
                </ul>
                <Routes>
                    <Route path="/" element={<Order/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/cart" element={<Cart/>}/>

                </Routes>
                </div>
            </appContext.Provider>
        </BrowserRouter>
    );
}
export default App;