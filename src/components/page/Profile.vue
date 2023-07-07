<template>
	<div>
		<div class="container py-5">
			<div class="row">
				<div class="col-lg-4">
					<div class="card mb-4">
						<div class="card-body text-center">
							<img :src="profile?.image" alt="avatar" class="rounded-circle img-fluid" style="width: 150px" />
							<h5 class="my-3">{{ profile?.firstName }} {{ profile?.lastName }}</h5>
							<p class="text-muted mb-1">Full Stack Developer</p>
							<p class="text-muted mb-4">{{ profile?.address?.address }}</p>
							<div class="d-flex justify-content-center mb-2">
								<button type="button" class="btn btn-primary">Follow</button>
								<button type="button" class="btn btn-outline-primary ms-1">Message</button>
							</div>
						</div>
					</div>
					<div class="card mb-4 mb-lg-0">
						<div class="card-body p-0">
							<ul class="list-group list-group-flush rounded-3">
								<li class="list-group-item d-flex justify-content-between align-items-center p-3">
									<div>
										<i class="fas fa-globe fa-lg text-warning"></i>
										<span>&nbsp;&nbsp;Website</span>
									</div>
									<p class="mb-0">{{ profile?.domain }}</p>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center p-3">
									<div>
										<i class="fas fa-map-marker fa-lg text-secondary"></i>
										<span>&nbsp;&nbsp;IP address</span>
									</div>
									<p class="mb-0">{{ profile?.ip }}</p>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center p-3">
									<div>
										<i class="fas fa-desktop fa-lg text-warning"></i>
										<span>&nbsp;&nbsp;Mac Address</span>
									</div>
									<p class="mb-0">{{ profile?.macAddress }}</p>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center p-3">
									<div>
										<i class="fas fa-id-card fa-lg text-primary"></i>
										<span>&nbsp;&nbsp;EIN</span>
									</div>
									<p class="mb-0">{{ profile?.ein }}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-lg-8">
					<div class="card mb-4">
						<div class="card-body">
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Full Name</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">{{ profile?.firstName }} {{ profile?.lastName }}</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Email</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">{{ profile?.email }}</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Phone</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">{{ profile?.phone }}</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Mobile</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">{{ profile?.ssn }}</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Address</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">{{ profile?.address?.address }} {{ profile.address?.city }} {{ profile.address?.postalCode }}, {{ profile.address?.state }}</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">University</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">{{ profile.university }}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="card mb-4 mb-md-0">
								<div class="card-body">
									<p class="mb-4"><span class="text-primary font-italic me-1">Company</span></p>
									<hr />
									<div class="row">
										<div class="col-4">Name</div>
										<div class="col-8">
											{{ profile?.company?.name }}
										</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-4">Address</div>
										<div class="col-8">{{ profile?.company?.address?.address }} {{ profile?.company?.address?.city }} {{ profile?.company?.address?.postalCode }}, {{ profile?.company?.address?.state }}</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-4">Title</div>
										<div class="col-8">
											{{ profile?.company?.title }}
										</div>
									</div>
									<hr />
									<div class="row">
										<div class="col-4">Department</div>
										<div class="col-8">
											{{ profile?.company?.department }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="card mb-4 mb-md-0">
								<div class="card-body">
									<p class="mb-4"><span class="text-primary font-italic me-1">Detail</span></p>
									<hr />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";

	export default {
		name: "ProfilePage",
		computed: {
			...mapGetters(["profile"]),
		},
		created() {
			this.$store.dispatch("getUserProfile");
		},
	};
</script>
