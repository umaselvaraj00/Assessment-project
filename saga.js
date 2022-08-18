import {takeEvery,call,put}from"redux-saga/effects";
import axios from "axios";
import { readProductTask,createProductTask,updateProductTask,deleteProductTask,setErrorMessage}from"./productSlice";
const url="http://localhost:4000/todotask";
let callAPI =async({url,method,data})=>{
    return await axios({url,method,data});

}
export function* createProductTaskSaga(action){
    try{
        let{data} = yield call(()=>callAPI({url:url,method:"POST",data:action.postData}));
        console.log(data);
        yield put(createProductTask(data));
    }
    catch(e){
        yield put(setErrorMessage(e.message));

    }
}
export function* readProductTaskSaga(){
    try{
        let {data} = yield call(()=>callAPI({url:url}));
        console.log(data);
        yield put(readProductTask(data));
    }
    catch(e){
        yield put(setErrorMessage(e.message));

    }
}

export function*updateProductTaskSaga(action){
    try{
        let {data} = yield call(()=>callAPI({url:`${url}/${action.putData.id}`,method:"PUT",data:action.putData}));
        console.log(data);
        yield put(updateProductTask(data));
    }
    catch(e){
        yield put(setErrorMessage(e.message));

    }
}
export function* deleteProductTaskSaga(action){
    try{
       console.log("deleteSaga")
        let {data} = yield call(()=>callAPI({url:`${url}/${action.delData.id}`,method:"DELETE",}));
        console.log(data);
        yield put(deleteProductTask(data));
    }
    catch(e){
        yield put(setErrorMessage(e.message));

    }
}
export default function*rootSaga(){
    yield takeEvery("CREATE_PRODUCT_TASK_SAGA",createProductTaskSaga);
    yield takeEvery("READ_PRODUCT_TASK_SAGA",readProductTaskSaga);
    yield takeEvery("UPDATE_PRODUCT_TASK_SAGA",updateProductTaskSaga);
    yield takeEvery("DELETE_PRODUCT_TASK_SAGA",deleteProductTaskSaga);
}