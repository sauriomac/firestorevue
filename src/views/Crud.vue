<template>
    <div v-if="isAuthenticated">
        <h1>CRUD</h1>
        <Cargando v-if="cargando" />
        <div v-else>
            <Error v-if="pintarError" />
        </div>
         <TodoForm />
         <Todo  v-for="todo in todos" :key="todo.id" :todo="todo"/>
        <!-- <pre>{{todos}}</pre> -->
</div>
</template>
<script>

import Error from "../components/Error.vue"
import Cargando from  "@//components/Cargando.vue"
import TodoForm from "../components/TodoForm"
import Todo from "../components/Todo"


import {useAuth} from '@vueuse/firebase'
import {UseDB} from '../Hooks/UseDB'
import { ref, onMounted, provide, computed } from 'vue'
export default {
     components: {Cargando, Error,TodoForm, Todo},
    setup () {
        const {isAuthenticated} = useAuth()
        const {cargando, getTodos} = UseDB()
        const todos = ref([])
        const error = ref(null)

        onMounted(async() => {
            todos.value = await getTodos()
            if (todos.value.res) {
                error.value = todos.value.error;
            }
        })

        provide('todos', todos)
        provide('Error', Error)

        const pintarError = computed(() => error.value ? true : false)


        return {isAuthenticated,cargando, todos, pintarError }
    }
}
</script>

<style lang="scss" scoped>

</style>