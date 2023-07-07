<template>
	<div class="card mb-3 rounded-3 p-sm-2 p-xl-3 product-one" style="height: 440px">
		<img :src="productItem.thumbnail" class="card-img-top shadow rounded-3" alt="..." style="object-fit: cover; max-height: 220px; min-height: 220px" />
		<div class="card-body">
			<h5 class="card-title product-title">{{ productItem.title }}</h5>
			<div class="card-content d-flex flex-column justify-content-between" style="max-height: 140px; min-height: 140px">
				<p class="product-description">
					{{ productItem.description }}
				</p>
				<div class="media">
					<div class="media-right d-flex justify-content-between">
						<div>
							<div class="d-flex align-items-center justify-content-center">
								<StarRating v-model="rating" :showControl="false" :starSize="20" />
								<span class="mx-2 mt-1">{{ productItem.rating }}</span>
							</div>
							<a class="button is-primary is-light" style="font-size: 16px">
								<strong>$ {{ productItem.price }}</strong>
							</a>
						</div>
						<div class="d-flex align-items-end">
							<button class="btn btn-primary" @click="detailProduct(productItem.id)" style="height: 40px; font-size: 14px">View detail</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapActions } from "vuex";
	import starRatings from "vue3-star-ratings";
	import router from "../../router";

	export default {
		name: "ProductListItem",
		components: {
			StarRating: starRatings,
		},
		data() {
			return {
				rating: this.productItem?.rating,
			};
		},
		props: ["productItem"],
		methods: {
			...mapActions(["addCartItem"]),
			detailProduct(id) {
				router.push("/product/" + id);
			},
		},
	};
</script>
