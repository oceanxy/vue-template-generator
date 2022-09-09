export default {
  '/basic/park/getParkTree': {
    status: true,
    code: 10000,
    message: '',
    data: [
      {
        id: '@uuid',
        name: '@ctitle(2,3)',
        children: [
          {
            id: '@uuid',
            name: '@ctitle(2,3)'
          },
          {
            id: '@uuid',
            name: '@ctitle(2,3)'
          }
        ]
      }
    ]
  }
}
