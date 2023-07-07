<template>
	<div class="container my-4">
		<div class="site-blocks-table">
			<table class="table">
				<thead>
					<tr>
						<th class="product-thumbnail">Image</th>
						<th class="product-name">Product</th>
						<th class="product-price">Price</th>
						<th class="product-quantity">Quantity</th>
						<th class="product-total">Total</th>
						<th class="product-remove">Remove</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="cart in cartItems" :key="cart.id">
						<td class="product-thumbnail">
							<img :src="cart.image ? cart.image : 'images/product-1.png'" alt="Image" class="img-fluid" />
						</td>
						<td class="product-name">
							<h2 class="h5 text-black">{{ cart.title }}</h2>
						</td>
						<td>{{ cart.price }}</td>
						<td>
							<div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px">
								<div class="input-group-prepend">
									<button class="btn btn-outline-black decrease" type="button" @click="updateProduct('decre', cart.id)">&minus;</button>
								</div>
								<input type="text" class="form-control text-center quantity-amount" :value="cart.quantity" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
								<div class="input-group-append">
									<button class="btn btn-outline-black increase" type="button" @click="updateProduct('incre', cart.id)">&plus;</button>
								</div>
							</div>
						</td>
						<td>{{ cart.total }}</td>
						<td><a class="btn btn-black btn-sm" @click="removeProduct(cart.id)">X</a></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<label class="text-black h4" for="coupon">Coupon</label>
						<p>Enter your coupon code if you have one.</p>
					</div>
					<div class="col-md-8 mb-3 mb-md-0">
						<input type="text" class="form-control py-3" id="coupon" placeholder="Coupon Code" />
					</div>
					<div class="col-md-4">
						<button class="btn btn-black btn-success">Apply Coupon</button>
					</div>
				</div>
			</div>
			<div class="col-md-6 pl-5">
				<div class="row justify-content-end">
					<div class="col-md-7">
						<div class="row">
							<div class="col-md-12 text-right border-bottom mb-5">
								<h3 class="text-black h4 text-uppercase">Cart Totals</h3>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-md-6">
								<span class="text-black">Total products</span>
							</div>
							<div class="col-md-6 text-right">
								<strong class="text-black">{{ cartTotal?.totalProducts }}</strong>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-md-6">
								<span class="text-black">Total price</span>
							</div>
							<div class="col-md-6 text-right">
								<strong class="text-black">${{ cartTotal?.total }}</strong>
							</div>
						</div>
						<div class="row mb-5">
							<div class="col-md-6">
								<span class="text-black">Discounted Total</span>
							</div>
							<div class="col-md-6 text-right">
								<strong class="text-black">${{ cartTotal?.discountedTotal?.toFixed(2) }}</strong>
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">
								<button class="btn btn-black btn-lg py-3 btn-block btn-primary">Proceed To Checkout</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	// import CartListItem from "./Cart_List_Item";
	export default {
		name: "CartList",
		components: {
			// CartListItem
		},
		computed: {
			...mapGetters(["cartItems", "cartTotal", "cartQuantity"]),
		},
		created() {
			// this.$store.dispatch("getCartItems");
		},
		methods: {
			...mapActions(["removeAllCartItems"]),
			removeProduct(productId) {
				this.$store.dispatch("removeProduct", productId);
			},
			updateProduct(dir, productId) {
				this.$store.dispatch("updateProduct", { dir, productId });
			},
		},
	};
</script>
