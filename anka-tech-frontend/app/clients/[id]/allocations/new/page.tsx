import AllocationForm from './AllocationForm'
import { staticAssets } from '@/data/staticAssets'

export default async function NewAllocationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const clientId = resolvedParams.id

  return (
    <div>
      <AllocationForm clientId={clientId} assets={staticAssets} />
    </div>
  )
}
