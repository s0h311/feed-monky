import { objectToCamel } from 'ts-case-convert'
import type { Subscription } from '~/types/types'
import type { Database } from '~/types/databaseTypes'
import logger from '~/utils/logger'

export async function useSubscription(): Promise<Ref<Subscription | null>> {
  const subscription = useState<Subscription | null>('subscription', () => null)

  if (subscription.value) {
    return subscription
  }

  const supabase = useSupabaseClient<Database>()
  const site = await useSite()

  if (!site.value) {
    return subscription
  }

  logger.warn('FETCHING', 'useSubscription')

  const { data: fetchedSubscription, error } = await supabase
    .from('subscription')
    .select()
    .eq('site_id', site.value.id)
    .single()

  if (error) {
    logger.error(error.message, 'useSubscription')
    return subscription
  }

  subscription.value = objectToCamel(fetchedSubscription)

  return subscription
}
