import axios from "axios";
const state = {
	productItems: [],
	categories: [],
	product: {},
	sortFlag: -1,
	currentPage: 1,
	productPerPage: 6,
	totalProducts: 0,
};

const mutations = {
	UPDATE_PRODUCT_ITEMS(state, payload) {
		state.productItems = payload;
	},
	SET_CATEGORIES(state, payload) {
		const sortedCategory = payload.sort((a, b) => {
			if (a > b) return -1 * state.sortFlag;
			if (a < b) return 1 * state.sortFlag;
			return 0;
		});
		state.categories = sortedCategory;
	},
	SET_DETAIL_PRODUCT(state, payload) {
		state.product = payload;
	},
	SET_FILTER_FLAG(state) {
		state.sortFlag *= -1;
		state.categories.sort((a, b) => {
			if (a > b) return -1 * state.sortFlag;
			if (a < b) return 1 * state.sortFlag;
			return 0;
		});
	},
	UPDATE_PAGINATION(state, payload) {
		state.totalProducts = payload.total;
	},
	UPDATE_CURRENT_PAGE(state, payload) {
		state.currentPage = payload;
	},
};

const actions = {
	getProductItems({ commit }) {
		axios.get(`https://dummyjson.com/products?limit=${state.productPerPage}&skip=${state.productPerPage * (state.currentPage - 1)}`).then((response) => {
			commit("UPDATE_PRODUCT_ITEMS", response.data.products);
			commit("UPDATE_PAGINATION", { total: response.data.total });
		});
	},
	getAllCategories({ commit }) {
		axios.get(`https://dummyjson.com/products/categories`).then((response) => {
			commit("SET_CATEGORIES", response.data);
		});
	},
	getCategoryProducts({ commit }, data) {
		axios.get(`https://dummyjson.com/products/category/` + data.catid).then((response) => {
			commit("UPDATE_PRODUCT_ITEMS", response.data.products);
			commit("UPDATE_PAGINATION", { total: response.data?.products.length });
		});
	},
	getProductById({ commit }, data) {
		axios.get(`https://dummyjson.com/products/` + data.proid).then((response) => {
			commit("SET_DETAIL_PRODUCT", response.data);
		});
	},
	setFilterFlag({ commit }) {
		commit("SET_FILTER_FLAG");
	},
	searchProduct({ commit }, search) {
		axios.get(`https://dummyjson.com/products/search?q=` + search).then((response) => {
			commit("UPDATE_PRODUCT_ITEMS", response.data?.products);
			commit("UPDATE_PAGINATION", { total: response.data?.products.length });
		});
	},
	setCurrentPage({ commit }, pageIndex) {
		axios.get(`https://dummyjson.com/products?limit=${state.productPerPage}&skip=${state.productPerPage * (pageIndex - 1)}`).then((response) => {
			commit("UPDATE_PRODUCT_ITEMS", response.data.products);
			commit("UPDATE_PAGINATION", { total: response.data.total });
			commit("UPDATE_CURRENT_PAGE", pageIndex);
		});
	},
};

const getters = {
	productItems: (state) => state.productItems,
	productCategories: (state) => state.categories,
	productById: (state) => state.product,
	totalProducts: (state) => state.totalProducts,
	productPerPage: (state) => state.productPerPage,
	currentPage: (state) => state.currentPage,
	productItemById: (state) => (id) => {
		return state.productItems.find((productItem) => productItem.id === id);
	},
};

const productModule = {
	state,
	mutations,
	actions,
	getters,
};

export default productModule;
