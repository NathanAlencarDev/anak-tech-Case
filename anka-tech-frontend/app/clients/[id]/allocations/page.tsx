'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Allocation } from '@/types/Allocations'
import Link from 'next/link'

export default function ClientAllocationsPage() {
  const params = useParams()
  const clientId = params.id

  const [allocations, setAllocations] = useState<Allocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAllocations() {
      try {
        setLoading(true)
        const response = await api.get(`/allocations/${clientId}`)
        setAllocations(response.data)
      } catch (err) {
        setError('Erro ao carregar alocações')
      } finally {
        setLoading(false)
      }
    }

    if (clientId) fetchAllocations()
  }, [clientId])

  if (loading) return <p>Carregando Ativos...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ativos do Cliente {clientId}</h1>

      <ul className="space-y-2 mb-6">
        {allocations.map(({ id, assetName, value }) => (
          <li key={id} className="border p-3 rounded shadow-sm">
            <strong>{assetName}</strong> — Valor: R$ {value.toFixed(2)}
          </li>
        ))}
      </ul>

      <Link href="/">
        <button
          type="button"
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Voltar ao Início
        </button>
      </Link>
    </div>
  )
}
