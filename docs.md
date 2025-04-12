# Documentação do Backend do Sistema Saúde Sênior

## Índice
1. [Introdução](#introdução)
2. [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
3. [Configuração Inicial](#configuração-inicial)
4. [Rotas da API](#rotas-da-api)
5. [Detalhamento Técnico dos Componentes](#detalhamento-técnico-dos-componentes)
6. [Segurança](#segurança)
7. [Solução de Problemas Comuns](#solução-de-problemas-comuns)
8. [Considerações Finais](#considerações-finais)

## Introdução
O backend do sistema Saúde Sênior foi desenvolvido utilizando Node.js e Express.js, com um banco de dados MySQL para armazenamento de dados. Ele fornece uma API RESTful para gerenciar usuários (médicos, idosos e cuidadores), medicamentos, consultas e autenticação.

### Objetivo do Sistema
O sistema permite o gerenciamento eficiente de prescrições médicas, acompanhamento de medicamentos, agendamento de consultas e integração entre médicos, idosos e cuidadores, proporcionando uma plataforma centralizada para o cuidado da saúde do idoso.

### Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript
- **Express.js**: Framework web para APIs
- **MySQL**: Sistema de gerenciamento de banco de dados
- **Bcrypt**: Biblioteca para criptografia de senhas
- **Joi**: Biblioteca para validação de esquemas
- **Cors**: Middleware para configuração de CORS
- **Dotenv**: Carregamento de variáveis de ambiente


## Visão Geral da Arquitetura

```
backend/
├── config.js                 # Configurações centralizadas
├── server.js                 # Ponto de entrada da aplicação
├── exemplo.env               # Modelo para configuração de ambiente
├── database/
│   ├── db.js                 # Configuração da conexão com o banco
│   └── schema.sql            # Estrutura do banco de dados
├── middlewares/
│   └── validate.js           # Middleware de validação de dados
├── routes/
│   ├── cadastro.js           # Rota para cadastro de usuários
│   ├── consultas.js          # Rotas para gerenciar consultas
│   ├── index.js              # Agrupa e exporta todas as rotas
│   ├── login.js              # Rota para autenticação
│   ├── regMedicamento.js     # Rotas para gerenciar medicamentos
│   └── usuarios.js           # Rotas para gerenciar usuários
└── utils/
    ├── dbhelper.js           # Funções auxiliares para o banco
    ├── messages.js           # Mensagens padronizadas do sistema
    └── validation.js         # Esquemas de validação
```

### Fluxo de Dados
1. Cliente envia requisição HTTP para a API
2. Middleware de CORS e parsing JSON processa a requisição
3. Middlewares de validação verificam dados quando aplicável
4. Roteadores direcionam para o manipulador adequado
5. Lógica de negócio é executada, geralmente envolvendo o banco
6. Resposta é formatada e enviada de volta ao cliente


## Configuração Inicial

### **Requisitos**
- Node.js (versão 14 ou superior recomendada)
- MySQL (versão 5.7 ou superior)
- npm (gerenciador de pacotes do Node.js)

### **Configuração do Ambiente**
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/saude-senior.git
   cd saude-senior/backend
   ```

2. Renomeie o arquivo `exemplo.env` para `.env`:
   ```bash
   cp exemplo.env .env
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=saude_senior
   PORT=3000
   ```

4. Instale as dependências do projeto:
   ```bash
   npm install
   ```

5. Crie o banco de dados e as tabelas necessárias:
   ```bash
   mysql -u seu_usuario -p < database/schema.sql
   ```
   Ou abra o arquivo `schema.sql` em um cliente MySQL e execute os comandos.

6. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:3000` (ou na porta configurada).

### **Verificação da Instalação**
Para verificar se o servidor está rodando corretamente:
```bash
curl http://localhost:3000
# Ou abra no navegador: http://localhost:3000
```

Você deve receber uma mensagem indicando que a API está online.


## Rotas da API

### 1. **Cadastro de Usuários**
**Rota:** `POST /cadastro`

**Descrição:** Registra um novo usuário no sistema (médico, idoso ou cuidador).

**Corpo da Requisição:**
```json
{
  "nome": "João Silva",
  "idade": 65,
  "email": "joao.silva@exemplo.com",
  "telefone": "(11) 98765-4321",
  "cep": "01234-567",
  "rua": "Rua das Flores",
  "numero": "123",
  "cidade": "São Paulo",
  "senha": "senha123",
  "tipo_usuario": "idoso"
}
```

**Resposta de Sucesso:**
- **Status:** `201 Created`
```json
{
  "message": "Usuário cadastrado com sucesso.",
  "id": 42,
  "tipo": "idoso"
}
```

**Possíveis Erros:**
- **400 Bad Request:**
  ```json
  {
    "error": "E-mail já cadastrado."
  }
  ```
  ```json
  {
    "error": "Campo 'nome' é obrigatório."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao cadastrar usuário. Tente novamente mais tarde."
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X POST http://localhost:3000/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "idade": 65,
    "email": "joao.silva@exemplo.com",
    "telefone": "(11) 98765-4321",
    "cep": "01234-567",
    "rua": "Rua das Flores",
    "numero": "123",
    "cidade": "São Paulo",
    "senha": "senha123",
    "tipo_usuario": "idoso"
  }'
```


### 2. **Login de Usuários**
**Rota:** `POST /login`

**Descrição:** Autentica um usuário e retorna suas informações.

**Corpo da Requisição:**
```json
{
  "email": "joao.silva@exemplo.com",
  "senha": "senha123"
}
```

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
{
  "message": "Login realizado com sucesso!",
  "usuario": {
    "id": 42,
    "nome": "João Silva",
    "email": "joao.silva@exemplo.com",
    "tipo": "idoso"
  }
}
```

**Possíveis Erros:**
- **400 Bad Request:**
  ```json
  {
    "error": "E-mail e senha são obrigatórios."
  }
  ```
- **404 Not Found:**
  ```json
  {
    "error": "Usuário não encontrado."
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "error": "Senha incorreta."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro interno do servidor."
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao.silva@exemplo.com",
    "senha": "senha123"
  }'
```


### 3. **Cadastro de Medicamentos**
**Rota:** `POST /medicamento`

**Descrição:** Registra um novo medicamento para um paciente.

**Corpo da Requisição:**
```json
{
  "nome": "Losartana Potássica",
  "data_inicial": "2025-04-10",
  "data_final": "2025-10-10",
  "frequencia": "Diário",
  "hora": "08:00",
  "dose": "50mg - 1 comprimido",
  "id_usuario": 42,
  "id_medico": 15
}
```

**Resposta de Sucesso:**
- **Status:** `201 Created`
```json
{
  "message": "Medicamento cadastrado com sucesso!",
  "id": 107
}
```

**Possíveis Erros:**
- **400 Bad Request:**
  ```json
  {
    "error": "ID do usuário é obrigatório."
  }
  ```
  ```json
  {
    "error": "Formato de data inválido. Use YYYY-MM-DD."
  }
  ```
- **404 Not Found:**
  ```json
  {
    "error": "Usuário não encontrado."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro interno do servidor."
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X POST http://localhost:3000/medicamento \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Losartana Potássica",
    "data_inicial": "2025-04-10",
    "data_final": "2025-10-10",
    "frequencia": "Diário",
    "hora": "08:00",
    "dose": "50mg - 1 comprimido",
    "id_usuario": 42,
    "id_medico": 15
  }'
```


### 4. **Listagem de Medicamentos de um Usuário**
**Rota:** `GET /medicamento/usuario/:id`

**Descrição:** Retorna a lista de medicamentos de um usuário específico.

**Parâmetros da URL:**
- `id`: ID do usuário (número inteiro).

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
[
  {
    "id": 107,
    "nome": "Losartana Potássica",
    "data_inicial": "2025-04-10",
    "data_final": "2025-10-10",
    "frequencia": "Diário",
    "hora": "08:00",
    "dose": "50mg - 1 comprimido",
    "medico_nome": "Dra. Ana Souza"
  },
  {
    "id": 105,
    "nome": "Atorvastatina",
    "data_inicial": "2025-04-01",
    "data_final": "2025-07-01",
    "frequencia": "Diário",
    "hora": "20:00",
    "dose": "20mg - 1 comprimido",
    "medico_nome": "Dr. Carlos Santos"
  }
]
```

**Possíveis Erros:**
- **400 Bad Request:**
  ```json
  {
    "error": "ID do usuário é obrigatório."
  }
  ```
- **404 Not Found:**
  ```json
  {
    "error": "Usuário não encontrado."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao buscar medicamentos."
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X GET http://localhost:3000/medicamento/usuario/42
```


### 5. **Listagem de Usuários Idosos**
**Rota:** `GET /usuarios/idosos`

**Descrição:** Retorna a lista de todos os usuários do tipo "idoso".

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
[
  {
    "id": 42,
    "nome": "João Silva"
  },
  {
    "id": 43,
    "nome": "Maria Oliveira"
  }
]
```

**Possíveis Erros:**
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao buscar a lista de idosos."
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X GET http://localhost:3000/usuarios/idosos
```


### 6. **Agendamento de Consultas**
**Rota:** `POST /consulta`

**Descrição:** Permite que médicos agendem consultas para pacientes idosos. Apenas usuários com tipo "medico" podem realizar esta operação.

**Corpo da Requisição:**
```json
{
  "data": "2025-04-20",
  "hora": "14:30",
  "local": "Hospital Santa Maria - Consultório 302",
  "observacoes": "Trazer exames anteriores",
  "id_medico": 15,
  "id_paciente": 42
}
```

**Resposta de Sucesso:**
- **Status:** `201 Created`
```json
{
  "id": 25,
  "message": "Consulta agendada com sucesso"
}
```

**Possíveis Erros:**
- **400 Bad Request:**
  ```json
  {
    "error": "Todos os campos obrigatórios devem ser preenchidos"
  }
  ```
- **403 Forbidden:**
  ```json
  {
    "error": "Apenas médicos podem agendar consultas"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "error": "Paciente não encontrado ou não é um idoso"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao agendar consulta"
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X POST http://localhost:3000/consulta \
  -H "Content-Type: application/json" \
  -d '{
    "data": "2025-04-20",
    "hora": "14:30",
    "local": "Hospital Santa Maria - Consultório 302",
    "observacoes": "Trazer exames anteriores",
    "id_medico": 15,
    "id_paciente": 42
  }'
```

### 7. **Visualização de Consultas do Médico**
**Rota:** `GET /consulta/medico/:id`

**Descrição:** Retorna todas as consultas agendadas por um médico específico, incluindo informações dos pacientes.

**Parâmetros da URL:**
- `id`: ID do médico (número inteiro).

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
[
  {
    "id": 25,
    "data": "2025-04-20",
    "hora": "14:30",
    "local": "Hospital Santa Maria - Consultório 302",
    "observacoes": "Trazer exames anteriores",
    "id_medico": 15,
    "id_paciente": 42,
    "created_at": "2025-04-12T15:30:45.000Z",
    "nome_paciente": "João Silva",
    "idade_paciente": 65
  }
]
```

**Possíveis Erros:**
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao listar consultas"
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X GET http://localhost:3000/consulta/medico/15
```

### 8. **Visualização de Consultas do Paciente**
**Rota:** `GET /consulta/paciente/:id`

**Descrição:** Retorna todas as consultas agendadas para um paciente específico, incluindo informações dos médicos.

**Parâmetros da URL:**
- `id`: ID do paciente (número inteiro).

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
[
  {
    "id": 25,
    "data": "2025-04-20",
    "hora": "14:30",
    "local": "Hospital Santa Maria - Consultório 302",
    "observacoes": "Trazer exames anteriores",
    "id_medico": 15,
    "id_paciente": 42,
    "created_at": "2025-04-12T15:30:45.000Z",
    "nome_medico": "Dra. Ana Souza"
  }
]
```

**Possíveis Erros:**
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao listar consultas"
  }
  ```

**Exemplo de Uso com cURL:**
```bash
curl -X GET http://localhost:3000/consulta/paciente/42
```


## Detalhamento Técnico dos Componentes

### 1. **server.js**
Arquivo principal que inicializa o servidor Express.

**Funções Principais:**
- Configura o ambiente usando variáveis do arquivo `.env`
- Aplica middlewares globais como CORS e body-parser
- Configura servir arquivos estáticos 
- Registra as rotas da API
- Define tratamento de erros global
- Inicia o servidor HTTP na porta configurada

**Fluxo de Execução:**
1. Carrega configurações usando dotenv
2. Cria uma instância do Express
3. Aplica middlewares de CORS e parsing de JSON
4. Configura pastas de recursos estáticos
5. Registra as rotas do sistema
6. Define middleware de tratamento de erro global
7. Inicia o servidor na porta especificada

**Exemplo de Código:**
```javascript
// Carregando variáveis de ambiente
require('dotenv').config();

// Importações
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { PORT } = require('./config');

// Inicialização do Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/', routes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Erro interno do servidor.' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```


### 2. **config.js**
Módulo que centraliza as configurações da aplicação.

**Responsabilidades:**
- Define constantes utilizadas na aplicação
- Extrai valores das variáveis de ambiente
- Define caminhos para recursos estáticos

**Constantes Expostas:**
- PORT: Porta onde o servidor será executado
- STATIC_PATH: Caminho para arquivos estáticos do frontend
- ASSETS_PATH: Caminho para recursos como imagens
- JS_PATH: Caminho para arquivos JavaScript do cliente
- DB_CONFIG: Configurações de conexão com o banco de dados

**Exemplo de Código:**
```javascript
const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3000,
  
  DB_CONFIG: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  
  STATIC_PATH: path.join(__dirname, '..', 'frontend'),
  ASSETS_PATH: path.join(__dirname, '..', 'assets'),
  JS_PATH: path.join(__dirname, '..', 'js')
};
```


### 3. **database/db.js**
Módulo para gerenciar a conexão com o banco de dados MySQL.

**Características:**
- Utiliza o MySQL2 com suporte a Promises
- Implementa um pool de conexões para melhor desempenho
- Exporta o pool para ser usado em outros módulos

**Configuração do Pool:**
- host: Endereço do servidor MySQL
- user: Nome de usuário do banco de dados
- password: Senha do banco de dados
- database: Nome do banco de dados a ser utilizado
- waitForConnections: Se deve esperar por conexões disponíveis (true)
- connectionLimit: Número máximo de conexões simultâneas (10)
- queueLimit: Limite da fila de conexões aguardando (0 = ilimitado)

**Exemplo de Código:**
```javascript
const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('../config');

const pool = mysql.createPool({
  host: DB_CONFIG.host,
  user: DB_CONFIG.user,
  password: DB_CONFIG.password,
  database: DB_CONFIG.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão
pool.getConnection()
  .then(connection => {
    console.log('Conectado ao banco de dados MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  });

module.exports = pool;
```


### 4. **database/schema.sql**
Script SQL para criar a estrutura inicial do banco de dados.

**Tabelas Criadas:**
- **usuarios**: Armazena dados dos usuários do sistema
  - Colunas: id, nome, idade, email, telefone, cep, rua, numero, cidade, senha, tipo_usuario
  - Tipos de usuário: 'medico', 'idoso', 'cuidador'

- **medicamentos**: Armazena dados de medicamentos prescritos
  - Colunas: id, nome, data_inicial, data_final, frequencia, hora, dose, id_usuario, id_medico, created_at
  - Relacionamento: chaves estrangeiras para usuarios(id)

- **consultas**: Armazena dados de consultas agendadas
  - Colunas: id, data, hora, local, observacoes, id_medico, id_paciente, created_at
  - Relacionamento: chaves estrangeiras para usuarios(id) em id_medico e id_paciente

**Exemplo de Código:**
```sql
CREATE DATABASE IF NOT EXISTS saude_senior;
USE saude_senior;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INT,
  email VARCHAR(100) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  cep VARCHAR(10),
  rua VARCHAR(100),
  numero VARCHAR(10),
  cidade VARCHAR(50),
  senha VARCHAR(100) NOT NULL,
  tipo_usuario ENUM('medico', 'idoso', 'cuidador') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_inicial DATE NOT NULL,
  data_final DATE NOT NULL,
  frequencia ENUM('Diário', 'Semanal', 'Mensal') NOT NULL,
  hora TIME NOT NULL,
  dose VARCHAR(100) NOT NULL,
  id_usuario INT NOT NULL,
  id_medico INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_medico) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS consultas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  local VARCHAR(255),
  observacoes TEXT,
  id_medico INT NOT NULL,
  id_paciente INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_medico) REFERENCES usuarios(id),
  FOREIGN KEY (id_paciente) REFERENCES usuarios(id)
);
```


### 5. **middlewares/validate.js**
Middleware de validação de dados usando Joi.

**Funcionalidade:**
- Recebe um esquema Joi como parâmetro
- Retorna uma função middleware que valida o corpo da requisição contra o esquema
- Rejeita requisições com dados inválidos (status 400)
- Permite que requisições válidas continuem o fluxo (next())

**Exemplo de Código:**
```javascript
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: error.details[0].message 
      });
    }
    
    next();
  };
};

module.exports = validate;
```

**Exemplo de Uso:**
```javascript
const validate = require('../middlewares/validate');
const { userSchema } = require('../utils/validation');

router.post('/cadastro', validate(userSchema), (req, res) => {
  // Lógica de cadastro aqui...
});
```

### 6. **routes/index.js**
Arquivo central que agrupa e exporta todas as rotas da aplicação.

**Funcionalidade:**
- Importa todos os módulos de rota
- Registra cada módulo em seu respectivo caminho base
- Exporta o router configurado para uso no server.js

**Rotas Registradas:**
- `/cadastro`: Rotas para cadastro de usuários
- `/login`: Rotas para autenticação
- `/medicamento`: Rotas para gerenciamento de medicamentos
- `/usuarios`: Rotas para gerenciamento de usuários
- `/consulta`: Rotas para gerenciamento de consultas

**Exemplo de Código:**
```javascript
const express = require('express');
const router = express.Router();

// Importação das rotas específicas
const cadastroRoutes = require('./cadastro');
const loginRoutes = require('./login');
const medicamentoRoutes = require('./regMedicamento');
const usuariosRoutes = require('./usuarios');
const consultasRoutes = require('./consultas');

// Rota básica para verificar se a API está online
router.get('/', (req, res) => {
  res.json({ status: 'online', message: 'API Saúde Sênior online!' });
});

// Registro das rotas específicas
router.use('/cadastro', cadastroRoutes);
router.use('/login', loginRoutes);
router.use('/medicamento', medicamentoRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/consulta', consultasRoutes);

module.exports = router;
```


### 7. **routes/cadastro.js**
Implementa a rota para cadastro de usuários.

**Endpoint:** `POST /cadastro`

**Implementação Técnica:**
1. Valida o corpo da requisição usando o esquema definido
2. Normaliza o email (trim e lowercase) para evitar duplicidades
3. Verifica se o email já existe no banco de dados
4. Criptografa a senha usando bcrypt (10 rounds de salt)
5. Insere os dados do usuário no banco de dados
6. Retorna o ID do usuário criado e seu tipo

**Segurança:**
- Validação completa de input via Joi
- Criptografia de senha usando bcrypt
- Verificação de duplicidade de email

**Exemplo de Código:**
```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { executeQuery } = require('../utils/dbhelper');
const validate = require('../middlewares/validate');
const { userSchema } = require('../utils/validation');
const { CADASTRO } = require('../utils/messages');

router.post('/', validate(userSchema), async (req, res) => {
  try {
    const { nome, idade, email, telefone, cep, rua, numero, cidade, senha, tipo_usuario } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    
    // Verifica se o email já existe
    const usuarioExistente = await executeQuery(
      'SELECT id FROM usuarios WHERE email = ?', 
      [normalizedEmail]
    );
    
    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: CADASTRO.ERROR.EMAIL_EXISTS });
    }
    
    // Encripta a senha
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);
    
    // Insere o usuário no banco
    const result = await executeQuery(
      'INSERT INTO usuarios (nome, idade, email, telefone, cep, rua, numero, cidade, senha, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, idade, normalizedEmail, telefone, cep, rua, numero, cidade, hashedSenha, tipo_usuario]
    );
    
    res.status(201).json({
      message: CADASTRO.SUCCESS,
      id: result.insertId,
      tipo: tipo_usuario
    });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: CADASTRO.ERROR.GENERIC });
  }
});

module.exports = router;
```


### 8. **routes/login.js**
Implementa a rota para autenticação de usuários.

**Endpoint:** `POST /login`

**Implementação Técnica:**
1. Verifica se email e senha foram fornecidos
2. Normaliza o email informado
3. Busca o usuário no banco de dados pelo email
4. Verifica se o usuário existe
5. Compara a senha fornecida com a senha criptografada usando bcrypt
6. Retorna os dados do usuário sem expor a senha

**Segurança:**
- Não revela se o usuário existe ou se a senha está incorreta (mitigação de enumeração)
- Usa bcrypt para comparação de senhas (resistente a timing attacks)
- Retorna apenas dados necessários do usuário (não expõe a senha)

**Exemplo de Código:**
```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { executeQuery } = require('../utils/dbhelper');
const { LOGIN } = require('../utils/messages');

router.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({ error: LOGIN.ERROR.CAMPOS_OBRIGATORIOS });
    }
    
    const normalizedEmail = email.trim().toLowerCase();
    
    // Busca o usuário pelo email
    const usuarios = await executeQuery(
      'SELECT id, nome, email, senha, tipo_usuario FROM usuarios WHERE email = ?',
      [normalizedEmail]
    );
    
    if (usuarios.length === 0) {
      return res.status(404).json({ error: LOGIN.ERROR.USUARIO_NAO_ENCONTRADO });
    }
    
    const usuario = usuarios[0];
    
    // Compara a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaCorreta) {
      return res.status(401).json({ error: LOGIN.ERROR.SENHA_INCORRETA });
    }
    
    // Retorna os dados do usuário (sem a senha)
    res.json({
      message: LOGIN.SUCCESS,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo_usuario
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: LOGIN.ERROR.GENERIC });
  }
});

module.exports = router;
```


### 9. **routes/regMedicamento.js**
Implementa as rotas para gerenciamento de medicamentos.

**Endpoints:**
- `POST /medicamento`: Cadastra novo medicamento
- `GET /medicamento/usuario/:id`: Lista medicamentos de um usuário

**Implementação Técnica do POST:**
1. Valida o corpo da requisição usando o esquema definido
2. Verifica se o ID do usuário e do médico foram fornecidos
3. Insere os dados do medicamento no banco de dados
4. Retorna o ID do medicamento criado

**Implementação Técnica do GET:**
1. Extrai o ID do usuário dos parâmetros da URL
2. Verifica se o ID foi fornecido
3. Busca medicamentos associados ao usuário
4. Inclui o nome do médico que prescreveu cada medicamento
5. Ordena por data inicial decrescente

**Exemplo de Código:**
```javascript
const express = require('express');
const router = express.Router();
const { executeQuery } = require('../utils/dbhelper');
const validate = require('../middlewares/validate');
const { medicamentoSchema } = require('../utils/validation');
const { MEDICAMENTO } = require('../utils/messages');

// Cadastrar medicamento
router.post('/', validate(medicamentoSchema), async (req, res) => {
  try {
    const { nome, data_inicial, data_final, frequencia, hora, dose, id_usuario, id_medico } = req.body;
    
    if (!id_usuario) {
      return res.status(400).json({ error: MEDICAMENTO.ERROR.ID_USUARIO_REQUIRED });
    }
    
    const result = await executeQuery(
      'INSERT INTO medicamentos (nome, data_inicial, data_final, frequencia, hora, dose, id_usuario, id_medico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, data_inicial, data_final, frequencia, hora, dose, id_usuario, id_medico]
    );
    
    res.status(201).json({
      message: MEDICAMENTO.SUCCESS.CREATE,
      id: result.insertId
    });
  } catch (error) {
    console.error('Erro ao cadastrar medicamento:', error);
    res.status(500).json({ error: MEDICAMENTO.ERROR.GENERIC });
  }
});

// Listar medicamentos de um usuário
router.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: MEDICAMENTO.ERROR.ID_USUARIO_REQUIRED });
    }
    
    const medicamentos = await executeQuery(
      `SELECT m.id, m.nome, m.data_inicial, m.data_final, m.frequencia, m.hora, m.dose, u.nome as medico_nome
       FROM medicamentos m
       INNER JOIN usuarios u ON m.id_medico = u.id
       WHERE m.id_usuario = ?
       ORDER BY m.data_inicial DESC`,
      [id]
    );
    
    res.json(medicamentos);
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    res.status(500).json({ error: MEDICAMENTO.ERROR.FETCH });
  }
});

module.exports = router;
```


### 10. **routes/usuarios.js**
Implementa rotas para gerenciamento de usuários.

**Endpoint:** `GET /usuarios/idosos`

**Implementação Técnica:**
1. Busca todos os usuários com tipo_usuario = 'idoso'
2. Retorna apenas o id e nome de cada idoso
3. Trata erros de consulta ao banco de dados

**Exemplo de Código:**
```javascript
const express = require('express');
const router = express.Router();
const { executeQuery } = require('../utils/dbhelper');
const { USUARIOS } = require('../utils/messages');

// Listar todos os idosos
router.get('/idosos', async (req, res) => {
  try {
    const idosos = await executeQuery(
      'SELECT id, nome FROM usuarios WHERE tipo_usuario = ?',
      ['idoso']
    );
    
    res.json(idosos);
  } catch (error) {
    console.error('Erro ao buscar idosos:', error);
    res.status(500).json({ error: USUARIOS.ERROR.FETCH_IDOSOS });
  }
});

// Endpoint adicional para buscar médicos
router.get('/medicos', async (req, res) => {
  try {
    const medicos = await executeQuery(
      'SELECT id, nome FROM usuarios WHERE tipo_usuario = ?',
      ['medico']
    );
    
    res.json(medicos);
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
    res.status(500).json({ error: USUARIOS.ERROR.FETCH_MEDICOS });
  }
});

module.exports = router;
```


### 11. **routes/consultas.js**
Implementa as rotas para gerenciamento de consultas médicas.

**Endpoints:**
- `POST /consulta`: Agenda nova consulta (exclusivo para médicos)
- `GET /consulta/medico/:id`: Lista consultas agendadas por um médico
- `GET /consulta/paciente/:id`: Lista consultas agendadas para um paciente

**Implementação Técnica do POST:**
1. Valida os dados da requisição (data, hora, local, ids do médico e paciente)
2. Verifica se o usuário que está agendando é um médico
3. Verifica se o paciente existe e é do tipo "idoso"
4. Insere os dados da consulta no banco de dados
5. Retorna o ID da consulta criada

**Implementação Técnica do GET /medico/:id:**
1. Extrai o ID do médico dos parâmetros da URL
2. Busca todas as consultas agendadas por este médico
3. Inclui os dados do paciente (nome e idade) para cada consulta
4. Ordena por data e hora das consultas

**Implementação Técnica do GET /paciente/:id:**
1. Extrai o ID do paciente dos parâmetros da URL
2. Busca todas as consultas agendadas para este paciente
3. Inclui o nome do médico para cada consulta
4. Ordena por data e hora das consultas

**Exemplo de Código:**
```javascript
const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Rota para cadastrar uma nova consulta (apenas médicos)
router.post('/', async (req, res) => {
  try {
    const { data, hora, local, observacoes, id_medico, id_paciente } = req.body;

    // Verificações básicas
    if (!data || !hora || !local || !id_medico || !id_paciente) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    // Verificar se o usuário é médico
    const [medicoRows] = await db.query(
      'SELECT * FROM usuarios WHERE id = ? AND tipo_usuario = "medico"',
      [id_medico]
    );

    if (medicoRows.length === 0) {
      return res.status(403).json({ error: 'Apenas médicos podem agendar consultas' });
    }

    // Verificar se o paciente existe e é do tipo idoso
    const [pacienteRows] = await db.query(
      'SELECT * FROM usuarios WHERE id = ? AND tipo_usuario = "idoso"',
      [id_paciente]
    );

    if (pacienteRows.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado ou não é um idoso' });
    }

    // Inserir a consulta no banco de dados
    const [result] = await db.query(
      'INSERT INTO consultas (data, hora, local, observacoes, id_medico, id_paciente) VALUES (?, ?, ?, ?, ?, ?)',
      [data, hora, local, observacoes, id_medico, id_paciente]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Consulta agendada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao agendar consulta:', error);
    res.status(500).json({ error: 'Erro ao agendar consulta' });
  }
});

// Rota para listar consultas de um médico
router.get('/medico/:id', async (req, res) => {
  try {
    const id_medico = req.params.id;

    const [consultas] = await db.query(
      `SELECT c.*, 
        p.nome as nome_paciente, 
        p.idade as idade_paciente
      FROM consultas c
      JOIN usuarios p ON c.id_paciente = p.id
      WHERE c.id_medico = ?
      ORDER BY c.data ASC, c.hora ASC`,
      [id_medico]
    );

    res.json(consultas);
  } catch (error) {
    console.error('Erro ao listar consultas do médico:', error);
    res.status(500).json({ error: 'Erro ao listar consultas' });
  }
});

// Rota para listar consultas de um paciente (idoso)
router.get('/paciente/:id', async (req, res) => {
  try {
    const id_paciente = req.params.id;

    const [consultas] = await db.query(
      `SELECT c.*, 
        m.nome as nome_medico
      FROM consultas c
      JOIN usuarios m ON c.id_medico = m.id
      WHERE c.id_paciente = ?
      ORDER BY c.data ASC, c.hora ASC`,
      [id_paciente]
    );

    res.json(consultas);
  } catch (error) {
    console.error('Erro ao listar consultas do paciente:', error);
    res.status(500).json({ error: 'Erro ao listar consultas' });
  }
});

module.exports = router;
```


### 12. **utils/dbhelper.js**
Utilitário para facilitar a execução de queries SQL.

**Função Principal:**
- `executeQuery(sql, values)`: Executa uma query SQL parametrizada

**Implementação Técnica:**
1. Recebe a string SQL e um array de valores para substituir placeholders
2. Usa o método execute do pool de conexões
3. Retorna apenas o resultado (primeiro elemento do array retornado)
4. Trata erros e propaga para o chamador

**Vantagens:**
- Centraliza o tratamento de erros de banco de dados
- Simplifica o código nas rotas
- Permite uso de Promises para operações assíncronas

**Exemplo de Código:**
```javascript
const pool = require('../database/db');

/**
 * Executa uma query SQL com parâmetros
 * @param {string} sql - String SQL com placeholders (?)
 * @param {Array} values - Array de valores para substituir os placeholders
 * @returns {Promise} - Promise com o resultado da query
 */
const executeQuery = async (sql, values = []) => {
  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    console.error('Erro na execução da query:', error.message);
    console.error('SQL:', sql);
    console.error('Valores:', JSON.stringify(values));
    throw error; // Re-lança o erro para tratamento nas camadas superiores
  }
};

// Funções auxiliares específicas
const findById = async (table, id) => {
  return executeQuery(`SELECT * FROM ${table} WHERE id = ?`, [id]);
};

const findByField = async (table, field, value) => {
  return executeQuery(`SELECT * FROM ${table} WHERE ${field} = ?`, [value]);
};

module.exports = {
  executeQuery,
  findById,
  findByField
};
```


### 13. **utils/messages.js**
Módulo que centraliza as mensagens do sistema.

**Objetivo:** 
- Padronizar mensagens de resposta da API
- Facilitar internacionalização futura
- Evitar duplicação de strings no código

**Estrutura:**
- Agrupamento por contexto (MEDICAMENTO, LOGIN, CADASTRO, USUARIOS)
- Chaves para diferentes tipos de mensagem (SUCCESS, ERROR, etc.)

**Exemplo de Código:**
```javascript
const MESSAGES = {
  CADASTRO: {
    SUCCESS: "Usuário cadastrado com sucesso.",
    ERROR: {
      EMAIL_EXISTS: "E-mail já cadastrado.",
      GENERIC: "Erro ao cadastrar usuário. Tente novamente mais tarde."
    }
  },
  
  LOGIN: {
    SUCCESS: "Login realizado com sucesso!",
    ERROR: {
      CAMPOS_OBRIGATORIOS: "E-mail e senha são obrigatórios.",
      USUARIO_NAO_ENCONTRADO: "Usuário não encontrado.",
      SENHA_INCORRETA: "Senha incorreta.",
      GENERIC: "Erro interno do servidor."
    }
  },
  
  MEDICAMENTO: {
    SUCCESS: {
      CREATE: "Medicamento cadastrado com sucesso!",
      UPDATE: "Medicamento atualizado com sucesso!"
    },
    ERROR: {
      ID_USUARIO_REQUIRED: "ID do usuário é obrigatório.",
      FETCH: "Erro ao buscar medicamentos.",
      GENERIC: "Erro interno do servidor."
    }
  },
  
  USUARIOS: {
    ERROR: {
      FETCH_IDOSOS: "Erro ao buscar a lista de idosos.",
      FETCH_MEDICOS: "Erro ao buscar a lista de médicos."
    }
  },
  
  CONSULTAS: {
    SUCCESS: {
      CREATE: "Consulta agendada com sucesso!"
    },
    ERROR: {
      ID_MEDICO_REQUIRED: "ID do médico é obrigatório.",
      ID_PACIENTE_REQUIRED: "ID do paciente é obrigatório.",
      FETCH: "Erro ao buscar consultas.",
      GENERIC: "Erro interno do servidor."
    }
  }
};

module.exports = MESSAGES;
```


### 14. **utils/validation.js**
Define esquemas de validação usando Joi.

**Esquemas Disponíveis:**
- `userSchema`: Validação para dados de usuário
- `medicamentoSchema`: Validação para dados de medicamento
- `consultaSchema`: Validação para dados de consulta

**Implementação do userSchema:**
- Valida presença e formato de todos os campos de usuário
- Garante que o tipo_usuario seja um dos valores permitidos
- Exige senha com no mínimo 6 caracteres

**Implementação do medicamentoSchema:**
- Valida presença e formato de todos os campos de medicamento
- Garante que datas sejam no formato correto
- Verifica presença dos IDs do usuário e do médico

**Implementação do consultaSchema:**
- Valida presença e formato de todos os campos de consulta
- Garante que datas sejam no formato correto
- Verifica presença dos IDs do médico e do paciente

**Exemplo de Código:**
```javascript
const Joi = require('joi');

// Esquema de validação para usuários
const userSchema = Joi.object({
  nome: Joi.string().required().messages({
    'string.empty': 'O nome não pode ser vazio',
    'any.required': 'O nome é obrigatório'
  }),
  idade: Joi.number().integer().min(0).required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().required(),
  cep: Joi.string().required(),
  rua: Joi.string().required(),
  numero: Joi.string().required(),
  cidade: Joi.string().required(),
  senha: Joi.string().min(6).required().messages({
    'string.min': 'A senha deve ter no mínimo 6 caracteres'
  }),
  tipo_usuario: Joi.string().valid('medico', 'idoso', 'cuidador').required()
});

// Esquema de validação para medicamentos
const medicamentoSchema = Joi.object({
  nome: Joi.string().required(),
  data_inicial: Joi.date().iso().required(),
  data_final: Joi.date().iso().greater(Joi.ref('data_inicial')).required().messages({
    'date.greater': 'A data final deve ser posterior à data inicial'
  }),
  frequencia: Joi.string().valid('Diário', 'Semanal', 'Mensal').required(),
  hora: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
    'string.pattern.base': 'Formato de hora inválido. Use HH:MM'
  }),
  dose: Joi.string().required(),
  id_usuario: Joi.number().integer().required(),
  id_medico: Joi.number().integer().required()
});

// Esquema de validação para consultas
const consultaSchema = Joi.object({
  data: Joi.date().iso().required(),
  hora: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
    'string.pattern.base': 'Formato de hora inválido. Use HH:MM'
  }),
  local: Joi.string().required(),
  observacoes: Joi.string().optional(),
  id_medico: Joi.number().integer().required(),
  id_paciente: Joi.number().integer().required()
});

module.exports = {
  userSchema,
  medicamentoSchema,
  consultaSchema
};
```

## Segurança

O sistema implementa diversas medidas de segurança para proteger os dados dos usuários:

### **Proteção de Senhas**
- **Hashing com Bcrypt**: Todas as senhas são armazenadas usando o algoritmo bcrypt com fator de custo 10.
- **Nunca armazenamos senhas em texto puro**.

### **Validação de Entrada**
- Todas as entradas de usuário são validadas usando a biblioteca Joi.
- Validação ocorre antes que os dados cheguem à lógica de negócios.

### **Proteção contra Injeção SQL**
- Uso consistente de consultas parametrizadas.
- Biblioteca mysql2 com suporte a Promises para evitar injeções SQL.

### **Práticas de Autenticação Segura**
- Comparação de senhas usando métodos resistentes a timing attacks.
- Mensagens de erro genéricas para evitar enumeração de usuários.

### **Recomendações para Produção**
- Implementar HTTPS para criptografar as comunicações.
- Considerar a adição de tokens JWT para sessões e autenticação stateless.
- Configurar rate limiting para prevenir ataques de força bruta.
- Implementar logs de auditoria para ações críticas.

## Solução de Problemas Comuns

### **Erro de Conexão com o Banco de Dados**
**Problema**: O servidor não consegue se conectar ao MySQL.
**Solução**:
1. Verifique se o MySQL está em execução.
2. Confira as credenciais no arquivo `.env`.
3. Verifique se o banco de dados especificado existe.
4. Confirme que o usuário tem permissões adequadas.

### **Erro ao Cadastrar Usuário**
**Problema**: Erro 400 ao tentar cadastrar um usuário.
**Solução**:
1. Verifique se o email já está cadastrado.
2. Confirme que todos os campos obrigatórios estão sendo enviados.
3. Valide se a senha tem pelo menos 6 caracteres.
4. Verifique se o tipo_usuario é válido (medico, idoso ou cuidador).

### **Erro ao Fazer Login**
**Problema**: Login não é aceito pelo sistema.
**Solução**:
1. Confirme se o email está correto.
2. Verifique a senha (diferencia maiúsculas/minúsculas).
3. Garanta que o usuário existe no banco de dados.
4. Verifique os logs do servidor para mais detalhes.

### **Erro ao Cadastrar Medicamento**
**Problema**: Erro 400 ao tentar cadastrar um medicamento.
**Solução**:
1. Verifique se todos os campos obrigatórios estão preenchidos.
2. Confirme se as datas estão no formato YYYY-MM-DD.
3. Confirme que a data final é posterior à data inicial.
4. Verifique se os IDs de usuário e médico são válidos.

### **Erro ao Agendar Consulta**
**Problema**: Erro 403 ao tentar agendar uma consulta.
**Solução**:
1. Verifique se o usuário que está tentando agendar é um médico.
2. Confirme que todos os campos obrigatórios estão sendo enviados.
3. Verifique se o paciente existe e é do tipo "idoso".
4. Confirme que as datas e horários estão em formatos válidos.

### **Erro ao Visualizar Consultas**
**Problema**: Consultas não aparecem na visualização do médico ou do paciente.
**Solução**:
1. Verifique se o ID do usuário (médico ou paciente) está correto.
2. Confirme que existem consultas agendadas para este usuário.
3. Verifique os logs do servidor para mais detalhes sobre possíveis erros.
4. Confirme que todos os relacionamentos no banco de dados estão corretos.

### **Servidor Não Inicia**
**Problema**: Erro ao iniciar o servidor Node.js.
**Solução**:
1. Verifique se a porta configurada não está em uso.
2. Confirme que todas as dependências estão instaladas (`npm install`).
3. Verifique se o arquivo `.env` existe e está configurado corretamente.
4. Consulte os logs de erro para identificar o problema específico.


## Considerações Finais

### **Requisições e Respostas**
- Todas as requisições devem ser feitas no formato JSON.
- Inclua o cabeçalho `Content-Type: application/json` em todas as requisições.
- As respostas são sempre em formato JSON, com códigos de status HTTP adequados.

### **Configuração e Manutenção**
- Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env`.
- Execute backups regulares do banco de dados.
- Monitore os logs do servidor para identificar problemas.
- Mantenha as dependências atualizadas para evitar vulnerabilidades.

*Última atualização: 12 de abril de 2025*