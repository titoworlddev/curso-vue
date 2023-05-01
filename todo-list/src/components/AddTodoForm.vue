<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Todo Title" />
    <div>
      <Btn
        :disabled="isLoading"
        class="btn"
        type="submit"
        @click.prevent="
          () => {
            $emit('submit', todoTitle);
            // todoTitle = '';
          }
        "
      >
        <Spinner v-if="isLoading" />
        <span v-else> Add Todo </span>
      </Btn>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Btn from './Btn.vue';
  import Spinner from './Spinner.vue';

  const props = defineProps({
    isLoading: {
      default: false,
      type: Boolean
    }
  });

  const todoTitle = ref('');

  const emit = defineEmits(['submit']);
</script>

<style scoped>
  .add-todo-form {
    display: flex;
    justify-content: space-between;
  }

  .add-todo-form input {
    width: 80%;
    border: 2px solid var(--accent-color);
  }

  .btn {
    height: 50px;
  }
  .btn:disabled {
    opacity: 80%;
    padding-inline: 16px;
  }
</style>
