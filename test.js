const e = "daniel.d.harned@gmail.com"
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

console.log(e.match(emailRegex));
console.log(emailRegex.test(e))
console.log(e.match(emailRegex) === e);