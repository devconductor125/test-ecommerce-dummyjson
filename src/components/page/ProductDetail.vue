<template>
  <div class="product-detail my-4 py-4">
    <div class="container container-space">
      <div class="row">
        <div class="col-md-5">
          <img class="img-fluid" :src="productById?.thumbnail" alt="" style="width: 100%;" />
          <div class="product-thumbnails justify-content-center">
            <ul>
              <li v-for="(image, index) in productById?.images" :class="[activeClass == index ? 'thumbnail-active' : '']"
                :key="index">
                <img @click="currentThumnail(image, index)" :src="image" alt="" height="100" />
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-6">
          <h1 class="my-4">{{ productById?.title }} - ${{ productById?.price }}</h1>
          <h4 class="text-primary">BY <span class="text-danger">{{ productById?.brand }}</span></h4>
          <h6>{{ productById?.description }}</h6>
          <h3 class="my-3">
            <svg width="36" height="36" viewBox="0 0 24 24">
              <path
                d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
            </svg>
            {{ cart }}
          </h3>
          <h4 v-if="productById.stock > 0">Stock Available</h4>
          <h4 v-else>Oops!! Out Of Stock</h4>
          <h3 class="my-3">Details</h3>

          <button type="button" class="btn btn-outline-primary btn-lg btn-block btn-custom-color" @click="addToCart">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "ProductDetail",
  data() {
    return {
      id: this.$route.params.id,
      cart: 0,
      stockAvailability: true,
      activeClass: 0
    }
  },
  components:{
  },
  computed: {
    ...mapGetters(['productById'])
  },
  methods: {
    addToCart: function () {
      this.cart = this.cart + 1;
    },
    currentThumnail: function (image, index) {
      this.productById.thumbnail = image;
      this.activeClass = index;
    }
  },
  created() {
    this.$store.dispatch('getProductById', { proid: this.$route.params.id });
  }
}
</script>