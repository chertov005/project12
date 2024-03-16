window.addEventListener('load' ,async() => {

    doApiGet()

});


const doApiGet = async() => {

    
    let url = 'http://127.0.0.1:3012/users/info' ;

    fetch(url ,{
        method:'GET' ,
        headers: {'content-type':'application/json' ,'x-api-key':localStorage['myTokenUser']}
    })
    .then(resp => resp.json())
    .then(data => {

        console.log(data)

        userInfo(data)


    })


};



const userInfo = async(_user) => {

    let container = document.querySelector('#id_container') 
    let h3 = document.createElement('h3') ;
    container.append(h3)
    h3.className = 'card  w-25 p-3 shadow mt-5 '

    h3.innerHTML = `name: ${_user.name} <hr> <br> email: ${_user.email}  <hr><br> type: ${_user.user_type}  <hr> <br> date ${_user.date_created}`

}