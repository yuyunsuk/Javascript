var feUI = feUI || {};
(function(feUI, $, window, document, undefined) {
	'use strict';
	// Common variable
	var $window = $(window),
		$document = $(document),
		$html = $document.find('html').addClass('OL'),
		$body = $document.find('body').on({
			'keydown': function(e) {
				if ( e.keyCode === 9 ) $html.removeClass('OL');
			},
			'keyup': function(e) {
				if ( e.keyCode === 13 ) $html.removeClass('OL');
			},
			'click': function() {
				$html.addClass('OL');
			}
		}),
		$wrap = $body.find('#wrap'),
		$header = $wrap.find('.header'),
		$gnb = $header.find('.gnb'),
		$container = $body.find('.container'),
		$content = $body.find('#contents'),
		$footer = $body.find('.footer'),
		winWidth = $window.width(),
		winHeight = $window.height(),
		docHeight = $document.height(),
		headerHeight = $header.height(),
		footHeight = $footer.height(),
		scrollTopPos = $window.scrollTop(),
		wrapMinWidth = 1400,
		aniSpeed = 200,
		assetDir = '../../../',
		activeClass = 'active',
		currentClass = 'current',
		zoomMode = false,
		ieVer, gnbLayerMax, templateHTML;

	// Old IE
	feUI.setOldIE = function() {
		var usrAgent = window.navigator.userAgent,
			msieCheck = usrAgent.match(/MSIE (\d+)/),
			tridentCheck = usrAgent.match(/Trident\/(\d+)/),
			updateURL = 'http://windows.microsoft.com/ko-kr/internet-explorer/download-ie',
			ieInfo = {
				isIE: false,
				trueVer: 0,
				activeVer: 0,
				cpMode: false
			};
		if ( tridentCheck ) { // Check gt IE7
			ieInfo.isIE = true;
			ieVer = ieInfo.trueVer = parseInt(tridentCheck[1], 10) + 4;
		}
		if ( msieCheck ) { // Check lt IE8
			ieInfo.isIE = true;
			ieVer = ieInfo.activeVer = parseInt(msieCheck[1]);
		} else {
			ieInfo.activeVer = ieInfo.trueVer;
		}
		// IE Compatibility Mode(IE8 to IE7)
		if ( ieInfo.isIE && ieInfo.activeVer < 8
			&& ieInfo.trueVer < 9 ) {
			ieInfo.cpMode = ieInfo.trueVer !== ieInfo.activeVer;
		}
		if ( ieInfo.isIE && ieInfo.activeVer < 7 ) window.location = updateURL;
		if ( ieInfo.isIE ) {
			$html.addClass('ie' + ieInfo.activeVer + 'Only');
			if ( ieInfo.trueVer < 9 ) $html.addClass('ie' + ieInfo.trueVer + 'Origin');
		}
		if ( !ieInfo.isIE || ieInfo.activeVer > 8 ) $html.addClass('mdBrowser');
		( ieInfo.cpMode ) ? $html.addClass('cpMode') : $html.removeClass('cpMode');
		return ieInfo;
	};
	feUI.setOldIE();

	// Skip To Content
	feUI.skipToContent = function() {
		var $skipNaviBtn = $body.find('a.skipToContent');
		if ( !$skipNaviBtn.length ) return false;
		if ( !$content.length ) $skipNaviBtn.hide();

		$skipNaviBtn.on('click', function(e) {
			var $this = $(this),
				myId = $this.attr('href');

			e.preventDefault();

			$(myId).attr('tabindex', 0).focus().on('keydown', function(e) {
				if ( e.keyCode === 9 ) $(this).removeAttr('tabindex');
			});
		});
	};
	feUI.skipToContent();

	// window Pop
	feUI.winPop = {
		tgEl : {},
		__init : function() {
			var tgEl = feUI.winPop.tgEl;
			tgEl.$winPop = $body.find('.winPop');
			tgEl.$close = tgEl.$winPop.find('.close').add('.cancle');

			feUI.winPop.__close();
		},
		__close : function() {
			var tgEl = feUI.winPop.tgEl;

			tgEl.$close.on('click', function(e) {
				e.preventDefault();
				if ( !tgEl.$winPop.length ) return false;
				window.open('about:blank', '_self').close();
			});
		},
		__winColorType : function(){
			var tgEl = feUI.winPop.tgEl;
			tgEl.$winPop.on('click', function(e) {

				var $this = $(this),
				myIndex = $this.parent().index(),
				colorClass = 'colorTypeA colorTypeB colorTypeC colorTypeD colorTypeE';

				e.preventDefault();

				tgEl.$winColor.removeClass(activeClass);
				$this.addClass(activeClass);

				switch (myIndex) {
					case 0 :
						$html.removeClass(colorClass);
						$html.addClass('colorTypeA');
						break;
					case 1 :
						$html.removeClass(colorClass);
						$html.addClass('colorTypeB');
						break;
					case 2 :
						$html.removeClass(colorClass);
						$html.addClass('colorTypeC');
						break;
					case 3 :
						$html.removeClass(colorClass);
						$html.addClass('colorTypeD');
						break;
					default :
						console.log('default');
						break;
				};
			});
		}
	}
	feUI.winPop.__init();

	// GNB
	feUI.adminGnb = {
		tgEl : {},
		__init : function(){
			var tgEl = feUI.adminGnb.tgEl;
			tgEl.$header = $header;
			tgEl.$gnbClose = $header.closest('.gnbClose');
			tgEl.$gnb = tgEl.$header.find('.gnb');
			tgEl.$gnbToggleBtn = tgEl.$header.find('.gnbToggle');
			tgEl.$gnbMenuToggleBtn = tgEl.$header.find('.menuToggle');
			tgEl.$gnbMenu = tgEl.$gnb.find('.menu');
			tgEl.$gnbMenuTarget = tgEl.$gnbMenu.find('> ul > li > a');
			tgEl.$gnbSubMenuTarget = tgEl.$gnbMenu.find('> ul > li > ul > li > a');
			tgEl.$gnbSubMenu = tgEl.$gnbMenu.find('a + ul');

			tgEl.$gnbMenu.find('> ul').attr('role', 'menubar');
			tgEl.$gnbMenu.find('> ul li').attr('role', 'none');
			tgEl.$gnbMenu.find('> ul li a').attr('role', 'menuitem');
			tgEl.$gnbMenu.find('> ul li ul li a').attr('role', 'menuitem02');
			tgEl.$gnbMenu.find('> ul ul').attr('role', 'menu');
			tgEl.$gnbMenu.find('> ul ul ul').attr('role', 'depthmenu');
			tgEl.$gnbMenu.find('> ul > li').each(function(){
				var $this = $(this),
					$mySubMenu = $this.find('a').next('ul');

				if ( $mySubMenu.length ) {
					$this.find('> a').addClass('toggle');
					$this.find('> a').attr({
						'aria-haspopup' : true,
						'aria-expanded' : false,
					});
				}
			});
			tgEl.$gnbMenu.find('> ul > li > ul > li').each(function(){
				var $this = $(this),
					$mySubMenu = $this.find('a').next('ul');

				if ( $mySubMenu.length ){
					$this.find('> a').addClass('toggle');
					$this.find('> a').attr({
						'aria-haspopup' : true,
						'aria-expanded' : false,
					});
				}
			});
			tgEl.$gnbMenu.find('> ul > li').each(function(){
				var $this = $(this),
					$mySubMenu = $this.find('a').next('ul');

				if ( $mySubMenu.length ) {
					$this.find('> a').addClass('toggle');
					$this.find('> a').attr({
						'aria-haspopup' : true,
						'aria-expanded' : false,
					});
				}
			});

			tgEl.$gnbMenu.find(' > ul > li').hover(function(){
				var $this = $(this),
					$mySubMenu = $this.find('a').next('ul');

				if ( $mySubMenu.length ) {
					$this.toggleClass('on');
					$this.find('> a + ul').toggleClass('on');
				}
			});
			tgEl.$gnbMenu.find(' > ul > li').on('click',function(){
				var $this = $(this),
					$mySubMenu = $this.find('a').next('ul');

				if ( $mySubMenu.length ) {
					$this.find('> a + ul').toggleClass('active').siblings().css('background-color','rgb(250 250 250)');
				}

			});

			feUI.adminGnb.__gnbToggle();
			feUI.adminGnb.__subToggle();
			feUI.adminGnb.__subreToggle();
			feUI.adminGnb.__subdepthsToggle();
		},
		__gnbToggle : function(){
			var tgEl = feUI.adminGnb.tgEl;
			tgEl.$gnbToggleBtn.on('click', function() {
				var $this = $(this);
				$this.toggleClass(activeClass);
				$html.toggleClass('gnbClose');
			});
		},

		__gnbToggle : function(){
			var tgEl = feUI.adminGnb.tgEl;
			tgEl.$gnbToggleBtn.on('click', function() {
				var $this = $(this);
				$this.toggleClass(activeClass);
				$html.toggleClass('gnbClose');
			});
		},
		__subToggle : function(){
			var tgEl = feUI.adminGnb.tgEl;
			tgEl.$gnbMenuTarget.on('click', function(e){
				var $this = $(this),
					$subMenu = $this.next('ul'),
					subMenuLength = $subMenu.length;

				if ( subMenuLength ) {
					e.preventDefault();

					if($this.hasClass("active")){
						tgEl.$gnbMenuTarget.removeClass("active");
						tgEl.$gnbMenuTarget.siblings('a').removeClass("active");
					}else{
						tgEl.$gnbMenuTarget.removeClass("active")
						$this.addClass("active");
						tgEl.$gnbMenuTarget.siblings('a').removeClass("active");
					}
				}
			});
		},
		__subreToggle : function(){
			var tgEl = feUI.adminGnb.tgEl;
			tgEl.$gnbMenuTarget.on('click', function(e){
				var $this = $(this),
					$subMenu = $this.next('ul'),
					subMenuLength = $subMenu.length;

				if ( subMenuLength ) {
					e.preventDefault();

					if($this.hasClass("active")){
						tgEl.$gnbMenuTarget.siblings().css('background','none');
					}
				}
			});
		},
		__subAllOpen : function() {
			var tgEl = feUI.adminGnb.tgEl;
			tgEl.$gnbMenuTarget.addClass(activeClass);
			tgEl.$gnbSubMenu.slideDown(aniSpeed);
			tgEl.$gnbMenuToggleBtn.text('닫기');
			feUI.adminGnb.__ariaExpanded();
		},
		__subAllClose : function() {
			var tgEl = feUI.adminGnb.tgEl;
			tgEl.$gnbMenuTarget.removeClass(activeClass);
			tgEl.$gnbSubMenu.slideUp(aniSpeed);
			tgEl.$gnbMenuToggleBtn.text('펼치기');
			feUI.adminGnb.__ariaExpanded();
		}
	}
	feUI.adminGnb.__init();

	// Window Event
	$window.on({
		'resize': function() {
			if ( winWidth !== $window.width() ) {
				winWidth = $window.width();
			}
			if ( winHeight !== $window.height() ) {
				winHeight = $window.height();
				headerHeight = $header.height();
			}
		},
		'scroll': function() {
			scrollTopPos = $window.scrollTop();
			feUI.aside.__scroll();
		},
		'load': function() {
		}
	});
})(feUI, jQuery, window, document);

	 // 도로명 주소 표기 방식에 대한 법령에 따라 내려오는 데이터 조합하여 올바른 주소 구성
     // 넘겨줄 데이터 : 우편번호(postCode) , 도로명 주소 (roadAddr) , 지번주소 (jibunAddr) , 참고항목 (extraAddr)
      function execPostCode(objPostCode, objRoadAddr, objJibunAddr, objExtraAddr) {
        new daum.Postcode({
            oncomplete: function(data) {

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById(objPostCode).value = data.zonecode;
                document.getElementById(objRoadAddr).value = roadAddr;
                document.getElementById(objJibunAddr).value = data.jibunAddress;
                document.getElementById(objExtraAddr).value = extraRoadAddr;

            }
        }).open();

    }
