'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useDeleteClient } from '@/hooks/useDeleteClient'

type Client = {
  id: number
  name: string
  email: string
  status: boolean
}

export default function ClientsPage() {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await api.get<Client[]>('/clients')
      return response.data
    },
  })

  const deleteClient = useDeleteClient()

  if (isLoading) return <p>Carregando...</p>

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Clientes</h1>

      <ul className="space-y-3">
        {clients?.map((client) => (
          <li
            key={client.id}
            className="flex items-center justify-between p-4 border rounded shadow-sm"
          >
            <div>
              <p className="font-semibold">{client.name}</p>
              <p className="text-sm text-gray-600">{client.email}</p>
              <p className="text-sm">Status: {client.status ? 'Ativo' : 'Inativo'}</p>
            </div>

            <div className="flex space-x-3">
              <Link href={`/clients/${client.id}/edit`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm('Deseja excluir este cliente?')) {
                    deleteClient.mutate(client.id)
                  }
                }}
              >
                Excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <Link href="/">
          <Button variant="secondary">Voltar ao Início</Button>
        </Link>

        <Link href="/clients/new">
          <Button>Novo Cliente</Button>
        </Link>
      </div>
    </div>
  )
}
