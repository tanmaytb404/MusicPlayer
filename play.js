const navbar = document.getElementById("navbar");
const toggleSwitch = document.getElementById("switch");
const genre = document.getElementById("genre");
const ul = document.getElementById("songList");
const songCard = document.getElementById("song-card");
const player = document.getElementById("player");
let playlistCount = 0;

/* -----------------------------------toggleTheme-------------------------------------------------------- */
toggleSwitch.addEventListener("click", () => {
    if (toggleSwitch.children[0].checked == false) {
        toggleSwitch.children[0].checked = true;
        document.body.style.backgroundColor = "#222";
        navbar.style.backgroundColor = "#222";
    }
    else {
        toggleSwitch.children[0].checked = false;
        document.body.style.backgroundColor = "white";
        navbar.style.backgroundColor = "white";
    }
})
/* ---------------------------------------------------------------------------------------------------------------- */


let songArr = [{
    id: 1,
    name: "Talking to the moon",
    artist: "Bruno Mars",
    img: "https://i.makeagif.com/media/9-09-2015/RZHkHD.gif",
    genre: "Pop",
    source: "static/ttm.mp3"
}, {
    id: 2,
    name: "Set Fire To The Rain",
    artist: "Adele",
    img: "https://media1.tenor.com/m/8ZAIg2zOtzQAAAAC/pir%C3%B3mano-meme.gif",
    genre: "Rock",
    source: "static/adele.mp3"
}, {
    id: 3,
    name: "Thank You",
    artist: "Dido",
    img: "https://images.genius.com/8fe9e0e97c34c13b40a04916b152fb74.1000x1000x1.jpg",
    genre: "Downtempo",
    source: "static/dido.mp3"
}];


/* -----------To append genre in the dropdown------------ */
songArr.forEach(song => {
    const option = document.createElement("option");
    option.textContent = song.genre;
    option.value = song.genre;
    genre.appendChild(option)
})
/* -------------------------------------------------------------------------- */

/* ------To show the songs based on genre selected------- */
function showSongs(genreType) {
    const songGenre = document.getElementById("songGenre");
    songGenre.textContent = genreType;
    ul.innerHTML = ``;
    console.log(genreType)
    songArr.forEach(song => {
        if (genreType == "All songs" || genreType === song.genre) {
            const li = document.createElement("li");
            li.textContent = `${song.name} - ${song.artist}`;
            li.addEventListener("click", () => {
                playSongs(song)
            })
            ul.appendChild(li);
        }
    })
}

genre.addEventListener("change", () => {
    showSongs(genre.value);
})
genre.dispatchEvent(new Event('change'));
/* --------------------------------------------------------------------------------- */

/* --------------------playSong Card--------------------------------------- */
let currentSong = 0;
function playSongs(song) {
    console.log(song.name)
    player.innerHTML = ``;
    songCard.innerHTML = ``;
    const img = document.createElement("img");
    img.src = song.img;
    const h3 = document.createElement("h3");
    h3.textContent = song.name;
    const p = document.createElement("p");
    p.textContent = song.artist;
    const audio = document.createElement("audio");
    audio.src = song.source;
    audio.controls = true;
    audio.play();
    songCard.append(img, h3, p);
    currentSong = song.id - 1;
    player.appendChild(audio);

}
playSongs(songArr[0]);
/* -------------------------------------------------------------------------------------- */

/* ----------------------------NEXTBTN------------------------------------------- */
next.addEventListener("click", () => {
    if (currentSong == songArr.length - 1) {
        next.disable = true;
    }
    else {
        playSongs(songArr[currentSong + 1]);
    }
});
/* ----------------------------------------------------------------------------------- */

/* ----------------------------PREVBTN------------------------------------------- */
prev.addEventListener("click", () => {
    if (currentSong == 0) {
        prev.disable = true;
    }
    else {
        playSongs(songArr[currentSong - 1]);
    }
});
/* ----------------------------------------------------------------------------------- */

