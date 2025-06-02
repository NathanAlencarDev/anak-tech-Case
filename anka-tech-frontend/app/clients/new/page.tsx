'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateClient } from '@/hooks/clients'

const createClientSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  status: z.boolean(),
})

type CreateClientData = z.infer<typeof createClientSchema>

export default function CreateClientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientData>({
    resolver: zodResolver(createClientSchema),
    defaultValues: { status: true },
  })

  const router = useRouter()
  const mutation = useCreateClient()

  const onSubmit = (data: CreateClientData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push('/clients')
      },
      onError: () => {
        alert('Erro ao criar cliente')
      },
    })
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Cadastrar Novo Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input type="text" placeholder="Nome" {...register('name')} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input type="email" placeholder="E-mail" {...register('email')} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="status"
            {...register('status', { valueAsBoolean: true })}
            className="border rounded"
          />
          <label htmlFor="status">Ativo</label>
        </div>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}

        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  )
}
