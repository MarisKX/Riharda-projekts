document.addEventListener('DOMContentLoaded', function() {
  const confirmButton = document.getElementById('confirm');
  const playerNameInput = document.getElementById('player');

  confirmButton.addEventListener('click', function() {
    let players = JSON.parse(localStorage.getItem('players')) || [];

    if (players.length < 8) {
      players.push(playerNameInput.value); // Add new player name to the array
      localStorage.setItem('players', JSON.stringify(players)); // Store updated array in localStorage
      playerNameInput.value = ''; // Clear the input field

      alert('Player added. Total players: ' + players.length);
    } else {
      alert('Maximum of 8 players reached.');
    }
  });
});