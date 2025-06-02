'use client'

import { Client } from '@/types/Client'
import Link from 'next/link'

interface ClienteListProps {
  clientes: Client[]
}

export function ClienteList({ clientes }: ClienteListProps) {
return (
    <div className="space-y-4">
    {clientes.length === 0 ? (
        <p className="text-gray-500">Nenhum cliente encontrado.</p>
    ) : (
        clientes.map(cliente => (
        <div key={cliente.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
            <p className="font-semibold">{cliente.name}</p>
            <p className="text-sm text-gray-600">{cliente.email}</p>
            <p className="text-sm text-gray-600">{cliente.status}</p>
            </div>
            <Link
            href={`/clientes/${cliente.id}`}
            className="text-blue-500 hover:underline"
            >
            Editar
            </Link>
        </div>
        ))
    )}
    </div>
)
}
