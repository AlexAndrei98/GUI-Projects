$( document ).ready(function() {
    console.log( "ready!" );
})
let totalVotes = 0;
let allCandidates= []
let candidatesVotes =[]
let count = 0

function checkCand(c){
    return jQuery.inArray(c,allCandidates)
}
function updateArrays(n){
    if (n>-1){
        allCandidates.splice(n,1);
        candidatesVotes.splice(n,1);
    }
}
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
function addBar(){
    cand = $("#add").val()
    cand = cand.replace(" ", "_")
    let found = checkCand(cand)
    if(found==-1){
        h= `<div id = "${cand}" onclick=\"updateVotes('${cand}')\"><h1 id =\"text\">${cand.replace("_", " ")}</h1></div>`
        $("#innerBox").append(h)
        allCandidates.push(cand)
        candidatesVotes.push(0)
        width = getDivWidth()
            $("#"+cand).css({"position": "relative",
                "height":"10%",
                "background-color": random_rgba(),
                "transition-property" : ["width", "height"],
                "transition-duration" : "300ms",   
            })

    }
    else{
        alert(`${cand.replace("_", " ")} already exists.`)
        totalVotes -= candidatesVotes[found]
        candidatesVotes[found]=0
        
    }
    updateWidth()
}
function getDivWidth(){
    return $("#innerBox").width()
}
function removeBar(){
    cand = $("#remove").val()
    cand = cand.replace(" ", "_")
    let found = checkCand(cand)
    if(found==-1){alert(cand + ' cannot be removed.')}
    $(`#${cand}`).remove()
    updateArrays(found)
    totalVotes = calculateTot()
    updateWidth()
}

function updateVotes(a){
    let index = checkCand(a)
    //console.log(a)
    candidatesVotes[index] += 1
    totalVotes++
    updateWidth()

}

function updateWidth(){
    for (var i = 0; i < allCandidates.length; i++) {
        // Iterate over numeric indexes from 0 to 5, as everyone expects.
        if(candidatesVotes[i] ==0 ){
            $(`#${allCandidates[i]}`).css("width", "10px")
        }
        else {
            var t = (candidatesVotes[i])/(totalVotes) *100
            let dim = t + "%"
            $(`#${allCandidates[i]}`).css("width", dim)
        }

    }
}

function calculateTot(){
    return candidatesVotes.reduce((a, b) => a + b, 0)
}

alert("To vote click on the bar for the candidate")
if(allCandidates.length>10){
    alert("for best usage stay under 10 candidates")
}