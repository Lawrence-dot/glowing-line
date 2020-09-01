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

var addButton = document.getElementById("add-btns");
var date = document.getElementById("date");
var table = document.getElementsByClassName("Data-table");
var form = document.getElementsByClassName("main-form");
var dateT = document.getElementById("dateT");
var time = setInterval(time, 1000);
var displayDate = new Date();
var serialN = 1;


function time() {
    var display = new Date();
    var kj = display.toLocaleDateString();
    var time = display.toLocaleTimeString();
    var showDisplay = `${kj} ${time}`;
    date.innerHTML = showDisplay;
};


var LIST = [];
var id = 1;
ReList();

function ReList() {
    for (let i = 0; i < LIST.length; i++) {
        const element = LIST[i];
        LIST[0].innerHTML = id;
        // id = LIST.indexOf(element);
        console.log();
    };

};

var savedList = localStorage.getItem("LIST");


//


// function newFunction() {
//     LIST.forEach(element => {
//         let serialL = element.value;
//         id = 1;
//         console.log(serialL.innerText);
//     });
// };

// for (let i = 0; i < localStorage.length; i++) {
//     const element = localStorage[i];
//     LIST = JSON.parse(savedList);
//     loadList(LIST);
// };

function loadList(array) {
    array.forEach(element => {
        addToDo(element.name, element.id, element.value);
    });
    
};

function addToDo (inputted){
    let table = document.getElementById("dataTable");
    let statusP = document.getElementById("statusT");
    let selectCol = document.getElementById("selectV");
    let selectedOption = selectCol.value;
    let dateInput = document.getElementById("dateT");
    let activity = document.getElementById("Activity-name");
    let dateValue = dateInput.value;
    let timeValue = document.getElementById("dateTime").value;
    let newros = `<tr class="row nrow" id="row${id}">
                            <td class="colserial"> ${id} </td>
                            <td class="cols"> ${dateValue} ${timeValue} </td>
                            <td class="cols"> ${inputted} </td>
                            <td class="cols"> 
                             <p id= "statusT">  ${selectedOption}  </p>
                             </td>
                            <td class="cols"> <button onclick ="Editactivity()" id="edit-btn"> &#9998; </button> </td>
                            <td class="cols"> <button class="delete-btn" onclick = "Deletetodo()">  &#128465; </button> </td>
                            <td class="cols"> <button onclick="updateTodo()" class="update-btn"> Update </button> </td>
                          </tr>`;
        activity.value = "";
        neww = document.createElement("tr");
        neww.innerHTML = newros;
        table.appendChild(neww);
        localStorage.setItem("LIST", JSON.stringify(LIST));
 };

 

addButton.addEventListener("click", function addNew() {
    let activity = document.getElementById("Activity-name");
    let inputted = activity.value;
    let dateInput = document.getElementById("dateT");
    let dateValue = dateInput.value;
    let timeValue = document.getElementById("dateTime").value;
    
    if (inputted && dateValue && timeValue) {
        addToDo(inputted);
        LIST.push({
            name: inputted,
            serialNuber: id, 
        });
        id++;
    };
    ReList();
    // localStorage.setItem("LIST", JSON.stringify(LIST));
 });


function Deletetodo() {
    let child = event.target;
    let table = document.getElementById("dataTable");
    LIST.forEach(col => {
        LIST.splice(col, 1);
    });

    table.removeChild(child.parentNode.parentNode);
   // ReList();
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
        editStatus.innerText = selectedOption;
    });
};

//localStorage.clear();

