// 使用 hasOwnProperty 从一个对象中获取指定的属性
export function buildDirectProperties(
  data: object,
  properties: string[],
): object {
  return properties.reduce((a, b) => {
    return data.hasOwnProperty(b) ? { ...a, [b]: data[b] } : a;
  }, {});
}