/**
 * jhchoi
 * 파라미터와 url을 입력받아 post로 url을 호출한다.
 * param : ex) params : {data : '1234', data2 : '5678'}, url : "<c:url value='/admin/expertRecruit/expertManagement/expertListExcel.do'/>"
 */
function formSubmit(params, url) {
	var $form = $("<form/>");
	for ([key, value] of Object.entries(params)) {
		$form.append(`<input type="hidden" name="` + key + `" value="` + value + `"/>`);
	}
	$form.append(`<input type="hidden" name="isFormSubmit" value=true/>`);

	//interceptor check용 추가
	$("body").append($form);
	$form.attr("method", "get").attr("action", url);
	$form.submit();
	$form.remove();
}

function formSubmitByPost(params, url) {
	var $form = $("<form/>");
	for ([key, value] of Object.entries(params)) {
		$form.append(`<input type="hidden" name="` + key + `" value="` + value + `"/>`);
	}
	$form.append(`<input type="hidden" name="isFormSubmit" value=true/>`);

	//interceptor check용 추가
	$("body").append($form);
	$form.attr("method", "post").attr("action", url);
	$form.submit();
	$form.remove();
}

/**
 * jhchoi
 * Object의 빈값을 체크한다. "", null, undefined 전부 true
 * param : ex) Object
 * return : ex) true/false
 */
