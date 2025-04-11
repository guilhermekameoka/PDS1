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

## Considerações Finais
- Todas as requisições devem ser feitas no formato JSON.
- Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env` para que o backend funcione corretamente.
- Em caso de dúvidas ou problemas, consulte os logs do servidor para mais detalhes.