
CREATE TABLE users (
  id SERIAL,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE messages (
  id SERIAL,
  username VARCHAR(255),
  message TEXT
);
