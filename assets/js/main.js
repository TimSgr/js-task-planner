console.log("hello world");
function add_new_task(){
    const new_task = document.querySelector(".create_tasks input");
    const all_task_box = document.querySelector(".all_tasks");
    const new_task_value = new_task.value;

    if(new_task_value){
        const taskId = (Math.random() + 1).toString(36).substring(7);
        const taskElement = document.createElement('div');
        taskElement.setAttribute('id', taskId);
        taskElement.innerHTML = `<span class='delete'>X</span> <span>${new_task_value}</span> <span class='complete'>✔</span>`;
        all_task_box.appendChild(taskElement);
        new_task.value = "";
    }
}

document.querySelector('.all_tasks').addEventListener('click', function(event) {
    if(event.target.classList.contains('delete')) {
        remove_task(event.target);
    } else if(event.target.classList.contains('complete')) {
        complete_task(event.target);
    }
});

function remove_task(element){
    const parent = element.parentElement;
    parent.remove();
}

function complete_task(element){
    const parent = element.parentElement;
    parent.classList.add("completed");
}
