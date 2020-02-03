$(document).ready(function(){
    $('#home_button').click(function(){
        $.ajax({
            type : 'GET',
            success : function(data){
                window.location.href = '/index';
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
                window.location.href = '/test/form/login';
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
                window.location.href = '/test/form/register';
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


})