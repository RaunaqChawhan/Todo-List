const todos = document.querySelector('.todos');
const taskValue = document.querySelector('#task-value');
const taskForm = document.querySelector('.task-form');

taskForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const task = taskValue.value;
	taskValue.value = '';
	createTask(task);
});

function createTask(task) {
	const taskContainer = document.createElement('div');
	const para = document.createElement('p');
	para.textContent = task;
	taskContainer.appendChild(para);
	todos.appendChild(taskContainer);
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'Delete';
	deleteButton.setAttribute('class', 'delete-task');
	taskContainer.appendChild(deleteButton);
	deleteButton.addEventListener('click', function (e) {
		deleteTask(e);
	});
}

function deleteTask(e) {
	console.log('in delete');
	const selectedButton = e.target;
	const parentElement = selectedButton.parentNode;
	const parentContainer = parentElement.parentNode;
	parentContainer.removeChild(parentElement);
}


//Failed Attempt
/*const buttons = todos.querySelectorAll('button');
	const paras = todos.querySelectorAll('p');
	console.log(buttons);
	for(let i=0; i<buttons.length; i++) {
	buttons[i].addEventListener('click', function() {
		console.log('in the loop');
		paras[i].parentNode.removeChild(paras[i]);
		buttons[i].parentNode.removeChild(buttons[i]);
	});
}*/