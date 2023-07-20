const modal = document.getElementById("myModal");
const modalTriggerBtn = document.getElementById("modalTrigger");
const closeBtn = document.getElementById("closeBtn");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

modalTriggerBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
