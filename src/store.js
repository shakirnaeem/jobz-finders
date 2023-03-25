import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { reducer as forms } from 'redux-form';
import { loaderVisiblReducer } from "@/src/reducers/loader-reducers";

const reducers = combineReducers({
  loaderVisible: loaderVisiblReducer,
  form: forms
});

// const store = configureStore({
//   reducer: reducers,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false
//     }),
// })
//const composeEnhancers = process.env.NODE_ENV === 'development' ? global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : (null || compose);
// const composeEnhancer = (null || compose);
// const store = configureStore(
//     reducers, 
//     {}, 
//     composeEnhancer(applyMiddleware(thunk))
// );

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;