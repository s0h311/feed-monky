import logger from '~/utils/logger'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)

  const siteId = params.siteId ?? 'unknown'

  const assets = useStorage('assets:server')
  const template = await assets.getItem('feedMonkyButton.html')

  if (!template) {
    throw logger.error('Template not found', 'Template API', true, { siteId })
  }

  return template.toString().replace('--SITEID--', siteId.toString())
})
