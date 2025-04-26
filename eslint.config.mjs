// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  stylistic: {
    semi: true,
  },
}, { rules: {
  'no-alert': 'warn',
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
} });
