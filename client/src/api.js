const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://kanflow.cyclic.app/api';

export { baseURL };
