var testButton = document.getElementById("test");
var content = document.getElementById("msg");

var newNotes = document.getElementById("newNotes");
var doneNotes = document.getElementById("doneNotes");

var handler;


testButton.addEventListener("click", function(){
    var newDiv = document.createElement("DIV");
    var newParagraph = document.createElement("P");
    
    var newDeleteButton = document.createElement("BUTTON");
    newDeleteButton.innerText = "delete";
    newDeleteButton.setAttribute("class", "deleteButton");
    newDeleteButton.addEventListener("click", function(){
        newDeleteButton.parentNode.remove();
    })
    
    var newDoneButton = document.createElement("BUTTON");
    newDoneButton.innerText = "done";
    newDoneButton.setAttribute("class", "doneButton");
    newDoneButton.addEventListener("click", function() {
       newDoneButton.remove();
       newDiv.appendChild(undoButton);
       doneNotes.appendChild(newDiv);
       newNotes.removeChild(newDiv);    
    })

    var undoButton = document.createElement("BUTTON");
    undoButton.innerText = "undo";
    undoButton.setAttribute("class", "undoButton");
    undoButton.addEventListener("click", function() {
        undoButton.remove();
        newDiv.appendChild(newDoneButton);
        newNotes.appendChild(newDiv);
        doneNotes.removeChild(newDiv);
    })


    var colorPicker = document.createElement("INPUT");
    colorPicker.setAttribute("type", "color");
    colorPicker.setAttribute("class", "colorPicker");
    colorPicker.addEventListener("change", function(){
        var newColor = colorPicker.value;
        newDiv.style.backgroundColor = newColor;
    })
    
    newDiv.appendChild(newParagraph);
    newDiv.appendChild(newDeleteButton);
    newDiv.appendChild(newDoneButton);
    newDiv.appendChild(colorPicker);
    newDiv.setAttribute("class", "newDiv");


    handler = function change(event) {
        
            var editContent = document.createElement("textarea");
            editContent.value = event.target.innerText;
            //event.target.innerHTML = null;
            //event.target.appendChild(editContent);
            
            var parent = event.target.parentNode;
            parent.appendChild(editContent);
            parent.removeChild(newDeleteButton);
            if(parent.parentNode==newNotes){
            parent.removeChild(newDoneButton);
            }
            else{
                parent.removeChild(undoButton)
            };
            parent.removeChild(colorPicker);

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
                parent.appendChild(colorPicker);
                newParagraph.addEventListener("click", handler);
            })
            parent.appendChild(saveButton);
            event.target.remove();
    }

    newParagraph.addEventListener("click", handler);
    newParagraph.innerText = content.value;
    newNotes.appendChild(newDiv);
})

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