function isEmpty(value){
	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
		if(value != null && typeof value == 'boolean'){
			return false;
		}
		return true;
	}else{
		return false;
	}
};

/**
 * 2023-05-02 jhchoi
 * 이메일 전송 팝업
 */
function sendEmailPopup(){

	//창 크기 지정
	var width = 800;
	var height = 810;

	//pc화면기준 가운데 정렬
	var left = (window.screen.width / 2) - (width/2);
	var top = (window.screen.height / 4);

    //윈도우 속성 지정
	var windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=yes, resizable=yes, titlebar=yes';
    const url = CP + "/ekt/common/cmmnSendMailForm.do";
	window.open("", "sendMailPopup", windowStatus);

	var frm = $('#sendMailInfoForm');
	frm.attr('target', 'sendMailPopup');
	frm.attr('action', url);
	frm.submit();

}

/**
 * 2023-05-02 jhchoi
 * sms 전송 팝업
 */
function sendSmsPopup(){

	//창 크기 지정
	var width = 800;
	var height = 598;

	//pc화면기준 가운데 정렬
	var left = (window.screen.width / 2) - (width/2);
	var top = (window.screen.height / 4);

    //윈도우 속성 지정
	var windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=yes, resizable=yes, titlebar=yes';
    const url = CP + "/common/cmmnSendSmsForm.do";
	window.open("", "sendSmsPopup", windowStatus);

	var frm = $('#send_sms_info_form');
	frm.attr('target', 'sendSmsPopup');
	frm.attr('action', url);
	frm.submit();

}

