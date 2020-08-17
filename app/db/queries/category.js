const categoryQueries = {
  createCategory:
          `INSERT into category(title) 
          VALUES($1) RETURNING *`
};

export default categoryQueries;
