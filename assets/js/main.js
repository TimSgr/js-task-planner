console.log("hello world");
function add_new_task(){
    let new_task=document.querySelector(".create_tasks input");
    let all_task_box=document.querySelector(".all_tasks");
    let new_task_value=new_task.value;

    if(new_task_value){
        let old_html=all_task_box.innerHTML;
        let new_task_box = "<div>"+new_task_value+"</div>";
        all_task_box.innerHTML=old_html+new_task_box;
    }
    console.log(new_task_value);
}

