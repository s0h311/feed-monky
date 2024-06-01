import logger from '~/utils/logger'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)

  const siteId = params.siteId ?? 'unknown'

  const template = await useStorage('templates').getItem('feedxButton.html')

  if (!template) {
    throw logger.error('Template not found', 'Template API', true, { siteId })
  }

  return template.toString().replace('--SITEID--', siteId.toString())
})
