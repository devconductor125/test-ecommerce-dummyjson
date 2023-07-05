import { createRouter, createWebHashHistory } from 'vue-router'
import CartList from '../components/cart/Cart_List.vue';
import ProductList from '../components/product/Product_List.vue';
import LoginPage from '../components/auth/Login_Page.vue';
import HomePage from '../components/page/Home_Page.vue';
import RegisterPage from '../components/auth/Register_page.vue';

const routes = [
  {
    path: '/cart',
    component: CartList
  },
  {
    path: '/products',
    component: ProductList
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/',
    component: HomePage
  },
//   {
//     path: '/',
//     redirect: '/inventory'
//   },

]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router