<template>
  <Spinner v-if="isLoading" class="spinner" />

  <Alert variant="danger" :message="alert.message" :show="alert.show" />

  <TodoForm
    v-if="todo !== null"
    title="Edit"
    :todo="todo"
    :isSubmiting="isUpdatingTodo"
    @submit="todo => submit(todo)"
  />
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import axios from 'axios';

  import Spinner from '../components/Spinner.vue';
  import Alert from '../components/Alert.vue';
  import TodoForm from '../components/TodoForm.vue';
  import { useFetch } from '../composables/fetch';
  import { useRouter } from 'vue-router';

  const props = defineProps(['id']);

  const alert = reactive({
    message: '',
    show: false
  });
  const isUpdatingTodo = ref(false);

  const router = useRouter();

  const { data: todo, isLoading } = useFetch(`/api/todos/${props.id}`, {
    onError: () => {
      alert.show = true;
      alert.message = 'Failed loading todo';
    }
  });

  async function submit(todo) {
    isUpdatingTodo.value = true;
    try {
      await axios.put(`/api/todos/${props.id}`, todo);
      router.push('/');
    } catch (e) {
      alert.show = true;
      alert.message = 'Failed updating todo';
    }
    isUpdatingTodo.value = false;
  }
</script>

<style scoped>
  .spinner {
    margin: auto;
  }
</style>
