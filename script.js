import { curr_time, curr_track, details_container, mute, next_btn, playpause_btn, prev_btn, random_track, repeat_btn, seek_slider, total_duration, volume_slider } from './event_listeners.js';
import { createElement, music_list } from './helper.js';

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isMute = false;
let updateTimer;

let rotate = loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();
    setVolume();

    const rotate = details(track_index);
    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
    return rotate;
}

// background change
function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = `linear-gradient(${angle}, ${Color1}, ${Color2})`;
    document.body.style.background = gradient;
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack(){
    random_track.classList.toggle('randomActive');
    isRandom = !isRandom;
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    rotate();
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    rotate();
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function repeatTrack(){
    let current_index = track_index;
    rotate = loadTrack(current_index);
    playTrack();
}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    rotate = loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    track_index > 0 ? track_index -= 1 : track_index = music_list.length -1;
    rotate = loadTrack(track_index);
    playTrack();
}

function seekTo(){
    curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function muteVolume() {
    mute.classList.toggle('mute');
    isMute ? setVolume() : curr_track.volume = 0;
    isMute = !isMute;
}
function setUpdate(){
    if(!isNaN(curr_track.duration)){
        seek_slider.value = curr_track.currentTime * (100 / curr_track.duration) || 0;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
        total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

function details(track_index) {
    const data = createElement('div', {
        className: 'details'
    });
    const playlist = createElement('div', {
        className: 'playingNow',
        textContent: `Playing music ${track_index + 1} of ${music_list.length}`
    });
    const trackImg = createElement('div', {
        className: 'trackArt'
    });
    trackImg.style.backgroundImage = `url(${music_list[track_index].img})`;
    
    const trackName = createElement('div', {
        className: 'trackName',
        textContent: music_list[track_index].name
    });
    const trackAuthor = createElement('div', {
        className: 'trackArtist',
        textContent: music_list[track_index].artist
    });
    data.append(playlist, trackImg, trackName, trackAuthor);
    details_container.replaceChildren(data);

    const rotate = () => {
        trackImg.classList.toggle('rotate');
    }
    return rotate;
}

/* event listeners */
random_track.addEventListener('click', randomTrack);
playpause_btn.addEventListener('click', playpauseTrack);
prev_btn.addEventListener('click', prevTrack);
next_btn.addEventListener('click', nextTrack);
repeat_btn.addEventListener('click', repeatTrack);
volume_slider.addEventListener('click', setVolume);
seek_slider.addEventListener('click', seekTo);
mute.addEventListener('click', muteVolume);
