export default [
  {
    url: '/api/gasGet',
    method: 'GET',
    response: () => ({
      code: 0,
      message: 'ok',
      data: ['tom', 'jerry'],
    }),
  },
];
