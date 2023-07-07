import { createRouter, createWebHashHistory } from "vue-router";
import CartList from "../components/cart/Cart_List.vue";
import ProductList from "../components/product/Product_List.vue";
import LoginPage from "../components/auth/Login_Page.vue";
import HomePage from "../components/page/Home_Page.vue";
import RegisterPage from "../components/auth/Register_page.vue";
import NotFound from "../components/page/NotFound.vue";
import ProfilePage from "../components/page/Profile.vue";
import ProductDetail from "../components/page/ProductDetail.vue";
import store from "../store";

const routes = [
	{
		path: "/cart",
		component: CartList,
	},
	{
		path: "/products",
		component: ProductList,
	},
	{
		path: "/product/:id?",
		component: ProductDetail,
	},
	{
		path: "/products/:category?",
		component: ProductList,
	},
	{
		path: "/login",
		component: LoginPage,
	},
	{
		path: "/register",
		component: RegisterPage,
	},
	{
		path: "/profile",
		component: ProfilePage,
	},
	{
		path: "/",
		component: HomePage,
	},
	{
		path: "/:pathMatch(.*)*",
		component: NotFound,
	},
];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
router.beforeEach((to) => {
	const authenticated = store.getters["isAuthenticated"];
	if (!authenticated && to.path !== "/login" && to.path !== "/" && to.path !== "/register") {
		return (to.name = "login");
	}
});

export default router;
