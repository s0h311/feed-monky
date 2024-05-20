import { objectToCamel } from 'ts-case-convert'
import type { Database } from '~/types/databaseTypes'
import type { Site } from '~/types/types'

export async function useSite(): Promise<Ref<Site | null>> {
  const site = useState<Site | null>('site', () => null)

  if (site.value) {
    return site
  }

  const user = useSupabaseUser()

  if (!user.value) {
    return site
  }

  const supabase = useSupabaseClient<Database>()

  logger.warn('FETCHING', 'useSite')

  const { data, error } = await supabase.from('site').select().eq('user_id', user.value.id).single()

  if (error) {
    throw logger.error(error.message, 'useSite', true, { userId: user.value.id })
  }

  site.value = objectToCamel(data)

  return site
}
