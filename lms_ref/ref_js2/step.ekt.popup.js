window.StepEkt = window.StepEkt || {};

StepEkt.popFileSelect = function(options) {
	defaultOption = {
		max : 1,
		list_target : '',
		file_obj : '',
		button : '',
		image : '',
		callback : function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var $popup = null;
	var fileArray = new Array();
	var curr = 0;
	var max = options.max;
	var list_target = options.list_target;
	var file_obj = options.file_obj;
	var button = options.button;
	var image = options.image;
	var popupStr = `
		<div class="pop-wrap pop-upload">
			<div class="pop-in middle">
				<div class="pop-cont">
					<div class="pop-header flex2">
						<span>업로드</span>
						<img class="close" src="` + CP + `/img/pop_close.png" alt="닫기" btnClose>
					</div>
					<div class="pop-body" areaFile>
						<div class="file-upload">
							<span>이곳을 <em>더블클릭</em> 또는 <em>파일을 드래그</em> 하세요.</span>
						</div>
					</div>
					<div class="body-button">
						<button btnFildFind><img src="` + CP + `/img/file-search.png">파일찾기</button>
					</div>
				</div>
			</div>
		</div>
	`;
	$("body").append($popup);

	file_obj.on("change", function(evt) {
		evt.preventDefault();
		addFile(1, file_obj[0].files, null);
		options.callback();
		return false;
	});

	function showPopup() {
		$popup = $(popupStr);
		$("body").append($popup);
		popLayerOpen($popup);

		$popup.find("[btnClose]").on("click", function(evt) {
			evt.preventDefault();
			$popup.remove();
			options.callback();
			return false;
		});
		$popup.find("[btnFildFind]").on("click", function(evt) {
			evt.preventDefault();
			file_obj.trigger("click");
			return false;
		});
		$popup.find("[areaFile]").on("dblclick", function(evt) {
			evt.preventDefault();
			file_obj.trigger("click");
			return false;
		}).on("dragenter", function(evt) {
			evt.preventDefault();
			$(this).css('background-color', '#E3F2FC');
		}).on("dragleave", function(evt) {
			evt.preventDefault();
			$(this).css('background-color', '#FFFFFF');
		}).on("dragover", function(evt) {
			evt.preventDefault();
			$(this).css('background-color', '#E3F2FC');
		}).on("drop", function(evt) {
			evt.preventDefault();
			$(this).css('background-color', '#FFFFFF');
			var files = evt.originalEvent.dataTransfer.files;
			addFile(1, files, null);
			options.callback();
		});
	}
	function addFile(type, files, oldFiles) {
		if (type == 1) {
			var files_length = (files != undefined && files != "undefined") ? files.length : 1;

			if (max < curr + files_length) {
				file_obj.val("");
				alert("첨부파일 개수는 [" + max + "]까지 첨부할 수 있습니다!");
				return;
			}

			$.each(files, function(idx, file) {
				if (list_target != "") {
					var $newRow = $(`<div class="file_add_` + idx + `" style="margin-top:5px;"><span filename>` + file.name + `</span>&nbsp;
						<span btnDel>&nbsp;<img src="/sta/images/pc/template/common/btn_delete_s.gif" style="display:inline-block; vertical-align:middle;"/></span></div>`);
					list_target.append($newRow);
					list_target.show();
					$newRow.find("[btnDel]").click(function(evt) {
						evt.preventDefault();
						if (confirm(MSG_ASK_DEL)) {
							$(this).remove();
							if (list_target.find("span[filename]").length == 0) {
								list_target.hide();
							}
							if (image != null) {
								image.attr("src", "");
								image.hide();
							}
						}
						return false;
					});
					$newRow.on("mouseover", function(evt) {
						$(this).css("cursor", "pointer");
					});
					$newRow.on("DOMNodeRemoved", function(evt) {
						evt.preventDefault();
						var filteredArray = fileArray.filter(element => element !== file);
						fileArray = filteredArray;
						$newRow.remove();
						curr--;
						return false;
					});
				}
				fileArray.push(file);console.log('fileArray', fileArray);
				const dataTransfer = new DataTransfer();
//                let trans = $('#egovComFileUploader')[0].files;
//                let filearray = Array.from(trans);
//                filearray.splice(i, 1);
                fileArray.forEach(file => {
                    dataTransfer.items.add(file);
                });
                $('#egovComFileUploader')[0].files = dataTransfer.files
				curr++;
				if (image != null) {
					$("#ulLogo").remove();
					var reader = new FileReader();
					reader.onload = function(e) {
						image.show();
						image.attr("src", e.target.result);
					}
					reader.readAsDataURL(file);
				}
			});

			$popup.remove();
		} else {
			$.each(oldFiles, function(idx, file) {
				if (list_target != "") {
					var $newRow = $(`<div class="file_add_` + idx + `" style="margin-top:5px;"><span filename>` + file.name + `</span>&nbsp;<span btnDel><img src="/sta/images/pc/template/common/btn_delete_s.gif" style="display:inline-block; vertical-align:middle;"></span></div>`);
					list_target.append($newRow);
					list_target.show();
					$newRow.find("[filename]").click(function(evt) {
						evt.preventDefault();
						StepEkt.doFileDown(file.url);
						return false;
					});
					$newRow.find("[btnDel]").click(function(evt) {
						evt.preventDefault();
						if (confirm(MSG_ASK_DEL)) {
							$(this).remove();
							if (list_target.find("span[filename]").length == 0) {
								list_target.hide();
							}
							if (image != null) {
								image.attr("src", "");
								image.hide();
							}
						}
						return false;
					});
					$newRow.on("mouseover", function(evt) {
						$(this).css("cursor", "pointer");
					});
					$newRow.on("DOMNodeRemoved", function(evt) {
						evt.preventDefault();
						$newRow.remove();
						curr--;
						try {
							if (file.del) {
								file.del();
							}
						} catch (e) {
							console.error(e);
						}
						return false;
					});
				}
				curr++;
			});
		}
	}

	if (image != null && image != '') {
		if (image.attr("src") == undefined || image.attr("src") == "") {
			image.hide();
		} else {
			image.show();
		}
		image.on("error", function() {
			image.hide();
		});
	}

	if (button != "") {
		button.on("click", function(evt) {
			evt.preventDefault();
			showPopup();
			return false;
		});
	}

	return {
		getFiles : function() {
			return fileArray;
		},
		showPopup : function() {
			showPopup();
		},
		addFiles : function(oldFiles) {
			addFile(2, null, oldFiles);
		}
	};
};

StepEkt.popSurvey = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var title_str = options.mode == 'I'?'추가':'수정';

	var popupStr = `
		<div class="pop-wrap pop-up" popSrvy>
			<div class="pop-in middle">
				<div class="pop-cont">
					<div class="pop-header flex2">
						<span>카테고리 `+title_str+`</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
					</div>
					<div class="pop-body">
						<table class="table_normal mt0" style="border-top:0;">
							<colgroup>
								<col width="30%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="al bb-Center">카테고리 명</th>
									<td class="al" >
										<input type="text" name="ctgry_nm" class="form-control basic" style="width:100%;" >
									</td>
								</tr>
								<tr>
									<th class="al bb-Center">게시여부</th>
									<td class="al" >
										<label class="checkbox">
											<input type="checkbox" name="pstg_yn"><i></i>
										</label>
									</td>
								</tr>
							</tbody>
						</table>
	                    <div class="bottom flex justify-content-center mt-10">
	                        <button class="btnBasic" btnSave>저장</button>
	                    </div>
					</div>
				</div>
			</div>
		</div>
	`;

	var $popup = $(popupStr);
	var bodyOverflow = $("body").css("overflow");
	$("body").append($popup).css("overflow", "hidden");
	popLayerOpen($popup);



	if(options.mode == 'U'){

		var params = {};
		params["ctgry_cd"] = options.ctgry_cd;

		StepEkt.ajax({
			url: CP + "/mngs/ekt/selectSrvyCtgry.do",
			data: params,
			method: "POST",
			async: true,
			success: function(response) {
				let data = response.data;
				console.log(data);
				$popup.find('[name="ctgry_nm"]').val(data.CTGRY_NM);
				if(data.PSTG_YN == 'Y'){
					$popup.find('[name="pstg_yn"]').prop('checked', true);
				}
			},
			fail: function(result, data) {
				alert('failed');
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert("작업 중 오류가 발생했습니다.");
				} else {
					alert(data);
				}
			}
		});

	}









	$popup.find("[btnClose]").click(function(evt) {
		evt.preventDefault();
		try { $("body").css("overflow", bodyOverflow); } catch (e) {}
		$popup.remove();
		return false;
	});

	$popup.find("[btnSave]").click(function(evt) {
		evt.preventDefault();

		if($popup.find('[name="ctgry_nm"]').val() == ''){
			alert('카테고리 이름을 입력해 주시기 바랍니다.');
			return ;
		}


		var params = {};
		params["ctgry_nm"] = $popup.find('[name="ctgry_nm"]').val();
		params["pstg_yn"] = $popup.find('[name="pstg_yn"]').is(':checked')?'Y':'N';
		if(options.mode == 'U'){
			params["ctgry_cd"] = options.ctgry_cd;
		}


		StepEkt.ajax({
			url: CP + "/mngs/ekt/srvyCtgryReg.do",
			data: params,
			method: "POST",
			async: true,
			success: function(response) {
				let data = response.list;
				//opener.fnSearch(1);
				$("[btnSearch]").trigger("click");
				$popup.find("[btnClose]").trigger("click");
			},
			fail: function(result, data) {
				alert('failed');
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert("작업 중 오류가 발생했습니다.");
				} else {
					alert(data);
				}
			}
		});




		return false;
	});


};



/**
 * 엑셀 일괄 등록 (엑셀업로드)
 */
