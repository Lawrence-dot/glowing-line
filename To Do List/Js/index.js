var open = document.getElementById("open");
var close = document.getElementById("close");
var sidebar = document.getElementById("sidebar");
var page = document.getElementById("main-page");
var menuopen;


open.onclick = function () {
    menuopen = true;
    sidebar.style.width = "300px";
    sidebar.style.marginTop = "25px";
    document.getElementById("open").setAttribute("id", "close");
    close.style.display = "block";
    open.style.display = "none";
    page.style.paddingLeft = "312px";
};

close.onclick = function () {
    menuopen = false;
    sidebar.style.width = "0px";
    document.getElementById("close").setAttribute("id", "open");
    close.style.display = "none";
    open.style.display = "block";
    page.style.paddingLeft = "0px";
};


var date = document.getElementById("date");
var table = document.getElementsByClassName("Data-table");
var form = document.getElementsByClassName("main-form");
var dateT = document.getElementById("dateT");
var time = setInterval(time, 1000);
var displayDate = new Date();
var serialN = 1;
var id = 1;

function time() {
    var display = new Date();
    var kj = display.toLocaleDateString();
    var time = display.toLocaleTimeString();
    var showDisplay = `${kj} ${time}`;
    date.innerHTML = showDisplay;
};

var LIST = [];


function addToDo (){
    let activity = document.getElementById("Activity-name");
    let table = document.getElementById("dataTable");
    let displayD = displayDate.toDateString();
    let displayT = displayDate.toLocaleTimeString();
    let displayh = displayDate.getHours();
    let displaym = displayDate.getMinutes();
    let displayDT = `${displayD} ${displayT}`;
    let statusP = document.getElementById("statusT");
    dateT.value = displayDT;
    let rows = document.getElementsByClassName("row");
    var addBtn = document.getElementById("add-btns");3
    let selectCol = document.getElementById("selectV");
    let selectedOption = selectCol.value;

    if (activity.value) {
        let newros = `<tr class="row nrow" id="row${id}">
                            <td class="colserial" id="Text${id}"> </td>
                            <td class="cols"> ${displayDT} </td>
                            <td class="cols"> ${activity.value} </td>
                            <td class="cols"> 
                             <p id= "statusT">  ${selectedOption}  </p>
                            </td>
                            <td class="cols"> <button onclick ="Editactivity()" id="edit-btn"> &#9998; </button> </td>
                            <td class="cols"> <button class="delete-btn" onclick = "Deletetodo()">  &#128465; </button> </td>
                            <td class="cols"> <button onclick="updateTodo()" class="update-btn"> Update </button> </td>
                          </tr>`;
        activity.value = "";
        serialN++;
        id++;
    
        let neww = document.createElement("tr");
        neww.innerHTML = newros;
        table.appendChild(neww);
        LIST.push(neww);


         LIST.forEach( (col) =>{
             let columns = col;
             let colP = col.childNodes[1];
             let colIndex = LIST.indexOf(columns);
             let numbers = colIndex + 1;
             colP.innerHTML = numbers;
             console.log(numbers);
         });
    
        
    
        // for(i=0; i<LIST.length; i++){
        //     let selectCol = document.getElementById("select");
        //     let selectedOption = selectCol.selectedOptions;
        //     let statusText = document.getElementById("statusT");
        //     statusText.innerText = "H";
        //     console.log(selectedOption);
        // };
    }
 };

function Deletetodo(element) {
    let child = event.target;
    let rows = document.getElementsByClassName("row");
    let table = document.getElementById("dataTable");
    let serialC = document.getElementsByClassName("colserial");
  
    LIST.forEach( (col) =>{
        LIST.splice(col, 1);
        let columns = col;
        let colP = col.childNodes[1];
        let colIndex = LIST.indexOf(columns);
        var numbers = colIndex + 1;
        table.removeChild(col);
        colP.innerHTML = numbers;
        console.log(numbers);
    });
};

function Editactivity(element) {
    let child = event.target;
    let editBtn = document.getElementById("edit-btn");
    let activity = document.getElementById("Activity-name");
    let elements = child.parentNode.parentNode.lastChild.previousSibling;
    let updateElement = elements.childNodes[1];
    child.style.display = "none";
    updateElement.style.display = "block";
    let theAct = child.parentNode.parentNode.children[2];
    activity.value = theAct.innerText;

};

function updateTodo (){
    let child = event.target;
    let activity = document.getElementById("Activity-name");
    let theAct = child.parentNode.parentNode.children[2];
    let edit = child.parentNode.parentNode.children[4].children[0];
    theAct.innerText = activity.value;
    child.style.display = "none";
    edit.style.display = "block";
    activity.value = "";
    let selectCol = document.getElementById("selectV");
    let statusP = document.getElementById("statusT");
    let selectedOption = selectCol.value;
    statusP.innerHTML = selectedOption;
    console.log(selectedOption);
 
    LIST.forEach( (col) =>{
        let selectCol = document.getElementById("selectV");
        let selectedOption = selectCol.value;
        let editStatus = col.childNodes[7];
        editStatus.innerText = selectedOption;
    });

};

// document.addEventListener("keyup", function (addClick) {
//     let activity = document.getElementById("Activity-name");
  
//     if(addClick.keycode == 13){
//         if(activity.value){
//             addToDo(enterKey);
//         }
//     }
// });
    




