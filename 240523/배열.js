let fruits = ["사과","바나나","배","딸기","메론","망고","키위"];
console.log(fruits);

for (let i=0; i<fruits.length; i++) {
    console.log(fruits[i]);
}

console.log(" ");

console.log(fruits[0]);
console.log(fruits[fruits.length-1]);

// splice
// 삭제, splice(시작인덱스, 갯수, 새로 추가하는 아이템)
// 원본 배열을 수정함!! => 사용에 주의해야 함
const 삭제아이템 = fruits.splice(3, 2, "구아바");
console.log(fruits);
console.log(삭제아이템);

let colors = ["red", "blue", "yellow", "green", "white", "pink"];
// slice
// 선택담기, slice(시작인덱스, 끝인덱스)
// 원본 보존!!
const newColors = colors.slice(1,4);
console.log(colors);
console.log(newColors);

// indexOf
const index = colors.indexOf("blue");
console.log(index);
console.log(colors.indexOf("black")); // 없을때는 -1 리턴

// includes
const isIncludes = colors.includes("green");
console.log(isIncludes);
//console.log(colors.isIncludes("black")); // 없으면 에러

// forEach
// 배열에 사용하는 반복문
// forEach(아이템, 인덱스, 원본배열)
// 콜백 함수
colors.forEach((color, index, array)=>{
    console.log("첫번째 매개변수", color);
    console.log("두번째 매개변수", index);
    console.log("세번째 매개변수", array);
})

// 객체의 배열
const persons = [
    {name: "Michael", age: 19, gender: "male", job: "student"},
    {name: "John", age: 28, gender: "male", job: "engineer"},
    {name: "Ellen", age: 22, gender: "female", job: "programmer"},
    {name: "Sarah", age: 27, gender: "female", job: "lawyer"}
]

console.log(persons[0].name);
console.log(persons[1].job);

// Destructuring 구조분해할당 => 중요
// 배열 또는 객체의 내부아이템을 분해해서 새로운 변수에 할당하는 간편한 방법
// 순서대로 할당함

// 객체분해
const [마이클, 존, 엘렌, 사라] = persons;
console.log(마이클);
console.log(존);
console.log(엘렌);
console.log(사라);

console.log(" ");

// 배열분해
const {name, age, job, gender} = 마이클;
console.log(name, age, gender, job);

const nums = [1,2,3,4,5,6,7,8,9];

// filter
// 조건에 맞는 데이터만 새로운 배열에 담는다.
// 특징: 데이터는 그대로, 새로운 배열의 length는 달라질 수 있음
const array1 = nums.filter((num) => num>5);
console.log(array1);

// map
// 데이터를 조작하여 새로운 배열에 담는다.
// 특징: 데이터는 변경, 새로운 배열의 length 는 반드시 동일
const array2 = nums.map((num) => num*10);
console.log(array2);

const jobArray = persons.map((p)=>p.job);
console.log(jobArray);

// filter, map 혼합
const femaleJobs = persons.filter((p)=>p.gender=="female").map((p)=>p.job);
console.log(femaleJobs);