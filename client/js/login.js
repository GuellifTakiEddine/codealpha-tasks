const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    const res=await fetch("http://localhost:5000/api/auth/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    });

    const data=await res.json();

    if(res.ok){

        localStorage.setItem("token",data.token);
        localStorage.setItem("userId",data.user.id);

        showToast("Login successful!", "success");

        setTimeout(() => {
            window.location.href="index.html";
        }, 800);

    }else{

        showToast(data.message, "error");

    }

});