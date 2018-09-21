require('../../index');

describe(':signup', () => {
  jestTest('[POST /auth/signup] Should signup', async (done) => {
    // client.setToken(fixtures.users[0].token);
    const res = await client.post('/auth/signup', {
      email: 'test1@test.com',
      password: 'password',
      firstName: 'name',
      lastName: 'name',
    });
    removeAtt(res.body, 'uid'); // remove changing attribute
    expect(res.body).toMatchSnapshot();
    done();
  });

  jestTest('[POST /auth/signup] Should fail signup (no password)', async (done) => {
    const res = await client.post('/auth/signup', {
      email: 'test1@test.com',
      firstName: 'name',
      lastName: 'name',
    });
    expect(res.body).toMatchSnapshot();
    done();
  });

  jestTest('[POST /auth/signup] Should fail signup (email exists)', async (done) => {
    await client.post('/auth/signup', {
      email: 'test1@test.com',
      firstName: 'name',
      lastName: 'name',
      password: 'password',
    });
    const res = await client.post('/auth/signup', {
      email: 'test1@test.com',
      firstName: 'name',
      lastName: 'name',
      password: 'password',
    });
    expect(res.body).toMatchSnapshot();
    done();
  });
});
