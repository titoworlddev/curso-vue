<template>
  <Alert variant="danger" :message="alert.message" :show="alert.show" />

  <div class="form">
    <h1>Add Todo</h1>
    <form class="add-todo-form" @submit.prevent="submit">
      <label>
        Todo Title
        <input class="title-input" type="text" v-model="todo.title" />
      </label>
      <label>
        Todo Description
        <input type="text" v-model="todo.description" />
      </label>
      <label>
        Todo Date
        <input type="date" v-model="todo.date" />
      </label>

      <div class="submit">
        <Btn :disabled="isCreatingTodo">
          <Spinner v-if="isCreatingTodo" class="spinner" />
          <span v-else>Submit</span>
        </Btn>
      </div>
    </form>
  </div>
</template>

<script setup>
  import Btn from '@/components/Btn.vue';
  import Spinner from '../components/Spinner.vue';
  import Alert from '../components/Alert.vue';
  import { reactive, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  const alert = reactive({
    message: '',
    show: false
  });
  const isCreatingTodo = ref(false);

  const todo = reactive({
    title: '',
    description: '',
    date: ''
  });

  const router = useRouter();

  async function submit() {
    isCreatingTodo.value = true;
    try {
      await axios.post('/api/todos', todo);
      router.push('/');
    } catch (e) {
      alert.show = true;
      alert.message = 'Failed creating todo';
    }
    isCreatingTodo.value = false;
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
