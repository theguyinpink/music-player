const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');
    const searchBar = document.getElementById('search-bar');
    const queue = [];
    const queueBtn = document.getElementById('queue-btn');
    

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'As it Was',
        cover: 'assets/1.jpg',
        artist: 'Harry Styles',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Late Night Talking',
        cover: 'assets/2.jpg',
        artist: 'Harry Styles',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Mathilda',
        cover: 'assets/3.jpg',
        artist: 'Harry Styles',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Watermelon Sugar',
        cover: 'assets/4.jpg',
        artist: 'Harry Styles',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Satelite',
        cover: 'assets/5.jpg',
        artist: 'Harry Styles',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Trance',
        cover: 'assets/6.jpg',
        artist: 'Metro Boomin, Travis Scott, Young Thug',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Music For A Sushy Restaurant',
        cover: 'assets/7.jpg',
        artist: 'Harry Styles',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Golden',
        cover: 'assets/8.png',
        artist: 'Harry Styles',
    }


    
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
    music.volume = 0.1; // 10% volume
    adjustVolume.value = 0.1;
}

function changeMusic(direction) {
    if (queue.length > 0) {
        musicIndex = songs.indexOf(queue.shift()); // Retirer et récupérer la prochaine chanson dans la file d'attente
    } else {
        musicIndex = (musicIndex + direction + songs.length) % songs.length;
    }
    
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function handleSearch() {
    const searchTerm = searchBar.value.toLowerCase();

    if (searchTerm !== '') {
        const matchedSongs = songs.filter(song => song.displayName.toLowerCase().startsWith(searchTerm));
        displaySongs(matchedSongs);


        if (matchedSongs.length > 0) {
            const matchedSongIndex = songs.findIndex(song => song.displayName.toLowerCase() === matchedSongs[0].displayName.toLowerCase());

            if (matchedSongIndex !== musicIndex) {
                musicIndex = matchedSongIndex;

            }
        }
    } else {
        displaySongs(songs); // Afficher tous les titres
        return; // Sortir de la fonction
        
    }
}
function displaySongs(songs) {
    const songList = document.getElementById('song-list');
    // Effacer le contenu précédent de la liste des chansons
    songList.innerHTML = '';

    // Générer dynamiquement le contenu HTML pour les chansons correspondantes
    songs.forEach(song => {
        const songItem = document.createElement('li');
        const songTitle = document.createElement('span');
        const addToQueueImg = document.createElement('img');
        

        songTitle.textContent = song.displayName;
        addToQueueImg.src = 'wait.png';
        addToQueueImg.classList.add('queue-button');
     

        songItem.appendChild(songTitle);
        songItem.appendChild(addToQueueImg);
        songList.appendChild(songItem);

        // Ajouter un gestionnaire d'événements de clic à l'image "Ajouter à la file d'attente"
        addToQueueImg.addEventListener('click', () => {
            addToQueue(song);
        });

        // Ajouter un gestionnaire d'événements de clic à chaque élément de la liste des chansons
        songTitle.addEventListener('click', () => {
            const clickedSongIndex = songs.indexOf(song);
            musicIndex = clickedSongIndex;
            loadMusic(songs[musicIndex]);
            playMusic();
        });
        const queueBtn = document.getElementById('queue-btn');
        queueBtn.addEventListener('click', () => {
        displaySongs(queue); // Afficher les chansons de la file d'attente
});
    });
}


const volumeSlider = document.getElementById('volume-slider');


// Fonction pour ajuster le volume
function adjustVolume(volume) {
  music.volume = volume;
}

// Écouteur d'événement pour le changement de valeur du slider de volume
volumeSlider.addEventListener('input', () => {
  const volume = volumeSlider.value;
  adjustVolume(volume);

});

function addToQueue(song) {
    queue.push(song);
    showAddToQueueMessage(song.displayName);
  }

  function showAddToQueueMessage(songName) {
    const messagePopup = document.getElementById('message-popup');
    messagePopup.textContent = `${songName} a été ajouté à la file d'attente`;
    messagePopup.style.display = 'block';
  
    setTimeout(() => {
      messagePopup.style.display = 'none';
    }, 2000);
  }



playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
searchBar.addEventListener('input', handleSearch);
queueBtn.addEventListener('click', () => {
    displaySongs(queue);
  });


loadMusic(songs[musicIndex]);