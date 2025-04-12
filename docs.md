# Documentação do Backend do Sistema

## Introdução
O backend do sistema foi desenvolvido utilizando Node.js e Express.js, com um banco de dados MySQL para armazenamento de dados. Ele fornece uma API RESTful para gerenciar usuários, medicamentos e autenticação. Abaixo está a documentação detalhada das rotas disponíveis, incluindo os corpos de requisição esperados, respostas esperadas e possíveis erros.

---

## Configuração Inicial

### **Requisitos**
- Node.js (versão 12 ou superior)
- MySQL configurado e em execução

### **Configuração do Ambiente**
1. Renomeie o arquivo `exemplo.env` para `.env`.
2. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   PORT=3000
   ```
3. Instale as dependências do projeto:
   ```bash
   cd backend
   npm install
   ```
4. Execute o script de criação do banco de dados localizado em `database/schema.sql` para criar as tabelas necessárias.

5. Inicie o servidor:
   ```bash
   npm start
   ```

---

## Rotas Disponíveis

### 1. **Cadastro de Usuários**
**Rota:** `POST /cadastro`

**Descrição:** Registra um novo usuário no sistema.

**Corpo da Requisição:**
```json
{
  "nome": "string",
  "idade": "number",
  "email": "string",
  "telefone": "string",
  "cep": "string",
  "rua": "string",
  "numero": "string",
  "cidade": "string",
  "senha": "string",
  "tipo_usuario": "string" // Valores possíveis: "medico", "idoso", "cuidador"
}
```

**Resposta de Sucesso:**
- **Status:** `201 Created`
```json
{
  "message": "Usuário cadastrado com sucesso.",
  "id": "number",
  "tipo": "string"
}
```

**Possíveis Erros:**
- **400 Bad Request:**
  ```json
  {
    "error": "E-mail já cadastrado."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao cadastrar usuário. Tente novamente mais tarde."
  }
  ```

---

### 2. **Login de Usuários**
**Rota:** `POST /login`

**Descrição:** Autentica um usuário e retorna suas informações.

**Corpo da Requisição:**
```json
{
  "email": "string",
  "senha": "string"
}
```

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
{
  "message": "Login realizado com sucesso!",
  "usuario": {
    "id": "number",
    "nome": "string",
    "email": "string",
    "tipo": "string" // Valores possíveis: "medico", "idoso", "cuidador"
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

---

### 3. **Cadastro de Medicamentos**
**Rota:** `POST /medicamento`

**Descrição:** Registra um novo medicamento para um paciente.

**Corpo da Requisição:**
```json
{
  "nome": "string",
  "data_inicial": "string (YYYY-MM-DD)",
  "data_final": "string (YYYY-MM-DD)",
  "frequencia": "string", // Valores possíveis: "Diário", "Semanal", "Mensal"
  "hora": "string (HH:mm)",
  "dose": "string",
  "id_usuario": "number",
  "id_medico": "number"
}
```

**Resposta de Sucesso:**
- **Status:** `201 Created`
```json
{
  "message": "Medicamento cadastrado com sucesso!",
  "id": "number"
}
```

**Possíveis Erros:**
- **400 Bad Request:**
  ```json
  {
    "error": "ID do usuário é obrigatório."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro interno do servidor."
  }
  ```

---

### 4. **Listagem de Medicamentos de um Usuário**
**Rota:** `GET /medicamento/usuario/:id`

**Descrição:** Retorna a lista de medicamentos de um usuário específico.

**Parâmetros da URL:**
- `id`: ID do usuário.

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
[
  {
    "id": "number",
    "nome": "string",
    "data_inicial": "string (YYYY-MM-DD)",
    "data_final": "string (YYYY-MM-DD)",
    "frequencia": "string",
    "hora": "string (HH:mm)",
    "dose": "string",
    "medico_nome": "string"
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
- **500 Internal Server Error:**
  ```json
  {
    "error": "Erro ao buscar medicamentos."
  }
  ```

---

### 5. **Listagem de Usuários Idosos**
**Rota:** `GET /usuarios/idosos`

**Descrição:** Retorna a lista de todos os usuários do tipo "idoso".

**Resposta de Sucesso:**
- **Status:** `200 OK`
```json
[
  {
    "id": "number",
    "nome": "string"
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

---

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

---

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

---

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
- waitForConnections: Se deve esperar por conexões disponíveis
- connectionLimit: Número máximo de conexões simultâneas (10)
- queueLimit: Limite da fila de conexões aguardando (0 = ilimitado)

---

### 4. **database/schema.sql**
Script SQL para criar a estrutura inicial do banco de dados.

**Tabelas Criadas:**
- **usuarios**: Armazena dados dos usuários do sistema
  - Colunas: id, nome, idade, email, telefone, cep, rua, numero, cidade, senha, tipo_usuario
  - Tipos de usuário: 'medico', 'idoso', 'cuidador'

- **medicamentos**: Armazena dados de medicamentos prescritos
  - Colunas: id, nome, data_inicial, data_final, frequencia, hora, dose, id_usuario, created_at
  - Relacionamento: chave estrangeira id_usuario referenciando usuarios(id)

---

### 5. **middlewares/validate.js**
Middleware de validação de dados usando Joi.

**Funcionalidade:**
- Recebe um esquema Joi como parâmetro
- Retorna uma função middleware que valida o corpo da requisição contra o esquema
- Rejeita requisições com dados inválidos (status 400)
- Permite que requisições válidas continuem o fluxo (next())

**Uso:**
```javascript
app.post('/rota', validate(esquema), (req, res) => {
  // Código executado apenas se a validação passar
});
```

---

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

---

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

---

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
- Não revela se o usuário existe ou se a senha está incorreta
- Usa bcrypt para comparação de senhas (resistente a timing attacks)
- Retorna apenas dados necessários do usuário (não expõe a senha)

---

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

---

### 10. **routes/usuarios.js**
Implementa rotas para gerenciamento de usuários.

**Endpoint:** `GET /usuarios/idosos`

**Implementação Técnica:**
1. Busca todos os usuários com tipo_usuario = 'idoso'
2. Retorna apenas o id e nome de cada idoso
3. Trata erros de consulta ao banco de dados

---

### 11. **utils/dbhelper.js**
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

---

### 12. **utils/messages.js**
Módulo que centraliza as mensagens do sistema.

**Objetivo:** 
- Padronizar mensagens de resposta da API
- Facilitar internacionalização futura
- Evitar duplicação de strings no código

**Estrutura:**
- Agrupamento por contexto (MEDICAMENTO, LOGIN, CADASTRO)
- Chaves para diferentes tipos de mensagem (SUCCESS, ERROR, etc.)

---

### 13. **utils/validation.js**
Define esquemas de validação usando Joi.

**Esquemas Disponíveis:**
- `userSchema`: Validação para dados de usuário
- `medicamentoSchema`: Validação para dados de medicamento

**Implementação do userSchema:**
- Valida presença e formato de todos os campos de usuário
- Garante que o tipo_usuario seja um dos valores permitidos
- Exige senha com no mínimo 6 caracteres

**Implementação do medicamentoSchema:**
- Valida presença e formato de todos os campos de medicamento
- Garante que datas sejam no formato correto
- Verifica presença dos IDs do usuário e do médico

## Considerações Finais
- Todas as requisições devem ser feitas no formato JSON.
- Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env` para que o backend funcione corretamente.
- Em caso de dúvidas ou problemas, consulte os logs do servidor para mais detalhes.