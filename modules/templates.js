export const templateTodo = (task) => {
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