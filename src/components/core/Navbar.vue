<template>
    <nav class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="navigation bar">

        <div class="container">
            <router-link class="navbar-brand" to="/">Vue Ecommerce<span>.</span></router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni"
                aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsFurni">
                <ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li><router-link class="nav-link" to="/profile">Profile</router-link></li>
                    <li><router-link class="nav-link" to="/products">Products</router-link></li>
                </ul>

                <ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                    <li v-if="!isAuthenticated"><router-link class="btn btn-primary" to="/login">Login</router-link></li>
                    <li v-if="!isAuthenticated"><router-link class="btn btn-success" to="/register">Sign Up</router-link></li>
                    <!-- <li v-if="isAuthenticated"><router-link class="nav-link" to=""><img src="images/user.svg"></router-link></li> -->
                    <li v-if="isAuthenticated" class="badged-cart"><router-link class="nav-link" to="/cart"><img src="images/cart.svg"><div class="cart-badge">2{{ cartQuantity }}</div></router-link></li>
                    <li v-if="isAuthenticated"><a class="btn btn-danger" @click="logout">Logout</a></li>
                </ul>
            </div>
        </div>

    </nav>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    name: "NavBar",
    computed: {
        ...mapGetters([
            'cartQuantity',
            'isAuthenticated',
        ])
    },
    created() {
        this.$store.dispatch("getCartItems");
        this.$store.dispatch("getCurrentUser");
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    }
}
</script>