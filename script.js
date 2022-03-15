let rakBuku = [];

const buttonSubmit = document.querySelector('#bookSubmit');
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

function tambahBuku() {
    const judul = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const terbit = document.getElementById("inputBookYear").value;
    const complete = document.getElementById("inputBookIsComplete").checked;
    
    const buku = {
        id: +new Date(),
        judul,
        author,
        terbit,
        complete
    }

    rakBuku = JSON.parse(localStorage.getItem('Buku')) ? JSON.parse(localStorage.getItem('Buku')):[];
    rakBuku.push(buku);

    localStorage.setItem("Buku",JSON.stringify(rakBuku));

    document.dispatchEvent(new Event(showBook));
    simpanData()
}

function temukanId(id){
    for(index in rakBuku){
        if(rakBuku[index].id === id){
            return index;
        }
    }

    return -1;
}

function deleteBuku(idBuku){
    const ID_BUKU = temukanId(idBuku);
    console.log(ID_BUKU)
    rakBuku.splice(ID_BUKU, 1);
    console.log(rakBuku)

    document.dispatchEvent(new Event(showBook));
    simpanData()
}


function selesai(id){
    let book;

    for(let i=0; i < rakBuku.length; i++){
        if(rakBuku[i].id === id){
            book = rakBuku[i]
        }
    }
    
    book.complete = true;
    document.dispatchEvent(new Event(showBook));
    simpanData();
}

function blmSelesai(id){
    let book;

    for(let i=0; i < rakBuku.length; i++){
        if(rakBuku[i].id === id){
            book = rakBuku[i]
        }
    }
    
    book.complete = false;
    document.dispatchEvent(new Event(showBook));
    simpanData();
}

function buatBuku(book){
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

    btnHapus.addEventListener('click', function(e){
        deleteBuku(book.id)
    })

    h3Element.innerText = book.judul;
    p1.innerText = `Penulis: ${book.author}`;
    p2.innerText = `Tahun: ${book.terbit}`;
    if(book.complete){
        btnSelesi.innerText = 'Belum Selesai Dibaca';
        btnSelesi.addEventListener('click', function(){
            blmSelesai(book.id)
        })
    }else{
        btnSelesi.addEventListener('click', function(){
            selesai(book.id)
        })
        btnSelesi.innerText = 'Selesai Dibaca';
    }
    btnHapus.innerText = 'Hapus buku';

    divAction.appendChild(btnSelesi);
    divAction.appendChild(btnHapus);

    articleElement.appendChild(h3Element);
    articleElement.appendChild(p1);
    articleElement.appendChild(p2);
    articleElement.appendChild(divAction);

    divElement.appendChild(articleElement);

    return divElement;

}

function tampilkanBuku(){
    let books = localStorage.getItem('Buku');
    books = JSON.parse(books);
    console.log(books)
    rakBuku = books

    document.dispatchEvent(new Event(showBook))
    simpanData()
}


buttonSubmit.addEventListener("click", function(event){
    event.preventDefault();
    tambahBuku();
})

document.addEventListener("DOMContentLoaded", function(){
    tampilkanBuku()
})

document.addEventListener(showBook, function(){
    document.getElementById('blm-selesai').innerHTML = '<h2>Belum Selesai</h2>';
    document.getElementById('selesai').innerHTML = '<h2>Sudah Selesai</h2>';

    for(let i=0; i < rakBuku.length; i++){
        if(rakBuku[i].complete){
            document.getElementById('selesai').append(buatBuku(rakBuku[i]));
        }else{
            document.getElementById('blm-selesai').append(buatBuku(rakBuku[i]));
        }
    }
    
})


