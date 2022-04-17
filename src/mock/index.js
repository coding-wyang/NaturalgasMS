export default [
  {
    url: '/api/gasGet',
    method: 'GET',
    response: () => ({
      code: 0,
      message: 'ok',
      data: {
        PH: '@float(5, 11, 1, 1)',
        Calorificvalue: '@float(30, 70, 1, 1)',
        wdp: '@integer(20, 80)',
        hdp: '@float(-20, 0, 1, 1) ℃',
        methane: '@integer(60, 100)',
        sulfur: '@integer(20, 35)',
      },
      meterData: {
        diff: '@integer(3, 8, 1, 1)',
      },
    }),
  },
];
