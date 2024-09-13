
	//화면 이동 시 포털의 Session 연장
	function do_sessionExtend() {
	    window.parent.postMessage({
			method : 'sessionExtend'
	    },'*');
	}

	let maxIframeHeight;
	let doc = document.body;

	function do_resize(currHeight) {
 		if ( currHeight == undefined ) {
 			currHeight = document.body.scrollHeight + (document.body.offsetHeight - document.body.clientHeight);
 		}

		maxIframeHeight = currHeight;
		window.parent.postMessage({
			method : 'resize',
			height : maxIframeHeight
		},'*');
		$(".cmnv2 #main").css("padding-top", "0px");
		$("#leftToggle1").css("top", "30px");
	}

	var iframeObserver = new MutationObserver(function(mutations) {
		let currHeight = $(document).find("#wrap").height();
		// 윈도우 창의 높이
		var windowHeight = window.innerHeight;

		mutations.forEach(function(mutation) {
			//이전 최대 창 크기와 다르면 리사이징
			if(currHeight != windowHeight){
				do_resize(currHeight);
			}

		});
	});

	// 감시할 대상 요소 설정
	var iframeTarget = $(document).find("#wrap")[0];
	if(iframeTarget == undefined){
		iframeTarget = $(document).find("#wrap");
	}
	// 감시 옵션 설정
	var iframeConfig = { childList: true, subtree: true, attributes : true };

	//이전 화면 크기 400으로 변경(이전 화면 크기에 영향을 받아 사이즈 조절이 되지 않는 현상 해결용)
//	do_resize(2000);

	window.addEventListener('load', function() {
		//화면 이동 시 포털의 Session 연장
		do_sessionExtend();
		// 감시 시작
		try {
			iframeObserver.observe(iframeTarget, iframeConfig);
		}
		catch(exception) {
//			console.log(iframeTarget, exception);
		}

		//화면 로드 시 iframe 크기 조정
		const { scrollHeight, offsetHeight, clientHeight } = document.documentElement;
		maxIframeHeight = scrollHeight + (offsetHeight - clientHeight);
		do_resize(maxIframeHeight);

	});