/**
 * 2023-05-19 jhchoi
 * 우편번호 검색 v2
 */
function execPostCodeV2(objPostCode, objSelAddr, objExtraAddr, objDetailAddr) {
    new daum.Postcode({
        oncomplete: function(data) {
    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

   			// 사용자가 선택한 주소가 도로명 타입일 떄 참고항목을 조합

   		   if(data.userSelectedType === 'R'){

   			  // 법정동명이 있을 경우 추가한다. (법정리는 제외)
           	  // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            	if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
               	   extraAddr += data.bname;
                }

                 // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }

                  document.getElementById(objExtraAddr).value = extraAddr;
   			}
   			else {
   				 document.getElementById(objExtraAddr).value = '';
   			}


            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById(objPostCode).value = data.zonecode;
            document.getElementById(objSelAddr).value = addr;
			try {
            	document.getElementById(objDetailAddr).focus();
      		} catch (e) {
			}
        }
    }).open();
}

/*
 *oz리포트 호출
 */
function ozCall(ozUrl, params, popupTop, popupLeft, popupWidth, popupHeight){

	//팝업 옵션 설정
	var option = "fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes";

	//팝업 명칭 설정
	var popWinName = "ozForm";

	// 전송 폼 설정
	var $form = $("<form/>");
	for ([key, value] of Object.entries(params)) {
		$form.append(`<input type="hidden" name="` + key + `" value="` + value + `"/>`);
	}
	$("body").append($form);
	$form.attr("name", "ozForm").attr("method", "post").attr("action", ozUrl);


	var Top = popupTop;
	var Left = popupLeft;
	if (Top < 0) Top = 0;
	if (Left < 0) Left = 0;
	if(popupWidth<1) popupWidth = 1;
	if(popupHeight<1) popupHeight = 1;

	option = option + ",width=" + popupWidth + ",height=" + popupHeight+",left=" + Left + ",top=" + Top;

	//팝업 생성
	var openedWindow = window.open("", popWinName, option);

	var ozForm = document.ozForm ;

	//폼의 action 대상을 팝업으로 설정
	ozForm.target = popWinName;
	ozForm.submit();
	$form.remove();
}



