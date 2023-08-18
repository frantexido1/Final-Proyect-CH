const socket = io();

const showDescriptionModal = (description) => {
  const modal = document.getElementById("descriptionModal");
  const modalDescription = modal.querySelector("#modalDescription");
  modalDescription.textContent = description;
  selectedProduct = description;
  modal.style.display = "block";
};
const closeModal = () => {
  const modal = document.getElementById("descriptionModal");
  modal.style.display = "none";
};

window.onclick = (event) => {
  const modal = document.getElementById("descriptionModal");
  if (event.target === modal) {
    closeModal();
  }
};

const addToCart = (id) => {
  return fetch(`/api/carts/64dea02757fe6c2345796a49/${id.toString()}`, {
    method: "PUT",
  });
};
