<template>
  <div class="card mb-3 rounded-3 p-sm-2 p-xl-3 product-one" style="height: 420px;">
    <img :src='productItem.thumbnail' class="card-img-top shadow rounded-3" alt="..."
      style="object-fit: cover; max-height: 220px; min-height: 220px;">
    <div class="card-body">
      <h5 class="card-title product-title">{{ productItem.title }}</h5>
      <div class="card-content d-flex flex-column justify-content-between" style="max-height: 120px; min-height: 120px;">
        <p class='product-description'>
          {{ productItem.description }}
        </p>
        <div class="media">
          <div class="media-right d-flex justify-content-between">
            <a class="button is-primary is-light">
              <strong>$ {{ productItem.price }}</strong>
            </a>
            <button class="btn btn-primary" @click="detailProduct(productItem.id)">
              View detail
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
// import StarRating from '../../utils/StarRating.vue';
import router from '../../router';

export default {
  components: {
    // StarRating: StarRating
  },
  name: "ProductListItem",
  props: ["productItem"],
  methods: {
    ...mapActions(["addCartItem"]),
    detailProduct(id) {
      router.push('/product/'+id);
    }
  },

};
</script>