async function getData(uId) {

    let promise = new Promise(function (resolve, reject) {
        setTimeout(function () { console.log("Fetched the data!"); resolve("skcgmail.com"); }, 4000);
    }
    );

    let result = await promise;
    return result;
}


(async ()=>{
console.log("start");
var email = await getData("skc");
console.log("Email id of the user id is: " + email);
console.log("end");
})();
