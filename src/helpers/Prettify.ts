export const prettifyPhoneNumber = (num: string) => {
  return `(${num.slice(0, 3)})-${num.slice(3, 6)}-${num.slice(6 - 10)}`
}