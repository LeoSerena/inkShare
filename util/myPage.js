$(document).ready(function(){

    //---------------- BOOKS HANDLING -------------------
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
                data.forEach((elem, i)=>{
                    let book_row = $('<tr>')
                    book_row.append($(`<td>${i+1}</td>`))
                    book_row.append($(`<td>${elem['author']}</td>`))
                    book_row.append($(`<td>${elem['release_year']}</td>`))
                    book_row.append($(`<td>${elem['title']}</td>`))
                    book_row.append($(`<td class = 'no_border'><button class = 'book_delete' id = ${elem['_id']}></button></td>`))
                    book_table.append(book_row)
                })
                $('#book_container').append(book_table)
                add_del_button_listener('book');

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

    //---------------------- WORDS HANDLING -------------------
    // fetches the words of the user and displays them
    $.ajax({
        type : 'GET',
        url : '/private/getWords',
        success : function(data){
            $('#vocabulary_container').empty()
            if(data['length'] != 0){
                word_table = $(`<table id = 'word_table'>`)
                word_table_header = $(`<tr>`)
                word_table_header.append(`<th class = 'no_border'></th>`)
                word_table_header.append(`<th class = book_header>word</th>`)
                word_table_header.append(`<th class = book_header>date</th>`)
                word_table_header.append(`<th class = 'no_border'> <button id = 'add_word'> + </th>`)
                word_table.append(word_table_header)


                data.forEach((elem, i) => {
                    let word_row = $('<tr>')
                    word_row.append($(`<td>${i+1}</td>`))
                    word_row.append($(`<td>${elem['word']}</td>`))
                    word_row.append($(`<td>${elem['date'].substring(0,10)}</td>`))
                    word_row.append($(`<td class = 'no_border'><button class = 'word_delete' id = ${elem['_id']}></button></td>`))
                    word_table.append(word_row)
                })
                $('#vocabulary_container').append(word_table)
                $('#add_word').click(() => {
                    $('#add_word_form').show()
                })
                add_del_button_listener('word');
            }else{
                $('#vocabulary_container').text('aucun mot enregistré pour le moment')
            }
        },
        error(err){
            $('#word_container').text(err);
        }
    })
    $('#cancel_add_word_button').click(function(e){
        e.preventDefault()
        $('#add_word_form').hide()
    })
    $('#add_word_form').hide()
})

//book deletion handler
function add_del_button_listener(type){
    if(type == 'book'){
        $('.book_delete').click(function(e){
            e.preventDefault()
            if (confirm('voulez-vous vraiment supprimer ce livre de votre liste?')){
                let bookId = this.id;
                $.ajax({
                    type : 'POST',
                    url : '/private/deleteBook',
                    data : {'id' : bookId},
                    success : function(data){location.reload()},
                    error(){$('#book_container').text(err);}
                })
            }
        })
    }else{
        $('.word_delete').click(function(e){
            e.preventDefault()
            if (confirm('voulez-vous vraiment supprimer ce mot de votre liste?')){
                let wordId = this.id;
                $.ajax({
                    type : 'POST',
                    url : '/private/deleteWord',
                    data : {'id' : wordId},
                    success : function(data){location.reload()},
                    error(){$('#word_container').text(err);}
                })
            }
        })
    }
}

