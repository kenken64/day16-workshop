var args = [1,2]; // 0 , 1

function constructSQL(arr){

    if(arr.length == 0){
        return "SELECT * FROM BOOKS";
    }else{
        var findAllBooks = "SELECT * FROM BOOKS WHERE name=? and age=?"
        console.log(findAllBooks);
        // spliy string to array with ? delimeter
        var sqls = findAllBooks.split("?");

        console.log(sqls.length);
        console.log(sqls[0]);
        console.log(sqls[1]);
        console.log(sqls[2]);

        var finalSql = `${sqls[0]}${arr[0]}${sqls[1]}${arr[1]}`;

        console.log(finalSql);
        return finalSql;
    }
    
}

if(typeof(args) === 'undefined'){
    let emptyArry = [];
    var result = constructSQL(emptyArry);
    console.log(result);
}else{
    constructSQL(args);
}
