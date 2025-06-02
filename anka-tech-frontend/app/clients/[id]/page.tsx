// app/clients/[id]/page.tsx
'use client'

import { api } from '@/lib/api'
import { Client } from '@/types/Client'
import { notFound } from 'next/navigation'

interface ClientPageProps {
  params: {
    id: string
  }
}

async function getClient(id: string): Promise<Client | null> {
  try {
    const res = await api.get(`/clients/${id}`)
    return res.data
  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    return null
  }
}

export default async function ClientPage({ params }: ClientPageProps) {
  const client = await getClient(params.id)

  if (!client) {
    notFound() // mostra a página de 404 do Next
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Cliente</h1>
      <div className="space-y-2">
        <p><strong>ID:</strong> {client.id}</p>
        <p><strong>Nome:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Status:</strong> {client.status ? 'Ativo' : 'Inativo'}</p>
        <p><strong>Criado em:</strong> {new Date(client.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}
