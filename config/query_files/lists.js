const List = require('../../models/List')

var getListInfoFromUser = async function(user_id, callback){
    List.find(
        { original_creator : user_id },
        'creation_date last_modification name size',
        {sort : {last_modification : 1}},
        (err, lists) => {
            if(err){console.log(err)}
            callback(lists)
        }
    )
}