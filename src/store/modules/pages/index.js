import axios from 'axios';

const state = {
	profile: {},
}

const mutations = {
  SET_PROFILE(state, payload) {
    state.profile = payload;
  }
}

const actions = {
	async getUserProfile({ commit }) {
		const currentUser = JSON.parse(localStorage.getItem('user'));
    try {
			await axios.get(`https://dummyjson.com/users/${currentUser.id}`).then((response) => {
				if (response.status == 200) {
					commit('SET_PROFILE', response.data);
				}
			});
		} catch (e) {
			console.log(e.response.data.message)
		}
	},
  
}

const getters = {
	profile: state => state.profile,
}

const pagesModule = {
	state,
	mutations,
	actions,
	getters
}

export default pagesModule;