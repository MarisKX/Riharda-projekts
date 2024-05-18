document.addEventListener('DOMContentLoaded', function() {
  const playerNameInput = document.getElementById('player');
  document.getElementById('initView').addEventListener('click', function() {
    var initView = this;
    initView.classList.add('hidden'); // Start the fade-out effect

    // Wait for the fade-out to complete before changing content display
    setTimeout(function() {
        initView.style.display = 'none'; // Hide the initView completely
        document.getElementById('playerEntryContent').style.display = 'flex'; // Show the other content
        playerNameInput.focus();
    }, 1200); // This should match the duration of the CSS transition
  });
});