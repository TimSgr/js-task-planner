console.log("hello world");

// Cache DOM elements
const newTaskWrapper = document.querySelector(".new_task_wrapper");
const allTasksBox = document.querySelector(".all_tasks");
const newTaskDescription_wrapper = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description");
const newTaskDescription = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description #taskdescription");
const newTaskName = document.querySelector(".new_task_wrapper .input_fields .input_field_task_name #taskname");
const closeIcon = document.querySelector(".new_task_wrapper .close_icon");
const datepicker = document.querySelector('#datepicker');

closeIcon.addEventListener('click', function(){
    newTaskWrapper.style.display = "none";
});

function initializeTaskCreation() {
    newTaskName.addEventListener("keyup", () => {
        if(newTaskName.value.trim() === ""){
            newTaskDescription_wrapper.style.display = "none";
        } else {
            newTaskDescription_wrapper.style.display = "block";
        }
    });

    newTaskWrapper.style.display = "flex";
    allTasksBox.style.paddingTop = "25%";
}

// Event listeners for tasks
allTasksBox.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        removeTask(event.target);
    } else if (event.target.classList.contains('complete')) {
        completeTask(event.target);
    } else if (event.target.classList.contains('new_task_name')){
        expand_minimize_details(event.target);
    }
});


function removeTask(element) {
    const parent = element.parentElement.parentElement;
    parent.remove();
}

function completeTask(element) {
    const parent = element.parentElement;
    parent.classList.add("completed");
}

function expand_minimize_details(element){
    const parent = element.parentElement.parentElement;
    if(parent.classList.contains('expanded')){
        parent.classList.remove("expanded");
    }else{
        parent.classList.add("expanded");
    }
}

function submitNewTask() {
    if (newTaskName) {
        newTaskWrapper.style.display = "none";
        allTasksBox.style.paddingTop = "0px";
        const wholeTask = document.createElement('div');
        wholeTask.className = "whole_task";
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <span class='delete'>X</span>
            <span class="new_task_name">${newTaskName.value}</span>
            <span class='complete'>✔</span>
        `;
        const taskDetails = document.createElement('div');
        taskDetails.style.maxHeight="0px";
        taskDetails.style.display="none";
        taskDetails.className = 'task_details';

        taskDetails.innerHTML = `
            <div class="">
                <span class="">${datepicker.value}</span>  
            </div>
            <div class="">
                <span class="">${newTaskDescription.value}</span>
            </div>
        `;
        wholeTask.appendChild(taskElement);
        wholeTask.appendChild(taskDetails);
        allTasksBox.appendChild(wholeTask);
        newTaskName.value = "";
        newTaskDescription.value = "";
        newTaskDescription_wrapper.style.display = "none";

    }
}

// Initialize the task creation process
initializeTaskCreation();

function validate() {
    if (document.querySelector('.input_field_task_checkbox #duedate').checked) {
        datepicker.style.display="block";
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        datepicker.value=today;
    } else {
        datepicker.style.display="none";
    }
}

