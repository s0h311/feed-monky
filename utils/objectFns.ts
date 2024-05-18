export function groupBy<T>(objArray: T[], key: keyof T): Record<string, T[]> {
  const objByKey: Record<string, T[]> = {}

  objArray.forEach((obj) => {
    if (obj instanceof Object) {
      const currentKey = String(obj[key])

      if (currentKey in objByKey) {
        objByKey[currentKey].push(obj)
        return
      }

      objByKey[currentKey] = [obj]
    }
  })

  return objByKey
}
