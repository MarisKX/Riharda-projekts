document.addEventListener("DOMContentLoaded", function() {
  const startStopButton = document.getElementById("startStopButton");
  const resetButton = document.getElementById("resetButton");
  const playerSelect = document.getElementById("playerSelect"); // Make sure this ID matches your select element
  const playedPlayers = new Set(); // Keep track of players who have already played

  let isRunning = false;
  let timer;
  let milliseconds = 0;
  let seconds = 0;
  let minutes = 0;
  let playerTimes = []; // This will store objects of player names and their times

  startStopButton.addEventListener("click", function() {
      if (isRunning) {
          clearInterval(timer);
          isRunning = false;
          startStopButton.textContent = "Start";
          handlePlayerTime(); // Function to handle time assignment when stopping the timer
      } else {
          timer = setInterval(function() {
              milliseconds++;
              if (milliseconds === 100) {
                  milliseconds = 0;
                  seconds++;
              }
              if (seconds === 60) {
                  seconds = 0;
                  minutes++;
              }

              document.getElementById("milliseconds").textContent = String(milliseconds).padStart(2, "0");
              document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
              document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");

          }, 10);
          isRunning = true;
          startStopButton.textContent = "Stop";
      }
  });

  resetButton.addEventListener("click", function() {
      clearInterval(timer);
      isRunning = false;
      milliseconds = 0;
      seconds = 0;
      minutes = 0;
      document.getElementById("milliseconds").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      startStopButton.textContent = "Start";
  });

  function handlePlayerTime() {
    const selectedPlayer = playerSelect.value;
    const time = formatTime(minutes, seconds, milliseconds);

    if (!playedPlayers.has(selectedPlayer)) {
        console.log(`${selectedPlayer} scored: ${time}`);
        playedPlayers.add(selectedPlayer);
        disablePlayedPlayer(selectedPlayer);

        // Add player and their time to the array
        playerTimes.push({ name: selectedPlayer, time: time });
        // Sort the array by time
        playerTimes.sort((a, b) => timeToMilliseconds(a.time) - timeToMilliseconds(b.time));
        updateStageCard(); // Update the display
        checkAndAssignPoints(); // Check if it's time to assign points
    }
}

  function disablePlayedPlayer(player) {
    const options = playerSelect.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === player) {
        options[i].disabled = true;
        break;
      }
    }
  }

  function formatTime(minutes, seconds, milliseconds) {
    // Pad each part of the time to ensure two digits
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    const paddedMilliseconds = String(milliseconds).padStart(2, '0'); // Assuming you want two digits for milliseconds
    return `${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
  }

  function timeToMilliseconds(time) {
    const [mins, secs, millis] = time.split(':').map(Number);
    return mins * 60000 + secs * 1000 + millis;
  }
  function updateStageCard() {
    const stageCard = document.getElementById('stagecard1');
    const cardBody = stageCard.querySelector('.card-body');

    // Clear existing content
    cardBody.innerHTML = `<h5 class="card-title">Stage 1</h5>`;

    // Append sorted player times and points to the card
    playerTimes.forEach((playerTime) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'stagecard-entry';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'stagecard-name';
        nameSpan.textContent = playerTime.name;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'stagecard-time';
        timeSpan.textContent = playerTime.time;

        const pointsSpan = document.createElement('span');
        pointsSpan.className = 'stagecard-points';
        pointsSpan.textContent = playerTime.points ? `${playerTime.points} pts` : '';

        entryDiv.appendChild(nameSpan);
        entryDiv.appendChild(timeSpan);
        entryDiv.appendChild(pointsSpan);
        cardBody.appendChild(entryDiv);
    });
  }

  function checkAndAssignPoints() {
    if (playerTimes.length === 8) {
        assignPoints();
    }
  }
  function assignPoints() {
    // Assign points from 8 to 1
    playerTimes.forEach((playerTime, index) => {
        playerTime.points = 8 - index; // Points: 8 for first, 7 for second, ..., 1 for eighth
        console.log(`${playerTime.name} gets ${playerTime.points} points`);
    });

    // Update the display after assigning points
    updateStageCard();
    resetPlayerSelections();
  }

  function resetPlayerSelections() {
    const options = playerSelect.options;
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = false; // Re-enable all options
    }
    playedPlayers.clear(); // Clear the record of played players
    playerTimes = []; // Optionally clear recorded times if you start a new round
}
});
