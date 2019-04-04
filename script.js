const tasksList = document.querySelector('.todos');
const addForm = document.forms['add-form'];
const items = JSON.parse(localStorage.getItem('items')) || [];

//Add new task
function addItem(e) {
	e.preventDefault();
	const item = this.querySelector('input').value;
	items.push(item);
	populateList(items, tasksList);
  	localStorage.setItem('items', JSON.stringify(items));
  	this.reset();
}

//Populate the task
function populateList(items, tasksList) {
	//console.log('in populateList', items);
	while(tasksList.querySelector('li') != null) {	/*Empty the list first otherwise it will lead to repeated elements getting
									created because looping thorugh an array is done everytime populateList is called*/
 		//console.log('removed list');
		tasksList.removeChild(tasksList.querySelector('li'));
	}

	items.forEach(function(item) {
		const list = document.createElement('li');
    	const addLabel = document.createElement('label');
    	addLabel.textContent = item;
    	tasksList.appendChild(list);
    	list.appendChild(addLabel);
    
    	const deleteButton = document.createElement('button');
    	deleteButton.classList.add('delete-button');
    	deleteButton.textContent = 'Delete';
    	list.appendChild(deleteButton);
    
    	const editButton = document.createElement('button');
    	editButton.classList.add('edit-button');
    	editButton.textContent = 'Edit';
    	list.appendChild(editButton);
	})
}

//Delete task
function deleteItem(e) {
	//console.log('in delete');
	tasksList.removeChild(e.target.parentNode);
  	store();	//Update the list after deleting item and store it to Local Storage
}

//Edit task
function editItem(e) {
	const editList = e.target.parentNode;
  	//console.log(editList.firstElementChild.nodeName);
  	if (editList.firstElementChild.nodeName == 'LABEL') {
  		const editForm = document.createElement('form');
    	const editInput = document.createElement('input');
    	editInput.value = editList.firstElementChild.textContent;
 
    	//console.log(editInput);
    	editInput.setAttribute('type', 'text');
    	editForm.appendChild(editInput);
    	editList.replaceChild(editForm, editList.firstElementChild);
    	editInput.focus();
  	}
  
  	editList.firstElementChild.addEventListener('submit', edited);

}

//Edit and submit
function edited(e) {
	e.preventDefault();
	const editedItem = e.target.firstElementChild.value;
  	if(editedItem.length == 0) {
  		deleteItem(e);
  	}
	const editLabel = document.createElement('label');
  	editLabel.textContent = editedItem;
  	e.target.parentNode.replaceChild(editLabel, e.target);
  	store();  //Update the list after editing item and store it to Local Storage
}

//Store the updated list after editing or deleting task
function store() {
	const finalItems = tasksList.querySelectorAll('li label');
  	//console.log(finalItems);
  	items.length = 0;
  
  	Array.from(finalItems).forEach(function(finalItem) {
    	//console.log(finalItem);
    	items.push(finalItem.textContent);
    	//console.log(items);
  	})
  
  	localStorage.setItem('items', JSON.stringify(items));
}

addForm.addEventListener('submit', addItem);

populateList(items, tasksList);

tasksList.addEventListener('click', function(e) {
	if(e.target.className == "delete-button") {
  		deleteItem(e);
  } else if(e.target.className ==  'edit-button') {
  		editItem(e);
  }
});