function getName(a, b, c) {
    const name = a;
    const age = b;
    const gender = c;
    const value = name + " " + age + " " + gender;
    return value;
}

const value = getName("Tom", 25, "Man");
console.log(value);

function isEvent(input) {
    const value = input % 2;
    if (value > 0) {
        return false;
    } else {
        return true;
    }
}

console.log(isEvent(3));
console.log(isEvent(4));

function getDevice(size) {
    let deviceName;
    if (size < 400) {
        deviceName = "모바일";
    } else if (size >= 400 && size < 800) {
        deviceName = "태블릿";
    } else if (size >= 800) {
        deviceName = "피씨";
    }
    return deviceName;
}

console.log(getDevice(399));
console.log(getDevice(1024));

const isPositive = (num) => {
    if (num > 0) {
        return true;
    } else {
        return false;
    }
};

console.log(isPositive(100));

const isPositive2 = num => num > 0;
console.log(isPositive2(100));

const getMaxNumber = (x,y) => {
    if (x > y) {
        return x;
    } else {
        return y;
    }
}

console.log(getMaxNumber(5,6));

const 입장확인 = (나이) => {
    const 제한나이 = 29;
    if (나이 <= 제한나이) {
        return true;
    } else {
        return false;
    }
}

console.log(입장확인(25));
console.log(입장확인(30));