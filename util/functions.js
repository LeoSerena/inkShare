$(document).ready(function(){

    $('#user_slide_nav_div').hide()
    //displays the books of the user on its dedicated page


    $('#user_nav_div').hover(function(){
        $('#username_p').css('color', 'lightblue')
    },function(){
        $('#username_p').css('color', 'black')
    })
    $('#user_nav_div').click(function(){
        let user_nav = $('#user_slide_nav_div')
        user_nav.animate({
            height : 'toggle'
        })
    })
    $('#nav_table button').hover(function(){
        $(this).css('color', 'lightblue')
    },function(){
        $(this).css('color', 'black')
    })
    $('#home_button').hover(function(){
        $(this).css('color', 'lightblue')
    },function(){
        $(this).css('color', 'black')
    })

})

