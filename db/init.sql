DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS fav_users;

CREATE TABLE favorites (
  favorite_id SERIAL PRIMARY KEY,
  int_num INT NOT NULL,
  float_num FLOAT NOT NULL,
  dec_num DECIMAL NOT NULL,
  char VARCHAR(1) NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE fav_users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password TEXT NOT NULL
)

INSERT INTO favorites (int_num, float_num, dec_num, char, name)
VALUES (11, 1.01, 2.2, 'F', 'Luna');