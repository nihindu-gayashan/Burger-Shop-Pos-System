function login(){
    const username=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    if (username=="E001" && password==224) {
        window.open('../html/Eprofile.html', '_blank'); 
        //   console.log("hello")
          
    }
}