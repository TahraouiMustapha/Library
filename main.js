const title = document.querySelector('#title');
const author = document.querySelector('#author');
const nmbPages = document.querySelector('#nmbPages');
const haveReadValues = document.getElementsByName('haveRead');

const myLibrary = []; 


function Book(title, author, nmbPages, haveRead) {
    this.title = title;
    this.author = author;
    this.nmbPages = nmbPages;
    this.haveRead = haveRead;

    this.info = function() {
        return this.title +" by "+ this.author +", "+ this.nmbPages +", "+this.haveRead;
    }
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", (e) => {
    if (title.value != '' 
        && author.value != '' 
        && nmbPages.value != '') {
            e.preventDefault();
            addBookToLibrary();
    }

})

function addBookToLibrary() {
    let haveRead ;
    if(haveReadValues[0].checked) {
        haveRead = haveReadValues[0].value;
    } else {
        haveRead = haveReadValues[1].value;
    }

    let newBook = new Book(title.value, author.value, nmbPages.value, haveRead);
    
    myLibrary.push(newBook); 
    display();
}

const tbody = document.querySelector('tbody');

function display() {
    let books = '';
    myLibrary.forEach((book, index) => {
        books += `
                <tr>
                    <td>${index}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.nmbPages}</td>
                    <td>${book.haveRead}</td>
                    <td>
                        <button data-index="${index}" id="deleteBtn" onclick ="deleteBook(this.dataset.index)">
                            delete  
                        </button>
                    </td>
                </tr>
        `;
    });
    tbody.innerHTML = books;
}



let open = document.querySelector('#open');
let dialog = document.querySelector('dialog');
open.onclick = () => {
    dialog.showModal();
}

let close = document.querySelector('#close');
close.onclick = () => {
    dialog.close();
}

// let deleteBtn = document.querySelector('#deleteBtn');
function deleteBook(index) {
    myLibrary.splice(index, 1);
    display();
}