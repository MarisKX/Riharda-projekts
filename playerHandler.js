document.addEventListener('DOMContentLoaded', function() {
  const confirmButton = document.getElementById('confirm');
  const playerNameInput = document.getElementById('player');
  const playerListDiv = document.getElementById('playerList');
  const startButton = document.getElementById('startButton');
  const notification = document.getElementById('notification');

  const gameArea = document.getElementById('gameArea');

  // Use playerNameInput instead of input
  playerNameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      confirmButton.click();  // Simulate click on the confirm button
    }
  });

  confirmButton.addEventListener('click', function() {
    let players = JSON.parse(localStorage.getItem('players')) || [];

    if (players.length < 8) {
      if (playerNameInput.value.trim() === '') {
        showNotification('Please enter a name.', true);
        return; // Stop the function if no name is entered
      }

      players.push(playerNameInput.value);
      localStorage.setItem('players', JSON.stringify(players));

      const newPlayerEntry = document.createElement('h3');
      newPlayerEntry.className = 'card-text';
      newPlayerEntry.textContent = playerNameInput.value;
      playerListDiv.appendChild(newPlayerEntry);

      playerNameInput.value = ''; // Clear the input field
      showNotification('Player added. Total players: ' + players.length, false);

      if (players.length === 8) {
        startButton.disabled = false;
        confirmButton.disabled = true;
      }
    } else {
      showNotification('Maximum of 8 players reached.', false);
      startButton.disabled = false;
      confirmButton.disabled = true;
    }
  });

  startButton.addEventListener('click', function() {
    if (!this.disabled) { // Check if the button is not disabled
      gameArea.style.display = 'block';  // Show the game area
      playerEntryContent.style.display = 'none'; // Hide the player entry area
    }
  });

  function showNotification(message, isError) {
    notification.textContent = message;
    notification.style.backgroundColor = isError ? 'red' : 'black'; // Change color based on error status
    notification.style.display = 'block';
    notification.style.opacity = 1;
    setTimeout(function() {
      notification.style.opacity = 0;
      setTimeout(function() {
        notification.style.display = 'none';
      }, 1000); // Wait for the opacity transition to finish before hiding
    }, 3000); // Duration the notification is visible
  }
});
