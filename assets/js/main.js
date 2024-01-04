console.log("hello world");
function add_new_task(){
    let new_task=document.querySelector(".create_tasks input");
    let all_task_box=document.querySelector(".all_tasks");
    let new_task_value=new_task.value;

    if(new_task_value){
        let r = (Math.random() + 1).toString(36).substring(7);

        let old_html=all_task_box.innerHTML;
        let new_task_box = "<div id='"+r+"'><span>"+new_task_value+"</span> <span class='delete' onclick='remove_task()'>X</span></div>";
        all_task_box.innerHTML=old_html+new_task_box;
        new_task.value="";
    }
    console.log(new_task_value);
}

function remove_task(){
    let element = event.target;
    let parent=element.parentElement.innerHTML;
    let all_task_box=document.querySelector(".all_tasks");  
    let new_task_box=all_task_box.innerHTML.replace(parent, "");
    all_task_box.innerHTML=new_task_box;
}