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
        showN
        otification('Please enter a name.', true);
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
      populatePlayerSelect(); // Call the function to populate the select element
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

  function populatePlayerSelect() {
    const selectElement = document.getElementById('playerSelect'); // Ensure your select has this ID
    const players = JSON.parse(localStorage.getItem('players')) || [];

    // Clear existing options
    selectElement.innerHTML = '';

    // Check if there are any players stored in localStorage
    if (players.length > 0) {
      // Create a new option element for each player and append it to the select element
      players.forEach(function(player) {
        const option = document.createElement('option');
        option.value = player; // Set the value attribute (useful for form submissions)
        option.textContent = player; // Set the display text
        selectElement.appendChild(option);
      });
    } else {
      // Optionally handle the case where no players are stored
      const option = document.createElement('option');
      option.textContent = 'No players available';
      selectElement.appendChild(option);
    }
  }
});
