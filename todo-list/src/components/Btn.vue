<template>
  <button
    :class="{ circle: applyCircleClass, padding: applyPaddingClass }"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
  import { computed } from '@vue/reactivity';
  import {
    useBackgroundColor,
    backgroundColorProps
  } from '../composables/backgroundColor';

  const props = defineProps({
    ...backgroundColorProps,
    circle: {
      default: false,
      type: Boolean
    },
    padding: {
      default: false,
      type: Boolean
    }
  });

  const backgroundColor = useBackgroundColor(props);

  const applyCircleClass = computed(() => props.circle);
  const applyPaddingClass = computed(() => props.padding);
</script>

<style scoped>
  button {
    color: var(--text-color);
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: v-bind(backgroundColor);
  }

  .circle {
    border-radius: 50%;
  }

  .padding {
    padding: 0.3rem 1rem;
  }
</style>