StepEkt.popExcelBatchReg = function(options) {
	defaultOption = {
		popupTitle : "일괄등록", //팝업타이블
		formDownloadUrl : null, //양식다운로드 url
		uploadUrl : null, //일괄등록 ajax url
		max : 1,
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var $popup = null;
	var fileArray = new Array();
	var max = options.max;

	var popupStr = `
		<div class="pop-wrap pop-up"  style="display: block;">
			<div class="pop-in middle">
				<div class="pop-cont">
					<div class="pop-header">
						<span> ` + options.popupTitle + `</span>
							<button type="button" class="pop-close-btn" btnClose><img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기"></button>
					</div>
					<div class="pop-body">`;
	if (!isEmpty(options.bodyHeader)) popupStr += `<h3>` + options.bodyHeader + `</h3>`;
	popupStr +=`
						<div class="btnArea">
							<button type="button" class="btnBasic" btnDownload>양식 다운로드</button>`;
    if (!isEmpty(options.eduYear) && !isEmpty(options.orgnztId)) popupStr += `<button type="button" class="btnBasic ml-5" btnCdDownload>코드정보다운로드</button>`;
	if (!isEmpty(options.neddOrgnztCd) && options.neddOrgnztCd == 'Y') popupStr += `<button type="button" class="btnBasic ml-5" btnOrgnztCdDownload>위탁기관코드</button>`;
	popupStr +=`
				        <button type="button" class="btnBasic" style="background: #0B60A1; color: #fff; border: 1px solid #0B60A1;" btnSave>일괄 등록</button>
						</div>
						<div class="pop-file-box mt-10" id="popDiv" >
							<span class="mr-5">엑셀파일 선택</span>
				            <input type="text" id = "fileName" readonly>
				            <button type="button" name="button" class="btnBasic" btnFildFind><img src="` + CP + `/asset/popup/img/file-search-ico.png" alt="">파일찾기</button>
						</div>
						<div class="pop-file-info ">
				            <p>주의사항</p>
				            <p>1. 파일 저장 시 엑셀 형식으로 저장해주십시오.</p>
				            <p>2. 양식 폼을 변경할 시 등록이 불가능합니다. 주의하여 주십시오.</p>
				            <p>3. 양식 파일의 필수항목 [*]은 꼭 입력하여 주십시오.</p>
				            <p>4. 양식 파일의 샘플 내용을 참고하여 작성하여 주십시오.</p>
				            <p>5. 엑셀의 셀 서식은 '일반' 또는 '텍스트' 형식으로 작성하여 주십시오.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);


	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	$popup.find("[btnSave]").click(function() {
		fnSave();
		return false;
	});

	//양식 파일 명
	let formFileName = options.formFileName;

	$popup.find("[btnDownload]").click(function() {
		const params = {viewFileNm : formFileName
						, realFileNm : formFileName};
		const url = options.formDownloadUrl;
		formSubmit(params, url);
		return false;
	});

	//수강생 청강생 일괄등록용 코드 다운로드
	$popup.find("[btnCdDownload]").click(function() {
		const params = {eduYear : options.eduYear
						, orgnztId : options.orgnztId
						, dgrId : options.dgr};
		const url = CP+ '/mngs/ekt/integratedMng/stdntAndAdtngMng/batchCodeInfoExcelDownload.do';
		formSubmit(params, url);
		return false;
	});

	//사용자 일괄등록용 위탁기관코드 다운로드
	$popup.find("[btnOrgnztCdDownload]").click(function() {
		const params = {};
		const url = CP+ '/mngs/ekt/integratedMng/userMng/batchOrgnztCodeExcelDownload.do';
		formSubmit(params, url);
		return false;
	});

	function fnSave() {
		fileUpload();
	}

	var $fileObj = $("<input type='file' style='display : none;' accept='.xlsx, .xls' multiple/>");
	$("#popDiv").append($fileObj);
	popLayerOpen($popup);


	$popup.find("[btnFildFind]").on("click", function(evt) {
		evt.preventDefault();
		$fileObj.trigger("click");
		return false;
	});

	$fileObj.on("change", function(evt) {
		evt.preventDefault();
		addFile($fileObj[0].files);
		return false;
	});

	function addFile(files) {
		var files_length = (files != "undefined") ? files.length : 1;

		if (max < files_length) {
			$fileObj.val("");
			alert("첨부파일 개수는 " + max + "개 까지 첨부할 수 있습니다.");
			return;
		}

		fileArray = [];
		if ($popup.find("#fileName").val() != "") {
			$popup.find("#fileName").val("");
		}

		$.each(files, function(idx, file) {
			$popup.find("#fileName").val(file.name);
			fileArray.push(file);
		});
	}


	function fileUpload(){
		var files = fileArray;
		if (files.length > 0) {
			if (confirm("일괄 등록 하시겠습니까?")) {
				var formData = new FormData();
				formData.set("files", files[0]);
				formData.set("realFileNm", formFileName);
				StepEkt.ajax({
					url: options.uploadUrl,
					data: formData,
					method: "POST",
					success: function(data) {
						$popup.remove(); //팝업 닫기
						//결과 팝업 표시
						StepEkt.popExcelBatchResult({
							formValidation : data.formValidation,
							base64Excel : data.base64Excel,
							totalCount : data.totalCount,
							sucessCount : data.sucessCount,
							failCount : data.failCount,
							callback: function() {
								options.callback();
							}
						});
					},
					fail: function(result, data) {
						if (result == -3) {
							alert(data);
						} else if (result == 1) {
							alert("에러발생!");
						} else {
							alert(data);
						}
						$popup.remove();
					}
				});
			}
		}else{
			alert("업로드 할 파일이 없습니다.");
		}
	}
};

/*
 * 엑셀 일괄 업로드 결과
 */
StepEkt.popExcelBatchResult = function(options) {
	defaultOption = {
		popTitle : '업로드 결과', //팝업의 타이틀명
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var popupStr = `
		<div class="pop-wrap pop-up">
			<div class="pop-in middle">
				<div class="pop-cont">
					<div class="pop-header">
						<span>`+ options.popTitle + `</span>
						<button type="button" class="pop-close-btn" btnClose><img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기"></button>
					</div>
					<div class="pop-body" style="margin: 0 0 0;">`;
			if(isEmpty(options.formValidation)) {
				//양식 검증에 문제가 없을경우 업로드 결과 표시
				popupStr+= `<div class="pop-file-box mt-10" id="popDiv" >
								<span class="mr-5">일괄등록이 완료되었습니다.</span>
					            <button type="button" name="button" class="btnBasic verti_middle" btnResultDown>결과다운로드</button>
							</div>
							<div class="pop-file-info ">
					            <p>- 총 `+options.totalCount+`건</p>
					            <p>- 업로드 성공 `+options.sucessCount+`건</p>
					            <p>- 업로드 실패 `+options.failCount+`건</p>
							</div>`;
			} else {
				//양식검증이 실패했을경우
				popupStr+= `<div class="pop-file-info ">
					            <p>업로드된 파일 양식이 제공되는 양식과 다릅니다.</p>
							</div>`;
			}
		popupStr+=`</div>
				</div>
			</div>
		</div>`;


	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		options.callback();
		popLayerClose($popup);
		return false;
	});

	$popup.find("[btnResultDown]").click(function() {
		var byteCharacters = atob(options.base64Excel);
	    var byteNumbers = new Array(byteCharacters.length);
	    for (var i = 0; i < byteCharacters.length; i++) {
	        byteNumbers[i] = byteCharacters.charCodeAt(i);
	    }
	    var byteArray = new Uint8Array(byteNumbers);

	    // Byte 데이터를 Blob 객체로 변환 type은 .xlsx로 다운로드 되게 설정
	    var blob = new Blob([byteArray], {type: 'application/vnd.ms-excel'});

	    // Blob 객체를 가리키는 URL을 생성
	    var url = window.URL.createObjectURL(blob);

	    // 가상의 링크를 생성하고 클릭 이벤트를 발생시켜 파일을 다운로드
	    var downloadLink = document.createElement("a");
	    downloadLink.href = url;
	    downloadLink.download = "업로드 결과.xls";
	    document.body.appendChild(downloadLink);
	    downloadLink.click();
	    document.body.removeChild(downloadLink);


//		formSubmitByPost(params, url);
		return false;
	});

};

/**
 * 임시비밀번호 발급
 */
StepEkt.popSendTempPassword = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var popupStr = `
		<div class="pop-wrap pop-up" popCms>
			<div class="pop-in middle">
				<div class="pop-cont text_center">
					<div class="pop-header flex2">
						<span>전송수단 선택</span>
						<button type="button" class="pop-close-btn" btnClose>
							<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기">
						</button>
					</div>
					<div class="pop-body">
						<p class ="mb-10">발급한 임시비밀번호의 전송 수단을 선택해주세요</p>
						<div class="input-radio mb-10">
			              <label class="radio">
			                <input type="radio" name="sendMethod" value="001" sendType checked>
			                <i></i>
			                <span>이메일</span>
			              </label>
			              <label class="radio">
			                <input type="radio" name="sendMethod" value="002" sendType>
			                <i></i>
			                <span>문자(SMS)</span>
			              </label>
			            </div>
					</div>
					<div class="body-button">
						<button type="button" btnConfirm>전송</button>
						<button type="button" btnClose>취소</button>
		        	</div>
				</div>
			</div>
			<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	//취소버튼
	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	//전송버튼
	$popup.find("[btnConfirm]").click(function() {
		StepEkt.ajax({
			url: CP+ userMngURL + '/sendTempPassword.do',
			data: {prsnlDstnInhrNo : options.prsnlDstnInhrNo,
					userId : options.userId,
					userNm : options.userNm,
					mblpNo : options.mblpNo,
					eml : options.eml,
					sendType : $popup.find("[sendType]:checked").val()},
			method: "GET",
			success: function(response) {
				console.log(response);
				alert("발송 되었습니다.");
				$popup.remove();
				return false;
			},
			fail: function(result, data) {
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert(MSG_SAVE_ERROR);
				} else {
					alert(data);
				}
			}
		});
	});
};

/**
 * sms전송
 */
StepEkt.popSendSms = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var popupStr = `
			    <div class="pop-wrap pop-up" id="pop-sms-send">
			        <div class="pop-in middle">
			            <div class="pop-cont">
			                <div class="pop-header flex2">
			                    <span>SMS발송</span>
								<button type="button" class="pop-close-btn" btnClose>
									<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기">
								</button>
			                </div>
			                <div class="pop-body">
			                    <div class="flex justify-content-between">
			                        <div class="tbl">
			                            <table class="table_normal mt0" style="border-top:0;">
			                                <colgroup>
			                                    <col width="10%">
			                                    <col width="90%">
			                                </colgroup>
			                                <tbody id="listForm">
			                                    <tr>
			                                        <th class="al bb-Center">문자유형</th>
			                                        <td class="al">
			                                            <div class="input-radio">
			                                                <label><input type="radio" name="isKoreatech" id="isKoreatechY" value="Y"> SMS</label>
			                                                <label><input type="radio" name="isKoreatech" id="isKoreatechY" value="Y">LMS</label>
			                                            </div>
			                                        </td>
			                                    </tr>
			                                    <tr>
			                                        <th class="al bb-Center">수신자</th>
			                                        <td class="al">
			                                            <div class="recipients">
			                                                <p>[정승규]010-****-0506</p>
			                                            </div>
			                                            <div class="flex justify-content-between">
			                                                <div class="per">
			                                                    <img src="` + CP + `/asset/img/per.png" alt="인원이미지">
			                                                    <p>총<em>1</em>명</p>
			                                                </div>
			                                                <button type="button" class="btnBasic btnDisabled">선택번호삭제</button>
			                                            </div>
			                                        </td>
			                                    </tr>
			                                </tbody>
			                            </table>
			                        </div>
			                        <div class="sms-writing">
			                            <div class="phone">
			                                <textarea name="sms" id="sms-writ" cols="30" rows="10"></textarea>
			                                <p class="limit">0/80btye</p>
			                                <button class="send-btn">전송</button>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>`;

	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		$popup.remove();
		return false;
	});
};

