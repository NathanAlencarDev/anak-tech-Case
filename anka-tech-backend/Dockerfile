FROM node:20

WORKDIR /projeto-anka-tech

# Instalar netcat (versão OpenBSD)
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências (incluindo devDependencies)
RUN npm install

# Copiar código restante (incluindo prisma/seed.ts)
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Expor porta
EXPOSE 3333

# Rodar script de inicialização
CMD ["sh", "./start.sh"]
