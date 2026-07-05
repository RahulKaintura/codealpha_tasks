// ===============================
// Song List
// ===============================

const songs = [
    {
        title: "Dreams",
        artist: "CodeAlpha",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Night Drive",
        artist: "CodeAlpha",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Sunset",
        artist: "CodeAlpha",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    }
];

// ===============================
// Selecting Elements
// ===============================

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

// ===============================

let currentSong = 0;
let isPlaying = false;

// ===============================
// Load Song
// ===============================

function loadSong(index){

    const song = songs[index];

    audio.src = song.src;

    cover.src = song.cover;

    title.textContent = song.title;

    artist.textContent = song.artist;

    updatePlaylist();

}

loadSong(currentSong);

// ===============================
// Play Song
// ===============================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

}

// ===============================
// Pause Song
// ===============================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

}

// ===============================
// Play / Pause Button
// ===============================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }else{

        playSong();

    }

});

// ===============================
// Next Song
// ===============================

function nextSong(){

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    playSong();

}

nextBtn.addEventListener("click",nextSong);

// ===============================
// Previous Song
// ===============================

function prevSong(){

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

}

prevBtn.addEventListener("click",prevSong);

// ===============================
// Progress Bar
// ===============================

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value=
        (audio.currentTime/audio.duration)*100;

        currentTime.textContent=
        formatTime(audio.currentTime);

        duration.textContent=
        formatTime(audio.duration);

    }

});

// ===============================
// Seek
// ===============================

progress.addEventListener("input",()=>{

    audio.currentTime=
    (progress.value/100)*audio.duration;

});

// ===============================
// Volume
// ===============================

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});

// ===============================
// Auto Next
// ===============================

audio.addEventListener("ended",nextSong);

// ===============================
// Playlist
// ===============================

function updatePlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        const li=document.createElement("li");

        li.textContent=
        `${song.title} - ${song.artist}`;

        if(index===currentSong){

            li.classList.add("active");

        }

        li.addEventListener("click",()=>{

            currentSong=index;

            loadSong(currentSong);

            playSong();

        });

        playlist.appendChild(li);

    });

}

// ===============================
// Time Format
// ===============================

function formatTime(time){

    const min=Math.floor(time/60);

    const sec=Math.floor(time%60);

    return `${min}:${sec<10?"0"+sec:sec}`;

}

// ===============================
// Keyboard Shortcuts
// ===============================

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        playBtn.click();

    }

    if(e.key==="ArrowRight"){

        nextSong();

    }

    if(e.key==="ArrowLeft"){

        prevSong();

    }

});