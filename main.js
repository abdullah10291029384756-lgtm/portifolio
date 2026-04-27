
const title = document.getElementById("title");
const price = document.getElementById("price");
const ads = document.getElementById("ads");
const taxes = document.getElementById("taxes");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");


let arr = JSON.parse(localStorage.getItem("product")) || [];

window.onload = function() {
    renderTable();
};

// دالة لحساب التوتال
function Total() {
    return (+price.value || 0) + (+taxes.value || 0) + (+ads.value || 0) - (+discount.value || 0);
}

function add() {
    if (
        title.value === "" || 
        price.value === "" || 
        taxes.value === "" || 
        discount.value === "" || 
        ads.value === ""|| 
        count.value===""
    ) {
        alert("You must enter something");
        return;
    }
  
    const product = {
        title: title.value,
        price: +price.value || 0,
        taxes: +taxes.value || 0,
        ads: +ads.value || 0,
        discount: +discount.value || 0,
        count:+count.value,
        total: Total()
    };
    
    arr.push(product);
    localStorage.setItem("product", JSON.stringify(arr));

    total.innerHTML = `<p>Total: ${Total()}</p>`;
    renderTable();

    // تفريغ الحقول
    title.value = "";
    price.value = "";
    taxes.value = "";
    discount.value = "";
    ads.value = "";
    count.value ="";
}

function deleteProduct(i){
    arr.splice(i,1);
    localStorage.setItem("product",JSON.stringify(arr));
    renderTable();
}

function editProduct(index) {
    title.value = arr[index].title;
    price.value = arr[index].price;
    taxes.value = arr[index].taxes;
    count.value = arr[index].count;

    ads.value = arr[index].ads;
    discount.value = arr[index].discount;
    total.innerHTML = `<p>Total: ${Total()}</p>`;
    arr.splice(index,1)
}

function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    arr.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.title}</td>
                <td>${product.count}</td>

                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.ads}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>
                  <button onclick="deleteProduct(${index})">delete</button>
                  <button onclick="editProduct(${index})">edit</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}