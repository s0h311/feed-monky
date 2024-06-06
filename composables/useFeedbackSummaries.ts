import { differenceInBusinessDays } from 'date-fns'
import { objectToCamel } from 'ts-case-convert'
import type { FeedbackSummary } from '~/server/dataLayer/types'
import type { Database } from '~/server/infrastructure/supabase/types'

export async function useFeedbackSummaries(): Promise<Ref<FeedbackSummary[]>> {
  const feedbackSummaries = useState<FeedbackSummary[]>('feedbackSummary', () => [])
  const alreadyFetched = ref<boolean>(false)

  if (alreadyFetched.value) {
    return feedbackSummaries
  }

  const supabase = useSupabaseClient<Database>()

  const site = (await useSite()).value!

  logger.warn('FETCHING', 'useFeedbackSummaries')

  const { data, error } = await supabase.from('feedback_summary').select().eq('site_id', site.id).order('created_at', {
    ascending: false,
  })

  if (error) {
    throw logger.error(error.message, 'useFeedbackSummaries', true, { siteId: site.id })
  }

  alreadyFetched.value = true
  feedbackSummaries.value = objectToCamel(data)

  return feedbackSummaries
}
