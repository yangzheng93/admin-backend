export function build(data: object, properties: string[]): object {
  return properties.reduce((a, b) => {
    return data.hasOwnProperty(b) ? { ...a, [b]: data[b] } : a;
  }, {});
}
