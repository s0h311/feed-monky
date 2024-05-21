type ToastConfig = {
  type: 'warning' | 'error' | 'info' | 'success'
  message: string
}

type ToastFn = (message: string) => void

export default function useToaster(): {
  success: ToastFn
  error: ToastFn
  warn: ToastFn
} {
  return { success, error, warn }
}

function success(message: string): void {
  if (typeof window === 'undefined') {
    return
  }

  const container = getContainer()

  container.classList.add('border-green-500', 'bg-green-100', 'text-green-500')

  container.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
>
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="m5 13l4 4L19 7"
  />
</svg>

${message}
`

  displayAndRemove(container)
}

function error(message: string): void {
  if (typeof window === 'undefined') {
    return
  }

  const container = getContainer()

  container.classList.add('border-red-500', 'bg-red-100', 'text-red-500')

  container.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
>
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
  />
</svg>

${message}
`

  displayAndRemove(container)
}

function warn(message: string): void {
  if (typeof window === 'undefined') {
    return
  }

  const container = getContainer()

  container.classList.add('border-yellow-500', 'bg-yellow-100', 'text-yellow-500')

  container.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  >
  <g
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-width="2"
  >
  <path d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21ZM12 9v4"/>
  <path stroke-linejoin="round" d="m12 17.01l.01-.011"/>
  </g>
  </svg>

${message}
`

  displayAndRemove(container)
}

const defaultClasses = [
  'absolute',
  'right-5',
  'top-[-100%]',
  'z-10',
  'flex',
  'h-[70px]',
  'w-[340px]',
  'items-center',
  'gap-2',
  'rounded-lg',
  'border',
  'bg-opacity-5',
  'p-5',
  'text-sm',
  'shadow-lg',
  'duration-500',
  'ease-in-out',
]

function getContainer(): HTMLDivElement {
  const container = document.createElement('div')
  container.classList.add(...defaultClasses)

  return container
}

function displayAndRemove(container: HTMLDivElement): void {
  document.body.appendChild(container)

  setTimeout(() => {
    container.style.top = '20px'
  }, 500)

  setTimeout(() => {
    container.style.top = '-100%'
  }, 2000)

  setTimeout(() => {
    container.remove()
  }, 3000)
}
