<template>
    <div id="cart">
      <div class="cart--header has-text-centered">
        <i class="fa fa-2x fa-shopping-cart"></i>
      </div>
      <p v-if="!cartItems.length" class="cart-empty-text has-text-centered">
        Add some items to the cart!
      </p>
      <ul>
        <li class="cart-item" v-for="cartItem in cartItems" :key="cartItem.id">
            <CartListItem :cartItem="cartItem"/>
        </li>
        <div class="notification is-success">
          <button class="delete"></button>
          <p>
            Total Quantity:
            <span class="has-text-weight-bold">{{ cartQuantity }}</span>
          </p>
        </div>
        <br>
      </ul>
      <div class="buttons">
      <button :disabled="!cartItems.length" class="button is-info">
        Checkout (<span class="has-text-weight-bold">${{ cartTotal }}</span>)
      </button>
       
   <button class="button is-danger is-outlined" @click="removeAllCartItems">
      <span>Delete All items</span>
      <span class="icon is-small">
        <i class="fas fa-times"></i>
      </span>
    </button>
         </div>
    </div>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";
  import CartListItem from "./Cart_List_Item";
  export default {
    name: "CartList",
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters(["cartItems", "cartTotal", "cartQuantity"]),
    },
    created() {
      this.$store.dispatch("getCartItems");
    },
    methods: {
      ...mapActions(["removeAllCartItems"]),
    }
  };
  </script>