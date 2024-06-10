export default defineNuxtRouteMiddleware((to) => {
  if ('nt' in to.query) {
    const cookie = useCookie('nt')
    cookie.value = 'true'

    const path = to.fullPath.split('?')[0]
    return navigateTo(path)
  }
})
