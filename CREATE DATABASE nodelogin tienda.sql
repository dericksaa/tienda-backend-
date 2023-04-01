CREATE DATABASE IF NOT EXISTS nodelogin;

USE nodelogin;
CREATE TABLE IF NOT EXISTS tienda (
  id INT(11) NOT NULL AUTO_INCREMENT,
  product VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tienda (product, price) VALUES ('Manzana', '800');
INSERT INTO tienda (product, price) VALUES ('Naranja', '500');
INSERT INTO tienda (product, price) VALUES ('Huevo', '700');
INSERT INTO tienda (product, price) VALUES ('Pastel', '1200');


