export const backgroundColor = {
  props: {
    variant: {
      required: false,
      default: 'success',
      validator(value) {
        const options = ['success', 'danger', 'warning', 'info', 'secondary'];
        return options.includes(value);
      }
    }
  },
  computed: {
    backgroundColor() {
      const options = {
        danger: 'var(--danger-color)',
        info: 'var(--info-color)',
        warning: 'var(--warning-color)',
        success: 'var(--accent-color)',
        secondary: 'var(--secondary-color)'
      };

      return options[this.variant];
    }
  }
};
