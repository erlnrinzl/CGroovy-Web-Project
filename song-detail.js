$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get('id') ?? "SO001";
  
  $.ajax({
    url: './songs.json',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      const songData = data.find(function(song) {
        return song.id === targetId;
      });

      if (!songData) {
        console.error("Song not found!");
        return;
      }

      $('#song-title').text(songData.title);
      $('#song-artist').text(songData.singer);
      $('#song-description').text(songData.description);
      $('#song-cover-img').attr('src', "./" + songData.image);
      $('#lyrics-content').text(songData.lyrics);

      const audioElement = $('#song-audio')[0];
      audioElement.src = songData.audioUrl;

      $('#play-btn').click(function() {
        audioElement.play();
        $(this).prop('disabled', true);
        $('#pause-btn').prop('disabled', false);
      });

      $('#pause-btn').click(function() {
        audioElement.pause();
        $(this).prop('disabled', true);
        $('#play-btn').prop('disabled', false);
      });

      $('#pause-btn').prop('disabled', true);

      $('#like-btn').click(function() {
        $(this).find('i').toggleClass('far fas');
        if ($(this).find('i').hasClass('fas')) {
          $(this).html('<i class="fas fa-heart"></i> Liked');
        } else {
          $(this).html('<i class="far fa-heart"></i> Like');
        }
      });

      $('#share-btn').click(function() {
        alert(`Sharing "${songData.title}" by ${songData.singer}`);
      });

      audioElement.addEventListener('play', function() {
        $('#play-btn').prop('disabled', true);
        $('#pause-btn').prop('disabled', false);
      });

      audioElement.addEventListener('pause', function() {
        $('#play-btn').prop('disabled', false);
        $('#pause-btn').prop('disabled', true);
      });
    },
    error: function(err) {
      console.error("Failed to fetch song data:", err);
    }
  });
  
});
