<template>
  <div class="star-rating">
    <label class="star-rating__star" v-for="rating in ratings"
      :class="{ 'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled }" v-on:click="set(rating)"
      v-on:mouseover="star_over(rating)" v-on:mouseout="star_out" :key="rating">
      <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
        :disabled="disabled">★</label>
  </div>
</template>
<script>
export default {
  name: 'StarRating',
  data: function () {
    return {
      temp_value: null,
      ratings: [1, 2, 3, 4, 5],
      value: 0
    };
  },
  
  methods: {
    star_over: function (index) {
      if (!this.disabled) {
        this.temp_value = this.value;
        return this.value = index;
      }

    },

    star_out: function () {
      if (!this.disabled) {
        return this.value = this.temp_value;
      }
    },

    set: function (value) {
      if (!this.disabled) {
        this.temp_value = value;
        return this.value = value;
      }
    }
  }
}
</script>