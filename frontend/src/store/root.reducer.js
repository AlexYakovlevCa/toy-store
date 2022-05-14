import {combineReducers} from 'redux'

import {filterReducer} from './reducers/filter.reducer'
// import {userReducer} from './reducers/user.reducer'
import {userMsgReducer} from './reducers/msg.reducer'
import {toyReducer} from './reducers/toy.reducer'


export const rootReducer = combineReducers({
    toyModule : toyReducer,
    filterModule : filterReducer,
    userMsgModule : userMsgReducer
})



