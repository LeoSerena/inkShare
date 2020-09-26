let changes = false


$(document).ready(function(){

    add_return_button_listener()
    //---------------- BOOKS HANDLING -------------------
    //fetches the books of the user in the database and displays it in the div
    displayBooks()
    //---------------- LISTS HANDLING -------------------
    displayLists()
})

function displayLists(){
    let add_list_div = $('#add_list_div')
    add_list_div.empty()
    add_list_div.append($(`<button id = 'add_list'>`).text('+'))

    let form = $(`<form action = '/private/addList' method = 'POST' id = 'add_list_form'>`)

    let name_form_div = $(`<div>`)
    name_form_div.append($(`<label>`).text('nom de la liste'))
    name_form_div.append($(`<input class = 'list_form' name = 'name'>`))
    form.append(name_form_div)
    form.append('<br>')

    let themes_form_div = $(`<div>`)
    themes_form_div.append($(`<label>`).text('thèmes'))
    themes_form_div.append($(`<input class = 'list_form' name = 'themes'>`))
    form.append(themes_form_div)
    form.append('<br>')

    form.append($(`<button class = 'form_button' type = 'submit' id = 'list_add_submit'>`).text('ajouter'))
    form.append($(`<button class = 'form_button' id = 'cancel_add_list_button'>`).text('annuler'))

    add_list_div.append(form)

    form.hide()

    add_lists_listener(form)

    $.ajax({
        type : 'GET',
        url : '/private/getLists',
        success : function(data){
            let my_lists = data['my_lists']
            let fav_lists = data['fav_lists']


            my_lists_table = $(`<table id = 'my_lists_table'>`)
            fav_lists_table = $(`<table id = 'fav_lists_table'>`)

            // headers

            my_lists_table.append('<tr>').append('<th>my lists</th>')
            fav_lists_table.append('<tr>').append('<th>favourite lists</th>')

            my_lists_header = my_lists_table.append('<tr>')
            fav_lists_header = fav_lists_table.append('<tr>')

            my_lists_header.append(`<th class = 'no_border'></th>`)
            fav_lists_header.append(`<th class = 'no_border'></th>`)
            my_lists_header.append($('<th class = book_header>Nom</th>'))
            fav_lists_header.append($('<th class = book_header>Nom</th>'))
            my_lists_header.append($('<th class = book_header>taille</th>'))
            fav_lists_header.append($('<th class = book_header>taille</th>'))

            // adding the rows
            my_lists.forEach((list, i) => {
                let list_row = $('<tr>')
                list_row.append($(`<td>${i+1}</td>`))
                list_row.append($(`<td>${list['name']}</td>`))
                list_row.append($(`<td>${list['size']}</td>`))
                list_row.append($(`<td class = 'no_border'><button class = 'book_delete' id = ${list['_id']}></button></td>`))
                list_row.click(function(){
                    window.location.href = `/private/list/${list['_id']}`
                })
                my_lists_table.append(list_row)
            })
            fav_lists.forEach((list, i) => {
                let list_row = $('<tr>')
                list_row.append($(`<td>${i+1}</td>`))
                list_row.append($(`<td>${list['name']}</td>`))
                list_row.append($(`<td>${list['size']}</td>`))
                list_row.append($(`<td class = 'no_border'><button class = 'book_delete' id = ${list['_id']}></button></td>`))
                fav_lists_table.append(list_row)
            })
            $('#my_list_container').append(my_lists_table)
            $('#fav_list_container').append(fav_lists_table)
    }})
}

function add_lists_listener(form){
    $('#add_list').click(function(e){
        e.preventDefault()
        form.show()
    })
    $('#cancel_add_list_button').click(function(e){
        e.preventDefault()
        form.hide()
        $('#add_list').show()
    })
}

// displays the books of the user in the container
function displayBooks(){
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
                    if(elem == 'title') { book_table_header.append($('<th class = book_header id = title_header>Titre</th>')) }
                    if(elem == 'release_year') {book_table_header.append($('<th class = book_header id = date_header>Date de parution</th>')) }
                });
                book_table_header.append(`<th class = 'no_border'>  </th>`)
                book_table.append(book_table_header)

                //adds all the books
                data.forEach((elem, i)=>{
                    let book_row = $('<tr>')
                    book_row.append($(`<td>${i+1}</td>`))
                    book_row.append($(`<td>${elem['author']}</td>`))
                    book_row.append($(`<td>${elem['release_year']}</td>`))
                    book_row.append($(`<td class = note_link id = ${elem['_id']}>${elem['title']}</td>`).css('cursor' , 'pointer'))
                    book_row.append($(`<td class = 'no_border'><button class = 'book_delete' id = ${elem['_id']}></button></td>`))
                    book_table.append(book_row)
                })
                $('#book_container').append(book_table)
                add_del_button_listener();
                add_note_listener()

            }else{
                $('#book_container').text("pas de livre enregistrés pour l'instant")
            }

        },
        error(err){
            $('#book_container').text(err);
        }
    })

    let add_book_div = $('#add_book_div')
    add_book_div.empty()
    add_book_div.append($(`<button id = 'add_book'>`).text('+'))

    let form = $(`<form action = '/private/addBook' method = 'POST' id = 'add_book_form'>`)

    let title_form_div = $(`<div>`)
    title_form_div.append($(`<label>`).text('titre'))
    title_form_div.append($(`<input class = 'book_form' name = 'title'>`))
    form.append(title_form_div)
    form.append('<br>')

    let author_form_div = $(`<div>`)
    author_form_div.append($(`<label>`).text('auteur'))
    author_form_div.append($(`<input class = 'book_form' name = 'author'>`))
    form.append(author_form_div)
    form.append('<br>')

    let release_year_form_div = $(`<div>`)
    release_year_form_div.append($(`<label>`).text('date de parution (optionel)'))
    release_year_form_div.append($(`<input class = 'book_form' name = 'release_year'>`))
    form.append(release_year_form_div)
    form.append('<br>')

    form.append($(`<button class = 'form_button' type = 'submit' id = 'book_add_submit'>`).text('ajouter'))
    form.append($(`<button class = 'form_button' type = 'submit' id = 'cancel_add_book_button'>`).text('annuler'))

    add_book_div.append(form)

    $('#books_div').append(add_book_div)

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
}

