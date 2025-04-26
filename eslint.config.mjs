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
  '@stylistic/max-len': ['error', { code: 120, ignoreStrings: false, ignorePattern: 'className=' }],
  '@stylistic/operator-linebreak': ['error', 'after'],
} });
