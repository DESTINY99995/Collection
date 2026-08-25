function addProduct(){
  let products = JSON.parse(localStorage.getItem('destiny_products')) || [];
  products.push({
    id: Date.now(),
    name: document.getElementById('pname').value,
    price: Number(document.getElementById('pprice').value),
    image: document.getElementById('pimage').value
  });
  localStorage.setItem('destiny_products', JSON.stringify(products));
  alert("Product Added!");
}
