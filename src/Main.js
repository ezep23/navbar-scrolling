import { Product } from "./Product.js";
import { loadData } from "./Data.js";
let data = [];

const bodyTable = document.querySelector("#body-table");
const modal = document.getElementById('modal');

let idProductUpdate = null;

document.querySelector('#open-modal').addEventListener('click', () => {
    document.querySelector("#name").value = "";
    document.querySelector("#type").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#image").value = "";
    modal.style.display = 'block'; 
});
document.querySelector('#close-modal').addEventListener('click', () => { modal.style.display = 'none'; });

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; 
    }
});

window.showModal = (id) => {
    idProductUpdate = id;
    let index = data.findIndex((item) => item.id == idProductUpdate);
  
    document.querySelector("#name").value = data[index].name;
    document.querySelector("#type").value = data[index].type;
    document.querySelector("#quantity").value = data[index].quantity;
    document.querySelector("#price").value = data[index].price;
    document.querySelector("#image").value = data[index].image;
    modal.style.display = "block";
};

const updateProduct = (e) => {
  e.preventDefault();
  let index = data.findIndex((item) => item.id == idProductUpdate);
  data[index].name = document.querySelector("#name").value;
  data[index].type = document.querySelector("#type").value;
  data[index].quantity = document.querySelector("#quantity").value;
  data[index].price = document.querySelector("#price").value;
  data[index].image = document.querySelector("#image").value;
  localStorage.setItem("data", JSON.stringify(data));
  renderTable();
};

const renderTable = () => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  bodyTable.innerHTML = "";
  data.map((item) => {
    const row = document.createElement("tr");

    const content = `
            <th>${item.name}</th>
            <td>${item.type}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>
                <img src="${item.image}" alt="${item.image}"/>
            </td>
            <td>
                <div>
                    <button class="modal-buttons" id="update" onclick="showModal(${item.id})">Editar</button>
                    <button class="modal-buttons" id="delete" onclick="deleteProduct(${item.id})">Borrar</button>
                </div>
            </td>
        `;

    row.innerHTML = content;
    bodyTable.append(row);
  });
};

const addProduct = (e) => {
  e.preventDefault();

  let id = data.length > 0 ? data.at(-1).id + 1 : 1;
  let name = document.querySelector("#name").value;
  let type = document.querySelector("#type").value;
  let quantity = document.querySelector("#quantity").value;
  let price = document.querySelector("#price").value;
  let image = document.querySelector("#image").value;

  data.push(new Product(id, name, type, quantity, price, image));
  document.querySelector("#form-product").reset();

  localStorage.setItem("data", JSON.stringify(data));
  renderTable();
};

window.deleteProduct = (id) => {
  let index = data.findIndex((item) => item.id == id);

  let validate = confirm(
    `Está seguro/a que quiere eliminar la gift card ${data[index].name}?`
  );

  if (validate) {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    renderTable();
  }
};

loadData();
renderTable();

document.querySelector('#submitNew').addEventListener("submit", addProduct);
document.querySelector('#submitEdit').addEventListener("submit", updateProduct);


