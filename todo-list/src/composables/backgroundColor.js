import { computed } from 'vue';

export function useBackgroundColor(props) {
  return computed(() => {
    const options = {
      danger: 'var(--danger-color)',
      info: 'var(--info-color)',
      warning: 'var(--warning-color)',
      success: 'var(--accent-color)',
      secondary: 'var(--secondary-color)'
    };

    return options[props.variant];
  });
}

export const backgroundColorProps = {
  variant: {
    required: false,
    default: 'success',
    validator(value) {
      const options = ['success', 'danger', 'warning', 'info', 'secondary'];
      return options.includes(value);
    }
  }
};
