const urlLogin = "http://localhost:8080/user/login";

let userId = "";
let password = "";

/* input 이벤트를 사용 */
document.querySelector("#userID").addEventListener("change", (e)=>{
    console.log(e.target.value);
    userId = e.target.value;
});

document.querySelector("#password").addEventListener("change", (e)=>{
    console.log(e.target.value);
    password = e.target.value;
})

document.querySelector(".loginBtn").addEventListener("click", ()=>{
    const data = {
        userId: userId,
        password: password
    }
    
    axios
    .post(urlLogin, data, {withCredentials: true})
    .then((response)=>{
        console.log("데이터: " + response.data);
    })
    .catch((error)=>{
        console.log("에러 발생: " + error);
    })
})