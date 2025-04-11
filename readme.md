<div  align=center>
<img src="./assets/Logo sem fundo.png">
</div>

# PDS1 - Grupo 9
- Guilherme R. Kameoka  
- Carlos Livius  
- Esdras  
- Pedro Alexandre  
- Guilherme Rafael  

[Telas](https://www.figma.com/design/xOfVNmNg7hMd7MRAj29pjU/IHC?node-id=6-0&m=dev&t=f4OE9q94xtLv6NHp-1)
  
[Documentos](https://ufubr-my.sharepoint.com/:w:/g/personal/guilherme_cerqueira_ufu_br/ET1Nuk7voaZEl4WjN0I6fIgBzidfA1-Ss762blLxvqqlHg?e=0UtQPx)

  
# Sobre
O sistema proposto busca resolver o problema da organização e monitoramento das necessidades dos idosos por meio de uma plataforma mobile intuitiva, conectando cuidadores, médicos e os próprios idosos.    

A solução computacional envolve um aplicativo que permite o registro e acompanhamento de atividades diárias, compartilhamento de informações de saúde e integração com dispositivos wearables, como relógios inteligentes, para captar dados biométricos em tempo real. 

Dessa forma, o aplicativo facilita a comunicação entre todos os envolvidos e melhora o acompanhamento da saúde dos idosos, promovendo um suporte mais eficiente e personalizado. 

# Ambiente de desenvolvimento

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


# Requisitos

- Node.js (versão 12 ou superior)
- NPM (Node Package Manager)

# Instalação

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


# Configuração das Variáveis de Ambiente

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

# Executando o Projeto

Para iniciar o projeto em modo de desenvolvimento, utilize o seguinte comando:

```sh
npm run start
```

Este comando iniciará o servidor em modo de desenvolvimento. Você poderá acessar a aplicação em `http://localhost:3000`.

![Tutorial](./assets/CleanShot%202025-04-11%20at%2000.01.03@2x.png)
