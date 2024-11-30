//function add     ==>
//function reset   ==>
//function display ==>
//function validation  ==>            
//function visit   ==>
//function delete  ==>
//function update  -_-    1-// get data into inputs       2-// update button
//LocalStorage     ==>

var allWebsites=[]

if(localStorage.getItem('allWebsites') != null ){
    allWebsites = JSON.parse(localStorage.getItem('allWebsites'))
}

DisplayBookmark();

var WebsiteNameInput = document.getElementById('Sname')
var WebsiteUrlInput = document.getElementById('Surl')

function AddBookmark (){
    
    if( validateBookmark() === true ){

        var Bookmark = {
            webName :  WebsiteNameInput.value ,
            webUrl : WebsiteUrlInput.value ,
        };
        
        allWebsites.push(Bookmark)
        console.log(allWebsites);
    
        //calling functions
        saveBookmark()
        DisplayBookmark ();
        reset();
    }
    else{
        alert( validateBookmark() )
    }
    
}

// Save
function saveBookmark(){
    localStorage.setItem('allWebsites', JSON.stringify(allWebsites))

}

// display
function DisplayBookmark (){
    
    var container = '';

    for(  i=0  ;     i<allWebsites.length      ;  i++     ){
        container = container +`<tr scope="row"></tr>
            <td>${i+1}</td>
            <td>${allWebsites[i].webName}</td>
            <td><button class="btn btn-success">
            <a href="${allWebsites[i].webUrl}">
            <i class="fa-solid fa-eye"></i>Visit
            </a>
            </button ></td>
            <td><button onclick="DeleteBookmark(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
            Delete
            </button></td>
            <td><button onclick="updateBookmark(${i})"  class="btn btn-warning">
            <i class="fa-solid fa-pen"></i>
            Update
            </button></td>
            `
    }

    document.getElementById('body').innerHTML = container

}

//Delete
function DeleteBookmark(index) {
    allWebsites.splice(index,1)
    DisplayBookmark();
}

//reset
function reset(){
    WebsiteNameInput.value=''
    WebsiteUrlInput.value=''
}

//update
// get data into inputs
// update button
var updateBut = document.getElementById('update') 
var submitBut = document.getElementById('submit')
var newValues = 0 

function updateBookmark (idx) {

    WebsiteNameInput.value= allWebsites[idx].webName   
    WebsiteUrlInput.value= allWebsites[idx].webUrl

    newValues = idx
    // lma adoos update ==> ysheel zorar submit w y7ot mkano update
    updateBut.classList.remove('d-none')
    submitBut.classList.add('d-none')

}

function displayUpdate (){
    updateBut.classList.add('d-none')
    submitBut.classList.remove('d-none')

    allWebsites[newValues].webName = WebsiteNameInput.value   
    allWebsites[newValues].webUrl = WebsiteUrlInput.value

    saveBookmark();
    DisplayBookmark();
    reset ();
}

//Validation
function validateBookmark () {

    var bookmarkNameRegex = /^[A-Z][a-z]{2,15}$/        // 2 to 15 letters
    var bookmarkUrlRegex =/^(https:\/\/)([\w-]+\.)+[\w-]+(\/[\w-]*)*$/    

    if (bookmarkNameRegex.test(WebsiteNameInput.value) == false){
        return 'Website name must start with capital letter , 2-15 letters' ;
    }
    if (bookmarkUrlRegex.test(WebsiteUrlInput.value) == false ){
        return 'Website Url must be in the form of https://www.example.com' ;
    }

    return true ;

}