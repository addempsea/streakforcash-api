const questionQueries = {
  createQuestion:
        `INSERT into question(id, title, options,start_time,end_time,status,category_id) 
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING title, options,start_time,end_time,status,category_id`
};

export default questionQueries;
