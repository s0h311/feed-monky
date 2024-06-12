type IconSize = {
  md?: boolean
  lg?: boolean
}

export type FillIconProps = IconSize & {
  fillColor?: string
}

export type StrokeIconProps = IconSize & {
  strokeColor?: string
}

const iconSizes = {
  sm: '24',
  md: '30',
  lg: '40',
}

export function getIconSize(sizes: IconSize): string {
  for (const size in sizes) {
    //@ts-expect-error
    if (sizes[size] && size in iconSizes) {
      //@ts-expect-error
      return iconSizes[size]
    }
  }

  return iconSizes.sm
}
