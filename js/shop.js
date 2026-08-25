// === PLACE YOUR PAYSTACK KEY HERE ===
const PAYSTACK_PUBLIC_KEY = "pk_live_YOUR_PUBLIC_KEY_HERE"; // Get from paystack.com dashboard

let cart = JSON.parse(localStorage.getItem('destiny_cart')) || [];
let products = JSON.parse(localStorage.getItem('destiny_products')) || [
  {id:1, name:"Body Wave Wig 20 inch", price:850, image:"images/wig1.jpg"},
  {id:2, name:"Luxury Dress", price:350, image:"images/dress1.jpg"}
];

function displayProducts(){
  document.getElementById('products').innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>GHS ${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');
}

function addToCart(id){
  cart.push(products.find(p=>p.id==id));
  localStorage.setItem('destiny_cart', JSON.stringify(cart));
  alert("Added to cart!");
}

function payWithPaystack(){
  let email = document.getElementById('email').value;
  let total = cart.reduce((sum, item) => sum + item.price, 0) * 100; // Paystack uses kobo
  
  if(!email) return alert("Enter email");
  if(cart.length==0) return alert("Cart empty");

  let handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY, // <-- YOUR KEY IS USED HERE
    email: email,
    amount: total,
    currency: "GHS",
    ref: 'DC_'+Math.floor(Math.random()*1000000000),
    onClose: function(){ alert('Payment cancelled'); },
    callback: function(response){
      alert('Payment successful! Ref: ' + response.reference);
      localStorage.removeItem('destiny_cart');
      // Here you would verify on your server - NEVER verify only in frontend
      window.location.href = "index.html";
    }
  });
  handler.openIframe();
}
displayProducts();
