console.log("JavaScript Start!!!");

console.log("Document querySelector!!!");
const container = document.querySelector(".container");
console.log(container);
console.log(" ");

console.log("div querySelectorAll!!!");
const divArray = document.querySelectorAll("div");
divArray.forEach((div)=>console.log(div));
console.log(" ");

console.log("namecard querySelectorAll!!!");
console.log("클릭시 namecard 출력");
const cardArray = document.querySelectorAll(".namecard");
cardArray.forEach((card)=>{
    card.addEventListener("click", ()=>{
        console.log(card);
    })
})

console.log("JavaScript End!!!");