<template>
  <Alert
    :message="alert.message"
    :show="alert.show"
    @close="alert.show = false"
    :variant="alert.variant"
  />

  <section>
    <Spinner class="spinner" v-if="isLoading" />
    <div v-else>
      <Todo
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
        @remove="removeTodo(todo.id)"
        @edit="$router.push(`/todos/${todo.id}/edit`)"
      />
    </div>
  </section>
</template>

<script setup>
  import Alert from '@/components/Alert.vue';
  import Todo from '@/components/Todo.vue';
  import Spinner from '@/components/Spinner.vue';
  import axios from 'axios';
  import { ref } from 'vue';
  import { useFetch } from '@/composables/fetch';
  import { useAlert } from '../composables/alert';

  const { alert, showAlert } = useAlert();

  const isPostingTodo = ref(false);

  const { data: todos, isLoading } = useFetch('/api/todos', {
    onError: () => showAlert('Failed loading todos')
  });

  async function addTodo(title) {
    if (!title) {
      showAlert('Todo title is required');
      return;
    }

    isPostingTodo.value = true;

    const res = await axios.post('/api/todos', { title });
    isPostingTodo.value = false;

    todos.value.push(res.data);
  }

  async function removeTodo(id) {
    await axios.delete(`/api/todos/${id}`);
    todos.value = todos.value.filter(todo => todo.id !== id);
  }
</script>

<style scoped>
  .spinner {
    margin: auto;
    margin-top: 32px;
  }
</style>
