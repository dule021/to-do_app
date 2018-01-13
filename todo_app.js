var testButton = document.getElementById("test");
var content = document.getElementById("msg");

var newNotes = document.getElementById("newNotes");
var doneNotes = document.getElementById("doneNotes");


testButton.addEventListener("click", function(){
    var newDiv = document.createElement("DIV");
    var newParagraph = document.createElement("P");
    
    var newDeleteButton = document.createElement("BUTTON");
    newDeleteButton.innerText = "DELETE";
    newDeleteButton.setAttribute("class", "deleteButton");
    newDeleteButton.addEventListener("click", function(){
        newDeleteButton.parentNode.remove();
    })
    
    var newDoneButton = document.createElement("BUTTON");
    newDoneButton.innerText = "DONE";
    newDoneButton.setAttribute("class", "doneButton");
    newDoneButton.addEventListener("click", function() {
       doneNotes.appendChild(newDiv);
       newNotes.removeChild(newDiv);
    })

    var colorPicker = document.createElement("INPUT");
    colorPicker.setAttribute("type", "color");
  
    colorPicker.addEventListener("change", function(){
        var newColor = colorPicker.value;
        newDiv.style.backgroundColor = newColor;
    })
    
    newDiv.appendChild(newParagraph);
    newDiv.appendChild(newDeleteButton);
    newDiv.appendChild(newDoneButton);
    newDiv.appendChild(colorPicker);
    newDiv.setAttribute("class", "newDiv");
    

 
    
    newParagraph.innerHTML = content.value;
    newNotes.appendChild(newDiv);
    
})
