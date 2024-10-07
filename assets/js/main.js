let addBtns = document.querySelectorAll(".addBtn");
let titles = document.querySelectorAll(".title");
let prices = document.querySelectorAll(".price");
let images = document.querySelectorAll(".img");
let basketDiv = document.querySelector(".basketDiv");
let checkBtn = document.querySelector(".checkBtn");
let closeBtn = document.querySelector(".closeBtn");
let basket = document.querySelector(".basket");
let basketBtn = document.querySelector(".basketBtn");

let basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];

function loadBasketItems() {
  basketDiv.innerHTML = "";
  basketItems.forEach((item) => {
    createBasketItem(item.imageSrc, item.title, item.price, item.count);
  });
}

function createBasketItem(imageSrc, title, price, count) {
  const newDiv = document.createElement("div");
  newDiv.className = "flex gap-2 ml-5 items-center  justify-center";

  newDiv.innerHTML = `
    <div class="w-[10%] p-1"><img src="${imageSrc}"/></div>
    <div class="text-lg font-semibold items-center hover:text-gray-600">${title}</div>
    <div>${price}</div>
    <button class="leftBtn"><i class="fa-solid fa-chevron-left ml-6"></i></button>
    <div class="cauntItem">${count}</div>
    <button class="rightBtn"><i class="fa-solid fa-chevron-right"></i></button>
  `;

  basketDiv.append(newDiv);

  let leftBtn = newDiv.querySelector(".leftBtn");
  leftBtn.addEventListener("click", () => {
    let cauntElement = document.querySelector(".cauntItem");
    let caunt = +cauntElement.innerText;
    if (caunt > 1) {
      caunt--;
      cauntElement.innerText = caunt;
    } else {
      basketItems = basketItems.filter((item) => item.title != title);
      newDiv.remove();
    }
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  });

  let rightBtn = document.querySelector(".rightBtn");
  rightBtn.addEventListener("click", () => {
    let cauntElement = document.querySelector(".cauntItem");
    let caunt = +cauntElement.innerText;
    caunt++;
    cauntElement.innerText = caunt;
  });
}

addBtns.forEach((addBtn, index) => {
  addBtn.addEventListener("click", () => {
    basket.classList.remove("hidden");

    let title = titles[index].textContent;
    let price = prices[index].textContent;
    let imageSrc = images[index].getAttribute("src");

    let isProduct = basketItems.find((item) => item.title === title);

    if (isProduct) {
      isProduct.count++;
    } else {
      basketItems.push({
        imageSrc: imageSrc,
        title: title,
        price: price, 
        count: 1,
      });
    }

    localStorage.setItem("basketItems", JSON.stringify(basketItems));
    loadBasketItems();
  });
});

loadBasketItems();

closeBtn.addEventListener("click", () => {
  basket.className = "hidden";
  let totalCount = basketItems.reduce((total, item) => total + item.count, 0);

  document.querySelector(".totalProductCaunt").innerText = totalCount;
});

basketBtn.addEventListener("click", () => {
  basket.classList.remove("hidden");
});
