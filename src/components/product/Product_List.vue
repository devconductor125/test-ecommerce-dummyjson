<template>
	<div class="row my-5 mx-4">
		<div class="col-md-3 d-none d-md-block">
			<div class="category-list">
				<div class="filter-switch w-100 text-end px-4 mb-3">
					<label for="switch_button" :class="{ active: isActive }" class="toggle__button">
						Filter
						<input type="checkbox" id="switch_button" v-model="checkedValue" />
						<span class="toggle__switch"></span>
					</label>
				</div>
				<ul class="nav flex-column nav-pills nav-pills-dark">
					<li class="nav-item mx-3" v-for="category in productCategories" :key="category">
						<router-link class="nav-link" aria-current="page" :to="'/products/' + category" @click="updateCategory(category)"><i class="feather-icon icon-shopping-bag me-2"></i>{{ capitalized(category) }}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="col-md-9 product-list">
			<div class="w-100 my-3 px-3 d-flex justify-content-between align-items-center">
				<div>
					<button class="btn btn-warning py-2 mx-4" style="width: 120px" @click="viewAll">View All</button>
				</div>
				<div class="search w-100">
					<i class="fa fa-search"></i>
					<input type="text" class="form-control" placeholder="Search for product" v-model="searchText" />
					<button class="btn btn-primary" @click="getSearch">Search</button>
				</div>
			</div>
			<div class="tile is-ancestor row">
				<div class="tile is-parent col-md-6 col-lg-4" v-for="productItem in productItems" :key="productItem.id">
					<ProductListItem :productItem="productItem" />
				</div>
			</div>
			<div class="w-100 mt-4 text-end">
				<vue-awesome-paginate :total-items="totalProducts" :items-per-page="productPerPage" :max-pages-shown="5" v-model="currentPage" @click="onClickHandler" />
			</div>
		</div>
	</div>
</template>
<style>
	.pagination-container {
		display: flex;
		column-gap: 10px;
	}
	.paginate-buttons {
		height: 40px;
		width: 40px;
		border-radius: 20px;
		cursor: pointer;
		background-color: rgb(242, 242, 242);
		border: 1px solid rgb(217, 217, 217);
		color: black;
	}
	.paginate-buttons:hover {
		background-color: #d8d8d8;
	}
	.active-page {
		background-color: #3498db;
		border: 1px solid #3498db;
		color: white;
	}
	.active-page:hover {
		background-color: #2988c8;
	}
</style>
<script>
	import { mapGetters } from "vuex";
	import Product_List_Item from "./Product_List_Item";
	import router from "../../router";

	export default {
		name: "ProductList",
		components: {
			ProductListItem: Product_List_Item,
		},

		data() {
			return {
				currentState: false,
				searchText: "",
			};
		},
		computed: {
			...mapGetters(["productItems", "productCategories", "totalProducts", "productPerPage", "currentPage"]),
			isActive() {
				return this.currentState;
			},

			checkedValue: {
				get() {
					return this.defaultState;
				},
				set(newValue) {
					this.$store.dispatch("setFilterFlag");
					this.currentState = newValue;
				},
			},
		},
		created() {
			if (!this.$route.params.category) this.$store.dispatch("getProductItems");
			else this.$store.dispatch("getCategoryProducts", { catid: this.$route.params.category });
			this.$store.dispatch("getAllCategories");
		},
		methods: {
			capitalized(name) {
				const capitalizedFirst = name[0].toUpperCase();
				const rest = name.slice(1);
				return capitalizedFirst + rest;
			},
			updateCategory(catid) {
				this.$store.dispatch("getCategoryProducts", { catid });
			},
			getSearch() {
				if (this.searchText == "") {
					if (!this.$route.params.category) this.$store.dispatch("getProductItems");
					else this.$store.dispatch("getCategoryProducts", { catid: this.$route.params.category });
				}
				this.$store.dispatch("searchProduct", this.searchText);
			},
			onClickHandler(page) {
				this.$store.dispatch("setCurrentPage", page);
			},
			viewAll() {
				this.$store.dispatch("getProductItems");
				router.push("/products");
			},
		},
	};
</script>
