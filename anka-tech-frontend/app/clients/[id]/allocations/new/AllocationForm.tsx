'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Asset = {
  id: number
  name: string
  value: number
}

type AllocationFormProps = {
  clientId: string
  assets: Asset[]
}

type FormData = {
  assetId: number | undefined
  value: number
}

export default function AllocationForm({ clientId, assets }: AllocationFormProps) {
  const router = useRouter()
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      assetId: undefined,
      value: 0,
    },
  })

  const selectedAssetId = watch('assetId')

  useEffect(() => {
    const selected = assets.find(asset => asset.id === Number(selectedAssetId))
    if (selected) {
      setValue('value', selected.value)
    }
  }, [selectedAssetId, assets, setValue])

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        clientId: Number(clientId),
        assetId: Number(data.assetId),
        value: data.value,
      }
      return api.post('/allocations', payload)
    },
    onSuccess: () => {
      router.push(`/clients/${clientId}/allocations`)
    },
    onError: (error) => {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar a alocação.')
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Nova Alocação</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Ativo</label>
            <select
              {...register('assetId', { required: true })}
              className="border p-2 rounded w-full"
              defaultValue=""
            >
              <option value="">Selecione um ativo</option>
              {assets.map(asset => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Valor</label>
            <Input
              type="number"
              step="0.01"
              {...register('value', { valueAsNumber: true })}
              readOnly
            />
          </div>

          <Button type="submit" disabled={mutation.isLoading} className="w-full">
            {mutation.isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
