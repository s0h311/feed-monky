type DeviceType = 'mobile' | 'tablet' | 'desktop'

export function useDeviceType(): Ref<DeviceType> {
  const deviceType = ref<DeviceType>('mobile')

  const resiveObserver = new ResizeObserver(([e]) => {
    const width = e.contentBoxSize[0].inlineSize

    if (width < 768) deviceType.value = 'mobile'
    else if (width < 1024) deviceType.value = 'tablet'
    else deviceType.value = 'desktop'
  })

  resiveObserver.observe(document.body)

  return deviceType
}
