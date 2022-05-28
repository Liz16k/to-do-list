$ = selector => document.querySelector(selector)
$$ = selector => [...document.querySelectorAll(selector)]
const format = (time) => (time > 9) ? time : '0' + time

const templateTodo = (task) => {
  const checkedAttr = task.isChecked ? 'checked' : ''
  const classChecked = task.isChecked ? 'done' : ''
  return `
    <div class="task-body ${classChecked}" id=${task.id}>
      <input class="form-check-input" id="lg" type="checkbox" ${checkedAttr}>
      <input class="form-control" id="text" type="text" value="${task.content}" disabled>
      <div class="form-control" id="date">${task.createdAt}</div>
      <button class="btn btn-primary delete" type="button"><span class="material-symbols-outlined delete">delete_forever</span></button>
    </div>`
}

let todos = JSON.parse(localStorage.getItem('todos'))

let data = (todos) ? [...todos] : []
let todoJSON = JSON.stringify(data)
localStorage.setItem('todos', todoJSON)

let inputContent = $('#input')
const list = $('.task-list')
const inputForm = $('.menu-form')
const delAll = $('#del-all')

render()

inputForm.addEventListener('submit', handleSubmitForm)
delAll.addEventListener('click', handleClickBtnDelAll)
list.addEventListener('click', handleClickBtnDel)
list.addEventListener('change', handleInputChange)

function handleSubmitForm (e) {
  e.preventDefault()
  const content = inputContent.value
  if (content) {    
    const task = new Todo(content)
    data.push(task)
    inputForm.reset()
    render()
  } else alert('Enter to do...');
}

function handleInputChange (e) {
  if (e.target.classList.contains('form-check-input')) {
    const task = e.target.closest('.task-body')
    const id = task.id
    data.forEach(task => {
      if (task.id == id) {
        task.isChecked = e.target.checked
        render()
      }
    })
  }
}

function handleClickBtnDel (e) {
  if (e.target.classList.contains('delete')) {
    const task = e.target.closest('.task-body')
    const id = task.id
    data.forEach((task, index) => {
      if (task.id == id) {
        data.splice(index, 1)
        render()
      }
    }) 
  }
}

function handleClickBtnDelAll () {
  data.length = 0
  render()
}

function Todo (content) {
  const time = new Time()
  this.id = time.date.getTime()
  this.content = content
  this.createdAt = time.formatTime
  this.isChecked = false
}

function Time () {
  const date = new Date() 
  this.date = date
  this.day = date.getDate()
  this.month = date.getMonth() + 1
  this.hour = date.getHours()
  this.minute = date.getMinutes()
  this.formatTime = `${format(this.hour)}:${format(this.minute)} ${format(this.day)}.${format(this.month)}`
}

function render () {
  list.innerHTML = ''
  list.innerHTML = data.reduce((html, task) => templateTodo(task) + html , '')
  todoJSON = JSON.stringify(data)
  localStorage.setItem('todos', todoJSON)
}
