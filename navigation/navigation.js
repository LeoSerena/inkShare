$(document).ready(function(){
    $('#home_button').click(function(){
        $.ajax({
            type : 'GET',
            success : function(data){
                window.location.href = '/homepage';
            },
            error(data){
                console.log('problem loading the page');
            }
        })
    });

    $('#login_button').click(function(){
        $.ajax({
            type : 'GET',
            success : function(data){
                window.location.href = '/login';
            },
            error(data){
                console.log('problem loading the page');
            }
        })
    });

    $('#register_button').click(function(){
        $.ajax({
            type : 'GET',
            success : function(data){
                window.location.href = '/register';
            },
            error(data){
                console.log('problem loading the page');
            }
        })
    });

    $('#private_button').click(function(){
        $.ajax({
            type : 'GET',
            success : function(data){
                window.location.href = '/private/myPage';
            },
            error(data){
                console.log('problem loading the page');
            }
        })
    });

    $('#charte_button').click(function(){
        $.ajax({
            type : 'GET',
            success : function(data){
                window.location.href = '/charte';
            },
            error(data){
                console.log('problem loading the page');
            }
        })
    });

    $('#contact_button').click(function(){
        $.ajax({
            type : 'GET',
            success : function(data){
                window.location.href = '/contacts';
            },
            error(data){
                console.log('problem loading the page');
            }
        })
    });

})