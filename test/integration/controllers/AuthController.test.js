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
    delete res.body.token; // remove changing attribute
    delete res.body._id; // remove changing attribute
    // expect({ expected: 'expected' }).toMatchSnapshot(); run this first for ttd
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
});

describe(':login', () => {
  jestTest('[POST /auth/login] Should login', async (done) => {
    const res = await client.post('/auth/login', {
      email: fixtures.users[0].email,
      password: fixtures.users[0].password,
    });
    delete res.body.token;
    expect(res.body).toMatchSnapshot();
    done();
  });

  jestTest('[POST /auth/login] Should fail login (bad email)', async (done) => {
    const res = await client.post('/auth/login', {
      email: 'bad@email.com',
      password: fixtures.users[0].password,
    });
    expect(res.body).toMatchSnapshot();
    done();
  });

  jestTest('[POST /auth/login] Should fail login (bad password)', async (done) => {
    const res = await client.post('/auth/login', {
      email: fixtures.users[0].email,
      password: 'bad_password',
    });
    expect(res.body).toMatchSnapshot();
    done();
  });

  jestTest('[POST /auth/login] Should fail login (no email)', async (done) => {
    const res = await client.post('/auth/login', {
      password: fixtures.users[0].password,
    });
    expect(res.body).toMatchSnapshot();
    done();
  });
});
