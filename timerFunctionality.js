document.addEventListener("DOMContentLoaded", function() {
  const startStopButton = document.getElementById("startStopButton");
  const resetButton = document.getElementById("resetButton");
  const playerSelect = document.getElementById("playerSelect");
  const stageResults = {}; // Store results per stage
  let currentStage = 1; // Current stage counter
  let totalStages = 4; // Total stages available

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
      handlePlayerTime();
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
        updateTimerDisplay();
      }, 10);
      isRunning = true;
      startStopButton.textContent = "Stop";
    }
  });

  resetButton.addEventListener("click", function() {
    resetTimer();
  });

  function updateTimerDisplay() {
    document.getElementById("milliseconds").textContent = String(milliseconds).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  }

  function handlePlayerTime() {
    const selectedPlayer = playerSelect.value;
    const time = formatTime(minutes, seconds, milliseconds);
    if (!stageResults[currentStage]) stageResults[currentStage] = [];

    stageResults[currentStage].push({ name: selectedPlayer, time: time, points: 0 });
    updateStageCard(currentStage);
    disablePlayedPlayer(selectedPlayer);

    if (stageResults[currentStage].length === 8) {
      assignPoints(currentStage);
      if (currentStage < totalStages) {
        currentStage++;
        resetPlayerSelections();
      } else {
        updateFinalResults();
      }
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

  function updateStageCard(stage) {
    const stageCard = document.getElementById(`stagecard${stage}`);
    const cardBody = stageCard.querySelector('.card-body');
    cardBody.innerHTML = `<h5 class="card-title">Stage ${stage}</h5>`;

    stageResults[stage].forEach((playerTime) => {
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
      pointsSpan.textContent = `${playerTime.points} pts`;

      entryDiv.appendChild(nameSpan);
      entryDiv.appendChild(timeSpan);
      entryDiv.appendChild(pointsSpan);
      cardBody.appendChild(entryDiv);
    });
  }

  function assignPoints(stage) {
    // Sort players by their times
    stageResults[stage].sort((a, b) => timeToMilliseconds(a.time) - timeToMilliseconds(b.time));
    stageResults[stage].forEach((entry, index) => {
        entry.points = 8 - index; // Assign points from 8 to 1
    });
    updateStageCard(stage);
    updateFinalResults(); // Update final results card after assigning points for each stage
}

function updateFinalResults() {
  const finalResults = {};
  Object.values(stageResults).forEach(stageArray => {
      stageArray.forEach(player => {
          if (!finalResults[player.name]) {
              finalResults[player.name] = 0;
          }
          finalResults[player.name] += player.points;
      });
  });

  const finalCard = document.getElementById('stagecardFinal');
  const finalCardBody = finalCard.querySelector('.card-body');
  finalCardBody.innerHTML = `<h5 class="card-title">Final Results</h5>`; // Reset final card title

  // Sort final results by total points descending
  const sortedFinalResults = Object.entries(finalResults).sort((a, b) => b[1] - a[1]);
  sortedFinalResults.forEach(([name, points]) => {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'final-entry';
      resultDiv.textContent = `${name}: ${points} pts`;
      finalCardBody.appendChild(resultDiv);
  });
}


  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateTimerDisplay();
    startStopButton.textContent = "Start";
  }

  function resetPlayerSelections() {
    const options = playerSelect.options;
    Array.from(options).forEach(option => option.disabled = false);
    playerTimes = []; // Reset the times for the new stage
  }

  function formatTime(minutes, seconds, milliseconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  }

  function timeToMilliseconds(time) {
    const [mins, secs, millis] = time.split(':').map(Number);
    return mins * 60000 + secs * 1000 + millis;
  }
});
