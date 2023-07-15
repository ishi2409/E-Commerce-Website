import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dash from './'
import {
    newProductReducer,
    newReviewReducer,
  productDetailsReducer,
    productReducer,
    productReviewsReducer,
  productsReducer,
    reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";


const persistconfig = {
  key: "root",
  storage,
}

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

const persistedReducer  = persistReducer(persistconfig, reducer);

// let preLoadedState  = {
//   cart: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//   },
// };
 // shippingInfo: localStorage.getItem("shippingInfo")
    //   ? JSON.parse(localStorage.getItem("shippingInfo"))
    //   : {},
    
const middleware = [thunk];

const store = configureStore({
  reducer: persistedReducer,
  // reducer,
  // preLoadedState,
  middleware
}
);
export const persistor = persistStore(store);

export default store;