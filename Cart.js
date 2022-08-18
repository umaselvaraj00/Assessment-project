import { useContext } from "react";
import { appContext } from "./App";


const Cart=()=>{
    const appCtx=useContext(appContext);
  


return(
    <div>
    <h1 className="sty4">Cart Page</h1>
    <ul>{appCtx.addToCart.map(
        (tasks)=>(<div key={tasks.id}>
   
    <div className="cart">
    Product Name:  {tasks.task}<br></br><br></br>
    Quantity:  {tasks.quantity}<br></br> <br></br>
    Amount:  {tasks.amount} 
    </div>
       
               
            </div>))}
        </ul>
     </div>
);
            };
export default Cart;