import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { reducer as forms } from 'redux-form';
import { getAllKeywordsReducer, getParentKeywordsReducer, keywordCommandResponseReducer } from "@/src/reducers/keyword-reducers";
import { getAllJobsReducer, getJobDetailReducer, jobCommandResponseReducer } from "@/src/reducers/job-reducers";
import { jobImageCommandResponseReducer } from '@/src/reducers/job-image-reducers'

const reducers = combineReducers({
  getParentKeywords: getParentKeywordsReducer,
  keywordCommandResponse: keywordCommandResponseReducer,
  getAllKeywords: getAllKeywordsReducer,
  getAllJobs: getAllJobsReducer,
  jobCommandResponse: jobCommandResponseReducer,
  jobImageCommandResponse: jobImageCommandResponseReducer,
  getJobDetail: getJobDetailReducer,
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