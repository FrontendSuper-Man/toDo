const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');



const storedData = localStorage.getItem('toDoData');
const toDoData = storedData ? JSON.parse(storedData) : [];


const render = function () {
	todoList.innerHTML = ''
	todoCompleted.innerHTML = ''
	toDoData.forEach((item, index) => {
		const li = document.createElement('li')
		li.classList.add('todo-item')
		li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
			'<div class="todo-buttons">' +
			'<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' +
			'</div>'
		item.completed ? todoCompleted.append(li) : todoList.append(li);
		li.querySelector('.todo-complete').addEventListener('click', function () {
			item.completed = !item.completed
			render()
			console.log(toDoData);
		})
		const removeBtn = li.querySelector('.todo-remove')
		removeBtn.addEventListener('click', function () {
			toDoData.splice(index, 1);
			li.remove();
			render()
		});
	})
	localStorage.setItem('toDoData', JSON.stringify(toDoData));
}

todoControl.addEventListener('submit', function (event) {
	event.preventDefault()
	const newToDo = {
		text: headerInput.value,
		completed: false,
	}
	if (headerInput.value.trim() === '') {
		alert('Пустая строка! Введите чтобы нибудь чтобы создать задачу!')
	} else {
		toDoData.push(newToDo);
	}
	headerInput.value = ''
	render()
	console.log(toDoData);
})

render()