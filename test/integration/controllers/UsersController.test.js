require('../../index');

describe(':editUser', () => {
  jestTest('[PUT /users/:uid] Should edit user 1', async (done) => {
    client.setToken(fixtures.users[0].token);
    const res = await client.put(`/users/${fixtures.users[0].uid}`, {
      firstName: 'changedFirstName',
    });
    expect(res.body).toMatchSnapshot();
    done();
  });

  jestTest('[PUT /users/:uid] Should error (not authorized, editing some other user)', async (done) => {
    client.setToken(fixtures.users[0].token);
    const res = await client.put(`/users/${fixtures.users[1].uid}`, {
      firstName: 'changedFirstName',
    });
    expect(res.body).toMatchSnapshot();
    done();
  });
});
