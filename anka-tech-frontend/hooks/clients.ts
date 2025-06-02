// hooks/clients/useCreateClient.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Client } from '@/types/Client'

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newClient: Omit<Client, 'id'>) => {
      const response = await api.post('/clients', newClient)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] }) // <-- atualiza lista
    },
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (client: Client) => {
      const response = await api.put(`/clients/${client.id}`, client)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] }) // <-- recarrega lista
    },
  })
}
