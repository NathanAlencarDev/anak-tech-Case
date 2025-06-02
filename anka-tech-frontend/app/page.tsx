import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Desafio Anka Tech</h1>
      <p className="text-gray-600 mt-2 mb-6">Escolha uma das opções:</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/clients">
          <Button>Ver Lista de Clientes</Button>
        </Link>

        <Link href="/clients/new">
          <Button>Cadastrar Novo Cliente</Button>
        </Link>

        <Link href="/clients/select">
          <Button>Gerenciar Ativos</Button>
        </Link>
      </div>
    </main>
  )
}
