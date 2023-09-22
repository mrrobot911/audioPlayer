import { createElement, music_list } from './helper.js';

let isPlaying = false;
let isRandom = false;

export const player = (track_index, track) => {
    const body = document.querySelector('body');
    const wrapper = createElement('div', {
        className: 'wrapper'
    });
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

    const time = createElement('div', {
        className: 'sliderContainer'
    });
    const currentTime = createElement('div', {
        className: 'currentTime',
        textContent: '00:00'
    });
    const rangeTime = createElement('input', {
        className: 'seekSlider',
        type: 'range',
        value: 1,
        minLength: '1',
        maxLength: '100'
    });
    const totalTime = createElement('div', {
        className: 'totalTime',
        textContent: setInterval(setUpdate, 1000)
    });
    time.append(currentTime, rangeTime, totalTime);

    const volume = createElement('div', {
        className: 'sliderContainer'
    });
    const currentVolume = createElement('i', {
        className: 'fa fa-volume-down'
    });
    const rangeVolume = createElement('input', {
        className: 'volumeSlider',
        type: 'range',
        value: 50,
        minLength: '1',
        maxLength: '100'
    });
    const totalVolume = createElement('i', {
        className: 'fa fa-volume-up',
    });
    volume.append(currentVolume, rangeVolume, totalVolume);

    const buttons = createElement('div', {
        className: 'buttons'
    });

    const randomeTrack = createElement('div', {
        className: 'randomTrack',
    });
    const randomeImg = createElement('i', {
        className: 'fas fa-random fa-2x',
        title: 'random'
    });
    randomeTrack.append(randomeImg);

    const previosTrack = createElement('div', {
        className: 'prevTrack',
    });
    const previosImg = createElement('i', {
        className: 'fa fa-step-backward fa-2x',
    });
    previosTrack.append(previosImg);

    const play = createElement('div', {
        className: 'playpauseTrack',
    });
    const playImg = createElement('i', {
        className: 'fa fa-play-circle fa-5x',
    });
    play.append(playImg);
    play.addEventListener('click', () => playpauseTrack(track));

    const nextTrackBtn = createElement('div', {
        className: 'nextTrack',
    });
    const nextImg = createElement('i', {
        className: 'fa fa-step-forward fa-2x',
    });
    nextTrackBtn.append(nextImg);
    nextTrackBtn.addEventListener('click', nextTrack);

    const repeatTrack = createElement('div', {
        className: 'repeatTrack',
    });
    const repeatImg = createElement('i', {
        className: 'fa fa-repeat fa-2x',
        title: 'repeat'
    });
    repeatTrack.append(repeatImg);
    buttons.append(randomeTrack, previosTrack, play, nextTrackBtn, repeatTrack);
    wrapper.append(data, time, volume, buttons);
    body.append(wrapper);

    track.addEventListener('ended', nextTrack);

    function nextTrack(){
        if(track_index < music_list.length - 1 && isRandom === false){
            track_index += 1;
        }else if(track_index < music_list.length - 1 && isRandom === true){
            let random_index = Number.parseInt(Math.random() * music_list.length);
            track_index = random_index;
        }else{
            track_index = 0;
        }
        loadTrack(track_index);
        playTrack();
    }
    function playpauseTrack(curr_track){
        isPlaying ? pauseTrack(curr_track) : playTrack(curr_track);
    }
    function playTrack(curr_track){
        curr_track.play();
        isPlaying = true;
        trackImg.classList.add('rotate');
        play.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    function pauseTrack(curr_track){
        curr_track.pause();
        isPlaying = false;
        trackImg.classList.remove('rotate');
        play.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    // function repeatTrack(){
    //         let current_index = track_index;
    //         loadTrack(current_index);
    //         playTrack();
    //     }
    function setUpdate(){
            let seekPosition = 0;
            if(!isNaN(track.duration)){
                seekPosition = track.currentTime * (100 / track.duration);
                rangeTime.value = seekPosition;
        
                let currentMinutes = Math.floor(track.currentTime / 60);
                let currentSeconds = Math.floor(track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(track.duration / 60);
                let durationSeconds = Math.floor(track.duration - durationMinutes * 60);
        
                if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
                if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
                if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
                currentTime.textContent = currentMinutes + ":" + currentSeconds;
                totalTime.textContent = durationMinutes + ":" + durationSeconds;
            }
        }
        
    return body;
}