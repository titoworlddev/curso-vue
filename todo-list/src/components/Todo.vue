<template>
  <div class="todo">
    <p>{{ todo.title }}</p>
    <p>{{ todo.description }}</p>
    <p>{{ todo.date }}</p>
    <div>
      <Btn
        circle
        variant="secondary"
        @click="$emit('edit', todo)"
        class="btn edit-todo-btn"
      >
        <PencilIcon />
      </Btn>
      <Btn circle variant="danger" @click="$emit('remove', todo)" class="btn">
        &times;
      </Btn>
    </div>
  </div>
</template>

<script setup>
  import Btn from './Btn.vue';
  import PencilIcon from './icons/PencilIcon.vue';

  const props = defineProps({
    todo: {
      type: Object,
      required: true
    }
  });

  const emit = defineEmits(['remove', 'edit']);
</script>

<style scoped>
  .todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--accent-color);
    margin-top: 30px;
    padding-inline: 20px;
    border-radius: 10px;
  }

  .todo > div {
    display: flex;
  }

  .btn {
    height: 40px;
    width: 40px;
    font-size: 30px;
  }

  .edit-todo-btn {
    margin-right: 5px;
  }

  @media (max-width: 680px) {
    .todo {
      flex-direction: column;
      padding: 20px;
    }
  }
</style>
