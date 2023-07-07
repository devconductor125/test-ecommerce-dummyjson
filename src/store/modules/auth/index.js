import axios from "axios";
import router from "../../../router";

const state = {
	authorized: false,
	user: {},
};

const mutations = {
	USER_AUTHORIZATION(state, payload) {
		state.authorized = true;
		state.user = payload;
	},
	USER_LOGOUT(state, payload) {
		state.authorized = false;
		state.user = payload;
	},
};

const actions = {
	async userLogin({ commit }, data) {
		data.expiresInMins = 43200;
		try {
			await axios.post(`https://dummyjson.com/auth/login`, data).then((response) => {
				if (response.status == 200) {
					commit("USER_AUTHORIZATION", response.data);
					localStorage.setItem("user", JSON.stringify(response.data));
					router.push("/profile");
				}
			});
		} catch (e) {
			console.log(e.response.data.message);
		}
	},
	getCurrentUser({ commit }) {
		const currentUser = JSON.parse(localStorage.getItem("user"));
		if (currentUser) commit("USER_AUTHORIZATION", currentUser);
	},
	logout({ commit }) {
		localStorage.removeItem("user");
		commit("USER_LOGOUT", {});
		router.push("/");
	},
};

const getters = {
	isAuthenticated: (state) => state.authorized,
	user: (state) => state.user,
};

const authModule = {
	state,
	mutations,
	actions,
	getters,
};

export default authModule;
