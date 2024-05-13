document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('initView').addEventListener('click', function() {
    var initView = this;
    initView.classList.add('hidden'); // Start the fade-out effect

    // Wait for the fade-out to complete before changing content display
    setTimeout(function() {
        initView.style.display = 'none'; // Hide the initView completely
        document.getElementById('contentToReveal').style.display = 'flex'; // Show the other content
    }, 1200); // This should match the duration of the CSS transition
  });
});