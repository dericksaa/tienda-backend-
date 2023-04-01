CREATE DATABASE IF NOT EXISTS nodelogin;

USE nodelogin;
CREATE TABLE IF NOT EXISTS usuarios (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO usuarios (nombre, email, password) VALUES ('derick', 'derick@gmail.com', '12345');


