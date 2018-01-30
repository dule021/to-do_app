var testButton = document.getElementById("test");
var content = document.getElementById("msg");

var newNotes = document.getElementById("newNotes");
var doneNotes = document.getElementById("doneNotes");

var globalSave = document.getElementById("saveButton");
var isDone;
var handler;
var i = 0;
var todoList = {};
var doneList = {};

    
var addButton = function(isDone){
   
    var newDiv = document.createElement("DIV");
    var newParagraph = document.createElement("P");
    
    var newDeleteButton = document.createElement("BUTTON");
    newDeleteButton.innerText = "delete";
    newDeleteButton.setAttribute("class", "deleteButton");
    newDeleteButton.addEventListener("click", function(event){
        var parent = event.target.parentNode;
        var thisIndex = secretIndex.innerText;
        delete todoList[thisIndex];
        i--;
        newDeleteButton.parentNode.remove();
    })
        
    var newDoneButton = document.createElement("BUTTON");
    newDoneButton.innerText = "done";
    newDoneButton.setAttribute("class", "doneButton");
    newDoneButton.addEventListener("click", function(event) {
        var parent = event.target.parentNode;
        var thisIndex = secretIndex.innerText;
        doneList[thisIndex] = parent.firstChild.innerText;
        delete todoList[thisIndex];
       
        newDoneButton.remove();
        doneNotes.appendChild(newDiv);
        newDiv.removeChild(colorButton);
        newDiv.appendChild(undoButton);
        newDiv.appendChild(colorButton);
        newNotes.removeChild(newDiv);
    })

    var undoButton = document.createElement("BUTTON");
    undoButton.innerText = "undo";
    undoButton.setAttribute("class", "undoButton");
    undoButton.addEventListener("click", function() {
        undoButton.remove();
        newNotes.appendChild(newDiv);
        newDiv.removeChild(colorButton);
        newDiv.appendChild(newDoneButton);
        newDiv.appendChild(colorButton);
        doneNotes.removeChild(newDiv);
    })

    var colorPicker = document.createElement("INPUT");
    colorPicker.setAttribute("type", "color");
    colorPicker.addEventListener("change", function(){
        var newColor = colorPicker.value;
        newDiv.style.backgroundColor = newColor;
    })
    colorPicker.style.display = "none";

    var colorButton = document.createElement("BUTTON");
    colorButton.innerText = "color";
    colorButton.addEventListener("click", function() {
        colorPicker.click();
    })
    
    newDiv.appendChild(newParagraph);
    newDiv.appendChild(newDeleteButton);
    newDiv.appendChild(newDoneButton);
    newDiv.appendChild(colorButton);
    newDiv.setAttribute("class", "newDiv");


    handler = function change(event) {
        
            var editContent = document.createElement("textarea");
            editContent.value = event.target.innerText;
            
            var parent = event.target.parentNode;
            parent.appendChild(editContent);
            parent.removeChild(newDeleteButton);
            if(parent.parentNode==newNotes){
            parent.removeChild(newDoneButton);
            }
            else{
                parent.removeChild(undoButton)
            };
            parent.removeChild(colorButton);

            var saveButton = document.createElement("button");
            saveButton.innerText = "SAVE";
            saveButton.addEventListener("click", function() {
                var newParagraph = document.createElement("P");
                newParagraph.innerText = editContent.value;
                parent.removeChild(editContent);
                parent.removeChild(saveButton);
                parent.appendChild(newParagraph);
                parent.appendChild(newDeleteButton);
                if(parent.parentNode==newNotes){
                parent.appendChild(newDoneButton);
                }
                else{
                    parent.appendChild(undoButton)
                };
                parent.appendChild(colorButton);
                newParagraph.addEventListener("click", handler);
            })
            parent.appendChild(saveButton);
            event.target.remove();
    }

    newParagraph.addEventListener("click", handler);
    newParagraph.innerText = content.value;
    
    
    var newIndex = i++;
    newIndex.toString();
    todoList[newIndex] = content.value;
    var secretIndex = document.createElement("P");
    secretIndex.innerText = newIndex;
    newDiv.appendChild(secretIndex);
    secretIndex.style.display = "none";

    if(isDone==="itsDone") {
        newDoneButton.remove();
        newDiv.removeChild(colorButton);
        newDiv.appendChild(undoButton);
        newDiv.appendChild(colorButton);
        doneNotes.appendChild(newDiv);
    }
    else {
        newNotes.appendChild(newDiv);
    }
};

testButton.addEventListener("click", addButton); 
doneNotes.style.display = "none";



var toDoAreaButton = document.getElementById("toDoAreaButton");
toDoAreaButton.addEventListener("click", function() {
    doneNotes.style.display = "none";
    newNotes.style.display = "flex";
    toDoAreaButton.style.backgroundColor = "#FF8C00";
    doneAreaButton.style.backgroundColor = "white";
    toDoAreaButton.style.fontWeight = "bold";
    doneAreaButton.style.fontWeight = "normal";
})

var doneAreaButton = document.getElementById("doneAreaButton");
doneAreaButton.addEventListener("click", function() {
    newNotes.style.display = "none";
    doneNotes.style.display = "flex";
    toDoAreaButton.style.backgroundColor = "white";
    doneAreaButton.style.backgroundColor = "#FF8C00";
    toDoAreaButton.style.fontWeight = "normal";
    doneAreaButton.style.fontWeight = "bold";
})
toDoAreaButton.style.backgroundColor = "#FF8C00";
toDoAreaButton.style.fontWeight = "bold";

globalSave.addEventListener("click", function() {
    var todoStorage = JSON.stringify(todoList);
    window.localStorage.setItem("todoList", todoStorage);

    var doneStorage = JSON.stringify(doneList);
    window.localStorage.setItem("doneList", doneStorage);
})

window.onload = function() {
    var fromStorage1 = window.localStorage.getItem("todoList");
    var fromStorage2 = window.localStorage.getItem("doneList");

    var savedList1 = JSON.parse(fromStorage1);
    var savedList2 = JSON.parse(fromStorage2);
    
    for (var entry in savedList1) {
        var content = document.getElementById("msg");
        content.value = savedList1[entry];
        addButton()
    }

    for (var entr in savedList2) {
        var content = document.getElementById("msg");
        content.value = savedList2[entr];
        addButton("itsDone");

    }
};