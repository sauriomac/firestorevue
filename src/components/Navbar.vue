<template>
  <nav class="navbar navbar-dark bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">{{ titulo }}</router-link>
      <div>
  <button class="btn btn-sm btn-dark" @click="signIn" v-if="!isAuthenticated">
    Acceder
  </button>
  <div v-else>
    <button class="btn btn-sm btn-danger m-1" @click="signOut">Salir</button>
    <router-link class="btn btn-sm btn-dark m-1" to="/crud">CRUD</router-link>
    <router-link class="btn btn-sm btn-dark" to="/perfil">Perfil</router-link>
  </div>

   
  
      </div>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import {UseUser} from '../Hooks/UseUser'
import { useAuth } from "@vueuse/firebase";

export default {
  setup() {
    const { user, isAuthenticated } = useAuth();

    const { signIn, signOut } = UseUser();

    const titulo = computed(() => {
      // console.log(user.value)
      // console.log('isAuthenticated', isAuthenticated.value)
      return isAuthenticated.value ? user.value.email : "Firestore";
    });

    return { signIn, signOut, isAuthenticated, titulo, user };
    
  }
}
</script>