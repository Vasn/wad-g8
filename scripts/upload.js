import {initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"; //initialize firebase app
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-storage.js" //for firebase storage
import {getDatabase, ref,set,child,update,remove,get, onValue} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"


//get user ID from session storage
const id = sessionStorage.getItem('userID');

// Initiate Firebase Instance
const firebaseConfig = {
    apiKey: "AIzaSyDRVQ7r6TGsQhZGvVIXws7y5PTPqlvC2yo",
    authDomain: "audiophile-eff2c.firebaseapp.com",
    databaseURL: "https://audiophile-eff2c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "audiophile-eff2c",
    storageBucket: "audiophile-eff2c.appspot.com",
    messagingSenderId: "141435951049",
    appId: "1:141435951049:web:6308bd4b9fe95fb49bba18",
    measurementId: "G-LKVP0JH4YH"
};
const app = initializeApp(firebaseConfig);
const realdb = getDatabase();

let files,
    songTitle = document.getElementById('songTitle'),
    artist = document.getElementById('artist'),
    ext= document.getElementById('extension'),
    pbar = document.getElementById('pbar'),
    pbarContainer = document.getElementById('pbarContainer'),
    upload = document.getElementById('upload'),
    player = document.getElementById('music'),
    retrieve = document.getElementById('retrieve'),
    filename =document.getElementById('filename'),
    musicSelection = document.getElementById("musicList"),
    reader = new FileReader()


//////////////////////
// Drag and Drop JS //
//////////////////////
document.querySelectorAll(".drop-input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });
  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
    }
  });
  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });
  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault(); // Prevent Event's Auto
    const data = e.dataTransfer; //Save event's file
    files = data.files; // Assign data's files to file

    var extension = GetFileExt(files[0]) // Get File extension
    var name = GetFileName(files[0])
    filename.innerHTML=name // This functions actaully no need le is just to get extension
    ext.innerHTML =extension;
    reader.readAsDataURL(files[0])//Read the current file as a URL
  });
});
reader.onload = function(){
    music.src = reader.result;
}

///////////////////////
/// GET FILE NAMES ////
///////////////////////
function GetFileExt(file){
    var temp = file.name.split('.');
    var ext = temp.slice(temp.length-1,temp.length);
    return '.'+ext[0]
}
function GetFileName(file){
    var temp = file.name.split('.');
    var fname = temp.slice(0,-1).join('.');
    return fname
}

///////////////////////
///// UPLOAD FILE /////
///////////////////////

function validateName(){
        var regex=/[\.#$\[]]/
        return !(regex.test(songTitle.value+ ' - ' +artist.value ));
    }

async function UploadProcess(){
    if(!files){
        alert("Please Upload A File")
        return
    }  
    var fileToUpload = files[0]
    var fileToUploadName = songTitle.value + ' - ' +artist.value;
     if(!validateName()){
        alert('Name cannot contain "[.#$[]]" ')
        return;
    }
    else if(songTitle.value == '' || artist.value =='' ){
        alert('Please Enter Song Title and Artist" ')
        return;
    }
    const metaData = {
        contentType: fileToUpload.type
    }
    const storage = getStorage();
    const storageRef =sRef(storage, "users/" + id +"/"+ fileToUploadName);
    const UploadTask = uploadBytesResumable(storageRef,fileToUpload,metaData);
    UploadTask.on('state-changed',(snapshot)=>{
        var progress= (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        pbarContainer.style.visibility="visible"
        pbar.innerHTML ='Upload ' + progress.toFixed(2) +  "%"
        pbar.style.width= progress+"%"
    },
    (error)=>{
        alert("Upload Failed Please Try Again"); // Failed to upload Errror
    },
    ()=>{
        getDownloadURL(UploadTask.snapshot.ref)
        .then((downloadURL)=>{
            SaveURLtoRealTimeDB(downloadURL);
            })
        .catch(err=>{
                alert("Upload Failed Please Try Again")
            })
            });
    }

/////////////////////////////////
///// SAVE FILE TO REALTIME /////
/////////////////////////////////
    // Function REALTIME DATABASE
    function SaveURLtoRealTimeDB(URL){
        var name = songTitle.value + " - "+ artist.value;
        var ext =extlab.innerHTML
        
        set(ref(realdb,"users/" + id  +"/"+ name),{
            musicName:(name + ext),
            musicURL:URL
        })
        .then(res=>{
            alert('Upload Complete')
            getAllData()
        })
        .catch(err=>{
            alert('Upload Failed')
        })
    }
///////////////////////////////////////
///// RETRIEVE ALL FROM REALTIME //////
///////////////////////////////////////


var userSongs = [];
function getAllData(){
    var dbRef =ref(realdb); // Refer to realtime DB
    get(child(dbRef,"users/" + id ))
    .then((snapshot)=>{
        var musicURL =[],musicData =[]
        snapshot.forEach(childSnapshot=>{
            musicURL.push(childSnapshot.val().musicName+'|'+childSnapshot.val().musicURL)
            musicData.push(childSnapshot.val())
        });
        // addToMusicList(musicData)
        sessionStorage.setItem('musicURL', musicURL)
        })
    .catch(err=>{
        alert('Failed to retrieve information please try again')
    })
    
}

const musicDataArr = sessionStorage.getItem('musicData');
const musicURLArr= sessionStorage.getItem('musicURL');

export let musicObjArr = []
if(sessionStorage.getItem('musicURL')){
    const musicURLArr = sessionStorage.getItem('musicURL');
    let musicArr = musicURLArr.split(",")
    for(let m of musicArr){
        let info = m.split("|")
        musicObjArr.push({name:info[0],url:info[1]})
    }
}

var client_secret =[]

function getClientSecret(){
        var dbRef =ref(realdb); // Refer to realtime DB
        get(child(dbRef,"users/client_secret"))
        .then((snapshot)=>{
            client_secret.push(snapshot._node.value_)
            })
        .catch(err=>{
            alert('Failed to retrieve information please try again')
        })
}

///////////////////////////////////////////
/////////// Create A DROPDOWN /////////////
///////////////////////////////////////////

// function addToMusicList(musicData){
//     musicSelection.innerHTML =""
//     for(let info of musicData){
//         musicSelection.innerHTML += "<option value='" + info.musicURL+ "' > "+ info.musicName+ "</option>"
//         userSongs.push(info)
//     }
// }

upload.addEventListener('click',UploadProcess)
window.onload=getAllData
