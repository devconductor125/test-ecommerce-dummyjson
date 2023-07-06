<template>
  <div class="row my-5 mx-4">
    <div class="col-md-3 d-none d-md-block">
      <div class=" category-list">
        <ul class="nav flex-column nav-pills nav-pills-dark ">
          <!-- nav item -->
          <li class="nav-item mx-3" v-for="category in productCategories" :key="category">
            <router-link class="nav-link" aria-current="page" :to="'/products/' + category" @click="updateCategory(category)"><i
                class="feather-icon icon-shopping-bag me-2"></i>{{ capitalized(category) }}</router-link>
          </li>
          <!-- nav item -->

        </ul>
      </div>

    </div>
    <div class="col-md-9">
      <div class="tile is-ancestor row">
        <div class="tile is-parent col-md-6 col-lg-4" v-for="productItem in productItems" :key="productItem.id">
          <ProductListItem :productItem="productItem" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Product_List_Item from './Product_List_Item'
export default {
  name: "ProductList",
  components: {
    ProductListItem: Product_List_Item
  },
  computed: {
    ...mapGetters([
      'productItems',
      'productCategories'
    ])
  },
  created() {
    if(!this.$route.params.category)this.$store.dispatch('getProductItems');
    else this.$store.dispatch('getCategoryProducts', {catid: this.$route.params.category});
    this.$store.dispatch('getAllCategories');
  },
  methods: {
    capitalized(name) {
      const capitalizedFirst = name[0].toUpperCase();
      const rest = name.slice(1);
      return capitalizedFirst + rest;
    },
    updateCategory(catid) {
      this.$store.dispatch('getCategoryProducts', {catid});
    }
  },
};
</script>