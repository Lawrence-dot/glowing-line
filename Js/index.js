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


var LIST;
var id;
var numbers;
var UpdateIt;
var theNumbers;

var savedList = localStorage.getItem("LIST");


if (savedList) {
    // LIST = JSON.parse(savedList);
    loadList(LIST);
    ReList();
    newFunction();
    console.log(LIST);
 } else {
    LIST = [];
    id = 0;
 }


// function newFunction() {
//     LIST.forEach(element => {
//         let serialL = element.value;
//         id = 1;
//         console.log(serialL.innerText);
//     });
// };

for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage[i];
    LIST = JSON.parse(savedList);
    loadList(LIST);
};

function loadList(array) {
    array.forEach(element => {
        addToDo(element.name, element.id, element.value);
    });
    
};

function addToDo (inputted, id){
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
    var addBtn = document.getElementById("add-btns");
    let selectCol = document.getElementById("selectV");
    let numbering = document.getElementById("colserial");
    let selectedOption = selectCol.value;

    let newros = `<tr class="row nrow" id="row${id}">
                            <td class="colserial" id="Text${id}"> ${id} </td>
                            <td class="cols"> ${displayDT} </td>
                            <td class="cols"> ${inputted} </td>
                            <td class="cols"> 
                             <p id= "statusT">  ${selectedOption}  </p>
                             </td>
                            <td class="cols"> <button onclick ="Editactivity()" id="edit-btn"> &#9998; </button> </td>
                            <td class="cols"> <button class="delete-btn" onclick = "Deletetodo()">  &#128465; </button> </td>
                            <td class="cols"> <button onclick="updateTodo()" class="update-btn"> Update </button> </td>
                          </tr>`;
        activity.value = "";
        id++;
    
        neww = document.createElement("tr");
        neww.innerHTML = newros;
        table.appendChild(neww);

        localStorage.setItem("LIST", JSON.stringify(LIST));
 };

 

addButton.addEventListener("click", function (addNew) {
    let activity = document.getElementById("Activity-name");
    let inputted = activity.value;
    let numbering = document.getElementById("colserial");
    // newFunction();
    
    if (inputted) {
        addToDo(inputted);
        LIST.push({
            name: inputted,
            serialNuber: id,
            value: neww.childNodes[1]
        });
        id++;
        localStorage.setItem("LIST", JSON.stringify(LIST));
        ReList();
    }

    localStorage.setItem("LIST", JSON.stringify(LIST));
 });


function ReList() {
    LIST.forEach(element => {
        console.log(element);
        let serialL = element.value;
        id = LIST.indexOf(element) + 1;
        serialL.innerText = LIST.indexOf(element) + 1;;
    });
};

function Deletetodo(element) {
    let child = event.target;
    let rows = document.getElementsByClassName("row");
    let table = document.getElementById("dataTable");
    let serialC = document.getElementsByClassName("colserial");
    table.removeChild(child.parentNode.parentNode);
    let serialUpdate = child.parentNode.parentNode.children[0];

    LIST.forEach(col => {
        LIST.splice(col, 1);
        console.log(col);
        id++;
    });
    ReList();
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

//localStorage.clear();

