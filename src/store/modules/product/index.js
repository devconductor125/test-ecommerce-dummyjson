import axios from 'axios';
const state = {
  productItems: [],
  categories: [],
  product: {}
}

const mutations = {
  UPDATE_PRODUCT_ITEMS (state, payload) {
    state.productItems = payload;
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_DETAIL_PRODUCT(state, payload) {
    state.product = payload;
  }
}

const actions = {
  getProductItems ({ commit }) {
    axios.get(`https://dummyjson.com/products`).then((response) => {
      commit('UPDATE_PRODUCT_ITEMS', response.data.products)
    });
  },
  getAllCategories({commit}) {
    axios.get(`https://dummyjson.com/products/categories`).then((response) => {
      commit('SET_CATEGORIES', response.data)
    });
  },
  getCategoryProducts({commit}, data) {
    axios.get(`https://dummyjson.com/products/category/`+data.catid).then((response) => {
      commit('UPDATE_PRODUCT_ITEMS', response.data.products)
    });
  },
  getProductById({commit}, data) {
    axios.get(`https://dummyjson.com/products/`+data.proid).then((response) => {
      console.log(response.data)
      commit('SET_DETAIL_PRODUCT', response.data)
    });
  }
}

const getters = {
  productItems: state => state.productItems,
  productCategories: state => state.categories,
  productById: state => state.product,
  productItemById: (state) => (id) => {
    return state.productItems.find(productItem => productItem.id === id)
  }
}

const productModule = {
    state,
    mutations,
    actions,
    getters
  }
  
  export default productModule;