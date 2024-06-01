import { differenceInDays } from 'date-fns'

export function formatDate(date: Date): string {
  return date.toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function getLastNDates(numberOfDays: number, sortBy: 'asc' | 'desc' = 'desc'): Date[] {
  const res: Date[] = []
  const date = new Date()

  for (let i = 0; i < numberOfDays; i++) {
    res.push(new Date(date))
    date.setDate(date.getDate() - 1)
  }

  if (sortBy === 'asc') {
    res.sort((a, b) => differenceInDays(a, b))
  }

  return res
}

export function formatDateToDateAndMonth(date: Date): string {
  return date.toLocaleDateString('default', { day: '2-digit', month: 'short' })
}
