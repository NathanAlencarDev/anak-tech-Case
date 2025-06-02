import { api } from '@/lib/api'
import { Client } from '@/types/Client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getClients(): Promise<Client[]> {
  const res = await api.get('/clients')
  return res.data
}

export default async function ClientSelectorPage() {
  const clients = await getClients()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Selecionar Cliente</h1>
      <p className="text-gray-600 mb-6">Escolha um cliente para visualizar ou adicionar alocações:</p>

      <ul className="space-y-4">
        {clients.map((client) => (
          <li key={client.id} className="border p-4 rounded shadow-sm">
            <div className="font-semibold mb-2">{client.name}</div>
            <div className="flex gap-4">
              <Link href={`/clients/${client.id}/allocations`}>
                <Button variant="outline">Ver Ativos</Button>
              </Link>
              <Link href={`/clients/${client.id}/allocations/new`}>
                <Button>Novo Ativo</Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
