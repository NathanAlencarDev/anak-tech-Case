'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useUpdateClient } from '@/hooks/clients'
import { api } from '@/lib/api'
import { useEffect } from 'react'

const updateClientSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  status: z.boolean(),
})

type UpdateClientData = z.infer<typeof updateClientSchema>

type ClientFromApi = {
  id: number
  name: string
  email: string
  status: boolean
}

export default function EditClientPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const clientId = Number(id)

  const { data: client, isLoading } = useQuery<ClientFromApi>({
    queryKey: ['client', clientId],
    queryFn: async () => {
      const response = await api.get(`/clients/${clientId}`)
      return response.data
    },
    enabled: !!clientId,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateClientData>({
    resolver: zodResolver(updateClientSchema),
  })

  useEffect(() => {
    if (client) {
      reset({
        name: client.name,
        email: client.email,
        status: client.status,
      })
    }
  }, [client, reset])

  const updateClient = useUpdateClient()

  const onSubmit = (data: UpdateClientData) => {
    updateClient.mutate(
      { id: clientId, ...data },
      {
        onSuccess: () => router.push('/clients'),
        onError: () => alert('Erro ao atualizar cliente'),
      }
    )
  }

  if (isLoading) return <p>Carregando dados do cliente...</p>
  if (!client) return <p>Cliente não encontrado.</p>

  return (
    // Força o React a recriar o form quando o cliente muda
    <div key={client.id} className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Editar Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Nome" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Input placeholder="E-mail" {...register('email')} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="status"
            {...register('status')}
            className="border rounded"
          />
          <label htmlFor="status">Ativo</label>
        </div>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

        <Button type="submit" disabled={updateClient.isLoading}>
          {updateClient.isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </div>
  )
}