StepEkt.popCntList = function(options) {
	defaultOption = {
		pageUnit: 20,
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	let params = {};
	let currPage = 0;
	const ektCrsType = options.ektCrsType;
	const ektCrsTypeNm = options.ektCrsTypeNm;
	const popupStr = `
		<div class="pop-wrap pop-up">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>과정 검색</span>
						<img class="close" src="` + CP + `/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
	                    <table class="table_normal mt0">
	                        <colgroup>
	                            <col width="20%">
	                            <col width="30%">
	                            <col width="20%">
	                            <col width="30%">
	                        </colgroup>
	                        <tbody>
	                            <tr>
	                                <th class="al bb-Center">개발년도</th>
	                                <td class="al">
										<select class="selectpicker w_104" searchYear>
											<option value="">전체</option>
										</select>
									</td>
									<th class="al bb-Center">사업구분</th>
	                                <td class="al" >
										<select class="selectpicker w_104" searchBizGubun>
											<option value="">전체</option>
											<option value="01">일반</option>
											<option value="02">KDC</option>
											<option value="05">가상훈련</option>
										</select>
									</td>
	                            </tr>
	                            <tr>
	                                <th class="al bb-Center">과목명</th>
	                                <td class="al" colspan="3"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" searchCrsNm></td>
	                            </tr>
	                        </tbody>
	                    </table>
	                    <div class="btnArea tx-right mt-10 mb-10">
	                        <button class="btnBasic" btnInit>초기화</button>
	                        <button class="btnBasic" btnSearch>조회</button>
	                    </div>
	                    <div class="flex-tbl-bx" style="height:100%; min-height:390px; width:100%; min-width:750px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    </div>`;
	const $popup = $(popupStr);
	const bodyOverflow = $("body").css("overflow");

	if (ektCrsType == "") {
		alert("교육유형을 선택하세요.");
		return false;
	}

	$("body").append($popup).css("overflow", "hidden");
	popLayerOpen($popup);

	((start, end) => {
		const $select = $popup.find("[searchYear]");
		for (let idx = end ; idx >= start; idx--) {
			$select.append("<option value='" + idx + "'>" + idx + "</option>");
		}
		$('.selectpicker').selectpicker('refresh');
	})(options.startYear, options.endYear);

	const gridHolderId = StepEkt.random("gridHolderId_");

	$popup.on("keydown", "[searchCrsNm]", function(evt) { if (evt.keyCode == 13) { evt.preventDefault(); fnSearch(1); }});
	$popup.find("[gridHolder]").attr("id", gridHolderId);
	$popup.find("[btnClose]").click(function(evt) {
		evt.preventDefault();
		try { $("body").css("overflow", bodyOverflow); } catch (e) {}
		$popup.remove();
		return false;
	});
	$popup.find("[btnSearch]").click(function(evt) {
		evt.preventDefault();
		fnSearch(1);
		return false;
	});
	$popup.find("[btninit]").click(function(evt) {
		$popup.find("[searchYear]").val('');
		$popup.find("[searchCrsNm]").val('');
		$popup.find("[searchBizGubun]").val('');
		fnSearch(1);
		return false;
	});

	const stepGrid = StepGrid.create({
		parentId : gridHolderId,
		horizontalScrollPolicy : "on",
		layout : {
			columns : [
				{ headerText : "No.", dataField : "rnum", width : 60 },
				{ headerText : "소유기관", dataField : "entNm", width : 200  },
				{ headerText : "과목코드", dataField : "crsCd", width : 150  },
				{ headerText : "최초<br/>개발년도", dataField : "year", width : 80 },
				{ headerText : "과목명", dataField : "crsNm", width : 400 },
				{ headerText : "구매<br/>구분", itemRenderer : "HtmlItem", labelJsFunction : "fnEudCrsTypeNm", width : 100 },
				{ headerText : "최근등록일<br/>(최근수정일)", dataField : "frstRegDt", itemRenderer : "HtmlItem", labelJsFunction : "fnRegDate", width : 150 },
				{ headerText : "사업구분코드", dataField : "bizGubun", width : 80 ,visible : 'false'},
				{ headerText : "사업구분", dataField : "bizGubunNm", width : 80 }
			]
		},
		ready() {
			fnSearch(1);
		},
		scroll() {
			fnSearch(currPage + 1);
		},
		lblFunctions : {
			fnEudCrsTypeNm (item, value, column) {
				return ektCrsTypeNm;
			},
			fnRegDate (item, value, column) {
				const frstRegDt = item.frstRegDt;
				const chgRegDt = item.chgRegDt;

				if (chgRegDt != null && chgRegDt.length >= 8) {
					return chgRegDt;
				} else if (frstRegDt != null && frstRegDt.length >= 8) {
					return frstRegDt;
				}

				return "-";
			},
		},
		events : [
			{
				event : "itemClick",
				callback : function(event) {
					const rowIndex = stepGrid.getSelectedIndex();
					if (rowIndex < 0) {
						return false;
					}
					const crsInfo = stepGrid.getSelectedRowData(rowIndex);
					options.callback(crsInfo.crsCd, crsInfo.crsNm, crsInfo.bizGubun, crsInfo.sellInsId, crsInfo.sellInsNm, crsInfo.bizGubunNm);
					$popup.find("[btnClose]").trigger("click");
				}
			}
		]
	});
	function getParams() {
		let param = {
			p_ekt_crs_type : options.ektCrsType,
			p_search_year : $popup.find("[searchYear]").val(),
			p_search_crs_nm : $popup.find("[searchCrsNm]").val(),
			p_biz_gubun : $popup.find("[searchBizGubun]").val(),
			p_pageno : 1,
			p_listscale : options.pageUnit,
		};

		return param;
	}
	function fnSearch(page) {
		if (page == 1) {
			params = getParams();
		} else {
			params["p_pageno"] = page;
		}
		StepEkt.ajax({
			url: CP + "/mngs/ekt/selectCntListAjax.do",
			data: params,
			method: "GET",
				success: function(response) {
					let list = response.list;
					currPage = page;
					if (page == 1) {
						stepGrid.setData(list);
					} else {
						stepGrid.addData(list);
					}
				},
				fail: function(result, data) {
					if (result == -3) {
						alert(data);
					} else if (result == 1) {
						alert('실패하였습니다.');
					} else {
						alert(data);
					}
				}
		});
	}
};

StepEkt.popCrsCopy = function(options) {
	defaultOption = {
		crscd: "",
		crsNm: "",
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	let params = {};
	const popupStr = `
		<div class="pop-wrap pop-up">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>과정복사 팝업</span>
						<img class="close" src="` + CP + `/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
	                    <table class="table_normal mt0">
	                        <colgroup>
	                            <col width="20%">
	                            <col width="30%">
	                            <col width="20%">
	                            <col width="30%">
	                        </colgroup>
	                        <tbody>
	                            <tr>
	                                <th class="al bb-Center">과정명</th>
	                                <td class="al" colspan="3"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" crsNm></td>
	                            </tr>
	                        </tbody>
	                    </table>
	                    <div class="bottom flex justify-content-end mt-10">
	                        <button btnCopy>복사</button>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>`;
	const $popup = $(popupStr);
	const bodyOverflow = $("body").css("overflow");

	$("body").append($popup).css("overflow", "hidden");
	popLayerOpen($popup);

	$popup.find("[crsNm]").val(options.crsNm);
	$popup.find("[btnClose]").click(function(evt) {
		evt.preventDefault();
		try { $("body").css("overflow", bodyOverflow); } catch (e) {}
		$popup.remove();
		return false;
	});
	$popup.find("[btnCopy]").click(function(evt) {
		evt.preventDefault();
		if (confirm(options.confirmMsg)) {
			StepEkt.ajax({
				url: CP + "/mngs/ekt/crsCopyAjax.do",
				data: {
					targetCrscd : options.crscd,
					crsNm : $popup.find("[crsNm]").val()
				},
				method: "POST",
				success: function(response) {
					console.table(response);
					try { $("body").css("overflow", bodyOverflow); } catch (e) {}
					$popup.remove();
					options.callback();
				},
				fail: function(result, data) {
					if (result == -3) {
						alert(data);
					} else if (result == 1) {
						alert('실패하였습니다.');
					} else {
						alert(data);
					}
				}
			});
		}
		return false;
	});
};

/**
 * 2023-05-22
 * 기업검색 (IGR소스 가져옴)
 */
StepEkt.popEntSrch = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var params = {};
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>사업자 검색</span>
	                    <img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
	                    <table class="table_normal mt0" style="border-top:0;">
	                        <colgroup>
	                            <col width="10%">
	                            <col width="90%">
	                        </colgroup>
	                        <tbody id="listForm">
	                            <tr>
	                                <th class="al" style="text-align: right;">회사명</th>
	                                <td class="al bb-Center"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" placeholder="회사명" searchEntNm></td>
	                            </tr>
								<tr>
	                                <th class="al" style="text-align: right;">사업자등록번호</th>
	                                <td class="al bb-Center"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" maxlength="10" placeholder="사업자등록번호" searchBrno></td>
	                            </tr>
	                        </tbody>
	                    </table>
                        <div class="bottom flex justify-content-end mt-10">
							<!--button type="button" class="btnBasic" btnSelect><img src="` + CP + `/asset/popup/img/ok-btn.png">선택</button-->
							<button class="btnBasic mr-5" btnNewReg>신규등록</button>
                            <button class="btnBasic" btnSearch>검색</button>
                        </div>
	                    <div class="allbutton subtit_btn cf mt-10">
							<div class="headingBox subBox tx-left">
								<h4><i></i>사업자 목록</h4>
								<div class="countBox"><strong totalCount>0</strong>건</div>
							</div>
						</div>
						<div class="flex-tbl-bx mt-10" style="height:380px; min-height:380px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);
	if (!options.isUseNew) {	//신규등록 기능 제공 여부
		$popup.find("[btnNewReg]").hide();
	}
	popLayerOpen($popup);

	var gridHolderId = StepEkt.random("gridHolderId_");

	$popup.on("keydown", "[searchEntNm],[searchBrno]", function(e) { if (e.keyCode == 13) { e.preventDefault(); fnSearch(1); }});
	$popup.find("[gridHolder]").attr("id", gridHolderId);
	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});
	$popup.find("[btnNewReg]").click(function() {
		StepIgr.popEntReg({
			callback: function(data) {
				options.callback({"entCd": data.entCd ,"entNm": data.entNm });
				$popup.remove();

				return false;
			}
		});
	});
	$popup.find("[btnSearch]").click(function() {
		fnSearch(1);
		return false;
	});
	var grid = StepGrid.create({
		gridId : "popEntSrchGrid",
		parentId : gridHolderId,
		layout : {
			columns : [
				//{ type : "DataGridSelectorColumn", id : "selectorRadio", backgroundColor : "#EDEDF0", allowMultipleSelection : "false" },
				{ dataField : "rnum", headerText : "번호",  width : "60"},
				{ dataField : "entCd", headerText : "기업코드", visible : "false" },
				{ dataField : "entNm", headerText : "회사명", textAlign :"left" },
				{ dataField : "brno", headerText : "사업자등록번호",  width : "120" },
				{ dataField : "rprsvNm", headerText : "대표자",  width : "105" }
			]
		},
		scroll() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		events : [
			{
				event : "itemClick",
				callback : function(event) {
					console.log("진입1");
					let entInfo = grid.getSelectedRowData(event.rowIndex);

					if (options.isExistChkBM) {	//기업담당자 존재 여부 체크
						//2023-05-22 기업담당자 등록은 필요없어서 주석처리 기업담당자 체크 필요 시 구현
//						StepEkt.ajax({
//							url: CP + "/common/bmExistChkAjax.do",
//							data: {entCd:entInfo.entCd},
//							method: "POST",
//							async:false,
//							success: function(data) {
//								var isExistBm = data.isExistBm;
//
//								if (isExistBm == true) {
//									alert("선택 한 기업의 기업 담당자가 이미 존재하여 선택할 수 없습니다.");
//									return false;
//								}
//
//								options.callback(entInfo);
//								$popup.remove();
//							},
//							fail: function(result, data) {
//								if (result == -3) {
//									alert(data);
//								} else if (result == 1) {
//									alert("작업 중 오류가 발생했습니다.");
//								} else {
//									alert(data);
//								}
//							}
//						});
					} else {
						console.log("진입3");
						options.callback(entInfo);
						$popup.remove();
					}
					return false;
				}
			}
		]
	}, false, false);

	function getParams() {
		return {
			searchEntNm : $popup.find("[searchEntNm]").val(),
			searchBrno : $popup.find("[searchBrno]").val(),
			pageUnit : 20
		};
	}
	function fnSearch(page) {
		if (page == 1) {
			params = getParams();
		}
		params["pageIndex"] = page;

		StepEkt.ajax({
			url: CP + ektCommonURL+ "/entSearchAjax.do",
			data: params,
			type: "ekt",
			success: function(response) {
				var data = response;

				currPage = page;
				totalCount = data.totalCount;
				pageCount = data.pageCount;

				$popup.find("[totalCount]").text(totalCount);

				if (page == 1) {
					if (totalCount == 0) {
						grid.noData();
						if(options.noData == 'noDataConfirm') {
							if (confirm("소속회사 정보가 없습니다.\n직접 입력하시겠습니까?")) {
								var entInfo = null;
								options.callback(entInfo);
								$popup.remove();

								return false;
							}
						}
					} else {
						grid.setData(data.list);
					}
				} else {
					grid.addData(data.list);
				}
			},
			fail: function(result, data) {
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert("작업 중 오류가 발생했습니다.");
				} else {
					alert(data);
				}
			}
		});
	}
};

