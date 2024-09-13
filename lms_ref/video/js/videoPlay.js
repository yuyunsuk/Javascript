// 비디오 요소 선택
var myVideo = document.getElementById('my-video');

// 자바스크립트를 통해 포스터 이미지와 비디오 소스 설정
var posterUrl      = 'http://localhost:8080/lecture/L00000000056/01.png';
var videoSourceUrl = 'http://localhost:8080/lecture/L00000000056/01.mp4';

// 포스터 이미지 설정
myVideo.setAttribute('poster', posterUrl);

// 비디오 소스 설정
var sourceElement = document.createElement('source');
sourceElement.setAttribute('src', videoSourceUrl);
sourceElement.setAttribute('type', 'video/mp4');
myVideo.appendChild(sourceElement);

// Video.js 인스턴스 초기화 및 이벤트 설정
videojs(myVideo).ready(function() {
    var player = this;
    player.on('play', function() {
        console.log('비디오가 재생되었습니다.');
    });
    player.on('pause', function() {
        console.log('비디오가 일시정지되었습니다.');
    });
    player.on('ended', function() {
        console.log('비디오가 끝까지 재생되었습니다.');
        alert('비디오를 끝까지 시청해주셔서 감사합니다!');
    });
});