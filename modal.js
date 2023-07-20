const modal = document.getElementById("myModal");
const modalTriggerBtn = document.getElementById("modalTrigger");
const closeBtn = document.getElementById("closeBtn");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Event listeners
modalTriggerBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
