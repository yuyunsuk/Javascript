
	//화면 이동 시 포털의 Session 연장
	function do_sessionExtend() {
	    window.parent.postMessage({
			method : 'sessionExtend'
	    },'*');
	}

	let maxIframeHeight;
	let doc = document.body;

	function do_resize(currHeight) {
// 		console.log("do_resize : " + currHeight);
		maxIframeHeight = currHeight;
		window.parent.postMessage({
			method : 'resize',
			height : maxIframeHeight
		},'*');
		if(self !== top){
			$(".cmnv2 #main").css("padding-top", "0px");
			$("#leftToggle1").css("top", "30px");
		}
	}

	observer = new MutationObserver(function(mutations) {
//		let scrollHeight = $("#scrollbars")[0].scrollHeight;
		const { scrollHeight, offsetHeight, clientHeight } = document.documentElement;
//		console.log("[chk observer scrollHeight] : "+scrollHeight);
		let currHeight = scrollHeight + (offsetHeight - clientHeight);
		mutations.forEach(function(mutation) {

			//이전 최대 창 크기와 다르면 리사이징
			if(currHeight != maxIframeHeight){
//				console.log("currHeight/maxIframeHeight : " + currHeight + ", " + maxIframeHeight);
				do_resize(currHeight);
			}

		});
	});
	// 감시할 대상 요소 설정
	target = document.documentElement;
	// 감시 옵션 설정
	config = { childList: true, subtree: true, attributes : true };

	//이전 화면 크기 400으로 변경(이전 화면 크기에 영향을 받아 사이즈 조절이 되지 않는 현상 해결용)
//	do_resize(2000);

	window.addEventListener('load', function() {
//		console.log("사이즈 조절 event 발생");
		//화면 이동 시 포털의 Session 연장
		do_sessionExtend();
		// 감시 시작
		observer.observe(target, config);

		//화면 로드 시 iframe 크기 조정
		const { scrollHeight, offsetHeight, clientHeight } = document.documentElement;
//		let scrollHeight = $("#scrollbars")[0].scrollHeight;
		maxIframeHeight = scrollHeight + (offsetHeight - clientHeight);
//		console.log("[chk addEventListener scrollHeight] : "+scrollHeight);
		do_resize(maxIframeHeight);

	});