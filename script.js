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
	/*deleteButton.addEventListener('click', function (e) {
		deleteTask(e);
	});*/
	
	const editButton = document.createElement('button');
 	editButton.innerHTML = 'Edit';
 	editButton.setAttribute('class', 'edit-task');
 	taskContainer.appendChild(editButton);
 	/*editButton.addEventListener('click', function (e) {
 		editTask(e);
 	});*/
}

todos.addEventListener('click', function(e) {
	if(e.target.classList == "delete-task") {
		deleteTask(e);
	} else if(e.target.classList == "edit-task") {
		editTask(e);
	}
});

function deleteTask(e) {
	console.log('in delete');
	const selectedButton = e.target;
	const parentElement = selectedButton.parentNode;
	const parentContainer = parentElement.parentNode;
	parentContainer.removeChild(parentElement);
}

function editTask(e) {
	console.log('in edit');
	const selectedButton = e.target;
	console.log(selectedButton);
	const parentElement = selectedButton.parentNode;
	console.log(parentElement);
	const firstPara = parentElement.firstChild;
	console.log(firstPara);
	const formElement = document.createElement('form');
	const inputElement = document.createElement('input');
	inputElement.setAttribute('type', 'text');
	inputElement.value = firstPara.innerHTML;
	formElement.appendChild(inputElement);
	parentElement.replaceChild(formElement, firstPara);
	inputElement.focus();
	console.log(formElement);
	formElement.addEventListener('submit', function (e) {
		e.preventDefault();
		const clickedButton = e.target;
		console.log(clickedButton);
		const parent = clickedButton.parentNode;
		console.log(parent);
		const newPara = document.createElement('p');
		newPara.innerHTML = inputElement.value;
		console.log(newPara);
		parent.replaceChild(newPara, formElement);
	});
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