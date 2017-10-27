const rand = Math.random().toString(36).slice(2);

export const testUsers = [{
  name: 'Jin Doe',
  email: `Jin_${rand}@example.com`,
  password: 'john-lalala-creative-labs',
  team_name: 'Project NiftyPM',
  team_url: `Team${rand}`,
}, {
  name: 'Team Member',
  email: `Member_${rand}@example.com`,
  password: 'john-lalala-creative-labs',
  team_name: 'Member Berries',
  team_url: `Membah${rand}`,
}, {
  name: 'Ayem Client',
  email: `Client_${rand}@example.com`,
  password: 'john-lalala-creative-labs',
  team_name: 'Clientelle',
  team_url: `Clientelle${rand}`,
}];


export const testTeams = [{
  team_name: 'Project NiftyPM',
  team_url: `Team3${rand}`,
}];
