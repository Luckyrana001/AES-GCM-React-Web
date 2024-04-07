let config;

if (process.env.NODE_ENV === 'production') {
  config = require('./env.production').default;
} else {
  config = require('./env.development').default;
}

export default config;