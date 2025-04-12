# Saúde Sênior - Sistema de Monitoramento para Idosos

<div align="center">
  <img src="./assets/Logo sem fundo.png" alt="Logo do Projeto" width="300px">
  
  ![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
  ![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
  ![Licença](https://img.shields.io/badge/licença-MIT-green)
</div>

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração](#demonstração)
- [Integrantes](#integrantes)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração-das-variáveis-de-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Utilizando o Sistema](#-utilizando-o-sistema)
- [API Backend](#funcionalidades-do-backend)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 📖 Sobre o Projeto

O sistema **Saúde Sênior** foi desenvolvido para resolver o problema da organização e monitoramento das necessidades dos idosos por meio de uma plataforma web e mobile intuitiva, conectando cuidadores, médicos e os próprios idosos.

A solução envolve uma aplicação que permite:
- 💊 Registro e acompanhamento de medicamentos
- 📅 Agendamento de consultas médicas
- 🚑 Sistema de chamada de emergência
- 📊 Compartilhamento de informações de saúde
- 📱 Integração com dispositivos wearables para monitoramento biométrico em tempo real

Desta forma, o aplicativo facilita a comunicação entre todos os envolvidos e melhora o acompanhamento da saúde dos idosos, promovendo um suporte mais eficiente e personalizado.

---

## 📱 Demonstração

[Protótipo de Telas no Figma](https://www.figma.com/design/xOfVNmNg7hMd7MRAj29pjU/IHC?node-id=6-0&m=dev&t=f4OE9q94xtLv6NHp-1)



## 👥 Integrantes

| Nome | Função | GitHub |
|------|--------|--------|
| Guilherme R. Kameoka | Backend developer | [@guilhermekameoka](https://github.com/guilhermekameoka) |
| Carlos Livius | Front-end Developer | [@CarlosLivius](https://github.com/CarlosLivius) |
| Esdras | Back-end Developer | [@esdrasoliveiraj](https://github.com/esdrasoliveiraj) |
| Pedro Alexandre | Front-end developer | [@PedroA-Gondim](https://github.com/PedroA-Gondim) |
| Guilherme Rafael | Front-end developer | [@GuilhermeRafaell](https://github.com/GuilhermeRafaell) |

[Documentos do Projeto](https://ufubr-my.sharepoint.com/:w:/g/personal/guilherme_cerqueira_ufu_br/ET1Nuk7voaZEl4WjN0I6fIgBzidfA1-Ss762blLxvqqlHg?e=0UtQPx)

---

## 🛠️ Tecnologias Utilizadas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### Stack Técnico
- **Front-end:** 
  - HTML5 para estruturação de páginas
  - TailwindCSS para estilização responsiva
  - JavaScript para interatividade e validações
  
- **Back-end:** 
  - Node.js e Express.js para API RESTful
  - Middlewares para validação e autenticação
  
- **Banco de Dados:** 
  - MySQL para armazenamento de dados estruturados
  
- **Segurança:** 
  - Criptografia de senhas com bcrypt
  - Validação de dados com Joi
  - Conformidade com LGPD e GDPR

---

## 📁 Estrutura do Projeto

```
📦 PDS1
 ┣ 📂 frontend               # Interface do usuário
 ┃ ┣ 📂 comum                # Páginas acessíveis a todos os usuários
 ┃ ┣ 📂 css                  # Estilos CSS
 ┃ ┣ 📂 cuidador             # Páginas específicas para cuidadores
 ┃ ┣ 📂 idoso                # Páginas específicas para idosos
 ┃ ┗ 📂 medico               # Páginas específicas para médicos
 ┣ 📂 backend                # API e lógica de negócios
 ┃ ┣ 📂 database             # Configuração e esquema do banco de dados
 ┃ ┣ 📂 middlewares          # Middlewares para validação
 ┃ ┣ 📂 routes               # Rotas da API
 ┃ ┗ 📂 utils                # Utilitários e helpers
 ┣ 📂 js                     # Arquivos JavaScript do cliente
 ┣ 📂 assets                 # Imagens e recursos estáticos
 ┣ 📜 docs.md                # Documentação detalhada da API
 ┗ 📜 readme.md              # Este arquivo
```

---

## ⚙️ Requisitos

- Node.js (versão 12 ou superior)
- NPM (Node Package Manager)
- MySQL ou PostgreSQL

---

## 🚀 Instalação

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

## ⚙️ Configuração das Variáveis de Ambiente

Antes de iniciar o projeto, configure as variáveis de ambiente.  
Crie um arquivo `.env` no diretório `backend` baseado no arquivo `exemplo.env`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
PORT=3000
```

Substitua os valores de acordo com a sua configuração local.

---

## 🏃‍♂️ Executando o Projeto

Para iniciar o projeto em modo de desenvolvimento, utilize o seguinte comando:
```sh
npm run start
```

Este comando iniciará o servidor em modo de desenvolvimento. Você poderá acessar a aplicação em `http://localhost:3000`.

## 👨‍🏫 Utilizando o Sistema

### 1. Acesse o endpoint localhost:3000

![Tutorial](/assets/CleanShot%202025-04-11%20at%2000.01.03@2x.png)

### 2. Efetue o cadastro

![Cadastro](/assets/cadastro.png)

### 3. Efetue o login

![Login](/assets/login.png)

### 4. Escolha dentre as opções disponíveis (Home Idoso)

![Idoso](/assets/tela_idoso.png)


### 5. Escolha dentre as opções disponíveis (Home Médico)

![Medico](/assets/tela_medico.png)

---

## 🔌 Funcionalidades do Backend

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

Para documentação mais detalhada da API, consulte o arquivo [docs.md](./docs.md).

---

## 👨‍💻 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas mudanças (`git commit -m 'Adicionando nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---


Desenvolvido como parte do projeto de Programação e Desenvolvimento de Software I, Universidade Federal de Uberlândia - 2025.