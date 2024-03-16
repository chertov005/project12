window.addEventListener('load' , async() => {

    declareViewEvent();

});



const doPost = async (_body) => {


   
    let url = 'http://127.0.0.1:3012/users/login' ;
    fetch(url , {
        method:'POST' ,
        body:JSON.stringify(_body) ,
        headers:{'content-type':'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {

        if(data.token) {
            localStorage.setItem('myTokenUser' , data.token)
            window.location.href ='/html/userInfo.html'

            console.log(data.token)
        }

        else{
            alert('wrong user or password')
        }

    })


}






const declareViewEvent = async() => {


    document.querySelector('#id_form').addEventListener('submit' , async(e) => {

        e.preventDefault()

        let obj = {
            email:document.querySelector('#id_email').value ,
            password:document.querySelector('#id_password').value 
        };

        console.log(obj);
        doPost(obj)

    });


};