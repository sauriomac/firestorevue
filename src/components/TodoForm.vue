<template>
  <form @submit.prevent="procesarFormulario">
    <input
      type="text"
      placeholder="Enter para agregar Tarea"
      class="form-control my-3"
      v-model="texto"
      
    />
  </form>
</template>

<script>
import { inject, ref } from "vue";
import {UseDB} from '../Hooks/UseDB'

export default {
  setup() {
    const { agregarTodo } = UseDB();

    const texto = ref("");
    const todos = inject("todos");

    const procesarFormulario = async () => {
      if (!texto.value.trim()) {
        console.log("texto vacio");
        return;
      }

      const todo = await agregarTodo(texto.value);

      todos.value = [...todos.value, todo];
      texto.value = "";
    };

    return { texto, procesarFormulario };
  }
};

</script>