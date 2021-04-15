const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const list = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

eventListener();

function eventListener() {
    document.addEventListener('DOMContentLoaded' , reLoad)
    form.addEventListener('submit' , addTasks);
    list.addEventListener('click' , removeTask );
    clearBtn.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterUp)
}
function reLoad() {
    let Tasks;
    if(localStorage.getItem('Tasks') === null){
      Tasks = [];
    } else {
      Tasks = JSON.parse(localStorage.getItem('Tasks'));
    }
   Tasks.forEach(function(task) {
       
    const rightList = document.createElement('li');
    rightList.className = 'collection-item';
    rightList.appendChild(document.createTextNode(task));

    const leftList = document.createElement('a');
    leftList.className = 'delete-item secondary-content';
    leftList.innerHTML = '<i class="fa fa-remove"></i>';

    rightList.appendChild(leftList);
    list.appendChild(rightList);

   })
}

function addTasks(e) {
   
    if (taskInput.value === '') {
        alert('Add a Task')

    }
    else{

    const rightList = document.createElement('li');
    rightList.className = 'collection-item';
    rightList.appendChild(document.createTextNode(taskInput.value));

    const leftList = document.createElement('a');
    leftList.className = 'delete-item secondary-content';
    leftList.innerHTML = '<i class="fa fa-remove"></i>';

    rightList.appendChild(leftList);
    list.appendChild(rightList);

    saveTask(taskInput.value);

    taskInput.value = '';
    

    alert('Task created');
    e.preventDefault();
}
function saveTask(input) {
    let Tasks;
    if(localStorage.getItem('Tasks') === null){
      Tasks = [];
    } else {
      Tasks = JSON.parse(localStorage.getItem('Tasks'));
    }
  
    Tasks.push(input);
  
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
  }
}
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item'))
    {
        if (confirm('Are you sure want to remove a Task')) {
            e.target.parentElement.parentElement.remove();
            alert('Task Remove');

            removeFinally( e.target.parentElement.parentElement)
        }
        
    }
}
function removeFinally(remove) {
    let Tasks;
    if(localStorage.getItem('Tasks') === null){
      Tasks = [];
    } else {
      Tasks = JSON.parse(localStorage.getItem('Tasks'));
    }
    Tasks.forEach((task, index) => {
        if (remove.textContent === task) {
           Tasks.splice(index , 1) ;
        }
    })
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
}
function clearTask(e) {
    if (confirm('Wipe-off all Task')) {
    
    while (list.firstChild) {
        list.removeChild(list.firstChild);
        clearOff();
    }}
    e.preventDefault();
}
function clearOff() {
    localStorage.clear();
}
function filterUp(e) {

    const sear = e.target.value.toLowerCase();

    const list = document.querySelectorAll('.collection-item');
    list.forEach(function(task) {
        if (task.textContent.toLowerCase().indexOf(sear) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    });

}


