$(document).ready(function(){

    //fetches the books of the user in the database and displays it
    $.ajax({
        type : 'GET',
        url : '/private/getBooks',
        success : function(data){
            $('#book_container').empty()
            if(data['length'] != 0){
                book_table = $(`<table id = 'book_table'>`)
                book_table_header = $('<tr>')
                //adds the header of the table of the books
                book_table_header.append(`<th class = 'no_border'></th>`)
                Object.keys(data[0]).forEach(elem =>{
                    if(elem == 'author') { book_table_header.append($('<th class = book_header id = author_header>Auteur</th>')) }
                    if(elem == 'release_year') {book_table_header.append($('<th class = book_header id = date_header>Date de parution</th>')) }
                    if(elem == 'title') { book_table_header.append($('<th class = book_header id = title_header>Titre</th>')) }
                });
                book_table_header.append(`<th class = 'no_border'>  </th>`)
                book_table.append(book_table_header)

                //adds all the books
                var i = 1;
                data.forEach(elem =>{
                    let book_row = $('<tr>')
                    book_row.append($(`<td>${i}</td>`))
                    book_row.append($(`<td>${elem['author']}</td>`))
                    book_row.append($(`<td>${elem['release_year']}</td>`))
                    book_row.append($(`<td>${elem['title']}</td>`))
                    book_row.append($(`<td class = 'no_border'><button class = 'book_delete' id = ${elem['_id']}></button></td>`))
                    book_table.append(book_row)
                    i++;
                })
                $('#book_container').append(book_table)
                add_del_button_listener();

            }else{
                $('#book_container').text("pas de livre enregistrés pour l'instant")
            }

        },
        error(err){
            $('#book_container').text(err);
        }
    })

    $('.book_form').val(' ')
    $('#add_book_form').hide()
    
    $('#add_book').click(function(e){
        e.preventDefault();
        $(this).hide()
        $('#add_book_form').show()
    })
    $('#cancel_add_book_button').click(function(e){
        e.preventDefault();
        $('#add_book_form').hide()
        $('#add_book').show()
    })


    
    $('#add_word').click(function(e){
        console.log('pushed the button')
        sortBy('Auteur')
    })
})

//book deletion handler
function add_del_button_listener(){
    $('.book_delete').click(function(e){
        e.preventDefault()
        if (confirm('voulez-vous vraiment supprimer ce livre de votre liste?')){
            let bookId = this.id;
            console.log('delete book button')
            $.ajax({
                type : 'POST',
                url : '/private/deleteBook',
                data : {
                    'id' : bookId
                },
                success : function(data){
                    location.reload()
    
                },error(){
                    $('#book_container').text(err);
                }
            })
        }
    })
}

function sortBy(collumn){
    //defines which table we have to sort from what we want to sort
    if(collumn == 'word'){
        var table = $('#vocabulary_table')
    }else{
        var table = $('#book_table')
    }
    var rows = table[0].rows
    var header = rows[0]
    console.log(header)
    var x, y, hasSwitched = true
    while(hasSwitched){
        hasSwitched = false;
        for(i = 1; i < (rows.length -1); i++){
            x = rows[i].getElementByTagName(collumn)[0]
            y = rows[i+1].getElementByTagName(collumn)[0]
            console.log(x)
            if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                hasSwitched = true;
                break;
            }
        }
    }
}

