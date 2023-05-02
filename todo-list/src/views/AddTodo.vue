<template>
  <Alert
    :variant="alert.variant"
    :message="alert.message"
    :show="alert.show"
    @close="alert.show = false"
  />

  <TodoForm
    title="Agregar"
    :isSubmiting="isCreatingTodo"
    @submit="todo => submit(todo)"
  />
</template>

<script setup>
  import Alert from '../components/Alert.vue';
  import TodoForm from '../components/TodoForm.vue';

  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useAlert } from '../composables/alert';

  const { alert, showAlert } = useAlert();

  const isCreatingTodo = ref(false);

  const router = useRouter();

  async function submit(todo = {}) {
    if (Object.values(todo).every(value => value === '')) {
      showAlert('You have to fill all the inputs');
      return;
    }
    isCreatingTodo.value = true;
    try {
      await axios.post('/api/todos', todo);
      router.push('/');
    } catch (e) {
      showAlert('Failed creating todo');
    }
    isCreatingTodo.value = false;
    todo.title = '';
    todo.description = '';
    todo.date = '';
  }
</script>

<style scoped>
  .form {
    background-color: var(--navbar-color);
    padding: 20px;
    border-radius: 10px;
  }

  .add-todo-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .add-todo-form input {
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
