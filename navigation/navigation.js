$(document).ready(function(){
    $('.home_button').click(function(){
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
})