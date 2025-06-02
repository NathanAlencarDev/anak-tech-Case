
````md
# Projeto Anka Tech - Gestão de Clientes

## 📝 Descrição / Description

Aplicação fullstack para cadastro de clientes e alocação de ativos.

Fullstack app for managing clients and asset allocations.

## 🚀 Tecnologias / Technologies

- **Frontend**: Next.js, React Query, ShadCN
- **Backend**: Fastify, Prisma ORM, MySQL
- **Containerização**: Docker + Docker Compose

---

## 📦 Como rodar o projeto / How to run the project

### 1. Clone o repositório / Clone the repository

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
````

### 2. Configure o `.env` / Configure the `.env` file

Crie o arquivo `.env` dentro da pasta `backend` com as informações do banco:

Create the `.env` file inside the `backend` folder:

```env
DATABASE_URL="mysql://user:password@db:3306/anka_db"
```

### 3. Execute o script `start.sh` / Run the `start.sh` script

> ⚠️ O script `start.sh` automatiza toda a inicialização: containers, migração Prisma e geração de client.
> Este passo foi essencial e exigiu ajustes finos para garantir que tudo funcionasse integrado.

> ⚠️ The `start.sh` script automates all setup: containers, Prisma migration and client generation.
> This step was essential and required several fine adjustments to make it all work smoothly.

```bash
chmod +x start.sh
./start.sh
```

---

## 🔄 Prisma: Migração Inicial / Initial Prisma Migration

Caso precise rodar manualmente:

If you need to run it manually:

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📂 Estrutura / Structure

```
/
├── frontend/       # Next.js frontend
├── backend/        # Fastify + Prisma backend
├── docker-compose.yml
└── start.sh        # Script de inicialização / Startup script
```

---

## 📌 Requisitos / Requirements

* Node.js 18+
* Docker + Docker Compose
* MySQL (ou container incluído)

---

## 📧 Contato / Contact

Para dúvidas ou sugestões, entre em contato.
For questions or suggestions, feel free to reach out.

