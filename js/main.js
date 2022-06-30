let productName = document.querySelector('#productName');
let productPrice = document.querySelector('#productPrice');
let productCategory = document.querySelector('#productCategory');
let productDescription = document.querySelector('#productDescription');
let inputSearch = document.getElementById('inputSearch');
let tableBody = document.getElementById('tableBody');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const editBtn = document.getElementById('editBtn');

let listProduct = [];
let currentIndex = 0

if(localStorage.getItem('userProduct') != null){
    listProduct = JSON.parse(localStorage.getItem('userProduct'));
    displayProduct();
}else{
    listProduct = [];
}

addBtn.addEventListener('click', ()=>{
    if(validName()&&validPrice()){
        let product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDescription.value
        }
        listProduct.push(product);
        localStorage.setItem('userProduct', JSON.stringify(listProduct))
        displayProduct();
    }
});

function displayProduct(){
    let cartona = ``;
    for(let i = 0; i < listProduct.length; i++){
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${listProduct[i].name}</td>
            <td>${listProduct[i].price}</td>
            <td>${listProduct[i].category}</td>
            <td>${listProduct[i].desc}</td>
            <td>
                <button class="btn btn-warning" onclick="updateProduct(${i})">update</button>
            </td>
            <td>
                <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
            </td>
        </tr>
    `
    }
    tableBody.innerHTML = cartona;
};

clearBtn.addEventListener('click', ()=>{
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value = '';
});

function deleteProduct(index){
    listProduct.splice(index,1);
    localStorage.setItem('userProduct', JSON.stringify(listProduct))
    displayProduct();
};

function updateProduct(index){
    currentIndex = index
    productName.value = listProduct[index].name;
    productPrice.value = listProduct[index].price;
    productCategory.value = listProduct[index].cartona;
    productDescription.value = listProduct[index].desc;
    addBtn.classList.replace('d-inline','d-none');
    editBtn.classList.replace('d-none','d-inline');
}

editBtn.addEventListener('click', ()=>{
    listProduct[currentIndex].name = productName.value;
    listProduct[currentIndex].price = productPrice.value;
    listProduct[currentIndex].category = productCategory.value;
    listProduct[currentIndex].desc = productDescription.value;
    addBtn.classList.replace('d-none','d-inline');
    editBtn.classList.replace('d-inline','d-none');
    localStorage.setItem('userProduct', JSON.stringify(listProduct));
    displayProduct();
});

inputSearch.addEventListener('keyup',function(){
    let searchPro = inputSearch.value;
    let cartona = ``;

    for(let i = 0; i < listProduct.length; i++){
        if(listProduct[i].name.toLowerCase().includes(searchPro.toLowerCase()) || 
            listProduct[i].category.toLowerCase().includes(searchPro.toLowerCase())){
            cartona += 
            `<tr>
                <td>${i}</td>
                <td>${listProduct[i].name}</td>
                <td>${listProduct[i].price}</td>
                <td>${listProduct[i].category}</td>
                <td>${listProduct[i].desc}</td>
                <td>
                    <button class="btn btn-warning" onclick="updateProduct(${i})">update</button>
                </td>
                <td>
                    <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `
        }
    }
    tableBody.innerHTML = cartona;
})

function validName(){
    let regexValid = /^[a-zA-Z]{5,12}[0-9]{0,3}?$/
    let valid = false;

    if(regexValid.test(productName.value) == true){
        document.querySelector(".alert").classList.replace("d-block",'d-none');
        valid = true;
    }
    else{
        document.querySelector(".alert").classList.replace("d-none",'d-block');
        valid = false;
    }
    return valid;
}

function validPrice(){
    let regexValid = /^[1-9]{0,1}[0-9]{1,5}$/
    let valid = false;

    if(regexValid.test(productPrice.value) == true){
        document.querySelector("#price").classList.replace("d-block",'d-none');
        valid = true;
    }
    else{
        document.querySelector("#price").classList.replace("d-none",'d-block');
        valid = false;
    }
    return valid;
}

$(document).ready(function () {
    $('.sk-folding-cube').fadeOut(3000, () => {
        $("#langing").slideUp(1000, () => {
            $("body").css("overflow-y",'auto');
        });
    });
});