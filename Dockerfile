FROM node:slim

RUN apt-get update && apt-get install -y g++ gcc make python3 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/package*.json ./

# bcrypt possui dependências nativas que não são compatíveis com o alpine
# utilizamos bcryptjs para evitar problemas de compatibilidade
RUN if grep -q "bcrypt" package.json; then \
    npm uninstall bcrypt; \
    npm install bcryptjs; \
    fi && \
    npm install

COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]