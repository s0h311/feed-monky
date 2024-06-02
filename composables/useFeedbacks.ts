import { objectToCamel } from 'ts-case-convert'
import type { Feedback } from '~/server/dataLayer/types'
import type { Database } from '~/server/infrastructure/supabase/types'

export async function useFeedbacks(): Promise<Ref<Feedback[]>> {
  const feedbacks = useState<Feedback[]>('feedbacks', () => [])
  const alreadyFetched = ref<boolean>(false)

  if (alreadyFetched.value) {
    return feedbacks
  }

  const supabase = useSupabaseClient<Database>()

  const site = (await useSite()).value!

  logger.warn('FETCHING', 'useFeedbacks')

  const { data, error } = await supabase.from('feedback').select().eq('site_id', site.id)

  if (error) {
    throw logger.error(error.message, 'useFeedbacks', true, { siteId: site.id })
  }

  alreadyFetched.value = true
  feedbacks.value = objectToCamel(data)

  return feedbacks
}
