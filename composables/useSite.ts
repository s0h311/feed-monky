import { objectToCamel } from 'ts-case-convert'
import type { Site } from '~/server/dataLayer/types'
import type { Database } from '~/server/infrastructure/supabase/types'

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
