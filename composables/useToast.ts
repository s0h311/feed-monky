type ToastConfig = {
  type: 'warning' | 'error' | 'info' | 'success'
  message: string
}

const initialState: ToastConfig = {
  type: 'info',
  message: '',
}

export function toast(config: ToastConfig): void {}
