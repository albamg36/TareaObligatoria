document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("music-player");
    const playlist = document.getElementById("playlist").querySelectorAll("li");
    const playPause = document.getElementById("play-pause");
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");
    const loop = document.getElementById("loop");
    const random = document.getElementById("random");
    const volume = document.getElementById("volume");
    const artistPhoto = document.getElementById("artist-photo").querySelector("img");
  
    let currentSong = 0;
    let isPlaying = false;
    let isLooping = false;
    let isRandom = false;
  
    // Función para reproducir la canción actual
    function playCurrentSong() {
      audio.src = playlist[currentSong].getAttribute("data-src");
      audio.play();
    }
  
    // Evento para reproducir/pausar la canción
    playPause.addEventListener("click", function () {
      if (isPlaying) {
        audio.pause();
        playPause.textContent = "Play";
      } else {
        audio.play();
        playPause.textContent = "Pause";
      }
      isPlaying = !isPlaying;
    });
  
    // Evento para reproducir la canción anterior
    previous.addEventListener("click", function () {
      currentSong = (currentSong - 1 + playlist.length) % playlist.length;
      playCurrentSong();
    });
  
    // Evento para reproducir la canción siguiente
    next.addEventListener("click", function () {
      if (isRandom) {
        currentSong = Math.floor(Math.random() * playlist.length);
      } else {
        currentSong = (currentSong + 1) % playlist.length;
      }
      playCurrentSong();
    });
  
    // Evento para habilitar/deshabilitar el bucle
    loop.addEventListener("click", function () {
      isLooping = !isLooping;
      audio.loop = isLooping;
    });
  
    // Evento para habilitar/deshabilitar la reproducción aleatoria
    random.addEventListener("click", function () {
      isRandom = !isRandom;
    });
  
    // Evento para ajustar el volumen
    volume.addEventListener("input", function () {
      audio.volume = volume.value;
    });
  
    // Evento que se dispara al final de la canción
    audio.addEventListener("ended", function () {
      if (isRandom) {
        currentSong = Math.floor(Math.random() * playlist.length);
      } else if (isLooping) {
        // No change in currentSong
      } else {
        currentSong = (currentSong + 1) % playlist.length;
      }
      playCurrentSong();
    });
  
    // Inicializar la primera canción
    playCurrentSong();
    
    // Evento para cambiar la canción actual y actualizar la imagen del artista
    playlist.forEach(function (song, index) {
      song.addEventListener("click", function () {
        currentSong = index;
        playCurrentSong();
        updateArtistPhoto(song.textContent);
      });
    });
  });
  