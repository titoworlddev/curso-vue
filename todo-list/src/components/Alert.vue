<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div @click="close" class="close-alert">&times;</div>
  </div>
</template>

<script setup>
  import {
    useBackgroundColor,
    backgroundColorProps
  } from '../composables/backgroundColor';

  const props = defineProps({
    ...backgroundColorProps,
    message: {
      required: true,
      type: String
    },
    show: {
      required: true,
      type: Boolean
    }
  });

  const emit = defineEmits(['close']);

  // Lo mismo que haciamos con el mixin ahora se hace con composable
  const backgroundColor = useBackgroundColor(props);

  function close() {
    emit('close');
  }
</script>

<style scoped>
  .alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 20px 0 20px;
    border-radius: 10px;
    height: 50px;
  }

  .close-alert {
    font-size: 50px;
    cursor: pointer;
  }
</style>
