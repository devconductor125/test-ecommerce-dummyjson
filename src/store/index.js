import { createStore } from 'vuex'
import product from'./modules/product';
import cart from './modules/cart';
import auth from './modules/auth';

export default createStore({
  modules: {
    product,
    cart,
    auth
  }
})