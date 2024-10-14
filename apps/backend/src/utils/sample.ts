export function sampleEnum<T>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as T[keyof T];
}

export function sampleIds(idList: string[]): string {
  const randomIndex = Math.floor(Math.random() * idList.length);
  return idList[randomIndex];
}
