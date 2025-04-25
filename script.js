// Funcionalidade do modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");

var images = document.querySelectorAll('.product-img');
images.forEach(function(image) {
    image.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = image.src; // Define a imagem no modal
    });
});

function closeModal() {
    modal.style.display = "none";
}

const produtos = {
  pokemon: [
      { name: "Pikachu", description: "O Pokémon mais icônico.", price: 55.00, images: ["imagens/pokemon/poke2.jpg"] },
      { name: "Raichu", description: "Um Pokémon elétrico que evolui de Pikachu.", price: 50.00, images: ["imagens/pokemon/poke.jpg"] },
      { name: "Azumarill", description: "Um Pokémon do tipo água e fada.", price: 45.00, images: ["imagens/pokemon/poke1.jpg"] }
  ],
  disney: [
      { name: "Mickey", description: "O famoso ratinho da Disney.", price: 50.00, images: ["imagens/disney/mickey2.jpg", "imagens/disney/mickey1.jpg", "imagens/disney/mickey.jpg"] },
      { name: "Minnie", description: "A namorada do Mickey.", price: 50.00, images: ["imagens/disney/minnie2.jpg", "imagens/disney/minnie1.jpg", "imagens/disney/minnie.jpg"] },
      { name: "Tigrão", description: "Um personagem do Ursinho Pooh.", price: 50.00, images: ["imagens/disney/tigrao.jpg", "imagens/disney/tigrao1.jpg"] }
  ],
  anime: [
      { name: "Bola surpresa", description: "Um item divertido de várias séries de anime.", price: 70.00, images: ["imagens/anime/animebola0.jpg", "imagens/anime/animebola1.jpg", "imagens/anime/animebola.jpg"] }
  ],
  trico: [
      { name: "Trio selva", description: "Um conjunto de pelúcias feitas à mão.", price: 155.00, images: ["imagens/trico/trico4.jpg", "imagens/trico/trico2.jpg", "imagens/trico/trico3.jpg", "imagens/trico/trico1.jpg"] }
  ]
};

let cart = [];

function showHome() {
  document.getElementById('content').innerHTML = `
      <h2 class="subtitle">Seja bem-vindo ao mundo de pelúcia</h2>
      <div class="categories">
          <div class="category" onclick="showCategory('pokemon')">Pokemon</div>
          <div class="category" onclick="showCategory('disney')">Disney</div>
          <div class="category" onclick="showCategory('anime')">Anime</div>
          <div class="category" onclick="showCategory('trico')">Tricô</div>
      </div>
      <div class="carousel" id="carousel">
          <img src="imagens/inicial/1.jpg" class="carousel-img" style="display: block;">
          <img src="imagens/inicial/2.jpg" class="carousel-img">
          <img src="imagens/inicial/3.jpg" class="carousel-img">
          <img src="imagens/inicial/4.jpg" class="carousel-img">
      </div>`;
  startCarousel();
}

function showCategory(category) {
  let content = `<h2 style="text-align: center;">${capitalizeFirstLetter(category)}</h2>`;
  content += `<div class="product-container">`;
  produtos[category].forEach((product, index) => {
      content += `<div class="product" onclick="showProduct('${category}', ${index})">
                      <img src="${product.images[0]}" alt="${product.name}" class="product-img"> 
                      <div class="product-info">
                          <h3>${product.name}</h3>
                          <p>${product.description}</p>
                          <p><strong>R$${product.price.toFixed(2)}</strong></p>
                          <button onclick="addToCart(${index}, '${category}'); event.stopPropagation();">Adicionar ao carrinho</button>
                      </div>
                  </div>`;
  });
  content += `</div>`;
  document.getElementById('content').innerHTML = content;
}

function showProduct(category, index) {
  const product = produtos[category][index];
  let content = `<h2 style="text-align: center;">${product.name}</h2>`;
  content += `<div style="display: flex; justify-content: center; align-items: center;">`;
  content += `<img src="${product.images[0]}" alt="${product.name}" class="product-img" id="mainImage" onclick="openModal('${product.images[0]}')">`;
  content += `<div style="margin-left: 20px;">
                  <p>${product.description}</p>
                  <p><strong>R$${product.price.toFixed(2)}</strong></p>
                  <button onclick="addToCart(${index}, '${category}')">Adicionar ao carrinho</button>
                  <div class="image-gallery" style="margin-top: 10px;">`;
  
  product.images.forEach((img) => {
      content += `<img src="${img}" alt="${product.name}" style="width: 80px; margin: 5px;" onclick="openModal('${img}')">`;
  });

  content += `</div></div></div>`;
  document.getElementById('content').innerHTML = content;
}

function openModal(imgSrc) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  modal.style.display = "block";
  modalImg.src = imgSrc;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
      closeModal();
  }
});

function addToCart(index, category) {
  const product = produtos[category][index];
  cart.push(product);
  alert(product.name + " adicionado ao carrinho!");
  updateCartCount();
}

function updateCartCount() {
  const cartCount = cart.length > 0 ? cart.length : '';
  const cartLink = document.querySelector('.header-link:nth-child(2)');
  cartLink.innerText = cartCount ? `Carrinho (${cartCount})` : 'Carrinho';
}

function showCart() {
  let content = '<h2 style="text-align: center;">Carrinho de Compras</h2>';
  content += '<div class="product-container">';
  if (cart.length === 0) {
      content += '<p>Seu carrinho está vazio!</p>';
  } else {
      let totalValue = 0;
      cart.forEach((product, index) => {
          totalValue += product.price;
          content += `<div class="cart-product">
                          <div style="flex: 1; text-align: left;">
                              <h3>${product.name}</h3>
                              <p><strong>R$${product.price.toFixed(2)}</strong></p>
                          </div>
                          <img src="${product.images[0]}" alt="${product.name}">
                          <button onclick="removeFromCart(${index})">Remover</button>
                      </div>`;
      });
      content += `<div style="text-align: right; margin-top: 20px;"><strong>Valor Total: R$${totalValue.toFixed(2)}</strong></div>`;
  }
  content += '</div>';
  document.getElementById('content').innerHTML = content;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  showCart();
  updateCartCount();
}

let currentImageIndex = 0;
function startCarousel() {
  const images = document.querySelectorAll(".carousel-img");
  images.forEach(img => img.style.display = "none");
  images[currentImageIndex].style.display = "block";

  setInterval(() => {
      images[currentImageIndex].style.opacity = 0;
      setTimeout(() => {
          images[currentImageIndex].style.display = "none";
          currentImageIndex = (currentImageIndex + 1) % images.length;
          images[currentImageIndex].style.display = "block";
      }, 500);
  }, 3000);
}

function showLogin() {
  alert("Site ilustrativo. Impossível fazer login no momento.");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.addEventListener("popstate", function(event) {
  showHome();
});

showHome();
