/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS activations(
id SERIAL PRIMARY KEY, 
userId uuid NOT NULL REFERENCES user_info(id), 
token VARCHAR NOT NULL )