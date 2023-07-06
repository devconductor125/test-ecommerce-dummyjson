<template>
  <div style="height: 500px;">
    <div class="d-flex align-items-center justify-content-center mt-5">
            <div class="text-center row mt-3">
                <div class=" col-md-6">
                    <img src="images/notfound.png" alt="" width="300"
                        class="img-fluid">
                </div>
                <div class=" col-md-6 mt-5 d-flex flex-column align-items-center justify-content-center">
                    <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                    <p class="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <router-link to="/" class="btn btn-primary">Go Home</router-link>
                </div>

            </div>
        </div>
  </div>
</template>
<script>
export default {
  name: "NotFound"
}
</script>