$(document).ready(function() {
  let songs = [];
  let genres = [];

  const fetchSongs = async () => {
    try {
      const response = await fetch('./songs.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      songs = data;
      genres = [...new Set(songs.map(song => song.genre))];

      renderGenres(genres);
      
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }

  
  const renderGenres = (genres) => {
    const genreList = $('.genre-list');
    genreList.empty();
    genres.forEach(genre => {
      let songsFiltered = songs.filter(song => song.genre === genre);

      const listItem = $('<div></div>');
      listItem.addClass('genre-collection');
      listItem.html(`
          <h1>${genre}</h1>
          <section class="song-collection"></section>
      `);
      genreList.append(listItem);

      const songList = listItem.find('.song-collection');
      renderSongs(songsFiltered, songList);
    });
  }

  const renderSongs = (songs, songList) => {
    songList.empty();
    songs.forEach(song => {
      const listItem = $('<div></div>');
      listItem.addClass('song-card');
      listItem.html(`
          <img src="${song.image}" alt="${song.title}" />
          <h2>${song.title}</h2>
          <p>${song.singer}</p>
          <p>
            <strong>Genre:</strong> ${song.genre} <br>
            <strong>Release Date:</strong> ${song.creation_date} <br>
            ${song.description}
            </p>
            <a href="./song-detail.html?id=${song.id}" class="btn">View Details</a>
      `);
      songList.append(listItem);
    });
  }

  fetchSongs();

})
