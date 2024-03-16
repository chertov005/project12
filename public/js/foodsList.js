window.addEventListener('load' , function () {

    doApiGetList()
    declareViewEvent()

});




const doApiGetList = async() => {

    try {
        

        let url = 'http://127.0.0.1:3012/foods';

        let resp =  await fetch(url , {
            method:'GET' ,
            headers: {'content-type':'application/json' , 'x-api-key':localStorage['myTokenUser']} 
        }) 
        let data = await resp.json()
    

        arrayFoods(data)
    

    } catch (error) {
        console.log(error) 
        alert('there was problem , try later ')
    }


};



const doApiDel = async(_id) => {



    let url = `http://127.0.0.1:3012/foods/${_id}`

    let resp = await fetch(url , {
        method:'DELETE' ,
        headers:{'content-type':'application/json'}
    }) ;
    let data = await resp.json() ;

    console.log(data)

    if(data.message) {
        doApiGetList()
    }


};



const doPost = async(_body) => {

    let url = `http://127.0.0.1:3012/foods`;
    fetch(url ,{
        method:'POST' ,
        body:JSON.stringify(_body),
        headers:{'content-type':'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {

        if(data._id) {
            return doApiGetList()
        }

    })


}







const arrayFoods = async (_arr) => {

    document.querySelector('#id_ul').innerHTML = '';

    for(let i = 0 ; i < _arr.length ; i++ ) {

        let item = _arr[i]


        let li = document.createElement('li') ;
        li.className = 'list-group-item';
        document.querySelector('#id_ul').append(li) ;

        li.innerHTML += `<button class="btn btn-danger float-end-0 btnDel">x</button> food: ${item.name} , price ${item.price} nis`

        let btn = li.querySelector('.btnDel') ;

        btn.addEventListener('click' , async() => {

            if(confirm(`sure delete ${item.name} ?`)) {
                doApiDel(item._id)
            }

        });

    };

};


const declareViewEvent = async() => {

    document.querySelector('#id_form').addEventListener('submit' , async(e) => {

        e.preventDefault() ;

        let obj = {

            name:document.querySelector('#id_name').value ,
            price:document.querySelector('#id_price').value ,
            cals:document.querySelector('#id_cals').value ,
            image_url:document.querySelector('#id_img').value ,
            category_id:document.querySelector('#id_category').value 

        }

        doPost(obj)

    });


};