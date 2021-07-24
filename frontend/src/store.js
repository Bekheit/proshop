import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})

const cartItemsFromStorage = 
  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userFromStorage = 
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: {
    userInfo: userFromStorage
  }
}

const middleware = [thunk]

const store = createStore (
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store