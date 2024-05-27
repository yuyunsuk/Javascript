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

//Event.stopPropagation() 추가하여,
//이벤트 전파 방지 4가지
// 1) event.preventDefault() 현재 이벤트의 기본 동작을 중단
// 2) event.stopPropagation() 현재 이벤트가 상위로 전파되지 않도록 중단
// 3) event.stopImmediatePropagation() 현재 이벤트가 상위뿐 아니라 현재 레벨에 걸린 다른 이벤트도 동작하지 않도록 중단
// 4) return false => jQuery 를 사용시 두개 모두 수행한 것과 같음, 사용 안할시 event.preventDefault()와 같음

let secElem = document.querySelector('#section-sample');
let divElem = document.querySelector('#div-sample');
let btn = document.querySelector('#div-sample>input[type="button"]');

//Section 이벤트 생성
secElem.addEventListener('click', e => {
    alert('section 클릭!');
});

//Div 클릭 이벤트 생성
divElem.addEventListener('click', e => {
    alert('div 클릭!');
});

//Input 버튼 클릭 이벤트 생성
btn.addEventListener('click', e => {
	//자식 엘리먼트 이벤트에 추가!
	e.stopPropagation();
    alert('button 클릭!');
});

console.log("JavaScript End!!!");