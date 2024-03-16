window.addEventListener('load' ,function() {

    declareViewEvent()

});


const doPost = async(_body) => {

    let url = 'http://127.0.0.1:3012/users' ;
    fetch(url ,{
        method:'POST' ,
        body:JSON.stringify(_body),
        headers:{'content-type':'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {

        if(data._id) {

            window.location.href ='/html/login.html'

        }

    })



}



const declareViewEvent = async() => {

    
    document.querySelector('#id_form').addEventListener('submit' , async(e) => {

        e.preventDefault();

        let obj = {

            name:document.querySelector('#id_name').value ,
            email:document.querySelector('#id_email').value ,
            password:document.querySelector('#id_password').value 

        }

        doPost(obj)

        console.log(obj)


    });

};