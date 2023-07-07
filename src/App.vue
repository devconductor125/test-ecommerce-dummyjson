<template>
	<div>
		<Navbar />
		<div class="container-fluid mt-6">
			<div class="columns">
				<div class="column is-12 column--align-center">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<FooterBoard />
	</div>
</template>
<script>
	import Navbar from "./components/core/Navbar";
	import FooterBoard from "./components/core/Footer";
	export default {
		name: "App",
		components: {
			Navbar,
			FooterBoard,
		},
	};
</script>
<style>
	html,
	body {
		height: 100%;
		background: #f2f6fa;
	}
</style>
