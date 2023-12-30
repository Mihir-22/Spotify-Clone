// Here we will write simple JavScript code inorder to add functionalities like play the song,etc.
console.log("Welcome to Spotify!");

//Initialize the variables
let songIndex = 0;//initially 0th song will be playing.
let audioElement = new Audio('audio/1.mp3');//Here we are creating a new audio/audio element and 1.mp3 is the name of our audio file.Here we have basically loaded our audio file.
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));//here a HTML Collection would be returned in the songItem.
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let oldSongIndex = -1;
let oldTime = 0;
//Here we will create an array of objects to store details of the songs in which each object have keys such as song name,file path and cover path.Also we will have values for all these keys.
// Here we will be populating all these songs on the web page i.e:In the context of web development, "populating songs" typically refers to the process of displaying or listing a collection of songs on a web page. .
let songs = [
    { songName: "Attention - Charlie Puth", filePath: "audio/1.mp3", coverPath: "images/cover1.jpg", duration: "3:28" },
    { songName: "Señorita", filePath: "audio/2.mp3", coverPath: "images/cover2.jpg", duration: "3:10" },
    { songName: "Perfect", filePath: "audio/3.mp3", coverPath: "images/cover3.jpg", duration: "4:23" },
    { songName: "rockstar (feat. 21Savage)", filePath: "audio/4.mp3", coverPath: "images/cover4.jpg", duration: "3:38" },
    { songName: "Thunder", filePath: "audio/5.mp3", coverPath: "images/cover5.jpg", duration: "3:07" },
    { songName: "Beggin'", filePath: "audio/6.mp3", coverPath: "images/cover6.jpg", duration: "3.31" },
    { songName: "Stereo Hearts (feat. Adam Levine)", filePath: "audio/7.mp3", coverPath: "images/cover7.jpg", duration: "3.30" }
]
//We want to display the song titles,song covers and song duration on our webpage then we can do the following.Here we can iterate the songs array with JavaScript and then we will fit the song name in the index.html i.e:we will do this thing programmatically.
//We will change the src of the img inside the songItem class.
//programmatical approach
songItem.forEach((element, i) => {//here element represents each object inside the object array.here we cant use forEach() directly for a HTML Collection
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;//here we could have use query selector instead using getElementsByTagName.Here we get all the elements having tag name "img".
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songListPlay")[0].getElementsByClassName("timeStamp")[0].getElementsByClassName("d")[0].innerText = songs[i].duration;
})

// audioElement.play();
//listening to events

//Handle Play/Pause click
masterPlay.addEventListener('click', () => {//here we have applied an eventListene on masterPlay to listen the clcik event on the masterPlay.
    //here there will be basically two cases,whether the audio would be palying or not playing.
    if (audioElement.paused || audioElement.currentTime <= 0)//that is when the audio is not yet played or else it is paused.
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        console.log(songIndex);
        songItemPlay[songIndex].classList.remove('fa-play-circle');
        songItemPlay[songIndex].classList.add('fa-pause-circle');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songItemPlay[songIndex].classList.remove('fa-pause-circle');
        songItemPlay[songIndex].classList.add('fa-play-circle');
    }
})

audioElement.addEventListener('timeupdate', () => {//so this event would be listened on audioElement.timeupdate is basically an audioElement event.
    // console.log("timeupadte");
    //update seek bar.Here we will apply some mathematics.
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);//here we have created a variable to calculate the progress in percentage i.e:how much the audio has been progressed.here we are using parseInt() as we want anser in integer.
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {//whenever our progress bar will change then we will also seek our song.
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;//here basically myProgressBar.value is a percentage value so we have to convert it into duration.
})


const makeAllPlays = () => {//When you use const to declare a function, you are creating a constant that holds a reference to a function. This means that you cannot reassign a different function to the same variable name declared with const.
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}
//now we have to add a feature so as to play a song/change the song when the play buttton inside the song item is clicked.So for this we have to apply a click eventListener on fa-circle-play in the song item.
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {//e is a parameter representing the event object. When an event listener is triggered by an event (in this case, a "click" event), the event object is automatically passed to the event listener function as its first argument.
        console.log(e.target);//target: A reference to the DOM element that triggered the event. This property points to the element on which the event occurred.
        makeAllPlays();//to make all the other elements accept the clicked element would be made a play button as at a time only one song will be playing.
        oldSongIndex = songIndex;
        songIndex = parseInt(e.target.id);
        if (oldSongIndex === songIndex) {
            if (audioElement.currentTime <= 0 || audioElement.paused) {
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                // audioElement.currentTime=0;
                audioElement.src = `audio/${songIndex + 1}.mp3`;
                audioElement.currentTime = oldTime;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
            }
            else {
                audioElement.pause();
                oldTime = audioElement.currentTime;
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                gif.style.opacity = 0;
            }
        }
        else {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            // audioElement.currentTime=0;
            audioElement.src = `audio/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
        }
    })
})
//to play next song.
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    console.log(songItemPlay[songIndex]);
    makeAllPlays();
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.src = `audio/${songIndex + 1}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    console.log(songIndex);
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})
//to play previous song.
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    makeAllPlays();
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.src = `audio/${songIndex + 1}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    console.log(songIndex);
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})
// Step 1:Our focus is on to write JavaScript code inorder to play songs.

//Autoplay
audioElement.addEventListener('ended', () => {
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    console.log(songItemPlay[songIndex]);
    makeAllPlays();
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.src = `audio/${songIndex + 1}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    console.log(songIndex);
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})

