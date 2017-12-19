require('../../index');

describe(':misc', () => {
  jestTest('[POST /notFound] Should get 404', async (done) => {
    const res = await client.post('/notFound', {
      email: 'test1@test.com',
      firstName: 'name',
      lastName: 'name',
    });
    expect(res.body).toMatchSnapshot();
    done();
  });
});