StepEkt.popItemInfo = function(options) {
	defaultOption = {
		contstype: "",
		cdnurlyn: "",
		lssn_cmpltn_base_useyn: "",
		progrs_chk_mthdz_cd: "",
		data: "",
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	const popupStr = `
		<div class="pop-wrap pop-up">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>목차 정보</span>
						<img class="close" src="` + CP + `/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
	                    <table class="table_normal mt0">
	                        <colgroup>
	                            <col width="20%">
	                            <col width="30%">
	                            <col width="20%">
	                            <col width="30%">
	                        </colgroup>
	                        <tbody>
	                            <tr>
	                                <th class="al bb-Center">상위목차ID</th>
	                                <td class="al" view_upitemid></td>
	                                <th class="al bb-Center">상위목차명</th>
	                                <td class="al" view_upitem_nm></td>
	                            </tr>
	                            <tr>
	                                <th class="al bb-Center">목차ID</th>
	                                <td class="al" view_itemid></td>
	                                <th class="al bb-Center">목차명</th>
	                                <td class="al" view_itemnm></td>
	                            </tr>
	                            <tr>
	                                <th class="al bb-Center">목차순서</th>
	                                <td class="al" view_itemOrder></td>
	                                <th class="al bb-Center">목차타입</th>
	                                <td class="al" view_itemType></td>
	                            </tr>
	                            <tr tr_item_contstype>
	                                <th class="al bb-Center">콘텐츠 타입</th>
	                                <td class="al" colspan="3" view_itemContstype></td>
	                            </tr>
	                            <tr tr_item_size>
	                                <th class="al bb-Center">콘텐츠 사이즈</th>
	                                <td class="al" colspan="3" view_itemWidthHeight></td>
	                            </tr>
	                            <tr tr_mobile_video_addr>
	                                <th class="al bb-Center">모바일 동영상 파일명</th>
	                                <td class="al" colspan="3" view_mobileVideoAddr></td>
	                            </tr>
	                            <tr tr_item_lssn_cmpltn_base>
	                                <th class="al bb-Center" td_item_lssn_cmpltn_base_title>기준시간</th>
	                                <td class="al" colspan="3" view_itemLssnCmpltnBase>
										<input type="hidden" p_item_lssn_cmpltn_base_cd/><!-- 목차 진도체크방식코드 -->
										<input type="text" value="0" maxlength="4" p_item_lssn_cmpltn_base>
										<span baseTimeType>%</span>
									</td>
	                            </tr>
	                            <tr tr_mobile_sco_time>
	                                <th class="al bb-Center">모바일 스코 기준시간</th>
	                                <td class="al" colspan="3" view_mobileScoTime></td>
	                            </tr>
	                            <tr tr_startpath>
	                                <th class="al bb-Center" td_startpath_title>시작경로</th>
	                                <td class="al" colspan="3" view_startpath>
										<input type="text" style="width:100%" p_startpath>
									</td>
	                            </tr>
	                            <tr tr_filenm>
	                                <th class="al bb-Center" td_filenm_title>변환대상파일위치</th>
	                                <td class="al" colspan="3" td_filenm_input>
										<input type="text" style="width:100%" p_filenm>
									</td>
	                            </tr>
	                            <tr tr_version>
	                                <th class="al bb-Center">버전</th>
	                                <td class="al" view_itemVersion></td>
	                                <th class="al bb-Center">맛보기 사용여부</th>
	                                <td class="al" view_previewyn></td>
	                            </tr>
	                        </tbody>
	                    </table>
	                </div>
	            </div>
	        </div>
	    </div>`;
	const $popup = $(popupStr);
	const bodyOverflow = $("body").css("overflow");

	(() => {
		const map = options.data.info;
		//목차ID
		if (map.ITEMID != null && map.ITEMID != "") {
			$popup.find("[view_itemid]").text(map.ITEMID); // 목차ID
		}
		//목차명
		if (map.ITEMNM != null && map.ITEMNM != "") {
			$popup.find("[view_itemnm]").text(map.ITEMNM); // 목차명
		}
		//상위 목차ID
		if (map.UPITEMID != null && map.UPITEMID != "") {
			$popup.find("[view_upitemid]").text(map.UPITEMID); // 상위목차ID
		}
		//상위 목차명
		if (map.UPITEMNM != null && map.UPITEMNM != "") {
			$popup.find("[view_upitem_nm]").text(map.UPITEMNM); // 상위목차명
		} else {
			if (map.ITEMID != null && map.ITEMID != "") {
				$popup.find("[view_upitem_nm]").text("콘텐츠 (root)"); // 상위목차명
			}
		}
		//목차순서
		if (map.ITEMORDER != null && map.ITEMORDER != "") {
			$popup.find("[view_itemOrder]").text(map.ITEMORDER); // 목차순서
		}
		//목차타입
		if (map.ITEMTYPE != null && map.ITEMTYPE != "") {
			$popup.find("[view_itemType]").text((map.ITEMTYPE == "L") ? "차시" : "스코");
		}
		//목차기준코드
		if (map.LSSN_CMPLTN_BASE_CD != null && map.LSSN_CMPLTN_BASE_CD != "") {
			$popup.find("[p_item_lssn_cmpltn_base_cd]").val(map.LSSN_CMPLTN_BASE_CD); // 목차 진도체크방식코드
		}
		//목차기준시간
		if (map.LSSN_CMPLTN_BASE != null && map.LSSN_CMPLTN_BASE != "") {
			$popup.find("[view_itemLssnCmpltnBase]").text(map.LSSN_CMPLTN_BASE + " 초"); // 기준시간
		}
		//모바일 동영상 주소
		if (map.MOBILE_VIDEO_ADDR != null && map.MOBILE_VIDEO_ADDR != "") {
			$popup.find("[view_mobileVideoAddr]").text(map.MOBILE_VIDEO_ADDR); // 모바일 동영상 파일명
		}
		//모바일 스코 기준시간
		if (map.MOBILE_SCO_TIME != null && map.MOBILE_SCO_TIME != "") {
			$popup.find("[view_mobileScoTime]").text(map.MOBILE_SCO_TIME); // 모바일 스코 기준시간
		}
		//파일이름
		if (map.FILENM != null && map.FILENM != "") {
			$popup.find("[p_filenm]").val(map.FILENM); // 변환대상파일위치
		}
		//시작경로
		if (map.STARTPATH != null && map.STARTPATH != "") {
			$popup.find("[view_startpath]").text(map.STARTPATH); // 콘텐츠 시작위치 or 스트리밍 주소
		}
		// map.ITEM_CONTSTYPE or H // 콘텐츠 타입
		$popup.find("[view_itemContstype]").text((map.CONTSTYPE == "H") ? "HTML" : "MP4");
		//콘텐츠 사이즈
		{
			var strItemWidthHeight = "";
			if (map.ITEM_WIDTH != null && map.ITEM_WIDTH != "") {
				strItemWidthHeight += "WIDTH : " + map.ITEM_WIDTH; // 콘텐츠 사이즈
			}
			strItemWidthHeight += (strItemWidthHeight != "") ? "     " : "";
			if (map.ITEM_HEIGHT != null && map.ITEM_HEIGHT != "") {
				strItemWidthHeight += "HEIGHT : " + map.ITEM_HEIGHT; // 콘텐츠 사이즈
			}
			$popup.find("[view_itemWidth]").text(strItemWidthHeight); // 콘텐츠 사이즈
		}
		//버전
		if (map.VERSION != null && map.VERSION != "") {
			$popup.find("[view_itemVersion]").text(map.VERSION); // 버전
		}
		//미리보기 사용여부
		if (map.PREVIEWYN != null && map.PREVIEWYN != "") {
			$popup.find("[view_previewyn]").text((map.PREVIEWYN == "Y") ? "사용" : "사용안함"); // 맛보기 사용여부
		}
		if (map.p_sspyn == "N") { //콘텐츠 조합여부 (hidden)
			$popup.find("[p_item_lssn_cmpltn_base]").prop("disabled", false); // 기준시간
			$popup.find("[p_startpath]").prop("disabled", false); // 콘텐츠 시작위치 or 스트리밍 주소
			$popup.find("[p_item_version]").prop("disabled", false); // 버전
		} else {
			$popup.find("[p_item_lssn_cmpltn_base]").prop("disabled", true); // 기준시간
			$popup.find("[p_startpath]").prop("disabled", true); // 콘텐츠 시작위치 or 스트리밍 주소
			$popup.find("[p_item_version]").prop("disabled", true); // 버전
		}
	})();

	(() => {
		const map = options.data.info;
		const p_contstype = options.contstype; //콘텐츠 스타일 (CONTSTYPE, F : FILE, H : HTML, I : MP4, E : ebook)
		const p_cdnurlyn = options.cdnurlyn; //CDN Url 사용여부 (Y, N)
		const p_lssn_cmpltn_base_useyn = options.lssn_cmpltn_base_useyn; //차시완료기준사용여부 (Y, N)
		const value = map.ITEMTYPE; // 목차타입 (L : 차시, O : 스코)
		if (value == "L") { // 차시
			$popup.find("[tr_filenm]").hide(); // 변환대상파일위치
			$popup.find("[tr_startpath]").hide(); // 시작경로
			$popup.find("[tr_previewyn]").hide(); // 없음
			$popup.find("[btn_item_PreView]").hide(); // 목차 미리보기
			$popup.find("[tr_item_lssn_cmpltn_base]").hide(); // 기준시간
			$popup.find("[tr_item_contstype]").hide(); // 콘텐츠 타입 (40074. I : MP4, H : HTML)
			$popup.find("[tr_item_size]").hide(); // 콘텐츠 사이즈 (width, height)
			$popup.find("[tr_version]").hide(); // 버전, 맛보기 사용여부
		} else if (value == "O") { // 스코
			if (p_contstype == "I") { // MP4
				$popup.find("[tr_filenm]").hide(); // 변환대상파일위치
				$popup.find("[td_startpath_title]").html("스트리밍 주소");
				$popup.find("[tr_startpath]").show(); // 시작경로
			} else {
				$popup.find("[td_startpath_title]").html("시작경로");
				if (p_contstype == "E") {// E-book의 경우 시작경로를 입력 받지 아니한다.
					$popup.find("[tr_startpath]").hide(); // 시작경로
				} else {
					$popup.find("[tr_startpath]").show(); // 시작경로
				}
				$popup.find("[tr_filenm]").hide(); // 변환대상파일위치
			}
			if (options.progrs_chk_mthdz_cd == "T") { // (PROGRS_CHK_MTHDZ_CD)
				$popup.find("[td_item_lssn_cmpltn_base_title]").text("기준시간");
				$popup.find("[baseTimeType]").html("초");
				$popup.find("[tr_item_lssn_cmpltn_base]").show(); // 기준시간
			} else {
				$popup.find("[td_item_lssn_cmpltn_base_title]").text("기준백분율");
				$popup.find("[baseTimeType]").html("%");
				$popup.find("[tr_item_lssn_cmpltn_base]").hide(); // 기준시간
			}
			$popup.find("[tr_version]").show(); // 버전, 맛보기 사용여부
			$popup.find("[btn_item_PreView]").show(); // 목차 미리보기
			$popup.find("[tr_previewyn]").show(); // 없음
			$popup.find("[tr_item_contstype]").show(); // 콘텐츠 타입 (40074. I : MP4, H : HTML)
		} else {
			$popup.find("[tr_filenm]").hide(); // 변환대상파일위치
			$popup.find("[tr_startpath]").hide(); // 시작경로
			$popup.find("[tr_previewyn]").hide(); // 없음
			$popup.find("[btn_item_PreView]").hide(); // 목차 미리보기
			$popup.find("[tr_item_lssn_cmpltn_base]").hide(); // 기준시간
			$popup.find("[tr_version]").hide(); // 버전, 맛보기 사용여부
			$popup.find("[tr_item_contstype]").hide(); // 콘텐츠 타입 (40074. I : MP4, H : HTML)
			$popup.find("[tr_item_size]").hide(); // 콘텐츠 사이즈 (width, height)
		}
	})();

	$("body").append($popup).css("overflow", "hidden");
	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function(evt) {
		evt.preventDefault();
		try { $("body").css("overflow", bodyOverflow); } catch (e) {}
		$popup.remove();
		return false;
	});
};

/*
 * 2023-05-31
 * 최재현 통합관리 - 사용자관리 - 개인이력 - 진도조회 - 학습이력 조회
 */
