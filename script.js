$ = selector => document.querySelector(selector)
$$ = selector => [...document.querySelectorAll(selector)]

const msg = $('.msg')

let arrayOfTasks = []
const list = $('.task-list')
const inputForm = $('.menu-form')
let inputText = $('#input')

inputForm.addEventListener('submit', function (e) {
  e.preventDefault()
  if (inputText.value) {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const now = `${(hour > 9) ? hour : '0' + hour}:${(minute > 9) ? minute : '0' + minute} ${day}.${(month > 9) ? month : '0' + (month + 1)}`

    arrayOfTasks.push({text: inputText.value, date: now})
    
    const task = document.createElement('form')
    task.classList.add('form-check')
    list.prepend(task)
    task.innerHTML = 
    `<form class="form-check">
        <div class="task-body">
          <input class="form-check-input" id="lg" type="checkbox" name="">
          <input class="form-control" id="text" disabled type="text" value="${arrayOfTasks.at(-1).text}">
          <div class="form-control" id="date">${arrayOfTasks.at(-1).date}</div>
          <button class="btn btn-primary delete" id="${arrayOfTasks.length}" type="button"><span class="material-symbols-outlined">delete_forever</span></button>
        </div>
      </form>`
    
    inputForm.reset()

  } else alert('Enter to do...');

  const delAll = $('#del-all')
  delAll.onclick = function () {
    list.innerHTML = ''
    arrayOfTasks.length = 0
  }

  const DeleteBtns = $$('.delete')
  DeleteBtns.forEach(task => {
    task.onclick = function () {
      task.parentNode.parentNode.remove(task)
      arrayOfTasks[task.id - 1] = 'null'
      arrayOfTasks = arrayOfTasks.filter(task => task != 'null')
    }
  });

  const chboxes = $$('.form-check-input')
  chboxes.forEach(chbox => {
    chbox.onchange = () => chbox.parentNode.parentNode.classList.toggle('done')
  })
})