# PDS1 - Grupo 9

<div align="center">
  <img src="./assets/Logo sem fundo.png" alt="Logo do Projeto">
</div>

## Integrantes
- Guilherme R. Kameoka  
- Carlos Livius  
- Esdras  
- Pedro Alexandre  
- Guilherme Rafael  

[Protótipo de Telas no Figma](https://www.figma.com/design/xOfVNmNg7hMd7MRAj29pjU/IHC?node-id=6-0&m=dev&t=f4OE9q94xtLv6NHp-1)  
[Documentos do Projeto](https://ufubr-my.sharepoint.com/:w:/g/personal/guilherme_cerqueira_ufu_br/ET1Nuk7voaZEl4WjN0I6fIgBzidfA1-Ss762blLxvqqlHg?e=0UtQPx)

---

## Sobre o Projeto
O sistema proposto busca resolver o problema da organização e monitoramento das necessidades dos idosos por meio de uma plataforma mobile intuitiva, conectando cuidadores, médicos e os próprios idosos.  

A solução computacional envolve um aplicativo que permite o registro e acompanhamento de atividades diárias, compartilhamento de informações de saúde e integração com dispositivos wearables, como relógios inteligentes, para captar dados biométricos em tempo real.  

Dessa forma, o aplicativo facilita a comunicação entre todos os envolvidos e melhora o acompanhamento da saúde dos idosos, promovendo um suporte mais eficiente e personalizado.  

---

## Tecnologias Utilizadas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

- **Front-end:** HTML5, TailwindCSS
- **Back-end:** Node.js para gerenciar a lógica do sistema e as APIs de integração. 
- **Banco de Dados:** PostgreSQL para armazenar dados estruturados. 
- **Armazenamento na Nuvem:** AWS para guardar arquivos como relatórios médicos e imagens. 
- **Integração com Wearables:** APIs como Google Fit, Apple HealthKit para comunicação com relógios inteligentes. 
- **Segurança e Conformidade:** Autenticação via Firebase Auth, criptografia de dados sensíveis e conformidade com a LGPD e GDPR. 

---

## Requisitos

- Node.js (versão 12 ou superior)
- NPM (Node Package Manager)

---

## Instalação

### 1. Faça um clone deste repositório:
```sh
git clone https://github.com/seu-usuario/PDS1.git
```

### 2. Navegue até o diretório do projeto:
```sh
cd PDS1
```

### 3. Instale as dependências do backend:
```sh
cd backend
npm install
```

### 4. Configure o banco de dados
Crie um banco de dados MySQL ou PostgreSQL com o nome especificado na variável `DB_NAME` no arquivo `.env`.

### 5. Execute o script de acordo com o banco de dados escolhido
<details>
<summary>MySQL</summary>

```sh
mysql -u seu_usuario -p seu_banco < backend/database/schema.sql
```

</details>

<details>
<summary>PostgreSQL</summary>

```sh
psql -U seu_usuario -d seu_banco -f backend/database/schema.sql
```

</details>

### 6. Verifique se as tabelas foram criadas corretamente, execute:
```sql
SHOW TABLES;
```

---

## Configuração das Variáveis de Ambiente

Antes de iniciar o projeto, configure as variáveis de ambiente.  
Crie um arquivo `.env` no diretório `backend` e edite os seguintes valores:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
PORT=3000
```

Substitua os valores de acordo com a sua configuração local.

---

## Executando o Projeto

Para iniciar o projeto em modo de desenvolvimento, utilize o seguinte comando:
```sh
npm run start
```

Este comando iniciará o servidor em modo de desenvolvimento. Você poderá acessar a aplicação em `http://localhost:3000`.

![Tutorial](/assets/CleanShot%202025-04-11%20at%2000.01.03@2x.png)

---

## Funcionalidades do Backend

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