import { track } from '@vercel/analytics'

export default function useTracking(componentName: string): {
  track: (trackingName: string) => void
  trackAndNavigate: (trackingName: string, href: string) => void
} {
  const trackingCookie = useCookie('nt')
  const trackingDisabled = trackingCookie.value === 'true'

  return {
    track: (trackingName: string) => {
      if (!trackingDisabled) {
        track(componentName + ' - ' + trackingName)
      }
    },

    trackAndNavigate: (trackingName: string, href: string) => {
      if (!trackingDisabled) {
        track(componentName + ' - ' + trackingName)
      }

      navigateTo(href)
    },
  }
}
