let IDNumber = 0
let btnBox
let editedToDo

const input = document.querySelector('.app__header-input')
const addBtn = document.querySelector('.app__header-btn')
const listUncompleted = document.querySelector('.app__body-ul-list')
const listUncompletedHeader = document.querySelector('.app__body-heading')
const listUncompletedError = document.querySelector('.app__body-alert')
const listCompleted = document.querySelector('.app__body-ul-list--completed')
const listCompletedHeader = document.querySelector('.app__body-heading--completed')
const allTasksUncompleted = listUncompleted.getElementsByTagName('li')
const allTasksCompleted = listCompleted.getElementsByTagName('li')

const popup = document.querySelector('.popup')
const popupError = document.querySelector('.popup__body-info')
const popupInput = document.querySelector('.popup__body-input')
const popupBtnAdd = document.querySelector('.accepted')
const popupBtnCancel = document.querySelector('.cancel')

const addNewToDo = () => {
	if (input.value !== '') {
		IDNumber++
		listUncompletedHeader.innerText = 'TASKS TO DO'
		const newToDo = document.createElement('li')
		newToDo.setAttribute('id', IDNumber)
		newToDo.textContent = input.value
		newToDo.classList.add('app__list-item')
		addBtnBox(newToDo)
		listUncompleted.append(newToDo)

		input.value = ''
		listUncompletedError.innerText = ''
	} else {
		listUncompletedError.innerText = 'Enter the Task'
	}
}

const enterTask = e => {
	if (e.code === 'Enter') {
		addNewToDo()
	}
}

const addBtnBox = e => {
	btnBox = document.createElement('div')
	e.append(btnBox)

	const btnCompleted = document.createElement('button')
	btnCompleted.classList.add('btn', 'completed')
	btnCompleted.innerHTML = '<i class="fa-solid fa-check"></i>'

	const btnEdit = document.createElement('button')
	btnEdit.classList.add('btn', 'edit')
	btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square">'

	const btnDelete = document.createElement('button')
	btnDelete.classList.add('btn', 'delete')
	btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

	btnBox.append(btnCompleted, btnEdit, btnDelete)
}



const checkButton = e => {
	if (e.target.closest('button').classList.contains('completed')) {
		completed(e)
	}

	if (e.target.closest('button').classList.contains('return')) {
		returnToDo(e)
	}

	if (e.target.closest('button').classList.contains('edit')) {
		editToDo(e)
	}

	if (e.target.closest('button').classList.contains('delete')) {
		deleteToDo(e)
	}
}

const completed = e => {
	const btnReturn = document.createElement('button')
	btnReturn.classList.add('btn', 'return')
	btnReturn.innerHTML = '<i class="fa-solid fa-arrow-rotate-left"></i>'

	const completedToDo = e.target.closest('li')
	const currentBtnBox = e.target.closest('div')

	listCompleted.append(completedToDo)
	completedToDo.classList.toggle('complete')
	listCompletedHeader.innerText = 'COMPLETED TASKS'

	currentBtnBox.replaceChild(btnReturn, currentBtnBox.childNodes[0])
}

const returnToDo = e => {
	const btnCompleted = document.createElement('button')
	btnCompleted.classList.add('btn', 'completed')
	btnCompleted.innerHTML = '<i class="fa-solid fa-check"></i>'

	const completedToDo = e.target.closest('li')
	const currentBtnBox = e.target.closest('div')

	listUncompleted.append(completedToDo)
	completedToDo.classList.toggle('complete')

	currentBtnBox.replaceChild(btnCompleted, currentBtnBox.childNodes[0])

	if(allTasksCompleted.length == 0){
		listCompletedHeader.innerText = ''
	}
}

const deleteToDo = e => {
	e.target.closest('li').remove()
	

	if(allTasksCompleted.length == 0){
		listCompletedHeader.innerText = ''
	}
	if(allTasksUncompleted.length == 0){
		listUncompletedHeader.innerText = ''
		
	}
	if(allTasksCompleted.length == 0 && allTasksUncompleted.length == 0){
		listUncompletedError.innerText = 'Enter New Task'
	}
}

const editToDo = e => {
	popup.style.display = 'flex'
	const oldTodo = e.target.closest('li').id
	editedToDo = document.getElementById(oldTodo)
	popupInput.value = editedToDo.firstChild.textContent
}

const closePopup = () => {
	popup.style.display = 'none'
}

const changeToDo = e => {
	if (popupInput.value !== '') {
		editedToDo.firstChild.textContent = popupInput.value
		closePopup()
		popupError.innerHTML =''
	} else {
		popupError.innerHTML = 'Enter the task'
	}
}

addBtn.addEventListener('click', addNewToDo)
input.addEventListener('keyup', enterTask)
listUncompleted.addEventListener('click', checkButton)
listCompleted.addEventListener('click', checkButton)
popupBtnCancel.addEventListener('click', closePopup)
popupBtnAdd.addEventListener('click', changeToDo)

