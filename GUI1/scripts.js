$( document ).ready(function() {
    console.log( "ready!" );
})
//count of all of the total votes
let totalVotes = 0;
//array of all of the candidates
let allCandidates= []
//array with the votes for each one 
let candidatesVotes =[]
let count = 0
//check if the input is valid
function isempty(e) {
    e = e.replace(/\s/g, '')
    switch (e) {
      case "":
      case "0":
      case null:
      case typeof this == "undefined":
        return false;
      default:
        return true;
    }
  }
//returns the index of the candidate in the allCandidates array
function checkCand(c){
    return jQuery.inArray(c,allCandidates)
}
//removes candidate from the array and its votes
function updateArrays(n){
    if (n>-1){
        allCandidates.splice(n,1);
        candidatesVotes.splice(n,1);
    }
}
//gets random rga coloring
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

//adds bar with the candidate
function addBar(){
    //checks if there are more spots to be added
    if(candidatesVotes.length<10){
        //get the name of the candidate
        cand = $("#add").val()
        //check if the name is valid
        if(isempty(cand) == true){
            //we replaced spaces with underscore to give our div an unique id
            cand = cand.replace(" ", "_")
            //gets the index of the candidates
            let found = checkCand(cand)
            //check if candidates exists
            if(found==-1){
                //create the new div with its own id and whom on click calls the updatesVotes() method
                h= `<div id = "${cand}" onclick=\"updateVotes('${cand}')\"><h1 id =\"text\">${cand.replace("_", " ")}</h1></div>`
                //add the div to the html
                $("#innerBox").append(h)
                //add candidates to the lists
                allCandidates.push(cand)
                candidatesVotes.push(0)
                //get the width of the current weed
                width = getDivWidth()
                // add css to the created div
                    $("#"+cand).css({"position": "relative",
                        "height":"10%",
                        "background-color": random_rgba(),
                        "transition-property" : ["width", "height"],
                        "transition-duration" : "300ms",   
                    })

            }
            //if candidates already exists prompt a window
            else{
                a = confirm(`${cand.replace("_", " ")} already exists. Do you want to reset the number of votes?`)
                //if the user resets the candidates votes then update the lists
                if(a==true ){totalVotes -= candidatesVotes[found]
                candidatesVotes[found]=0}
                
            }
            // we update the width of the div based on the votes
            updateWidth()
        }
        // if input not valid ex. all bkanks or nothing
        else{
            alert(`Cannot add ${cand}`)
        }
    }
    //if we reached the maximum amount of candidates
    else {
    alert("no more than 10 candidates")
    }
}
function getDivWidth(){
    return $("#innerBox").width()
}
//removes the div for a certain candidate
function removeBar(){
    //get the candidate's name
    cand = $("#remove").val()
    cand = cand.replace(" ", "_")
    //get candidates index
    let found = checkCand(cand)
    //check if candidates exists
    if(found==-1){alert(cand + ' cannot be removed.')}
    //remove the div from the html
    $(`#${cand}`).remove()
    //remove the candidate and its votes from the arrays 
    updateArrays(found)
    //update total votes
    totalVotes = calculateTot()
    //update the width for all of the candidates divs
    updateWidth()
}
//unpdates the votes of a candidates and its div's width
function updateVotes(a){    
    //get candidates index
    let index = checkCand(a)
    //adds votes to the candidates
    candidatesVotes[index] += 1
    //update total votes
    totalVotes++
    //update the width for all of the candidates divs
    updateWidth()

}

function updateWidth(){        
    // Iterate over numeric indexes from 0 to allCandidates.length
    for (var i = 0; i < allCandidates.length; i++) {
        //initiate the width when candidates has 0 votes
        if(candidatesVotes[i] ==0 ){
            $(`#${allCandidates[i]}`).css("width", "10px")
        }
        else {
            //calculate the dimension by dividing the candidates votes by the total # of votes
            var t = (candidatesVotes[i])/(totalVotes) *100
            let dim = t + "%"
            //update the css width
            $(`#${allCandidates[i]}`).css("width", dim)
        }

    }
}
//get the sum of all votes
function calculateTot(){
    return candidatesVotes.reduce((a, b) => a + b, 0)
}

// call the adding and removing div funcitons when the buttons are clicked
document.getElementById("ab").onclick = function() {addBar()};
document.getElementById("db").onclick = function() {removeBar()};