StepEkt.popCmiInfo = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var popupStr = `
		<div class="pop-wrap pop-up" popCms>
			<div class="pop-in middle">
				<div class="pop-cont">
					<div class="pop-header flex2">
						<span>학습 이력 - `+options.itemnm+`</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
					</div>
					<div class="pop-body">
						<div id = "cmiLogs"></div>
					</div>
				</div>
			</div>
			<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	//학습이력 조회
	StepEkt.getHtml({
		url: CP+ userMngURL + '/getCmiLogs.do',
		data: {crsseqId : options.crsseqId,
				usrid : options.usrid,
				contsid : options.contsid,
				itemid : options.itemid,
				upitemid : options.upitemid,
				complteyn : options.complteyn,
				cmiYear : options.cmiYear},
		callback: function(html) {
			//이력 jsp 추가
			$popup.find("#cmiLogs").html(html);
			//셀렉트박스 새로고침
			$('.selectpicker').selectpicker('refresh');

			//변경 클릭 이벤트 등록
			$popup.find("[btnComplteYn]").click(function() {
				btnComplteYn();
			});
		}
	});

	//목차 상태 변경 함수
	function btnComplteYn() {
		let param = {
			crsseqId : options.crsseqId,
			usrid : options.usrid,
			contsid : options.contsid,
			itemid : options.itemid,
			upitemid : options.upitemid,
			cmiYear : options.cmiYear
		};
		//기존 완료여부
		let oldComplteyn = options.complteyn;

		//변경 완료여부
		let chgComplteyn = $popup.find("[complteyn]").val();

		if(oldComplteyn == chgComplteyn) {
			alert("변경사항이 없습니다.");
			return false;
		}

		//매개변수 세팅
		param.complteyn = chgComplteyn;

		if(param.upitemid == 0) {
			if(confirm("회차의 모든 학습 이력이 변경됩니다. 변경하시겠습니까?")) {
				updateComplteYn(param)
			} else {
				return false;
			}
		} else {
			if(confirm("학습 이력을 변경하시겠습니까?")) {
				updateComplteYn(param)
			} else {
				return false;
			}
		}
	}

	function updateComplteYn(param) {
		//완료여부 수정
		StepEkt.ajax({
			url: CP+ userMngURL + '/updateCmiCompleteYn.do',
			data: param,
			method: "POST",
			success: function(response) {
				//기존 완료 여부 변경
				options.complteyn = param.complteyn;
				alert(MSG_SAVE_OKAY);
				fnProgInqSearch(1);
				crsseqNmClick(options.usrid, options.crsseqId,options.contsid, options.cmiYear);
				$popup.find("[btnClose]").click();
			},
			fail: function(result, data) {
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert(MSG_SAVE_ERROR);
				} else {
					alert(data);
				}
			}
		});


	}
};

StepEkt.popAssgnmSend = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var popupStr = `
    <div class="pop_layer" id="result_pop_send" style="display:block;">
      <div class="pop_content ekt_pop w_800">
        <div class="pop_hd">
          <button type="button" name="button" class="pop_close" btnClose><img src="` + CP + `/asset/popup/img/pop_close.png" alt=""></button>
        </div>
        <div class="pop_ekt_body">
          <div class="pop_ekt_tit">과제 제출하기</div>
          <div class="ekt_table ">
            <table>
              <colgroup>
                <!--<col style="width:25%">-->
                <col style="width:50%">
                <col style="width:50%">
              </colgroup>
              <thead>
                <tr>
                  <!--<th>과제유형</th>-->
                  <th>과제명</th>
                  <th>제출기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <!--<td reportType></td>-->
                  <td title></td>
                  <td sbmtPeriod></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ekt_table ekt_body_table  mt-15">
            <table>
              <colgroup>
                <col style="width:20%">
                <col style="width:80%">
              </colgroup>

              <tbody>
                <tr>
                  <th>과제</th>
                  <td class="pop_ekt_content_td">
					<div id="assgnmDext5Editor"></div>
					<div id="assgnmDext5Upload"></div>
                  </td>
                </tr>
                <tr>
                  <th>답안 작성</th>
                  <td class="pop_ekt_content_td">
                    <div id="userDext5Editor"></div>
                  </td>
                </tr>
                <tr>
                  <th>첨부파일</th>
                  <td class="file_td_box">
					<input type="hidden" atchFileId>
                    <div id="userDext5Upload" style="max-height:400px; overflow:auto;"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pop_ekt_btn">
            <button type="button" class="pop_black_btn mr-10" submit>제출하기</button>
            <button type="button" class="pop_gary_btn" temporalSave>임시저장</button>
          </div>
        </div>
      </div>
    </div>`;

	var $popup = $(popupStr);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	StepEkt.ajax({
		url: CP+ clssrmAssgnmURL + '/popAssgnmSendView.do',
		data: {reportId : options.reportId},
		method: "GET",
		success: function(response) {
			let assgnmInfo = response.assgnmInfo;
			let assgnmSbmsnInfoMap = response.assgnmSbmsnInfoMap;

			console.log("assgnmSbmsnInfoMap.ATCHFILE_ID : "+assgnmSbmsnInfoMap.ATCHFILE_ID);
			$popup.find("[reportType]").text(assgnmInfo.REPORT_TYPE_NM);
			$popup.find("[title]").text(assgnmInfo.TITLE);
			let report_sbmt = ``;
			if ( assgnmInfo == undefined || assgnmInfo.REPORT_SBMT_STRTDT == undefined ) {
				;
			}
			else {
				report_sbmt = assgnmInfo.REPORT_SBMT_STRTDT + ` ~ `;
			}
			if ( assgnmInfo == undefined || assgnmInfo.REPORT_SBMT_ENDDT == undefined ) {
				;
			}
			else {
				report_sbmt += assgnmInfo.REPORT_SBMT_ENDDT;
			}
			$popup.find("[sbmtPeriod]").text(report_sbmt);

			//첨부파일 id추가
			if(!isEmpty(assgnmSbmsnInfoMap.ATCHFILE_ID)) {
				$popup.find("[atchFileId]").val(assgnmSbmsnInfoMap.ATCHFILE_ID);
			}

			//팝업 표시
			$("body").append($popup);
			popLayerOpen($popup);

			//과제 dext5 에디터
			createDextEditor(assgnmInfo.CNTNT, "view", "150px", "assgnmDext5Editor");

			//업로드 생성로드 -> 생성후 DEXT5UPLOAD_OnCreationComplete 실행됨
			createDextUpload("view", "150px", "assgnmDext5Upload");

			//사용자 dext5 에디터, 업로더  로드
			createDextEditor(assgnmSbmsnInfoMap.CNTNT, "edit", "250px", "userDext5Editor");

			//업로드 생성로드 -> 생성후 DEXT5UPLOAD_OnCreationComplete 실행됨
			createDextUpload("edit", "150px", "userDext5Upload");
		},
		fail: function(result, data) {
			ajaxFailAlert(result, data);
			return false;
		}
	});

	var finalSubmit = false;

	$popup.find("[temporalSave]").click(function() {
		finalSubmit = false;
		if(!confirm("임시저장하시겠습니까?")) {
			return false;
		}
		//첨부파일 저장 -> 완료되면 DEXT5UPLOAD_OnTransfer_Complete 실행됨
		DEXT5UPLOAD.Transfer("userDext5Upload");

	});

	$popup.find("[submit]").click(function() {
		finalSubmit = true;
		if(!confirm("최종제출하시겠습니까?")) {
			return false;
		}
		//첨부파일 저장 -> 완료되면 DEXT5UPLOAD_OnTransfer_Complete 실행됨
		DEXT5UPLOAD.Transfer("userDext5Upload");
	});

	function getSendData() {
		return {
			reportId : options.reportId,
			cntnt :DEXT5.getBodyValueEx("userDext5Editor"),
			newUploadList : DEXT5UPLOAD.GetNewUploadListForJson("userDext5Upload"),
			deleteList : DEXT5UPLOAD.GetDeleteListForJson("userDext5Upload"),
			fnlSbmsnYn : finalSubmit ? "Y" : "N",
			atchFileId : $popup.find("[atchFileId]").val()
		};
	}

	/*팝업용 dext5 설정*/
	//dext5 에디터 설정
    function createDextEditor(convertContent, mode, heightStr, id) {
		let height = isEmpty(heightStr) ? "150px": heightStr;
        DEXT5.config.Height = height;
        DEXT5.config.Width = "100%";
        DEXT5.config.Mode = mode;
        DEXT5.setBodyValueEx(convertContent, id);
        DEXT5.config.EditorHolder = id;
		DEXT5.config.HandlerUrl = CP+"/editor/dext5editorHandler.do"; //CP에따라 요청하게 설정
        new Dext5editor(id);
    }

	//dext5업로더 설정
    function createDextUpload(mode, heightStr, id) {
		let height = isEmpty(heightStr) ? "150px": heightStr;
        DEXT5UPLOAD.config.Height = height;
        DEXT5UPLOAD.config.Width = "100%";
        DEXT5UPLOAD.config.MaxTotalFileCount = '1';
        DEXT5UPLOAD.config.Mode = mode;
        DEXT5UPLOAD.config.UploadHolder = id;
		DEXT5UPLOAD.config.HandlerUrl = CP+"/upload/dext5uploaderHandler.do"; //CP에따라 요청하게 설정
		DEXT5UPLOAD.config.Event = {
			CreationComplete : DEXT5UPLOAD_OnCreationComplete,	//생성 완료 후 실행
			TransferComplete : DEXT5UPLOAD_OnTransfer_Complete	//전송 완료 후 실행
		}
        new Dext5Upload(id);
    }

	//업로더 로딩 완료시 실행
	function DEXT5UPLOAD_OnCreationComplete(uploadID) {
		//console.log("DEXT5UPLOAD_OnCreationComplete 진입  uploadID : " + uploadID);
		//uploadType에 따라 서브디렉토리 설정. (아래 코드에선 'announcement')
		DEXT5UPLOAD.AddFormData("uploadType", "clssrm/assgnm", uploadID);
		//첨부파일 정보 조회

		StepEkt.ajax({
			url: CP+ clssrmAssgnmURL + '/assgnmAtchFileList.do',
			data: {reportId : options.reportId
			},
			method: "GET",
			success: function(response) {
				let assgnmAtchFileList = response.assgnmAtchFileList;
				let assgnmSbmsnAtchFileList = response.assgnmSbmsnAtchFileList;

				//업로더 아이디에따라 첨부파일 등록
				if(uploadID == "assgnmDext5Upload") {
					if (assgnmAtchFileList.length > 0) {
						assgnmAtchFileList.forEach((item, index) => DEXT5UPLOAD.AddUploadedFile(index + 1, item.ORIGIN_FILENM,
							item.FILE_PATH+"/"+item.SAVE_FILENM, item.FILE_SIZE, item.SAVE_FILENM, uploadID));
					}
				} else if (uploadID == "userDext5Upload") {
					if (assgnmSbmsnAtchFileList.length > 0) {
						assgnmSbmsnAtchFileList.forEach((item, index) => DEXT5UPLOAD.AddUploadedFile(index + 1, item.ORIGIN_FILENM,
							item.FILE_PATH+"/"+item.SAVE_FILENM, item.FILE_SIZE, item.SAVE_FILENM, uploadID));
					}
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data);
				return false;
			}
		});
	}

	//데이터 전송(DEXT5UPLOAD.Transfer(uploadID))직후(파일을 저장하고) 실행되는 함수
    function DEXT5UPLOAD_OnTransfer_Complete(uploadID) {

    	let sendData = getSendData();
		console.log(getSendData());
		StepEkt.ajax({
			url: CP+ clssrmAssgnmURL + '/assgnmSubmit.do',
			data: {param : JSON.stringify(sendData)},
			method: "POST",
			success: function(response) {
				alert(MSG_SAVE_OKAY);
				popLayerClose($popup);
				options.callback();
				return false;
			},
			fail: function(result, data) {
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert(MSG_SAVE_ERROR);
				} else {
					alert(data);
				}
			}
		});
	}
};

StepEkt.popAssgnmResult = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var popupStr = `
<div class="pop_layer" id="result_pop_view" style="display:block;">
      <div class="pop_content ekt_pop w_800">
        <div class="pop_hd">
          <button type="button" name="button" class="pop_close" btnClose><img src="` + CP + `/asset/popup/img/pop_close.png" alt=""></button>
        </div>
        <div class="pop_ekt_body">
          <div class="pop_ekt_tit">과제 결과 확인</div>
          <div class="ekt_table ">
            <table>
              <colgroup>
                <!--<col style="width:10%">-->
                <col style="width:30%">
                <col style="width:50%">
                <col style="width:20%">
              </colgroup>
              <thead>
                <tr>
                  <!--<th>과제유형</th>-->
                  <th>과제명</th>
                  <th>제출기간</th>
                  <th>취득점수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <!--<td reportType>A</td>-->
                  <td title>과제입니다.</td>
                  <td sbmtPeriod>2022-09-20 ~ 2022-09-22</td>
                  <td class="col_blue" fnlScr>80점</td>
                </tr>
                <tr>
                  <td colspan="4" class="pop_ekt_content_td">
                    <div id="assgnmDext5Editor"></div>
					<div id="assgnmDext5Upload"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pop_ekt_tit mt-40">제출정보</div>
          <div class="ekt_table ">
            <table>
              <colgroup>
                <col style="width:100%">
              </colgroup>
              <tbody>
                <tr>
                  <td class="pop_ekt_content_td">
                    <div id="userDext5Editor"></div>
					<div id="userDext5Upload" style="max-height:400px; overflow:auto;"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pop_ekt_tit mt-40">강사총평</div>
          <div class="ekt_table ekt_body_table">
            <table>
              <colgroup>
                <col style="width:20%">
                <col style="width:80%">
              </colgroup>

              <tbody>
				<tr>
                  <th>첨삭제목</th>
                  <td crctnGdncTitle>과제 내용 잘 확인했습니다.<br/>잘 서술하였습니다.</td>
                </tr>
                <tr>
                  <th>첨삭내용</th>
                  <td crctnGdncCntnt>
					<div id="crctnGdncCntntEditor"></div>
					<div id="crctnGdncCntntUploader" style="max-height:400px; overflow:auto;"></div>
				</td>
                </tr>
                <tr>
                  <th>등록일</th>
                  <td crctnDt>2022-09-23 10:00:00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pop_ekt_btn">
            <button type="button" class="pop_close pop_gary_btn" btnClose>닫기</button>
          </div>
        </div>
      </div>
    </div>`;

	var $popup = $(popupStr);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	StepEkt.ajax({
		url: CP+ clssrmAssgnmURL + '/popAssgnmResultView.do',
		data: {reportId : options.reportId},
		method: "GET",
		success: function(response) {
			let assgnmInfo = response.assgnmInfo;
			let assgnmSbmsnInfoMap = response.assgnmSbmsnInfoMap;
			$popup.find("[reportType]").text(assgnmInfo.REPORT_TYPE_NM);
			$popup.find("[title]").text(assgnmInfo.TITLE);
			$popup.find("[sbmtPeriod]").text(assgnmInfo.REPORT_SBMT_STRTDT + " ~ " + assgnmInfo.REPORT_SBMT_ENDDT);
			$popup.find("[fnlScr]").text(isEmpty(response.fnlResult.FNL_SCR) ? "-" : response.fnlResult.FNL_SCR);
			$popup.find("[crctnGdncTitle]").text(isEmpty(response.fnlResult.CRCTN_GDNC_TITLE) ? "-" : response.fnlResult.CRCTN_GDNC_TITLE);
			//$popup.find("[crctnGdncCntnt]").text(isEmpty(response.fnlResult.CRCTN_GDNC_CNTNT) ? "-" : response.fnlResult.CRCTN_GDNC_CNTNT);
			$popup.find("[crctnDt]").text(isEmpty(response.fnlResult.CRCTN_DT) ? "-" : response.fnlResult.CRCTN_DT);

			//팝업 표시
			$("body").append($popup);
			popLayerOpen($popup);

			//과제 dext5 에디터
			createDextEditor(assgnmInfo.CNTNT, "view", "150px", "assgnmDext5Editor");

			//업로드 생성로드 -> 생성후 DEXT5UPLOAD_OnCreationComplete 실행됨
			createDextUpload("view", "150px", "assgnmDext5Upload");

			//사용자 dext5 에디터, 업로더  로드
			createDextEditor(assgnmSbmsnInfoMap.CNTNT, "view", "150px", "userDext5Editor");

			//업로드 생성로드 -> 생성후 DEXT5UPLOAD_OnCreationComplete 실행됨
			createDextUpload("view", "150px", "userDext5Upload");

			//첨삭 에디터
			createDextEditor(response.fnlResult.CRCTN_GDNC_CNTNT, "view", "150px", "crctnGdncCntntEditor");

			//첨삭 업로드
			createDextUpload("view", "150px", "crctnGdncCntntUploader");
		},
		fail: function(result, data) {
			ajaxFailAlert(result, data);
		}
	});

	/*팝업용 dext5 설정*/
	//dext5 에디터 설정
    function createDextEditor(convertContent, mode, heightStr, id) {
		let height = isEmpty(heightStr) ? "150px": heightStr;
        DEXT5.config.Height = height;
        DEXT5.config.Width = "100%";
        DEXT5.config.Mode = mode;
        DEXT5.setBodyValueEx(convertContent, id);
        DEXT5.config.EditorHolder = id;
		DEXT5.config.HandlerUrl = CP+"/editor/dext5editorHandler.do"; //CP에따라 요청하게 설정
        new Dext5editor(id);
    }

	//dext5업로더 설정
    function createDextUpload(mode, heightStr, id) {
		let height = isEmpty(heightStr) ? "150px": heightStr;
        DEXT5UPLOAD.config.Height = height;
        DEXT5UPLOAD.config.Width = "100%";
        DEXT5UPLOAD.config.MaxTotalFileCount = '10';
        DEXT5UPLOAD.config.Mode = mode;
        DEXT5UPLOAD.config.UploadHolder = id;
		DEXT5UPLOAD.config.Event = {
			CreationComplete : DEXT5UPLOAD_OnCreationComplete,	//생성 완료 후 실행
		}
        new Dext5Upload(id);
    }

	//업로더 로딩 완료시 실행
	function DEXT5UPLOAD_OnCreationComplete(uploadID) {
		//console.log("DEXT5UPLOAD_OnCreationComplete 진입  uploadID : " + uploadID);
		//uploadType에 따라 서브디렉토리 설정. (아래 코드에선 'announcement')
//		DEXT5UPLOAD.AddFormData("uploadType", "clssrm/assgnm", uploadID);
		//첨부파일 정보 조회

		StepEkt.ajax({
			url: CP+ clssrmAssgnmURL + '/assgnmAtchFileList.do',
			data: {reportId : options.reportId},
			method: "GET",
			success: function(response) {
				let assgnmAtchFileList = response.assgnmAtchFileList;
				let assgnmSbmsnAtchFileList = response.assgnmSbmsnAtchFileList;
				let assgnmCmtAtchFileList = response.assgnmCmtAtchFileList;

				//업로더 아이디에따라 첨부파일 등록
				if(uploadID == "assgnmDext5Upload") {
					if (assgnmAtchFileList.length > 0) {
						assgnmAtchFileList.forEach((item, index) => DEXT5UPLOAD.AddUploadedFile(index + 1, item.ORIGIN_FILENM,
							item.FILE_PATH+"/"+item.SAVE_FILENM, item.FILE_SIZE, item.SAVE_FILENM, uploadID));
					}
				} else if (uploadID == "userDext5Upload") {
					if (assgnmSbmsnAtchFileList.length > 0) {
						assgnmSbmsnAtchFileList.forEach((item, index) => DEXT5UPLOAD.AddUploadedFile(index + 1, item.ORIGIN_FILENM,
							item.FILE_PATH+"/"+item.SAVE_FILENM, item.FILE_SIZE, item.SAVE_FILENM, uploadID));
					}
				} else if (uploadID == "crctnGdncCntntUploader") {
					console.log("assgnmCmtAtchFileList",assgnmCmtAtchFileList);
					if (assgnmCmtAtchFileList.length > 0) {
						assgnmCmtAtchFileList.forEach((item, index) => DEXT5UPLOAD.AddUploadedFile(index + 1, item.ORIGIN_FILENM,
							item.FILE_PATH+"/"+item.SAVE_FILENM, item.FILE_SIZE, item.SAVE_FILENM, uploadID));
					}
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data);
			}
		});
	}

};


StepEkt.popSrvy = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var popupStr = `
    <div class="pop_layer" id="poll_start" style="display:block;">
      <div class="pop_content ekt_pop w_800">
        <div class="pop_hd">
          <button type="button" name="button" class="pop_close" btnClose><img src="` + CP + `/asset/popup/img/pop_close.png" alt=""></button>
        </div>
        <div class="pop_ekt_body">
          <div class="pop_ekt_tit">`+
//                  설문지 - <span srvyTtl>설문지명</span>
         `  </div>
		  <div srvyQstnBody></div>
          <div class="pop_ekt_btn">
            <button type="button" class="pop_close pop_black_btn" srvySbmit>설문제출</button>
          </div>
        </div>
      </div>
    </div>`;

	var $popup = $(popupStr);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	StepEkt.ajax({
		url: CP+ clssrmSrvyURL + '/popSrvyView.do',
		data: {srvyDmndId : options.srvyDmndId,
		       srvyCd: options.srvyCd},
		method: "GET",
		success: function(response) {
			//설문 제목
			$popup.find("[srvyTtl]").text(response.SRVY_TTL);

			//문항 리스트
			let srvyQstnList = response.srvyQstnList;

			for(let i = 0; i < srvyQstnList.length; i++) {
				//문항 div 시작
				let srvyQstnListDiv = `<div class="pop_result_exam_list mt-10" srvyQstn>`;

				//문항번호
				srvyQstnListDiv += `<input type="hidden" value="`+srvyQstnList[i].SRVY_QSTN_NO+`" srvyQstnNo>`;

				//필수여부
				srvyQstnListDiv += `<input type="hidden" value="`+srvyQstnList[i].NO_RSPNS_YN+`" noRspnsYn>`;

				//문항타입
				srvyQstnListDiv += `<input type="hidden" value="`+srvyQstnList[i].QST_TYP_CD+`" qstTypCd>`;
				
				//문항명
				var no = i+1;
//				srvyQstnListDiv += `<div class="pop_result_exam_list_tit poll_title" contenteditable>`+ no + ". " + '<textarea style="border: none;">' + srvyQstnList[i].QSTN_CN + '</textarea>' + `</div>`;
				srvyQstnListDiv += `<div class="pop_result_exam_list_tit poll_title"><pre style="white-space: pre-wrap;">`+ no + ". " + srvyQstnList[i].QSTN_CN + `</pre></div>`;
				
				//문항유형이 객관식일경우
				if(srvyQstnList[i].QST_TYP_CD == qstTypMultipleChoice) {
					//문항 보기 리스트
					let srvyQstnExmplList = srvyQstnList[i].srvyQstnExmplList;

					//문항보기 ul 시작
					srvyQstnListDiv += `<ul class="pop_result_exam_ul">`;

					for(let j = 0; j < srvyQstnExmplList.length; j++) {
						//문항보기
						srvyQstnListDiv += `
			              <li>
			                <label class="radio">
			                  <input type="radio" name="radio_`+srvyQstnList[i].SRVY_QSTN_NO+`" value="`+srvyQstnExmplList[j].SRVY_QSTN_EXMPL_NO+`">
			                  <span></span>
			                  <strong>`+srvyQstnExmplList[j].EXAMPLE_CN+`</strong>
			                </label>
			              </li>`;
					}

					//문항보기 ul 끝
					srvyQstnListDiv += `</ul>`;
				} else if(srvyQstnList[i].QST_TYP_CD == qstTypBooleanType) {
					//문항유형이 진위형일경우
					srvyQstnListDiv += `
						<ul class="pop_result_exam_ul">
					        <li>
					        	<label class="radio">
					        		<input type="radio" name="radio_`+srvyQstnList[i].SRVY_QSTN_NO+`" value="O">
					            	<span></span>
					            	<strong>O</strong>
					        	</label>
					        </li>
							<li>
								<label class="radio">
					            	<input type="radio" name="radio_`+srvyQstnList[i].SRVY_QSTN_NO+`" value="X">
					            	<span></span>
					            	<strong>X</strong>
					          	</label>
					        </li>
						</ul>`;
				} else {
					srvyQstnListDiv += `<textarea class="pop_ekt_textarea" rows="7" cols="80" srvyQstnTextArea></textarea>`;
				}


				//문항 div 끝
				srvyQstnListDiv += `</div>`

				//문항 바디에 추가
				$popup.find("[srvyQstnBody]").append(srvyQstnListDiv);
			}

			//팝업 표시
			$("body").append($popup);
			popLayerOpen($popup);
		},
		fail: function(result, data) {
			ajaxFailAlert(result, data);
		}
	});

	//제출
	$popup.find("[srvySbmit]").click(function() {
		//제출 매개변수
		let subitParam = {
			srvyDmndId : options.srvyDmndId,
			srvyCd : options.srvyCd,
			srvyCdclsf : options.srvyCdclsf
		};

		let srvyQstnTags = $popup.find("[srvyQstn]");

		let srvyQstnAnswList = [];

		for(let i = 0; i < srvyQstnTags.length; i++) {
			let $srvyQstnTag = $(srvyQstnTags[i]);
			//문항번호
			let srvyQstnNo = $srvyQstnTag.find("[srvyQstnNo]").val();
			//문항 타입코드
			let qstTypCd = $srvyQstnTag.find("[qstTypCd]").val();
			//필수여부
			let noRspnsYn = $srvyQstnTag.find("[noRspnsYn]").val();


			let srvyQstnAnsw = ""

			//객관식, 진위형이면 선택된값 가져오기
			if(qstTypCd == qstTypMultipleChoice || qstTypCd == qstTypBooleanType) {
				srvyQstnAnsw = $srvyQstnTag.find("input[name='radio_"+srvyQstnNo+"']:checked").val();
			} else {
				//그외에는 textarea에 입력된 값 가져오기
				srvyQstnAnsw = $srvyQstnTag.find("[srvyQstnTextArea]").val();
			}

			//필수값 체크
			if(noRspnsYn == 'N' && isEmpty(srvyQstnAnsw)) {
				if(qstTypCd == qstTypMultipleChoice || qstTypCd == qstTypBooleanType) {
					alert((i+1)+"번 문항 답변을 선택해주세요.");
				} else {
					alert((i+1)+"번 문항 답변을 입력해주세요.");
				}
				return false;
			}

			//문항 답변 정보
			let srvyQstn = {
				srvyQstnNo : srvyQstnNo,
				srvyQstnAnsw : srvyQstnAnsw
			};

			srvyQstnAnswList.push(srvyQstn);

		}

		subitParam.srvyQstnAnswList = srvyQstnAnswList;

		if(confirm("설문을 제출하시겠습니까?")) {
			StepEkt.ajax({
				url: CP+ clssrmSrvyURL + '/popSrvySubmit.do',
				data: {jsonStr : JSON.stringify(subitParam)},
				method: "POST",
				success: function(response) {
					alert("설문에 참여해 주셔서 감사합니다.");
					popLayerClose($popup);
					options.callback();
					return false;
				},
				fail: function(result, data) {
					ajaxFailAlert(result, data);
				}
			});
		}
	});
};

/*
 *운영강사 활동 현황 - 공지조회
 */
StepEkt.popNtcInfo = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>공지정보</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<div id="popNtcInfoGridHolder" class="flex-tbl-bx" style="height:200px; min-height:200px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	let popGridOptions = {
		parentId : "popNtcInfoGridHolder",
		pageUnit : 10, //10개씩
		layout : {
			columns : [
				{ dataField : "pstTitle", headerText : "제목", width : "200"},
				{ dataField : "regDt", headerText : "작성일시", width : "150"},
				{ dataField : "pblcNm", headerText : "게시여부", width : "100"}
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		ready : function() {
			fnSearch(1);
		}
	};

	let popGrid = StepGrid.create(popGridOptions,  false, false);

	function fnSearch(page) {
		let url;
		let params;
		if(isEmpty(options.usrid)) {
			url = CP + "/mngs/ekt/instrActvtMng/instrNtcInfo.do";
			params = {
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		} else {
			url = CP+ instrMngURL + '/instrNtcInfo.do';
			params = {
				usrid : options.usrid,
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		}

		//그리드 검색
		StepEkt.ajax({
			url: url,
			data: params,
			method: "GET",
			success: function(response) {
				currPage = page;
				totalCount = response.totalCount;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (totalCount == 0) {
						popGrid.noData();
					} else {
						popGrid.setData(response.list);
					}
				} else {
					popGrid.addData(response.list);
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data)
			}
		});
	}
};

/*
 *운영강사 활동 현황 - 자료실 등록 조회
 */
StepEkt.popDataInfo = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>자료실 정보</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<div id="popGridHolder" class="flex-tbl-bx" style="height:200px; min-height:200px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	let popGridOptions = {
		parentId : "popGridHolder",
		pageUnit : 10, //10개씩
		layout : {
			columns : [
				{ dataField : "pstTitle", headerText : "제목", width : "200"},
				{ dataField : "regDt", headerText : "작성일시", width : "150"},
				{ dataField : "pblcNm", headerText : "게시여부", width : "100"}
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		ready : function() {
			fnSearch(1);
		}
	};

	let popGrid = StepGrid.create(popGridOptions,  false, false);

	function fnSearch(page) {
		let url;
		let params;
		if(isEmpty(options.usrid)) {
			url = CP + "/mngs/ekt/instrActvtMng/instrDataInfo.do";
			params = {
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		} else {
			url = CP+ instrMngURL + '/instrDataInfo.do';
			params = {
				usrid : options.usrid,
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		}

		//그리드 검색
		StepEkt.ajax({
			url: url,
			data: params,
			method: "GET",
			success: function(response) {
				currPage = page;
				totalCount = response.totalCount;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (totalCount == 0) {
						popGrid.noData();
					} else {
						popGrid.setData(response.list);
					}
				} else {
					popGrid.addData(response.list);
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data)
			}
		});
	}
};

/*
 *운영강사 활동 현황 - 질의응답 조회
 */
StepEkt.popAnswInfo = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>질의응답 정보</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<div id="popGridHolder" class="flex-tbl-bx" style="height:200px; min-height:200px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	let popGridOptions = {
		parentId : "popGridHolder",
		pageUnit : 10, //10개씩
		layout : {
			columns : [
				{ dataField : "title", headerText : "질문 제목", width : "150"},
				{ dataField : "regDt", headerText : "답변일시", width : "100"},
				{ dataField : "pblcNm", headerText : "게시여부", width : "50"}
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		ready : function() {
			fnSearch(1);
		}
	};

	let popGrid = StepGrid.create(popGridOptions,  false, false);

	function fnSearch(page) {
		let url;
		let params;
		if(isEmpty(options.usrid)) {
			url = CP + "/mngs/ekt/instrActvtMng/instrQstRspnsInfo.do";
			params = {
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		} else {
			url = CP+ instrMngURL + '/instrQstRspnsInfo.do';
			params = {
				usrid : options.usrid,
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		}
		//기본 매개변수 세팅
		gridParams["pageIndex"] = page;
		//그리드 검색
		StepEkt.ajax({
			url: url,
			data: params,
			method: "GET",
			success: function(response) {
				currPage = page;
				totalCount = response.totalCount;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (totalCount == 0) {
						popGrid.noData();
					} else {
						popGrid.setData(response.list);
					}
				} else {
					popGrid.addData(response.list);
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data)
			}
		});
	}
};

/*
 *운영강사 활동 현황 - 평가출제 조회
 */
StepEkt.popExamInfo = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>평가출제 정보</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<div id="popGridHolder" class="flex-tbl-bx" style="height:200px; min-height:200px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	let popGridOptions = {
		parentId : "popGridHolder",
		pageUnit : 10, //10개씩
		layout : {
			columns : [
				{ dataField : "evlType", headerText : "평가항목타입", width : "100"},
				{ dataField : "title", headerText : "평가항목 제목", width : "200"},
				{ dataField : "frdt", headerText : "출제일시", width : "150"}
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		ready : function() {
			fnSearch(1);
		}
	};

	let popGrid = StepGrid.create(popGridOptions,  false, false);

	function fnSearch(page) {
		let url;
		let params;
		if(isEmpty(options.usrid)) {
			url = CP + "/mngs/ekt/instrActvtMng/instrEvlInfo.do";
			params = {
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		} else {
			url = CP+ instrMngURL + '/instrEvlInfo.do';
			params = {
				usrid : options.usrid,
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		}
		//기본 매개변수 세팅
		gridParams["pageIndex"] = page;
		//그리드 검색
		StepEkt.ajax({
			url: url,
			data: params,
			method: "GET",
			success: function(response) {
				console.log(response);
				currPage = page;
				totalCount = response.totalCount;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (totalCount == 0) {
						popGrid.noData();
					} else {
						popGrid.setData(response.list);
					}
				} else {
					popGrid.addData(response.list);
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data)
			}
		});
	}
};

/*
 *운영강사 활동 현황 - 제출물 첨삭 조회
 */
StepEkt.popCrctnInfo = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>제출물 첨삭 정보</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<div id="popGridHolder" class="flex-tbl-bx" style="height:200px; min-height:200px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	let popGridOptions = {
		parentId : "popGridHolder",
		pageUnit : 10, //10개씩
		layout : {
			columns : [
				{ dataField : "evlType", headerText : "평가항목", width : "70"},
				{ dataField : "title", headerText : "평가항목제목", width : "150"},
				{ dataField : "userNm", headerText : "학습자", width : "100"},
				{ dataField : "crctnDt", headerText : "첨삭일시", width : "150"}
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		ready : function() {
			fnSearch(1);
		}
	};

	let popGrid = StepGrid.create(popGridOptions,  false, false);

	function fnSearch(page) {
		let url;
		let params;
		if(isEmpty(options.usrid)) {
			url = CP + "/mngs/ekt/instrActvtMng/instrCrctnInfo.do";
			params = {
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		} else {
			url = CP+ instrMngURL + '/instrCrctnInfo.do';
			params = {
				usrid : options.usrid,
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		}
		//기본 매개변수 세팅
		gridParams["pageIndex"] = page;
		//그리드 검색
		StepEkt.ajax({
			url: url,
			data: params,
			method: "GET",
			success: function(response) {
				currPage = page;
				totalCount = response.totalCount;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (totalCount == 0) {
						popGrid.noData();
					} else {
						popGrid.setData(response.list);
					}
				} else {
					popGrid.addData(response.list);
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data)
			}
		});
	}
};

StepEkt.popSmsSend = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>SMS 전송 이력</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<div id="popGridHolder" class="flex-tbl-bx" style="height:200px; min-height:200px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	let popGridOptions = {
		parentId : "popGridHolder",
		pageUnit : 10, //10개씩
		layout : {
			columns : [
				{ dataField : "accntId", headerText : "수신자 ID", width : "130"},
				{ dataField : "usrNm", headerText : "수신자 명", width : "130"},
				{ dataField : "regDt", headerText : "전송일시", width : "70"}
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		ready : function() {
			fnSearch(1);
		}
	};

	let popGrid = StepGrid.create(popGridOptions,  false, false);

	function fnSearch(page) {
		let url;
		let params;
		if(isEmpty(options.usrid)) {
			url = CP + "/mngs/ekt/instrActvtMng/instrSmsInfo.do";
			params = {
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		} else {
			url = CP+ instrMngURL + '/instrSmsInfo.do';
			params = {
				usrid : options.usrid,
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		}
		//기본 매개변수 세팅
		gridParams["pageIndex"] = page;
		//그리드 검색
		StepEkt.ajax({
			url: url,
			data: params,
			method: "GET",
			success: function(response) {
				currPage = page;
				totalCount = response.totalCount;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (totalCount == 0) {
						popGrid.noData();
					} else {
						popGrid.setData(response.list);
					}
				} else {
					popGrid.addData(response.list);
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data)
			}
		});
	}
};

StepEkt.popMailSend = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var currPage = 0;
	var totalCount = 0;
	var pageCount = 0;
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont">
	                <div class="pop-header flex2">
	                    <span>MAIL 전송 이력</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<div id="popGridHolder" class="flex-tbl-bx" style="height:200px; min-height:200px; overflow:hidden;" gridHolder></div>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	let popGridOptions = {
		parentId : "popGridHolder",
		pageUnit : 10, //10개씩
		layout : {
			columns : [
				{ dataField : "accntId", headerText : "수신자 ID", width : "130"},
				{ dataField : "usrNm", headerText : "수신자 명", width : "130"},
				{ dataField : "regDt", headerText : "전송일시", width : "70"}
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		},
		ready : function() {
			fnSearch(1);
		}
	};

	let popGrid = StepGrid.create(popGridOptions,  false, false);

	function fnSearch(page) {
		let url;
		let params;
		if(isEmpty(options.usrid)) {
			url = CP + "/mngs/ekt/instrActvtMng/instrMailInfo.do";
			params = {
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		} else {
			url = CP+ instrMngURL + '/instrMailInfo.do';
			params = {
				usrid : options.usrid,
				crsseqId : options.crsseqId,
				pageIndex : page
			};
		}
		//기본 매개변수 세팅
		gridParams["pageIndex"] = page;
		//그리드 검색
		StepEkt.ajax({
			url: url,
			data: params,
			method: "GET",
			success: function(response) {
				currPage = page;
				totalCount = response.totalCount;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (totalCount == 0) {
						popGrid.noData();
					} else {
						popGrid.setData(response.list);
					}
				} else {
					popGrid.addData(response.list);
				}
			},
			fail: function(result, data) {
				ajaxFailAlert(result, data)
			}
		});
	}
};

/*
 *운영강사 활동 현황 - 운영강사정보 팝업 조회
 */
StepEkt.popInstrInfo = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var popupStr = `
		<div class="pop-wrap pop-up" id="classification">
	        <div class="pop-in middle">
	            <div class="pop-cont w_800">
	                <div class="pop-header flex2">
	                    <span>운영강사정보</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
	                </div>
	                <div class="pop-body">
						<table class="table_normal">
							<colgroup>
								<col width="20%"/>
								<col width="30%"/>
								<col width="20%"/>
								<col width="30%"/>
							</colgroup>
							<tbody>
								<tr>
									<th>운영강사명</th>
									<td userNm></td>
									<th>아이디</th>
									<td userId></td>
								</tr>
								<tr>
									<th>전화번호</th>
									<td mblpNo></td>
									<th>이메일</th>
									<td eml></td>
								</tr>
								<tr>
									<th>생년월일</th>
									<td brdt></td>
									<th>성별</th>
									<td gndrNm></td>
								</tr>
								<tr>
									<th>학력</th>
									<td acbgNm></td>
									<th>상태</th>
									<td accntSttsNm></td>
								</tr>
								<tr>
									<th>자택주소</th>
									<td colspan="3" address>
									</td>
								</tr>
								<tr>
									<th>재직구분</th>
									<td hdofSeNm></td>
									<th>소속회사</th>
									<td entNm></td>
								</tr>
								<tr>
									<th>관심분야</th>
									<td colspan="3" lctrFld>
									</td>
								</tr>
								<tr>
									<th>관리자메모</th>
									<td colspan="3" mmoCn>
									</td>
								</tr>
							</tbody>
						</table>
	                </div>
	            </div>
	        </div>
	    	<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);

	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	StepEkt.ajax({
		url: CP+ instrMngURL + '/popInstrInfo.do',
		data: {usrid : options.usrid},
		method: "GET",
		success: function(response) {
			let data = response.instrInfo;
			$popup.find("[userNm]").text(data.userNm);
			$popup.find("[userId]").text(data.userId);
			$popup.find("[mblpNo]").text(data.mblpNo);
			$popup.find("[eml]").text(data.eml);
			$popup.find("[brdt]").text(data.brdt);
			$popup.find("[gndrNm]").text(data.gndrNm);
			$popup.find("[accntSttsNm]").text(data.accntSttsNm);
			$popup.find("[acbgNm]").text(data.acbgNm);
			$popup.find("[hdofSeNm]").text(data.hdofSeNm);
			$popup.find("[entNm]").text(data.entNm);
			$popup.find("[entNm]").text(data.entNm);
			$popup.find("[address]").text(data.address);
			$popup.find("[mmoCn]").text(data.mmoCn);

			//관심분야 ">"로 구분해서 표시
			let ncsFieldList = response.ncsFieldList;

			for(let i = 0; i < ncsFieldList.length; i++) {
				let newPTag = $("<p>" + ncsFieldList[i][0].cmmnCdNm + " > " + ncsFieldList[i][1].cmmnCdNm + " > " + ncsFieldList[i][2].cmmnCdNm + "</p>");
				$popup.find("[lctrFld]").append(newPTag);
			}
		},
		fail: function(result, data) {
			ajaxFailAlert(result, data)
		}
	});
};

