import axios from "axios";

const state = {
	cartItems: [],
};

const mutations = {
	UPDATE_CART_ITEMS(state, payload) {
		state.cartItems = payload;
	},
	REMOVE_CART_PRODUCT(state, payload) {
		var productIndex = state.cartItems[0]?.products.findIndex((p) => p.id == payload);
		state.cartItems[0].totalQuantity -= state.cartItems[0]?.products[productIndex].quantity;
		state.cartItems[0].total -= state.cartItems[0]?.products[productIndex].total;
		state.cartItems[0].totalProducts--;
		state.cartItems[0].discountedTotal -= state.cartItems[0]?.products[productIndex]?.discountedPrice;

		state.cartItems[0]?.products.splice(productIndex, 1);
	},
	UPDATE_CART_PRODUCT(state, payload) {
		var productIndex = state.cartItems[0]?.products.findIndex((p) => p.id == payload.productId);
		if (payload.dir == "incre") {
			const newCart = state.cartItems[0]?.products[productIndex];
			newCart.quantity++;
			newCart.total += state.cartItems[0]?.products[productIndex].price;
			newCart.discountedPrice += (payload.price * (100 - state.cartItems[0]?.products[productIndex]?.discountPercentage)) / 100;
			state.cartItems[0].products[productIndex] = newCart;
			state.cartItems[0].totalQuantity++;
			state.cartItems[0].total += state.cartItems[0]?.products[productIndex].price;
			state.cartItems[0].discountedTotal += (state.cartItems[0]?.products[productIndex].price * (100 - state.cartItems[0]?.products[productIndex].discountPercentage)) / 100;
		} else {
			const newCart = state.cartItems[0]?.products[productIndex];
			if (newCart.quantity < 2) return false;
			newCart.quantity--;
			newCart.total -= state.cartItems[0]?.products[productIndex].price;
			newCart.discountedPrice -= (payload.price * (100 - state.cartItems[0]?.products[productIndex]?.discountPercentage)) / 100;
			state.cartItems[0].products[productIndex] = newCart;
			state.cartItems[0].totalQuantity--;
			state.cartItems[0].total -= state.cartItems[0]?.products[productIndex].price;
			state.cartItems[0].discountedTotal -= (state.cartItems[0]?.products[productIndex].price * (100 - state.cartItems[0]?.products[productIndex].discountPercentage)) / 100;
		}
	},
	ADD_CART_ITEM(state, payload) {
		var productIndex = state.cartItems[0]?.products.findIndex((p) => p.id == payload?.productId?.id);
		if (productIndex >= 0) {
			const newCart = state.cartItems[0]?.products[productIndex];
			newCart.quantity += payload.quantity;
			newCart.total += payload.quantity * payload?.productId?.price;
			newCart.discountedPrice += (payload.quantity * (payload?.productId?.price * (100 - payload?.productId?.discountPercentage))) / 100;
			state.cartItems[0].products[productIndex] = newCart;
		} else {
			state.cartItems[0].products.push({
				id: payload?.productId?.id,
				title: payload?.productId?.title,
				price: payload?.productId?.price,
				quantity: payload.quantity,
				total: payload.quantity * payload?.productId?.price,
				discountPercentage: payload?.productId?.discountPercentage,
				discountedPrice: (payload.quantity * (payload?.productId?.price * (100 - payload?.productId?.discountPercentage))) / 100,
				image: payload?.productId?.thumbnail,
			});
			state.cartItems[0].totalProducts++;
		}
		state.cartItems[0].totalQuantity += payload.quantity;
		state.cartItems[0].total += payload.quantity * payload?.productId?.price;
		state.cartItems[0].discountedTotal += (payload.quantity * (payload?.productId?.price * (100 - payload?.productId?.discountPercentage))) / 100;
	},
};

const actions = {
	getCartItems({ commit }) {
		const currentUser = JSON.parse(localStorage.getItem("user"));
		if (currentUser) {
			axios.get(`https://dummyjson.com/carts/user/${currentUser.id}`).then((response) => {
				commit("UPDATE_CART_ITEMS", response.data.carts);
			});
		}
	},
	addCartItem({ commit }, data) {
		commit("ADD_CART_ITEM", data);
	},
	removeCartItem({ commit }, cartItem) {
		axios.delete("https://dummyjson.com/cart/delete", cartItem).then((response) => {
			commit("UPDATE_CART_ITEMS", response.data);
		});
	},
	removeAllCartItems({ commit }) {
		axios.delete("https://dummyjson.com/cart/delete/all").then((response) => {
			commit("UPDATE_CART_ITEMS", response.data);
		});
	},
	removeProduct({ commit }, productId) {
		commit("REMOVE_CART_PRODUCT", productId);
	},
	updateProduct({ commit }, data) {
		commit("UPDATE_CART_PRODUCT", data);
	},
};

const getters = {
	cartItems: (state) => state.cartItems[0]?.products,
	cartTotal: (state) => state?.cartItems[0] ?? {},
	cartQuantity: (state) => state.cartItems[0]?.totalQuantity,
};

const cartModule = {
	state,
	mutations,
	actions,
	getters,
};
export default cartModule;
