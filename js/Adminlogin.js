function login(){
    const username=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    if (username=="M001" && password==223) {
        window.open('../html/Mprofile.html', '_blank'); 
        //   console.log("hello")
          
    }
}