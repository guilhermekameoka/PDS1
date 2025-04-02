CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    cep VARCHAR(10),
    rua VARCHAR(255),
    numero VARCHAR(10),
    cidade VARCHAR(100),
    senha VARCHAR(255) NOT NULL
);