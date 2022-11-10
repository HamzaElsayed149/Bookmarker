var bookMarker = document.getElementById("Site Name")
var url = document.getElementById("Site URL")

var markList ;

if(localStorage.getItem("mark")  != null){
    markList =   JSON.parse(localStorage.mark)
    display()
}else{

var markList = []
}

function addUrl (){
if(validation() && urlvalid()){
    var addnew = {
      Name: bookMarker.value,
      url: url.value
    }

 if(rename()){
    document.getElementById("correct").classList.remove("d-none")

 }else{
    markList.push(addnew)
    clearform()
    localStorage.setItem("mark" , JSON.stringify (markList))
    display ()
 }

 
}
}
function display (){
    var data = ``
    for( var i =0 ; i< markList.length ; i++){
        data += `<tr>
        <td > <div> <h3 class="fw-bolder ">${markList[i].Name} </h3> </div> </td>

        <td > <div>  <button class="btn btn-primary" >
        <a href="${markList[i].url}" target="_blank" class = "text-white text-decoration-none">Visit </a>


        </button>
        <button class="btn btn-danger"  onclick ="del(${i})" >Delete</button> </div> </td>
        </tr>`
    }
    document.getElementById("display").innerHTML = data
}
function clearform(){
    bookMarker.value = ""
    url.value = ""

}
function del (i){
    markList.splice (i,1)
    localStorage.mark = JSON.stringify(markList)
    display()
}
function validation(){

    if( (url.value != "" || null) && (bookMarker.value != "" || null )){
        document.getElementById("namefield").classList.add("d-none")
        document.getElementById("urlfield").classList.add("d-none")
        return true;
    } 
    else {

    if ( bookMarker.value == "" && url.value == "" ){
            document.getElementById("namefield").classList.remove("d-none")
            document.getElementById("urlfield").classList.remove("d-none")
    }
    if (url.value == "" ){
        document.getElementById("urlfield").classList.remove("d-none")
    }
    if(bookMarker.value == ""){
        document.getElementById("namefield").classList.remove("d-none")
    }
    return false
} 
}
function rename(){
    for(var i = 0 ; i < markList.length ; i++){
        if (  localStorage.getItem("mark").includes(bookMarker.value) ){
            return true
        }else{
            document.getElementById("correct").classList.add("d-none")

    return false
        }
        
    }
}
function urlvalid(){
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    if (regex.test(url.value) == true){
    document.getElementById("urlvalid").classList.add("d-none")
    return true
    }else{
        document.getElementById("urlvalid").classList.remove("d-none")
    return false
    }
}