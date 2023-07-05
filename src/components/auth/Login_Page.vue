<template>
    <div class="container center w-75 my-5 ">
        <div class="form-outline mb-4">
            <input type="text" id="form2Example1" class="form-control" :value="email"
                @input="$emit('update:email', $event.target.value)" />
            <label class="form-label" for="form2Example1">Your name</label>
        </div>

        <div class="form-outline mb-4">
            <input type="password" id="form2Example2" class="form-control" :value="password" @input="$emit('update:password', $event.target.value)" />
            <label class="form-label" for="form2Example2">Password</label>
        </div>

        <div class="row mb-4">
            <div class="col d-flex justify-content-end">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="form2Example31" checked />
                    <label class="form-check-label" for="form2Example31"> Remember me </label>
                </div>
            </div>

            <div class="col">
                <router-link to="/forgot">Forgot password?</router-link>
            </div>
        </div>

        <div class="row text-center justify-content-center">
            <button type="button" class="btn btn-primary btn-block mb-4 w-50" @click='loginUser'>Sign in</button>
        </div>

        <div class="text-center">
            <p>Not a member? <router-link to="/register">Register</router-link></p>
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
    props: {
        email: {
            type: String,
            default: "kminchelle",
        },
        password: {
            type: String,
            default: '0lelplR'
        }
    },
    name: "LoginPage",
    
    methods: {
        ...mapActions([
            'userLogin'
        ]),
        loginUser() {
            this.userLogin({username:this.email, password: this.password});
        }
    }
}
</script>