const UrlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const topSongs = "/top?limit=50"

const coverImgRef = document.getElementById("coverImageArtist");
const artistNameRef = document.getElementById("artistName");
const monthlyListenersRef = document.getElementById("monthlyListeners");
const centerDiv = document.getElementById("center");


const addressBarContent = new URLSearchParams(location.search);
const artistId = addressBarContent.get("id");

// Fare un contenitore track e pushare dentro le api delle tracklist stringifizzate

fetch(UrlArtist + artistId)
  .then((artist) => {
    if (artist.ok) {
      return artist.json();
    } else {
      throw new Error("Errore nella chiamata API");
    }
  })
  .then((artists) => {
    console.log("artists", artists);
    coverImgRef.style.backgroundImage = `url(${artists.picture_xl})`;
    coverImgRef.style.backgroundSize = "cover";
    coverImgRef.style.height = "350px";
    coverImgRef.style.backgroundPositionY = "25%";
    artistNameRef.innerHTML = `
        <h2 class="artistTitle text-light">${artists.name}</h2>
        `;
    monthlyListenersRef.innerHTML = `
        <p class="fs-6 text-light">${artists.nb_fan} ascoltatori mensili</p>
        `;
    })
  .catch((err) => {
    console.log(err);
  });

fetch(UrlArtist + artistId + topSongs)
.then((songs) =>{
    if (songs.ok) {
        return songs.json();
    } else {
        throw new Error ("Errore nel caricamento delle canzoni")
    }
})
.then((songs) => {
    console.log(songs)
    songs.data.forEach((song) =>{
        console.log("song", song)
        let singleSong = document.createElement("div")
        singleSong.classList.add("d-flex", "align-items-center")
        singleSong.innerHTML = `
        <div style="width:56px; height:56px; background-image:url('${song.album.cover_small}')"></div>
        <p class="text-light mb-0">${song.title}</p>
        `
        
        // albumCover.style.height = "56px"
        // albumCover.style.width = "56px"
        // albumCover.style.backgroundImage = `url(${album.album.cover_small})`
        songColumn = document.getElementById("songs-column")
        songColumn.appendChild(singleSong)
    })
}) .catch((err) => {
    console.log(err);
})

const playlist = [
  "culetto 2021",
  "Frah Quintale",
  "Be the young",
  "minecraft&nintendo switch",
  "Trallallero",
  "saggio vibes",
  "2021 lol",
  "Come trovare gli album",
  "Appendi sto child",
  "Che schifo Bootstrap",
  "Le bestemmine degli Epicoders",
  "Fetchati questo",
  "Francesco Guccini Mix",
  "Lucio Dalla e non fare la preziosa",
  "Bombe a confindustria",
  "Cercasi decimo per il calcetto",
  "Siamo tutti antifascisti",
  "Le magliette belle di Paolo",
  "La partita IVA di Paolo",
  "Sole a mezzanotte di Nino",
  "Torneo di calcetto di Antonio",
  "Pullman di Berlusconi",
  "Vacanza a Gubbio",
  "Saga completa Silent Hill",
  "Budokai Tenkaichi 2",
  "Radio Los Santos",
];

const showPlaylist = function () {
  let ulPlaylist = document.getElementById("lista-playlist");
  playlist.forEach((playlist) => {
    let newPlaylist = document.createElement("li");
    newPlaylist.classList.add("text-secondary");
    newPlaylist.innerHTML = `
        <a href="#" class="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover ms-2">${playlist}</a>
        `;
    ulPlaylist.appendChild(newPlaylist);
  });
};

showPlaylist();

// ANIMAZIONE COVER
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  document.getElementById("coverImageArtist").style.opacity =
    1 - scrollTop / 250;
});
