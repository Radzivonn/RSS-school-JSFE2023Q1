module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
  env: {
    browser: true,
  },
  rules: {
		'linebreak-style': 0,
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: 0,
  },
};
