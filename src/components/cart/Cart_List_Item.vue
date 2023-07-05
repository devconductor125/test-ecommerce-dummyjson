<template>
    <div class="box">
      <div class="cart-item__details">
        <p class="is-inline">{{cartItem.title}}</p>
        <div>
          <span class="cart-item--price has-text-info has-text-weight-bold">
            ${{cartItem.price}} X {{cartItem.quantity}}
          </span>
          
          <span>
            <i class="fa fa-arrow-circle-up cart-item__modify" @click="addCartItem(cartItem)"></i>
            <i class="fa fa-arrow-circle-down cart-item__modify" @click="removeCartItem(cartItem)"></i>
          </span>
        </div>
        
      </div>
    </div>
  </template>
  <script>
  import { mapActions } from 'vuex';
  export default {
    name: 'CartListItem',
    props: ['cartItem'],
    methods: {
      ...mapActions([
        'addCartItem',
        'removeCartItem'
      ])
    }
  }
  </script>