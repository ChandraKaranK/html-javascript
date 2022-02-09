 function getData(uId) {

    let promise = new Promise(function(resolve)
    {
        setTimeout(function(){console.log("Fetched the data!");resolve("skcgmail.com");},4000);
    }
    );

    promise.then(
        function(result)
        {
            console.log("Email id of the user id is: " + result);
            console.log("end");
        }
    )
    }
    
    console.log("start");
    getData("skc");
    console.log("hello");
    console.log("hiiii");


   