import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
  productCreateReducer, productDeleteReducer, productDetailsReducer, 
  productListReducer, productReviewCreateReducer, productUpdateReducer 
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
  userDetailsReducer, userListReducer, userLoginReducer, 
  userRegisterReducer, userUpdateProfileReducer, userDeleteReducer, userUpdateReducer,
} from './reducers/userReducers'
import { 
  orderCreateReducer, orderDeliverReducer, 
  orderDetailsReducer, orderListAdminReducer, orderListReducer, orderPayReducer 
} from './reducers/orderReducers'

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  orderListAdmin: orderListAdminReducer,
  orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = 
  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userFromStorage = 
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const shippingAddressFromStorage = 
  localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: {
    userInfo: userFromStorage
  },
  
}

const middleware = [thunk]

const store = createStore (
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store