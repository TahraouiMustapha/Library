const title = document.querySelector('#title');
const author = document.querySelector('#author');
const nmbPages = document.querySelector('#nmbPages');
const haveReadValues = document.getElementsByName('haveRead');

const myLibrary = []; 

class Book {
    constructor (title, author, nmbPages, haveRead) {
        this.title = title;
        this.author = author;
        this.nmbPages = nmbPages;
        this.haveRead = haveRead;
    }

    info() {
        return this.title +" by "+ this.author +", "+ this.nmbPages +", "+this.haveRead;
    }
    
    toggleReadStatus() {
        if(this.haveRead === 'no') {
            this.haveRead = 'yes';
        } else {
            this.haveRead = 'no';
        }
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
    let readStatusClass = '';
    let reposReadBtn = '';
    
    myLibrary.forEach((book, index) => {
        if(book.haveRead === 'yes') {
            readStatusClass = 'readStatus read';
            reposReadBtn = 'read';
        } else {
            readStatusClass = 'readStatus';
            reposReadBtn = 'not read';
        }
        books += `
                <tr>
                    <td>${index}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.nmbPages}</td>
                    <td>
                        <button class="${readStatusClass}" data-index="${index}" onclick ="changeReadStatus(this)">
                            ${reposReadBtn}  
                        </button>
                    </td>
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

function deleteBook(index) {
    myLibrary.splice(index, 1);
    display();
}


function changeReadStatus(btn) {
    let index = btn.dataset.index;
    myLibrary[index].toggleReadStatus();
    display();
}
