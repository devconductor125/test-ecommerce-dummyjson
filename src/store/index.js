import { createStore } from 'vuex'
import product from'./modules/product';
import cart from './modules/cart';
import auth from './modules/auth';
import general from './modules/pages';

export default createStore({
  modules: {
    product,
    cart,
    auth,
    general
  }
})