//ajax 실패 alert
function ajaxFailAlert(result, data) {
	if (result == -3) {
		alert(data);
	} else if (result == 1) {
		alert(MSG_SAVE_ERROR);
	} else {
		alert("작업 중 오류가 발생했습니다. 잠시 후 다시 시도해 주십시오.");
	}
}

function popLayerOpen(popup) {
	//부모 프레임에 클릭 메세지 전달
	window.parent.postMessage({ type: 'childClick', url: window.location.origin }, STEP_URL);

	//css적용
	setTimeout(function() {
		$(".pop-in").css("align-items",'start');
		$(".pop-in").css("margin-top", popupMarginTopPx+'px');

		let popupHeight = $(".pop-cont").height();//팝업 크기
		let popupTotalHeight = Number(popupHeight) + scrollPosition+ potalHeaderHeight + popupMarginTopPx; //여백을 포함해서 현재 팝업이 차지하는 높이

		if (popupTotalHeight >= $(document).height()) {
        	//팝업이 화면 사이즈를 넘어가지 않게 고정
        	$(".pop-in").css("padding-top",$(document).height() - $(".pop-cont").height() - popupMarginTopPx);
        } else {
			//팝업 위치 수정
        	$(".pop-in").css("padding-top",scrollPosition + potalHeaderHeight);
        }
	}, 100);

	//팝업 표시
	popup.show();

}

