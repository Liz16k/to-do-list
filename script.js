import { $, $$ } from './modules/dom-helper.js'
import { Todo } from './modules/constructors.js'

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
console.log(data);
let todoJSON = JSON.stringify(data)

let inputContent = $('#input')
let inputSearchContent = $('#input-srch')
const list = $('.task-list')
const inputForm = $('.menu-form')
const delAll = $('#del-all')
const delLast = $('#del-last')
const showAll = $('#show-all')
const showCompleted = $('#show-completed')
const counters = $$('#counter')

render()

inputForm.addEventListener('submit', handleSubmitForm)
inputSearchContent.addEventListener('input', handleChangeSearchForm)
delAll.addEventListener('click', handleClickBtnDelAll)
list.addEventListener('click', handleClickBtnDel)
list.addEventListener('change', handleInputChange)
delLast.addEventListener('click', handleClickBtnLast)
showCompleted.addEventListener('click', handleClickBtnShowDone)
showAll.addEventListener('click', handleClickBtnShowAll)

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

function handleChangeSearchForm (e) {
  const content = e.target.value
  if (content) {
    render('search', content)
  } else render()
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

function handleClickBtnLast () {
  data.length -= 1
  render()
}

function handleClickBtnShowAll () {
  render()
}

function handleClickBtnShowDone () {
  render(true)
}

function render (filter = false, content = '') {
  let dataRender = data;
  if (filter) {
    dataRender = (filter == 'search') ?
      data.filter(task => task.content.includes(content)) :
      data.filter(task => task.isChecked)
  }

  list.innerHTML = ''
  list.innerHTML = dataRender.reduce((html, task) => templateTodo(task) + html , '')

  todoJSON = JSON.stringify(data)
  localStorage.setItem('todos', todoJSON)

  counters[0].textContent = `All: ${data.length}`
  counters[1].textContent = `Completed: ${data.reduce((count, task) => count += task.isChecked, 0)}`
}
