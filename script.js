let rakBuku = [];
const bookShelfElement = document.querySelector('.book_shelf');
const showBook = "showbook";

function cariIdBuku(id){
    for(let i=0; i < rakBuku.length; i++){
        if(rakBuku[i].id === id){
            return i
        }
    }
}

function simpanData(){
    const booksLocalstorage = JSON.stringify(rakBuku);
    localStorage.setItem('Buku', booksLocalstorage);
}

function hapusBuku(id){
    let bookId = cariIdBuku(id);
    rakBuku.splice(bookId, 1);

    document.dispatchEvent(new Event(showBook));
    simpanData()
}

function tambahBuku() {
    const judul = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const terbit = document.getElementById("inputBookYear").value;
    const complete = document.getElementById("inputBookIsComplete").value;
    
    const buku = {
        judul,
        author,
        terbit,
        complete
    }

    rakBuku = JSON.parse(localStorage.getItem('Buku')) ? JSON.parse(localStorage.getItem('Buku')):[];
    rakBuku.push(buku);
    localStorage.setItem("Buku",JSON.stringify(rakBuku));

    document.dispatchEvent(new Event(showBook));
}

function tampilkanBuku(book){
    const divElement = document.createElement('div');
    const articleElement = document.createElement('article');
    const h3Element = document.createElement('h3');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const divAction = document.createElement('div');
    const btnSelesi = document.createElement('button');
    const btnHapus = document.createElement('button');


    divElement.setAttribute('id','incompleteBookshelfList');
    divElement.setAttribute('class','book_list');
    articleElement.setAttribute('class','book_item');
    divAction.setAttribute('class','action');
    btnSelesi.setAttribute('class','green');
    btnHapus.setAttribute('class','red');

    h3Element.innerText = book.judul;
    p1.innerText = `Penulis: ${book.author}`;
    p2.innerText = `Tahun: ${book.terbit}`;
    btnSelesi.innerText = 'Selesai Dibaca';
    btnHapus.innerText = 'Hapus buku';
    btnHapus.addEventListener('click', function(event){
        hapusBuku(book.id)
    })

    divAction.appendChild(btnSelesi);
    divAction.appendChild(btnHapus);

    articleElement.appendChild(h3Element);
    articleElement.appendChild(p1);
    articleElement.appendChild(p2);
    articleElement.appendChild(divAction);

    divElement.appendChild(articleElement);
    bookShelfElement.appendChild(divElement)

}

const buttonSubmit = document.getElementById("bookSubmit");
buttonSubmit.addEventListener("click", function(event){
    event.preventDefault();
    tambahBuku();
})

document.addEventListener("DOMContentLoaded", function(){
    const bukuuu = localStorage.getItem('Buku');
    if(bukuuu){
        const bukuFromLS = JSON.parse(bukuuu);
    
        for(let book of bukuFromLS){
            tampilkanBuku(book)
        }
    }
})

document.addEventListener(showBook, function(){
    const bukuuu = localStorage.getItem('Buku');
    if(bukuuu){
        const bukuFromLS = JSON.parse(bukuuu);
    
        for(let book of bukuFromLS){
            tampilkanBuku(book)
        }
    }
})


