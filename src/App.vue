<template>
  <Navbar />
  <div class="container">
    <Cargando v-if="loading" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Cargando from  "@//components/Cargando.vue"
import {firebase} from "@/firebase"
import { ref, onMounted } from "vue"
export default {
  components: { Navbar, Cargando },
  setup() {

    const loading = ref(false)

    onMounted(async() => {
      loading.value = true
      await firebase.getCurrentUser()
      loading.value = false
    })

    return {loading}

  },
};
</script>
