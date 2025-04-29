FROM node:slim

RUN apk add --no-cache g++ gcc make python3

WORKDIR /app

COPY backend/package*.json ./

# bcrypt possui dependências nativas que não são compatíveis com o alpine
# utulizamos bcryptjs para evitar problemas de compatibilidade
RUN if grep -q "bcrypt" package.json; then \
    npm uninstall bcrypt; \
    npm install bcryptjs; \
    fi && \
    npm install

COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]