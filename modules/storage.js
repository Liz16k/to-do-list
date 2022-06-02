export { data }

let todos = JSON.parse(localStorage.getItem('todos'))

let data = (todos) ? [...todos] : []
let todoJSON = JSON.stringify(data)
