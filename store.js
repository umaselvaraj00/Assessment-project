import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import productReducer from "./productSlice";
import saga from "./saga";

let  sagaMiddleware= createSagaMiddleware();

export const store = configureStore(
    {reducer:{
       product: productReducer
       
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({thunk:false}).concat(sagaMiddleware),
});
sagaMiddleware.run(saga);