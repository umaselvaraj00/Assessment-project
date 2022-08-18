import {useEffect, useState,useContext} from "react";
import { appContext } from "./App";
import Cart from "./Cart"

const Order=()=>{
    const [name, setName] = useState();
    const [tasks, setTasks] = useState([]);
    const appCtx=useContext(appContext);
    
    
 function readTask(){
    fetch("http://localhost:4000/todotask")
    .then((response)=>response.json())
    .then((data)=> setTasks(data.filter((tasks)=>tasks.task.includes(name))));
 }
    useEffect(()=>{readTask(tasks)},[name]);

    const addQuantity=(id,qty)=>{
        const newTasks=[...tasks];
        newTasks.map((newTask)=>{
            if(newTask.id === id){
                newTask.quantity=qty+1;
                newTask.amount = newTask.price * newTask.quantity;
            }
            return newTask;
        });
        setTasks(newTasks);
    };

    const lessQuantity=(id,qty)=>{
        const newTasks=[...tasks];
        newTasks.map((newTask)=>{
            if(newTask.id===id){
                newTask.quantity= qty-1;
                newTask.amount = newTask.price * newTask.quantity;
            }
            return newTask;
        });
        setTasks(newTasks);
    };
    const cartAdd=(tasks)=>{
        let newCart=[];
        if(appCtx.addToCart.length===0){
            appCtx.setAddToCart([
                {
                    id:tasks.id,
                    task:tasks.task,
                    price:tasks.price,
                    quantity:tasks.quantity,
                    amount:tasks.amount,
                },
            ]);
        }else{
            if(
                appCtx.addToCart.some((cartTask)=>cartTask.id===tasks.id)
                ) {
                    newCart=appCtx.addToCart.map((cart)=>{
                        if(cart.id===tasks.id){
                            return{
                                ...cart,
                                quantity: tasks.quantity,
                                amount: tasks.amount,
                            };
                        }
                        return cart;
                    });
                } else{
                    newCart=[
                        ...appCtx.addToCart,
                        {
                            id:tasks.id,
                            task:tasks.task,
                            price:tasks.price,
                            amount:tasks.amount,
                        },
                    ];
                }
                appCtx.setAddToCart(newCart);
            }
        };
    return(
        <div className="app">
            <h2 className="sty2">Order Page</h2>
            
            <h3 className="sty3"><label>Search:</label></h3><input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <h3>{name}</h3>
            <ul className="app">{tasks.map(
                (tasks)=>(<li key={tasks.id}><input type="text" value={tasks.task} onClick={(e)=>setName(tasks.task)}></input><br></br></li>))}
                <ul className="non">
                    {tasks.map((tasks)=>(
                       
                    <li key={tasks.id}>
                    
                   <h3>Price:{tasks.price}</h3> <br></br>
           
                    <h2>Product List</h2>
                <div className="one">
                    <lable className="three">Quantity:</lable>
                    <button className="addQty" onClick={()=>addQuantity(tasks.id, tasks.quantity)}>+</button>
                    <label>{tasks.quantity}</label>
                    <button className="lessQty" onClick={()=>lessQuantity(tasks.id, tasks.quantity)}disabled={tasks.quantity ? false : true}>-</button>
                </div><br></br>
                <div className="addamt">
                    <label>Amount:</label>
                    <label>{tasks.amount}</label>
                </div>
                <button onClick={()=>cartAdd(tasks)}
                disabled={tasks.quantity ? false : true}>AddToCart</button>
                
            
            </li>))}
            </ul>
            </ul>
            {appCtx.addToCart.length > 0 && <Cart/>}
            </div>
    );
        };
    
            


export default Order;