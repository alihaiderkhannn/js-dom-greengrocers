const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'Vegetable'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'Vegetable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: 'Vegetable'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: 'Vegetable'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: 'Fruit'

      
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'Fruit'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: 'Fruit'
    }
  ],
  cart: []
};

function render() {}
render();

const storeList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");

function handleItemClick(storeItem) {
  
  let c = state.cart.find(x => x.id === storeItem.id)

  if (c){
    c.quantity++
  }
  else {
    let cartitem = {
      ...storeItem,
      quantity: 1
  
    }
    state.cart.push(cartitem)
  }

  renderCart();
}
function renderItems() {
  state.items.map((item) => {
    let li = renderItem(item);
    storeList.appendChild(li);
  });
}
function renderCart() {
  const total = document.querySelector(".total-number");

  cartList.innerHTML = "";
  //iterate through state.cart.map  and update the cart view
  state.cart.map((item) => {
    // let li = renderCartItem(item);
    // console.log(item,li)
    // cartList.appendChild(li);
    renderCartItem(item)
  });
  total.innerHTML = calculateTotal();
}
function renderCartItem(cartItem) {
  
  //const li = document.createElement("li");
  //const img = document.createElement("img");


  const list = document.querySelector(".cart--item-list");
  list.innerHTML = "";

  state.cart.forEach(x => {
    const item = document.createElement("li")
    item.innerHTML = `<img
    class="cart--item-icon"
    src="assets/icons/${x.id}.svg"
    alt="${x.name}"
  />
  <p>${x.name}</p>
  <button class="quantity-btn remove-btn center">-</button>
  <span class="quantity-text center">${x.quantity}</span>
  <button class="quantity-btn add-btn center">+</button>` 

  const removebtn = item.querySelector(".remove-btn")
  console.log(removebtn);
  const addbtn = item.querySelector(".add-btn")
  
  removebtn.addEventListener('click', () => {
    if (x.quantity > 1) {
      x.quantity--;
    } else {
      console.log(state.cart)
      x.quantity--;
      const index = state.cart.findIndex((item) => item.id === x.id);
      state.cart.splice(index, 1);
    }
    renderCart();
  })

  addbtn.addEventListener('click', () => {
    x.quantity++;

    renderCart();
  } )

  
  list.appendChild(item)
  });

}
function renderItem(storeItem) {
  console.log(storeItem);
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");
  const img = document.createElement("img");
  img.setAttribute("src", `./assets/icons/${storeItem.id}.svg`);
  img.setAttribute("alt", storeItem.name);

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.addEventListener("click", () => {
    handleItemClick(storeItem);
  });

  div.appendChild(img);

  li.appendChild(div);
  li.appendChild(button);

  return li;
}

function calculateTotal() {
  let total = 0;
  state.cart.map((item) => {
    console.log(item)
    total += item.price * item.quantity
  })
  return total.toFixed(2)
}



renderItems();
renderCart();