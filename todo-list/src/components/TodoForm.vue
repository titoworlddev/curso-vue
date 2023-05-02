<template>
  <div class="form">
    <h1>{{ props.title }} Todo</h1>
    <form class="todo-form" @submit.prevent="emit('submit', props.todo)">
      <label>
        Todo Title
        <input type="text" v-model="props.todo.title" />
      </label>
      <label>
        Todo Description
        <input type="text" v-model="props.todo.description" />
      </label>
      <label>
        Todo Date
        <input type="date" v-model="props.todo.date" />
      </label>

      <div class="submit">
        <Btn :disabled="isSubmiting">
          <Spinner v-if="isSubmiting" class="spinner" />
          <span v-else>Submit</span>
        </Btn>
      </div>
    </form>
  </div>
</template>

<script setup>
  import Btn from '@/components/Btn.vue';
  import Spinner from '../components/Spinner.vue';
  import { computed } from 'vue';

  const props = defineProps({
    title: '',
    todo: {
      default: {
        title: '',
        description: '',
        date: ''
      },
      type: Object
    },
    isSubmiting: {
      default: false,
      type: Boolean
    }
  });

  /* 
    Con computed puedo hacer que la variable cambie en tiempo de ejecucion 
    del componente y asi poder cambiar el estado del spinner del Btn segun si 
    se esta agregando el todo
   */
  const isSubmiting = computed(() => props.isSubmiting);

  const emit = defineEmits(['submit']);
</script>

<style scoped>
  .form {
    background-color: var(--navbar-color);
    padding: 20px;
    border-radius: 10px;
  }

  .todo-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .todo-form input {
    width: 100%;
    height: 30px;
    border: 1px solid var(--accent-color);
  }

  .submit {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }

  .submit button {
    height: 50px;
    width: 80px;
  }

  .spinner {
    margin: auto;
  }
</style>
