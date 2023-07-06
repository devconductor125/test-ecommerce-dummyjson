import axios from 'axios';
const state = {
  productItems: [],
  categories: []
}

const mutations = {
  UPDATE_PRODUCT_ITEMS (state, payload) {
    state.productItems = payload;
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
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
      console.log(response)
      commit('SET_CATEGORIES', response.data)
    });
  }
}

const getters = {
  productItems: state => state.productItems,
  productCategories: state => state.categories,
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