// adds a way to return to the books when willing to quit the modification of a book
function add_return_button_listener(){
    $('#label_book_p').click(() => {
        if(changes){
            if(confirm('Voulez-vous enregistrer les mofications?')){
                save()
            }
        }
        displayBooks()
    })
}

//book deletion handler
function add_del_button_listener(){
    $('.book_delete').click(function(e){
            e.preventDefault()
            if (confirm('voulez-vous vraiment supprimer ce livre de votre liste?')){
                let bookId = this.id;
                $.ajax({
                    type : 'POST',
                    url : '/private/deleteBook',
                    data : {'id' : bookId},
                    success : function(data){location.reload()},
                    error(err){$('#book_container').text(err);}
                })
            }
        })
}

// fetches the information on the selected book
function add_note_listener(){
    $('.note_link').click(function(e){
        e.preventDefault()
        let book_id = this.id
        $.ajax({
            type : 'GET',
            url : `/private/myBooks/notes/id=${book_id}`,
            success : function(data){ displayNotes(book_id, data['title'], data['author'], data['release_year'], data['creation_date'], data['notes'], data['last_modif']) }, 
            error(err){$('#book_container').text(err);}
        })
    })
} 

// displays the selected book informations in the container
function displayNotes(book_id, titre, auteur, date_de_parution, date_de_création, notes, last_modif){
    let cont = $('#book_container')
    cont.empty()
    $('#add_book').hide()

    let header = $(`<div id = 'notes_header'>`)

    let title_div = $(`<div id = notes_title_div spellcheck = false>`)
    title_div.append(
        $('<h3 id = title contenteditable = true>').text(titre)
        .hover(function(){
            $(this).css('text-decoration', 'underline')
        },function(){
            $(this).css('text-decoration', '')
        })
    )
    title_div.append($('<h3 id = release_year contenteditable = true>').text(date_de_parution)
        .hover(function(){
            $(this).css('text-decoration', 'underline')
        },function(){
            $(this).css('text-decoration', '')
        })
    )
    header.append(title_div)

    header.append($('<h3 id = author contenteditable = true spellcheck = false>').text(auteur)
        .hover(function(){
            $(this).css('text-decoration', 'underline')
        },function(){
            $(this).css('text-decoration', '')
        })
    )

    header.append($(`<button id = notes_save_button>`).click(() => save(book_id)))

    dates_div = $(`<div id = notes_dates>`)
    dates_div.append($(`<h3 id = creation_date>`).text('Ajouté le ' + date_de_création.substring(0,10)))
    dates_div.append($(`<h3 id = last_modif>`).text('Dernière modification le ' + last_modif.substring(0,10)))
    header.append(dates_div)

    cont.append(header)

    let notes_input = $(`<textarea id = 'notes_input' maxlength = 100000 placeholder = 'Écris tes notes sur le livre ici...' rows = 15>`)
    if(notes){ notes_input.val(notes) }
    
    cont.append(notes_input)

    add_mofification_handler()

}

function save(book_id){
    if(changes){
        let author = $('#author').text()
        let title = $('#title').text()
        let release_year = $('#release_year').text()
        let notes = $('#notes_input').val()
        $.ajax({
            type : 'POST',
            url : '/private/modifyBook',
            data : {
                'book_id' : book_id,
                'title' : title,
                'author' : author,
                'release_year' : release_year,
                'notes' : notes
            },error(err){$('#book_container').text(err);}
        })
    }
    changes = false
}

//handles the modifications on the 
function add_mofification_handler(){
    $('#author').keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault()
            this.blur()
            changes = true
        }
    }).on('input', function(){
        changes = true
    })
    $('#title').keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault()
            this.blur()
            changes = true
        }
    }).on('input', function(){
        changes = true
    })
    $('#release_year').keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault()
            this.blur()
            changes = true
        }
    }).on('input', function(){
        changes = true
    })
    $('#notes_input').on('input', function(){
        changes = true
    })
}