const URL = "https://fakestoreapi.com/products/category/";
const cardTemplate = document.querySelector("template");
const cardsContainer = document.querySelector(".cards");
const filterButtonsContainer = document.querySelector(".filter-buttons");
const loader = document.querySelector(".loader");
const popupWindow = document.getElementById("popup-window");
const closeButton = document.getElementById("close-button");

function fetchProductsByCategory(url, category) {
  return fetch(`${url}${category}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Ma’lumotlarni olishda xato yuz berdi:", error);
    });
}

function renderProducts(products) {
  products.forEach((product) => {
    let card = cardTemplate.content.cloneNode(true);
    card.querySelector(".card-image").src = product.image;
    card.querySelector(".card-title").textContent = product.title;
    card.querySelector(".card-price").textContent = "$" + product.price;
    card.querySelector(".card-description").textContent = product.description;
    card.querySelector(".card-category").textContent =
      "Category: " + product.category;

    const buyButton = card.querySelector(".buy-button");
    buyButton.addEventListener("click", () => {
      alert(` "${product.title}" \n savatchaga qo'shildi`);
    });

    cardsContainer.appendChild(card);
  });
}

[...filterButtonsContainer.children].forEach((button) => {
  button.addEventListener("click", () => {
    cardsContainer.innerHTML = "";
    loader.style.display = "block";
    fetchProductsByCategory(URL, button.dataset.category).then((data) => {
      loader.style.display = "none";
      renderProducts(data);
    });
  });
});

closeButton.addEventListener("click", () => {
  popupWindow.style.display = "none";
});
