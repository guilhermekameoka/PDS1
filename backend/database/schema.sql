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
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('medico', 'idoso', 'cuidador') NOT NULL DEFAULT 'idoso'
);

CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_inicial DATE NOT NULL,
    data_final DATE NOT NULL,
    frequencia ENUM('Diário', 'Semanal', 'Mensal') NOT NULL,
    hora TIME NOT NULL,
    dose VARCHAR(50) NOT NULL,
    id_usuario INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);