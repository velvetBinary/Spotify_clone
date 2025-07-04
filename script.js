// Playlist data
const songs = [
  { title: "Havana", file: "1.mp3" },
  { title: "Party 4U", file: "2.mp3" },
  { title: "Shape of You", file: "3.mp3" },
  { title: "Despacito", file: "4.mp3" },
  ];

// DOM Elements
const playlistGrid = document.getElementById("playlist");
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const nowPlaying = document.getElementById("nowPlaying");
const searchInput = document.getElementById("searchInput");

// Render songs
function renderSongs(filter = "") {
  playlistGrid.innerHTML = "";
  songs
    .filter(song => song.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((song, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = song.title;
      card.addEventListener("click", () => playSong(index));
      playlistGrid.appendChild(card);
    });
}

let currentSongIndex = 0;
let isPlaying = false;

function playSong(index) {
  const song = songs[index];
  currentSongIndex = index;
  audioPlayer.src = song.file;
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸ Pause";
  nowPlaying.textContent = `Now Playing: ${song.title}`;
}

playPauseBtn.addEventListener("click", () => {
  if (!audioPlayer.src) return;
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️ Play";
  } else {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸ Pause";
  }
  isPlaying = !isPlaying;
});

searchInput.addEventListener("input", (e) => {
  renderSongs(e.target.value);
});

// Theme toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Initial load
renderSongs();
