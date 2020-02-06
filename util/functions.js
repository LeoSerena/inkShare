$(document).ready(function(){


    //displays the books of the user on its dedicated page
    $.ajax({
        type : 'GET',
        url : '/private/getBooks',
        success : function(data){
            console.log(data)

            $('#book_container').empty()
            book_table = $('<table>')
            book_table_header = $('<tr>')
            //adds the header of the table of the books
            book_table_header.append('<th>#</th>')
            Object.keys(data[0]).forEach(elem =>{
                if(elem == 'author') { book_table_header.append($('<th>Auteur</th>')) }
                if(elem == 'release_year') {book_table_header.append($('<th>Date de parution</th>')) }
                if(elem == 'title') { book_table_header.append($('<th>Titre</th>')) }
            });
            book_table_header.append('<th> </th>')
            book_table.append(book_table_header)

            //adds all the books
            var i = 1;
            data.forEach(elem =>{
                let book_row = $('<tr>')
                book_row.append($(`<td>${i}</td>`))
                book_row.append($(`<td>${elem['author']}</td>`))
                book_row.append($(`<td>${elem['release_year']}</td>`))
                book_row.append($(`<td>${elem['title']}</td>`))
                book_row.append($(`<button>del<button>`))
                book_table.append(book_row)
                i++;
            })
            $('#book_container').append(book_table)
        },
        error(err){
            $('#book_container').text(err);
        }
    })
    $('.book_form').empty()
    $('#add_book_form').hide()
    
    $('#add_book').click(function(e){
        e.preventDefault();
        $(this).hide()
        $('#add_book_form').show()
    })
})