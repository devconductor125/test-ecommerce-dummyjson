<template>
	<div class="container center w-75 my-5" style="max-width: 800px">
		<div class="form-outline mb-4">
			<label class="form-label" for="form2Example1">Your name</label>

			<input type="text" class="form-control" v-model="uname" />
			<span class="text-danger" v-if="nameInvalid != ''">{{ nameInvalid }}</span>
		</div>

		<div class="form-outline mb-4">
			<label class="form-label" for="form2Example1">Email</label>

			<input type="email" class="form-control" v-model="email" />
			<span class="text-danger" v-if="emailInvalid != ''">{{ emailInvalid }}</span>
		</div>

		<div class="form-outline mb-4">
			<label class="form-label" for="form2Example2">Password</label>

			<input type="password" class="form-control" v-model="password" />
			<span class="text-danger" v-if="pwdInvalid != ''">{{ pwdInvalid }}</span>
		</div>

		<div class="form-outline mb-4">
			<label class="form-label" for="form2Example2">Confirm Password</label>

			<input type="password" class="form-control" v-model="confirm" />
			<span class="text-danger" v-if="confirmInvalid != ''">{{ confirmInvalid }}</span>
		</div>

		<div class="row text-center justify-content-center">
			<button type="button" class="btn btn-primary btn-block mb-4 w-50" @click="registerUser">Sign Up</button>
		</div>

		<div class="text-center">
			<p>If you have account? <router-link to="/login">Login</router-link></p>
			<p>or sign up with:</p>
			<button type="button" class="btn btn-link btn-floating mx-1">
				<i class="fab fa-facebook-f"></i>
			</button>

			<button type="button" class="btn btn-link btn-floating mx-1">
				<i class="fab fa-google"></i>
			</button>

			<button type="button" class="btn btn-link btn-floating mx-1">
				<i class="fab fa-twitter"></i>
			</button>

			<button type="button" class="btn btn-link btn-floating mx-1">
				<i class="fab fa-github"></i>
			</button>
		</div>
	</div>
</template>
<script>
	import { mapActions } from "vuex";

	export default {
		data() {
			return {
				uname: "",
				email: "",
				password: "",
				confirm: "",
				nameInvalid: "",
				emailInvalid: "",
				pwdInvalid: "",
				confirmInvalid: "",
			};
		},
		name: "RegisterPage",

		methods: {
			...mapActions(["userLogin"]),
			registerUser() {
				if (!this.uname) this.nameInvalid = "Name required";
				else this.nameInvalid = "";

				if (!this.email) {
					this.emailInvalid = "Email required";
				} else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(this.email)) {
					this.emailInvalid = "Invalid email";
				} else this.emailInvalid = "";

				if (!this.password) this.pwdInvalid = "Password required";
				else this.pwdInvalid = "";

				if (!this.confirm) this.confirmInvalid = "Confirm password required";
				else if (this.confirm != this.password) this.confirmInvalid = "Confirm password must be equal to password";
				else this.confirmInvalid = "";

				if (!this.nameInvalid && !this.emailInvalid && !this.pwdInvalid && !this.confirmInvalid) {
					this.$store.dispatch("registerUser", { username: this.uname, email: this.email, password: this.password });
				}
			},
		},
	};
</script>
