export default {
  createUser: `INSERT INTO user_info(id, username, email, password, salt, role, is_verified)
  VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id, role, username, email, is_verified, created_at, updated_at`,

  findUser: 'SELECT * FROM user_info WHERE email = ($1) OR  username = ($1)',
  updateUser: 'UPDATE user_info SET is_verified = TRUE WHERE id = ($1)',
  findUserWithId: 'SELECT * FROM user_info WHERE id = (1$)'
};
