document.addEventListener("DOMContentLoaded", function() {
  console.log("Content loaded")
  const startStopButton = document.getElementById("startStopButton");
  const resetButton = document.getElementById("resetButton");
  const playerSelect = document.getElementById("playerSelect"); // Make sure this ID matches your select element
  const playedPlayers = new Set(); // Keep track of players who have already played

  let isRunning = false;
  let timer;
  let milliseconds = 0;
  let seconds = 0;
  let minutes = 0;

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
    if (!playedPlayers.has(selectedPlayer)) {
      console.log(`${selectedPlayer} scored: ${minutes}:${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`);
      playedPlayers.add(selectedPlayer);
      disablePlayedPlayer(selectedPlayer);
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
});
