 
var currentUser=JSON.parse(window.localStorage.getItem('user'));
if(!currentUser){
    window.location='index.html';

}


$('#welcomeText').html('Welcome to your Todo List');


$('#logOut').on('click',(e)=>{
    e.preventDefault();
    
    window.localStorage.removeItem('user');
    window.location="index.html";
    console.log('logout successfully');
})


var getList=async ()=>{
    try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
        const lists=res.data;
        console.log(lists);
        let listcontent='';
        lists.forEach((el,index)=>{
            listcontent+=`<li class="list-group-item ${el.completed?'disabledList':''} ${index%2?'list-group-item-info':'list-group-item-warning'}"> <input type="checkbox" class="checkbox" ${el.completed?' checked':''}/> <label for=""> ${el.title}</label></li>`
        });
        $('#todoList').html(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('failed to fetch lists data',e);
    }
}

$('#getList').on('click',(e)=>{
    e.preventDefault();
    getList();
});


var checkedCount=0;

var alertPromise= ()=>{
     return new Promise((resolve,reject)=>{

         
        if(checkedCount===5){
            resolve(checkedCount)
        }
        else{
            reject('count not equal to 5');
        }
    });
}

var promiseCall=()=>{
    alertPromise().then((data)=>{
        alert('Congrats!! 5 Tasks have been Successfully Completed');
    })
    .catch((err)=>{
        console.log('promise rejected');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    if($(this).prop('checked')===true){
        console.log('checked');
        checkedCount++; 
        $(this).parent().addClass('active');
    }
    else{
        checkedCount--;
        console.log('unchecked');
        $(this).parent().removeClass('active');
    }
    
    promiseCall();


});