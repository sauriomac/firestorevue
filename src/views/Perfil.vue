<template>
<div v-if="isAuthenticated">
    <h2 class="mt-3">Bievenido : {{ user.displayName }}</h2>
    </div>
</template>

<script>
import { useAuth } from "@vueuse/firebase";

export default {

    setup () {
        const {user, isAuthenticated} = useAuth();

        return {user, isAuthenticated}
    }
}
</script>

<style lang="scss" scoped>

</style>