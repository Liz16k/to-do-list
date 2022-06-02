import { $ } from './modules/dom-helper.js';
import {
  handleSubmitForm,
  handleInputChange,
  handleChangeSearchForm,
  handleClickBtnDel,
  handleClickBtnDelAll,
  handleClickBtnShowAll,
  handleClickBtnShowDone,
  handleClickBtnLast,
  render
} from './modules/handlers.js';

let inputSearchContent = $('#input-srch')
const list = $('.task-list')
const inputForm = $('.menu-form')
const delAll = $('#del-all')
const delLast = $('#del-last')
const showAll = $('#show-all')
const showCompleted = $('#show-completed')

render()

inputForm.addEventListener('submit', handleSubmitForm)
inputSearchContent.addEventListener('input', handleChangeSearchForm)
delAll.addEventListener('click', handleClickBtnDelAll)
list.addEventListener('click', handleClickBtnDel)
list.addEventListener('change', handleInputChange)
delLast.addEventListener('click', handleClickBtnLast)
showCompleted.addEventListener('click', handleClickBtnShowDone)
showAll.addEventListener('click', handleClickBtnShowAll)
