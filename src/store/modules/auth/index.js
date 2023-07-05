import axios from 'axios';
import router from '../../../router'

const state = {
	authorized: false,
	user: {}
}

const mutations = {
	USER_AUTHORIZATION(state, payload) {
		state.authorized = true;
		state.user = payload;
	},
	USER_LOGOUT (state, payload) {
		state.authorized = false;
		state.user = payload;
	}
}

const actions = {
	async userLogin({ commit }, data) {
		data.expiresInMins = 43200;
		await axios.post(`https://dummyjson.com/auth/login`, data).then((response) => {
			commit('USER_AUTHORIZATION', response.data);
			if(response.status == 200) {
				localStorage.setItem('user', JSON.stringify(response.data));
				router.push("/profile");
			}
		});
	},
	getCurrentUser({commit}) {
		const currentUser = JSON.parse(localStorage.getItem('user'));
		if(currentUser) commit('USER_AUTHORIZATION', currentUser);
	},
	logout({commit}) {
		localStorage.removeItem('user');
		commit('USER_LOGOUT', {});
		router.push("/");
	}
}

const getters = {
	isAuthenticated: state => state.authorized,
	user: state => state.user,
}

const authModule = {
	state,
	mutations,
	actions,
	getters
}

export default authModule;