/* -------------------------CREATE NEW PLAYLIST----------------------- */
let collections = [{
    playlistName: []
}]
const newplaylist = document.getElementById("newplaylist");
const createPlaylist = document.getElementById("createPlaylist");
const playlist = document.getElementById("playlist");
playlist.addEventListener("change", () => {
    displayPlaylistSongs();
})
newplaylist.addEventListener("click", () => {
    const playlistName = createPlaylist.value;
    createPlaylist.value = ``;
    const option = document.createElement("option");
    option.textContent = playlistName;
    playlistCount++;
    option.value = playlistCount;
    playlist.appendChild(option);
    let newCollection = {
        playlistName: []
    }
    collections.push(newCollection)
    console.log(collections)
});
/* ---------------------------------------------------------------------------------------- */

/* -----------------------ADD TO PLAYLIST------------------------------------- */
const addtolist = document.getElementById("addtolist");
const songListRight = document.getElementById("songListRight");
addtolist.addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = `${songArr[currentSong].name} - ${songArr[currentSong].artist}`;
    li.id = songArr[currentSong].id;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");
    removeBtn.addEventListener("click", () => {
        const indexToRemove = collections[playlist.value].playlistName.indexOf(li);
        if (indexToRemove !== -1) {
            collections[playlist.value].playlistName.splice(indexToRemove, 1);
            li.remove();
        }
    });
    li.appendChild(removeBtn);
    let duplicate = false;
    collections[playlist.value].playlistName.forEach(existingLi => {
        if (existingLi.textContent === li.textContent) {
            duplicate = true;
            return;
        }
    });
    if (!duplicate) {
        collections[playlist.value].playlistName.push(li);
    }
    displayPlaylistSongs();
});
/* -------------------------------------------------------------------------------------------- */

/* ---------------PLAYLIST SONGS based on current playlist------------- */
function displayPlaylistSongs() {
    const playlistType = document.getElementById("playlistType");
    console.log(playlist.value);
    playlistType.textContent = playlist[playlist.value].textContent;
    songListRight.innerHTML = ``;
    collections[playlist.value].playlistName.forEach(li => {
        li.addEventListener("click", () => {
            playSongs(songArr[li.id - 1])
        })
        songListRight.append(li);
    });
    console.log(playlistType.innerHTML)
}
/* ---------------------------------------------------------------------------------------------- */

/* ----------------------SEARCHBAR SONG//PLAYLIST -------------------------*/
const searchInput = document.querySelector("[data-search]");
const searchResult = document.getElementById("searchResults");
searchInput.addEventListener("input", (e) => {
    searchResult.innerHTML = ``;
    songArr.forEach(song => {
        let songName = song.name.toLowerCase();
        let keyPressed = e.target.value.toLowerCase();
        if (songName.includes(keyPressed)) {
            console.log(songName)
            const li = document.createElement("li");
            li.textContent = `Song / ${song.name} - ${song.artist}`;
            li.addEventListener("click", () => {
                playSongs(song);
                searchResult.innerHTML = ``;
            })
            searchResult.appendChild(li)
        }
    })
    for (let i = 1; i < playlist.length; i++) {
        let playlistName = playlist[i].textContent.toLowerCase();
        let keyPressed = e.target.value.toLowerCase();
        if (playlistName.includes(keyPressed)) {
            const li = document.createElement("li");
            li.textContent = `Playlist / ${playlist[i].textContent}`;
            // li.id = i;
            li.addEventListener("click", () => {
                playlist.value = i;
                displayPlaylistSongs();
            })
            searchResult.appendChild(li);
        }
    }
    if (e.target.value == ``) {
        searchResult.innerHTML = ``;
    }
})
/* ----------------------------------------------------------------------------------------------------- */

/* -----------------TO HIDE SEARCH LIST ON OUTSIDE CLICK-------------------- */
document.body.addEventListener("click", () => {
    searchResult.innerHTML = ``;
})
/* --------------------------------------------------------------------------------------------------- */