//2023-06-01 레이어 팝업 띄울때 바깥의 스크롤 잠금해제
function popLayerClose(popup) {
	$('html').css('overflow', '');
	popup.remove();
}

StepEkt.popInstrAltmntFileSelect = function(options) {
	defaultOption = {
		max : 1,
		list_target : '',
		file_obj : '',
		button : '',
		image : '',
		msg : {},
		callback : function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var $popup = null;
	var fileArray = new Array();
	var curr = 0;
	var max = options.max;
	var list_target = options.list_target;
	var file_obj = options.file_obj;
	var button = options.button;
	var image = options.image;
	var popupText = options.msg;
	let title_text = popupText.title;
	let file_find_text = popupText.filefind;
	let atch_file_text = popupText.atchfile;
	let sample_download_text = popupText.sampleDownload;
	let regist_text = popupText.regist;
	let cancel_text = popupText.cancel;
	let selectfile = popupText.selectfile;
	let over_file_msg = popupText.overfilemsg;

	var popupStr = `
        <div class="pop-wrap pop-up"  style="display: block;">
            <div class="pop-in middle">
                <div class="pop-cont">
                    <div class="pop-header">
                        <span> ` + title_text + `</span>
                            <button type="button" class="pop-close-btn" btnClose><img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기"></button>
                    </div>
                    <div class="pop-body">
                        <div class="btnArea">
                            <button type="button" class="btnBasic mr-5" onclick="javascript:sampleDown('tutorBatchSample.xlsx', 'tutorBatchSample.xlsx', '/sample');">양식 다운로드</button>
                            <button type="button" class="btnBasic" btnXlsFileSave>일괄 등록</button>
                        </div>
                        <div class="pop-file-box mt-10" id="popDiv" >
                            <span class="mr-5">엑셀파일 선택</span>
                            <input type="text" id = "instrAltmntFileName" readonly>
							<input type='file' id="egovComFileUploader1" style='display : none;' accept='.xlsx, .xls' multiple/>
                            <button type="button" name="button" class="btnBasic" btnFileFind><img src="` + CP + `/asset/popup/img/file-search-ico.png" alt="">`+file_find_text+`</button>
                        </div>
                        <div class="pop-file-info ">
                            <p>주의사항</p>
                            <p>1. 파일 저장 시 엑셀 형식으로 저장해주십시오.</p>
                            <p>2. 양식 폼을 변경할 시 등록이 불가능합니다. 주의하여 주십시오.</p>
                            <p>3. 양식 파일의 필수항목 [*]은 꼭 입력하여 주십시오.</p>
                            <p>4. 양식 파일의 샘플 내용을 참고하여 작성하여 주십시오.</p>
                            <p>5. 엑셀의 셀 서식은 '일반' 또는 '텍스트' 형식으로 작성하여 주십시오.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dim"></div>
        </div>`;

	$("body").append($popup);

	function showPopup() {
		$popup = $(popupStr);
		$("body").append($popup);
		popLayerOpen($popup);

		$popup.find("[btnClose]").on("click", function(evt) {
			evt.preventDefault();
			$popup.remove();
			options.callback();
			return false;
		});



		$popup.find("[btnFileFind]").on("click", function(evt) {
			evt.preventDefault();
			$popup.find("#egovComFileUploader1").trigger("click");
			return false;
		});



		$popup.find("[btnXlsFileSave]").on("click", function(evt) {
			evt.preventDefault();

			let xlsInput = $("#egovComFileUploader1")[0];
			// 파일을 여러개 선택할 수 있으므로 files 라는 객체에 담긴다.
//			console.log("xlsInput: ", xlsInput.files)

			if(xlsInput.files.length === 0){
				alert(selectfile);
				return;
			}

			let formData = new FormData();
			formData.set("excelFile", xlsInput.files[0]);

			StepEkt.ajax({
				url: CP+ '/mngs/ekt/instrAltmntBtchRegAjax.do',
				data: formData,
				method: "POST",
				async: true,
				success: function(response) {
					let totalCnt = response.totalCnt;
					let failCnt = response.failCnt;
					let successCnt = response.successCnt;
					let fileLink = response.fileLink;

					$popup.remove();

					StepEkt.popExcelBatchResult({
						formValidation : response.formValidation,
						base64Excel : response.base64Excel,
						totalCount : response.totalCnt,
						sucessCount : response.successCnt,
						failCount : response.failCnt,
						callback: function() {
							options.callback();
						}
					});

					/*
					if ( totalCnt == undefined || totalCnt.length < 1 ) totalCnt = 0;
					if ( failCnt == undefined || failCnt.length < 1 ) failCnt = 0;
					if ( successCnt == undefined || successCnt.length < 1 ) successCnt = 0;
					if ( fileLink == undefined || fileLink.length < 1) {
						fileLink = ``;
					}
					else {
						fileLink = `<a href="`+fileLink+`">결과다운로드</a>`
					}

					$("#spanTotalCnt").html(totalCnt);
					$("#spanSuccessCnt").html(successCnt);
					$("#spanFailCnt").html(failCnt);
					$("#spanResult").html(fileLink);
					$popup.remove();
					$("#divXlsUploadResult").show();
					*/
				},
				fail: function(result, data) {
					if (result == -3) {
									alert(data);
								} else if (result == 1) {
									alert(MSG_SAVE_ERROR);
								} else {
									alert(data);
								}
				}
			});
			return false;
		});
		$popup.find("#egovComFileUploader1").on("change", function(evt) {
			evt.preventDefault();
			fileArray.pop();
			let atch_file = document.getElementById("egovComFileUploader1").files;
			addFile(1, atch_file, null);
			evt.target.file = ``;
			return false;
		});
	}
	function addFile(type, files, oldFiles) {
		fileArray = new Array();
		curr = 0; // 단일 파일 선택이므로 0으로 초기화

		if (type == 1) {
			var files_length = (files != undefined && files != "undefined") ? files.length : 1;

			if (max < curr + files_length) {
				file_obj.val("");
				alert(over_file_msg);
				return;
			}

			$.each(files, function(idx, file) {
				if (list_target != "") {
					$("#instrAltmntFileName").val(file.name);
				}
				fileArray.push(file);
				curr++;

			});

			//$popup.remove();
		} else {
			$.each(oldFiles, function(idx, file) {
				if (list_target != "") {
					$("#instrAltmntFileName").val(file.name);
				}
				curr++;
			});
		}
	}

	if (image != null && image != "") {
		if (image.attr("src") == undefined || image.attr("src") == "") {
			image.hide();
		} else {
			image.show();
		}
		image.on("error", function() {
			image.hide();
		});
	}

	if (button != "") {
		button.on("click", function(evt) {
			evt.preventDefault();
			showPopup();
			return false;
		});
	}

	return {
		getFiles : function() {
			return fileArray;
		},
		showPopup : function() {
			showPopup();
		},
		addFiles : function(oldFiles) {
			addFile(2, null, oldFiles);
		}
	};
};

/**
 * 불참 사유 팝업
 */
StepEkt.popLibeSeminarAbsnc = function(options) {
	defaultOption = {
		p_usrid: '',
		p_live_id: '',
	};
	options = $.extend({}, defaultOption, options || {});
	const popupStr = `
		<div class="pop-wrap pop-up" style="overflow-y: auto;">
			<div class="pop-in middle" style="display: -webkit-box;">
				<div class="pop-cont">
					<div class="pop-header flex2">
						<span>불참사유</span>
						<img class="close" src="` + CP + `/img/pop-up-close.png" alt="닫기" btnClose>
					</div>
					<div class="pop-body">
						<table class="table_normal mt0" style="border-top:0;">
								<colgroup>
									<col width="20%">
									<col width="80%">
								</colgroup>
								<tbody>
									<tr>
										<th>이름</th>
										<td>
											<input type="text" name="usrNm" class="form-control basic" style="width:100%;border:none;" readonly>
										</td>
									</tr>
									<tr>
										<th>아이디</th>
										<td>
											<input type="text" name="accntId" class="form-control basic" style="width:100%;border:none;" readonly>
										</td>
									</tr>
									<tr>
										<th>내용</th>
										<td>
											<input type="text" name="absncRsn" class="form-control basic" style="width:100%;border:none;" readonly>
										</td>
									</tr>
									<tr>
										<th>첨부파일</th>
										<td name="fileNm">
											<input type="text" name="originFileNm" class="form-control basic" style="width:100%;border:none;" readonly fnFileDown>
											<input type="hidden" name="fileId" class="form-control basic" style="width:100%;border:none;" readonly>
											<input type="hidden" name="fileYn" class="form-control basic" style="width:100%;border:none;" readonly>
										</td>
									</tr>
									<tr>
										<th>등록일시</th>
										<td>
											<input type="text" name="frdtView" class="form-control basic" style="width:100%;border:none;" readonly>
										</td>
									</tr>
								</tbody>
							</table>
					</div> <!-- pop-body -->
				</div> <!-- pop-cont -->
			</div> <!-- pop-in middle -->
		</div> <!--pop-wrap pop-up -->
	`;

	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	var params = {};
	params["p_live_id"] = options.p_live_id;
	params["p_usrid"] = options.p_usrid;

	StepEkt.ajax({
		url : CP + "/mngs/lms/liveSeminar/selectLiveSeminarAbsncPopup.do",
		data : params,
		async: true,
		success: function(response) {
			var res = response.data;
			$popup.find('[name="usrNm"]').val(res.USR_NM);
			$popup.find('[name="accntId"]').val(res.ACCNTID);
			$popup.find('[name="absncRsn"]').val(res.ABSNC_RSN);
			$popup.find('[name="frdtView"]').val(res.FRDT_VIEW);
			$popup.find('[name="fileId"]').val(res.ABSNC_RSN_ATCHFILE_ID);
			$popup.find('[name="fileYn"]').val(res.FILE_YN);
			$popup.find('[name="originFileNm"]').val( res.FILE_YN == 'Y' ? res.ORIGIN_FILENM : '-');
		},
		fail: function(result, data) {
			alert('failed');
			if (result == -3) {
				alert(data);
			} else if (result == 1) {
				alert("작업 중 오류가 발생했습니다.");
			} else {
				alert(data);
			}
		}
	});

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	$popup.find("[fnFileDown]").click(function() {

		var dataHtml = "";

		var fileId = $popup.find('[name="fileId"]').val();
		var fileYn = $popup.find('[name="fileYn"]').val();
		var filegrp = '';

		if(fileYn == 'Y') {
			console.log("check123");
			var frm = jQuery('<form>').attr({'id':'fileDownForm', 'name':'fileDownForm', 'method':'post'});
			jQuery('body').append(frm);

			var dataHtml = "";
			var input1 = jQuery('<input>').attr({'type':'hidden', 'name':'p_filegrp_id'}).val('');
			var input2 = jQuery('<input>').attr({'type':'hidden', 'name':'p_file_id'}).val(fileId);

			frm.append(input1);
			frm.append(input2);

			jQuery(frm).attr({'action': CP +'/common/file/FileDown.do'});

			frm.submit();
			frm.remove();
		}
	});
};

/**
 * 기업맞춤신청 반려 사유 보기
 */
StepEkt.popRjctRsnCn = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var popupStr = `
		<div class="pop_layer" id="return_pop">
      		<div class="pop_content">
       			<div class="pop_hd">
          			<span>`+options.from+` 사유</span>
					<button type="button" name="button" class="pop_close">
          				<img src="` + CP + `/asset/popup/img/pop_close.png" alt="닫기" btnClose>
					</button>
       			</div>
        		<div class="pop_body">
	      			<div class="pop_txt">`+options.rjctRsn+`</div>
        		</div>
      		</div>
    	</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});
};

/**
 * 임시비밀번호 발급
 */
StepEkt.popEduCertiLang = function(options) {
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});

	var popupStr = `
		<div class="pop-wrap pop-up" popCms>
			<div class="pop-in middle">
				<div class="pop-cont text_center">
					<div class="pop-header flex2">
						<span>수료증 양식</span>
						<button type="button" class="pop-close-btn" btnClose>
							<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기">
						</button>
					</div>
					<div class="pop-body">
						<div class="input-radio mb-10">
			              <label class="radio">
							<input type="radio" name="eduCertiLang" value= "kr" checked>
			                <i></i>
			                <span class="bold">국문(Korean)</span>
			              </label>
			              <label class="radio">
							<input type="radio" name="eduCertiLang" value= "en">
			                <i></i>
			                <span>영문(English)</span>
			              </label>
			            </div>
					</div>
					<div class="body-button">
						<button type="button" eduCertiPrint>출력</button>
		        	</div>
				</div>
			</div>
			<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	//취소버튼
	$popup.find("[btnClose]").click(function() {
		popLayerClose($popup);
		return false;
	});

	//출력버튼
	$popup.find("[eduCertiPrint]").click(function() {
		let selectedValue = $('input[name="eduCertiLang"]:checked').val();

		if(isEmpty(selectedValue)) {
			alert("양식을 선택해주세요.");
			return false;
		}

		StepEkt.ajax({
			url: CP + "/mngs/ekt/integratedMng/stdntAndAdtngMng/eduCertiForm.do",
			data: {
				studentId : options.studentId,
				dgrId : options.dgrId,
				dgrSeCd : options.dgrSeCd,
				crscd : options.crscd,
				crsseqId : options.crsseqId,
				eduCertiLang : selectedValue
			},
			method: "GET",
			success: function(response) {
				if(!isEmpty(response.errorMsg)) {
					alert(response.errorMsg);
					if(!isEmpty(response.redirectUrl)) {
						location.href = response.redirectUrl;
					}
					return;
				}

				let ozParam = {
						RPT_URL : isEmpty(response.ozFormUrl) ? "" : response.ozFormUrl,
						STUDENT_ID : isEmpty(response.studentId) ? "" : response.studentId,
						ISSU_DSTN_NO : isEmpty(response.issuDstnNo) ? "" : response.issuDstnNo,
						DB_ALIAS : isEmpty(response.ozDbAlias) ? "" : response.ozDbAlias
				};
				let callOzUrl = response.callOzUrl
				//팝업 위치 설정
				var popupTop = 0;
				var popupLeft = 0;
				//팝업 크기 설정
				var popupWidth = 900;
				var popupHeight = 1200;
				//common.js의 Oz Report 호출 함수
				ozCall(callOzUrl, ozParam, popupTop, popupLeft, popupWidth, popupHeight);
			},
			fail: function(result, data) {
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert(MSG_SAVE_ERROR);
				} else {
					alert(data);
				}
			}
		});
		popLayerClose($popup);
		return false;
	});
};

