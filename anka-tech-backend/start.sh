#!/bin/sh

# Esperar o banco de dados estar disponível
echo "⏳ Aguardando banco de dados ficar pronto..."

until nc -z -v -w30 db 3306
do
  echo "⛔ Banco ainda não está pronto. Tentando novamente..."
  sleep 3
done

echo "✅ Banco de dados está pronto. Aplicando migrations..."

# Gerar o cliente Prisma e aplicar migrations
npx prisma generate
npx prisma migrate deploy

echo "🌱 Rodando seeds..."
npx ts-node prisma/seed.ts

echo "🚀 Iniciando a aplicação..."
npm run dev
