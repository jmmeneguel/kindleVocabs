export function searchDictionaryArray (array: any, key: string, value: string) {
  for (const item of array) {
    if (item[key] === value) {
      return item
    }
  }
  return undefined
}
