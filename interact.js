let tasksdiv=document.querySelector(".tasks")
array=[];
if(window.localStorage.getItem("tasks")){
    array=JSON.parse(window.localStorage.getItem("tasks"))
    for(let i=0;i<array.length;i++){
        addelements(array[i]);
    }
}
// array=[];
let input=document.querySelector(".input")
let submit=document.querySelector(".add");
// let tasksdiv=document.querySelector(".tasks")
submit.onclick=function(){
    let task=input.value
    let obj={
        completed:false,
        title:task,
        id:Date.now()
    };
    array.push(obj);
    input.value="";
    addelements(obj);
    addelementtostorage(array);
}
document.addEventListener("click",function(e){
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        removefromstorage(e.target.parentElement.getAttribute("id"));
    };
    if(e.target.classList.contains("task")){
        donefunc(e.target.getAttribute("id"));
        e.target.classList.toggle("done");
    }
});
function addelements(task){
    let div=document.createElement("div");
    div.className="task";
    div.setAttribute("id",task.id);
    div.appendChild(document.createTextNode(task.title));
    let span=document.createElement("span");
    span.className="del";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);
    tasksdiv.appendChild(div);
}
function addelementtostorage(arr){
    window.localStorage.setItem("tasks",JSON.stringify(arr));
}
function removefromstorage(id){
    arr=JSON.parse(window.localStorage.getItem("tasks"));
    arr=arr.filter(function(ele){
        return ele.id!=id;
    })
    window.localStorage.setItem("tasks",JSON.stringify(arr));
    console.log(window.localStorage.getItem("tasks"));
}
function donefunc(id){
    for(let i=0;i<array.lenght;i++){
        if(array[i].id===id){
            array[i].completed=true;
        }
    }
    addelementtostorage(array);
}