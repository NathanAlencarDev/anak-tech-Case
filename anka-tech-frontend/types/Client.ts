export interface Client {
    id: number
    name: string
    email: string
    status: boolean
    createdAt?: string
    assets?: any[]
}