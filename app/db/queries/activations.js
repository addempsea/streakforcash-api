export default {
  saveToken: 'INSERT INTO activations(userId, token)VALUES($1,$2)',

  findToken: 'SELECT * FROM activations WHERE token=($1)',
  removeToken: 'DELETE FROM activations WHERE token = ($1)',
};
