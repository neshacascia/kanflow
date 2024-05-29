const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://kanflow.up.railway.app/api';

export { baseURL };
