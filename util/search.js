$(document).ready(function(){

    $('#submit').click(
        function(e){
            e.preventDefault();
            var search = $('#test').val();
            if(search == 'bigg yoshi'){
                console.log('bigg yoshi mode activated')
                $('body').css({'background-image': 'url("images/bigg_yoshi.jpg")'});
            }else{
                var data = {}
                data.search = search;
                $.ajax({
                    type : 'POST',
                    url : '/search_query',
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    sucess : function(response){
                        display_query(response);
                    },
                    error(err){
                        $('#query_result').text(err);
                    }
                })
            }
        }
    )

})