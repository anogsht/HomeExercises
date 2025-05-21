// Run this once the DOM has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bg-music");         // Background music element
    const title = document.getElementById("main-title");         // Title with animation
    const playBtn = document.getElementById("play-music-btn");   // Button shown if autoplay is blocked
  
    // When the title animation ends, try to play background music
    title.addEventListener("animationend", () => {
      bgMusic.volume = 0.2; // Set music volume to low
      bgMusic.play().catch(() => {
        // If browser blocks autoplay, show the manual play button
        playBtn.style.display = "inline-block";
      });
    });
  
    // Play music manually when user clicks the button
    playBtn.addEventListener("click", () => {
      bgMusic.play();
      playBtn.style.display = "none";
    });
  
    // Add click event to all alien images
    document.querySelectorAll(".alien").forEach(alien => {
      alien.addEventListener("click", () => {
        const soundFile = alien.dataset.sound; // Get sound filename from data attribute
        playAlienSound(soundFile);             // Play alien sound
        shakeElement(alien);                   // Trigger shake animation
      });
    });
  
    // Listen for key presses (1 to 7) to trigger alien actions
    document.addEventListener("keydown", (e) => {
      const key = e.key;
      const aliens = document.querySelectorAll(".alien");
      const index = parseInt(key) - 1;
  
      if (index >= 0 && index < aliens.length) {
        const selectedAlien = aliens[index];
        const soundFile = selectedAlien.dataset.sound;
        playAlienSound(soundFile);
        shakeElement(selectedAlien);
      }
    });
  });
  
  // Play a specific alien sound file with reduced volume
  function playAlienSound(soundFile) {
    const sound = new Audio(`sounds/${soundFile}`);
    const bgMusic = document.getElementById("bg-music");
    sound.volume = 0.05; // Reduce volume by 95%
  
    // Stop background music if it's playing
    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
      bgMusic.currentTime = 0; // reset to beginning if replayed later
    }
  
    sound.play();
  }
  
  
  // Apply a short shake animation to the given element
  function shakeElement(el) {
    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 300);
  }
  