/**
* 사용자 검색 팝업
 */
StepEkt.popUserSrch = function(options) {
	let userSearchInfo;
	defaultOption = {
		callback: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	var popupStr = `
		<div class="pop-wrap pop-up" popCms>
			<div class="pop-in middle">
				<div class="pop-cont">
					<div class="pop-header flex2">
						<span>사용자 검색</span>
						<img class="close" src="` + CP + `/asset/popup/img/pop-up-close.png" alt="닫기" btnClose>
					</div>
					<div class="pop-body">

						<table class="table_normal mt0" style="border-top:0;">
							<colgroup>
								<col width="20%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="al bb-Center">ID</th>
									<td class="al bb-Center"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" maxlength="50" searchUserId></td>
								</tr>
								<tr>
									<th class="al bb-Center">이름</th>
									<td class="al bb-Center"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" maxlength="30" searchUserNm></td>
								</tr>
								<tr>
									<th class="al bb-Center">핸드폰번호</th>
									<td class="al bb-Center"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" maxlength="30" searchSltMblpNo></td>
								</tr>
								<tr>
									<th class="al bb-Center">이메일</th>
									<td class="al bb-Center"><input type="text" class="form-control basic" style="width:100%; min-width:100%;" maxlength="50" searchEml></td>
								</tr>
							</tbody>
						</table>
						<div class="allbutton subtit_btn cf mt-10">
							<div class="btnArea tx-right">
								<button type="button" class="btnBasic" btnSearch>검색</button>
							</div>
						</div>
						<div id ="popGridHolder" class="flex-tbl-bx mt-10" style="height:350px; min-height:350px; overflow:hidden;" popGridHolder></div>
					</div>
					<div class="bottom flex justify-content-center">
	                    <button class="btnBasic mr-5" btnSelect>선택</button>
	                    <button class="btnBasic" btnClose>취소</button>
	                </div>
				</div>
			</div>
			<div class="dim"></div>
		</div>`;

	var $popup = $(popupStr);
	$("body").append($popup);
	popLayerOpen($popup);

	$popup.on("keydown", "[searchUserId], [searchUserNm], [searchSltMblpNo], [searchEml]", function(e) { if (e.keyCode == 13) { e.preventDefault(); fnSearch(1); }});
	$popup.find("[btnClose]").click(function() {
		options.callback();
		popLayerClose($popup);
		return false;
	});
	$popup.find("[btnSearch]").click(function() {
		fnSearch(1);
		return false;
	});
	$popup.find("[btnSelect]").click(function() {
		let selectedItem = userGrid.getSelectedItem();
		if(isEmpty(selectedItem)) {
			alert("사용자를 선택해주세요.");
			return false;
		}
		
		let userSearchInfo = {
			prsnlDstnInhrNo : selectedItem.prsnlDstnInhrNo,
			userId : selectedItem.userId,
			userNm : selectedItem.userNm,
			sltMblpNo : selectedItem.sltMblpNo,
			eml : selectedItem.eml
		};
		
		options.callback(userSearchInfo);
		popLayerClose($popup);
		return false;
	});
	
	$popup.find("[searchSltMblpNo]").keyup(function(event){
	    event = event || window.event;
	    var _val = this.value.trim();
	    this.value = _val.replace(/[^0-9]/g, '');
	});
	
	
	
	let currPage = 0;
	let pageCount = 0;
	
	let userGridOptions = {
		parentId : "popGridHolder",
		pageUnit : 50, //10개씩
		layout : {
			columns : [
				{ dataField : "rnum", headerText : "번호", width: "50"},
				{ dataField : "userNm", headerText : "성명"},
				{ dataField : "userId", headerText : "아이디"},
				{ dataField : "sltMblpNo", headerText : "핸드폰번호"},
				{ dataField : "eml", headerText : "이메일"},
			]
		},
		scroll : function() {
			if (currPage < pageCount) {
				fnSearch(currPage + 1);
			}
		}
	};

	let userGrid = StepGrid.create(userGridOptions,  false, false);

	function fnSearch(page) {
		let userId = $popup.find("[searchUserId]").val();
		let userNm = $popup.find("[searchUserNm]").val();
		let mblpNo = $popup.find("[searchSltMblpNo]").val();
		let eml = $popup.find("[searchEml]").val();
		
		if (isEmpty(userId) && isEmpty(userNm) && isEmpty(mblpNo) && isEmpty(eml)) {
			alert("검색어를 입력해주세요");
			return false;
		}
		StepEkt.ajax({
			url: CP + "/mngs/ekt/integratedMng/vocMng/findUser.do",
			data: {
				userId : userId,
				userNm : userNm,
				mblpNo : mblpNo,
				eml : eml,
				pageIndex : page,
				pageUnit : userGridOptions.pageUnit
			},
			success: function(response) {
				let list = response.list;
				currPage = page;
				pageCount = response.pageCount;	//페이지 수
				if (page == 1) {
					if (response.totalCount == 0) {
						userGrid.noData();
					} else {
						userGrid.setData(list);
					}
				} else {
					userGrid.addData(list);
				}
			},
			fail: function(result, data) {
				if (result == -3) {
					alert(data);
				} else if (result == 1) {
					alert("작업 중 오류가 발생했습니다.");
				} else {
					alert(data);
				}
			}
		});
	}
};
