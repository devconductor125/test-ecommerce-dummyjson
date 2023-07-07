<template>
	<div class="product-detail my-4 py-4">
		<div class="container container-space">
			<div class="row">
				<div class="col-lg-5">
					<img class="img-fluid" :src="productById?.thumbnail" alt="" style="width: 100%" />
					<div class="product-thumbnails justify-content-center">
						<ul>
							<li v-for="(image, index) in productById?.images" :class="[activeClass == index ? 'thumbnail-active' : '']" :key="index">
								<img @click="currentThumnail(image, index)" :src="image" alt="" height="100" />
							</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-1"></div>
				<div class="col-lg-6">
					<h1 class="my-4">{{ productById?.title }} - ${{ productById?.price }}</h1>
					<h4 class="text-primary">
						BY <span class="text-danger">{{ productById?.brand }}</span>
					</h4>
					<h6 class="mt-2 mb-4">{{ productById?.description }}</h6>
					<h4 v-if="productById.stock > 0">Stock Available</h4>
					<h4 v-else>Oops!! Out Of Stock</h4>
					<h5 class="my-3">
						<span class="text-secondary text-decoration-line-through">Was ${{ productById?.price }}</span>
					</h5>
					<h4 class="my-3">
						<span class="text-success">Now ${{ (((100 - productById?.discountPercentage) * productById?.price) / 100).toFixed(2) }}</span>
					</h4>
					<div>
						<input type="number" v-model="quantity" style="width: 70px; height: 45px; font-size: 16px" class="mx-3" />
						<button type="button" class="btn btn-outline-primary btn-lg btn-block btn-custom-color rounded" @click="addToCart">ADD TO CART</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "ProductDetail",
		data() {
			return {
				id: this.$route.params.id,
				cart: 0,
				stockAvailability: true,
				activeClass: 0,
				quantity: 1,
			};
		},
		components: {},
		computed: {
			...mapGetters(["productById"]),
		},
		methods: {
			addToCart: function () {
				this.cart = this.cart + 1;
				this.$store.dispatch("addCartItem", { productId: this.productById, quantity: this.quantity });
			},
			currentThumnail: function (image, index) {
				this.productById.thumbnail = image;
				this.activeClass = index;
			},
		},
		created() {
			this.$store.dispatch("getProductById", { proid: this.$route.params.id });
		},
	};
</script>
