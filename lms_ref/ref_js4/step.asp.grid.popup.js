	var popupStr = `
		          <div class="master_title" id="grid-pop-up" style="width:300px; position: absolute; !important;">
		            <div class="filter_layer">
		
				      <button type="button" class="filter_close" onclick="fn_close_grid_popup();">
				        <img src="/../images/common/mngs/filter_close.png" alt="">
				      </button>
		              <ul>
		                <li>
		                  <span>보기</span>
		
		                    <select id="m_count" name="m_count" class="selectpicker" onchange="fn_count_change();">
			                    <option value="10">10 개</option>
			                    <option value="25">25 개</option>
			                    <option value="50">50 개</option>
			                    <option value="100">100 개</option>
			                    <option value="1000">1000 개</option>
		                    </select>
		                </li>
		                <li>
		                  <span>찾기</span>
		                  <input type="text" id="m_search_text" name="m_search_text" value="" class="normal_input" onKeypress="javascript:if(event.keyCode==13) {fn_text_search();}">
							<div class="filter_search">
				            	<button class="btn bg01" id="btn_search" onclick="fn_text_search();">찾기</button>
							</div>
		                </li>
		              </ul>
		              <div class="filter_btns">
		                <button type="button" onclick="fn_filter(true);"><img src="/images/common/mngs/master_ico1.png" alt="" class="mr_5">필터</button>
						<button type="button" onclick="fn_filter(false);"><img src="/images/common/mngs/master_ico2.png" alt="" class="mr_5">필터 취소</button>
		                <button type="button"  onclick="fn_col_hide_list();"><img src="/images/common/mngs/master_ico3.png" alt="" class="mr_5">컬럼 숨기기</button>
		              </div>
		              <div class="filter_colums" id="col_area" style="display:none;">
		              </div>
		            </div>
		
</div>
	`;
	
		var popupStr_10000 = `
		          <div class="master_title" id="grid-pop-up" style="width:300px; position: absolute; !important;">
		            <div class="filter_layer">
		
				      <button type="button" class="filter_close" onclick="fn_close_grid_popup();">
				        <img src="/../images/common/mngs/filter_close.png" alt="">
				      </button>
		              <ul>
		                <li>
		                  <span>보기</span>
		
		                    <select id="m_count" name="m_count" class="selectpicker" onchange="fn_count_change();">
			                    <option value="10">10 개</option>
			                    <option value="25">25 개</option>
			                    <option value="50">50 개</option>
			                    <option value="100">100 개</option>
			                    <option value="1000">1000 개</option>
			                    <option value="5000">5000 개</option>
		                    </select>
		                </li>
		                <li>
		                  <span>찾기</span>
		                  <input type="text" id="m_search_text" name="m_search_text" value="" class="normal_input" onKeypress="javascript:if(event.keyCode==13) {fn_text_search();}">
							<div class="filter_search">
				            	<button class="btn bg01" id="btn_search" onclick="fn_text_search();">찾기</button>
							</div>
		                </li>
		              </ul>
		              <div class="filter_btns">
		                <button type="button" onclick="fn_filter(true);"><img src="/images/common/mngs/master_ico1.png" alt="" class="mr_5">필터</button>
						<button type="button" onclick="fn_filter(false);"><img src="/images/common/mngs/master_ico2.png" alt="" class="mr_5">필터 취소</button>
		                <button type="button"  onclick="fn_col_hide_list();"><img src="/images/common/mngs/master_ico3.png" alt="" class="mr_5">컬럼 숨기기</button>
		              </div>
		              <div class="filter_colums" id="col_area" style="display:none;">
		              </div>
		            </div>
		
</div>
	`;
	var $popup;
	var hide_yn = false;

	var vObjId ="";
	var vFunc1 = "";
	var vFunc2 = "";
	function fn_open_grid_popup(objId, funcId1, funcId2){

		var divX = $("#"+objId).offset().left + 170;
		var divY = $("#"+objId).offset().top - 80;

		vObjId = objId;
		vFunc1 = funcId1;
		vFunc2 = funcId2;
		if($("#grid-pop-up").css("display") == "block"){
			fn_close_grid_popup();
		}else{
			$popup = $(popupStr);
			$("body").append($popup);
			$("#grid-pop-up").attr('style', "top: "+ divY + "px; left:"+ divX +"px; width:300px; position: absolute; !important;");
			$popup.show();
			$('.selectpicker').selectpicker('refresh');
		}
	}
	
	function fn_open_grid_popup_10000(objId, funcId1, funcId2){

		var divX = $("#"+objId).offset().left + 170;
		var divY = $("#"+objId).offset().top - 80;

		vObjId = objId;
		vFunc1 = funcId1;
		vFunc2 = funcId2;
		if($("#grid-pop-up").css("display") == "block"){
			fn_close_grid_popup();
		}else{
			$popup = $(popupStr_10000);
			$("body").append($popup);
			$("#grid-pop-up").attr('style', "top: "+ divY + "px; left:"+ divX +"px; width:300px; position: absolute; !important;");
			$popup.show();
			$('.selectpicker').selectpicker('refresh');
		}
	}

	function fn_close_grid_popup(){
		$popup.remove();
	}

    function fn_count_change(){
		// 10000이 없으면 추가
		if ($("#gbox_" + vObjId).find(".ui-pg-selbox option[value='5000']").length === 0) {
	    var newOption = '<option role="option" value="5000">5000</option>';
	    $("#gbox_" + vObjId).find(".ui-pg-selbox").append(newOption);
		}
		$("#gbox_"+vObjId).find(".ui-pg-selbox").val($('#m_count').val()).change();
    }

    function fn_text_search(){
    	// 검색할 문자열 지정
    	var str = $("#m_search_text").val();

	   	if(str == ''){
    		alert('검색어를 입력해 주시기 바랍니다.');
    		return;
    	}
 		//$("#gbox_"+vObjId).click();
		//$("#"+vObjId).trigger("click");
		console.log("str==>"+str);
		
	    if(navigator.userAgent.indexOf("rv:11") > -1) {
		console.log("==11==");
	        var f, contents = document.body.createTextRange();
	        for(var i = 0; i <= n && (f = contents.findText(str)) != false; i++) {
	            contents.moveStart('character');
	            contents.moveEnd('textedit');
	        }
	        if(f) {
	            contents.moveStart('character', -1);
	            contents.findText(str);
	            contents.select();
	            n++;
	        }
	    } else {
	        //window.find(str);
	        var strFound;
	        strFound=window.find(str);
	        if (!strFound) {
	            strFound=window.find(str, false, true, false, true);
				var n = 0;
				while (window.find(str, false, true, false, true))
				{
					n++;
					if(n > 300){
						console.log("=n="+n);
						//alert(str + "은 잦기 기능을 이용할 수 없습니다.");
						break;
					}
					continue;
				}
	            //console.log(strFound);
		   }
	    }
    }

    $('#m_search_text').on("keyup",function(key){
    	if(key.keyCode==13) {
    		fn_text_search();
    	}
    });

	function searchOption(){}
	
    function fn_filter(yn){
		if(yn){
			$("#"+vObjId).setGridParam({loadonce : true});
			$("#"+vObjId).jqGrid('filterToolbar',
		            {autosearch: true,
					 stringResult: true,
		             searchOnEnter: true,
		             defaultSearch: "cn",
					 beforeSearch: function(){
						searchOption()
					}
		            }); 
			$(".ui-search-toolbar").show();
		}else{
			$("#"+vObjId).setGridParam({loadonce : false});
			$("#"+vObjId).jqGrid("GridUnload");
			
			if(vFunc1 != ""){
				if(vFunc1.indexOf("(") == -1){
					vFunc1 = vFunc1 + "()";
				}
				eval(vFunc1);
				
				setTimeout(function() {
					if(vFunc2 != ""){
						if(vFunc2.indexOf("(") == -1){
							vFunc2 = vFunc2 + "()";
						}
						eval(vFunc2);
					}				
				}, 1000);
			}

/*			$("#"+vObjId).jqGrid("GridUnload");
			if(typeof jsSearch === 'function'){
				console.log("=jsSearch=");
				if(typeof makeGrid === 'function'){
					makeGrid();
				}
				var activeId = $('.sub_tab').find('.active').attr('id');
				if(activeId != null){
					activeId = activeId.replaceAll('tab','');
					if(('makeReportGrid').includes(activeId) == true){
						if(typeof makeReportGrid === 'function'){
							makeReportGrid();
						}
					}
					if(('makeExamGrid').includes(activeId) == true){
						if(typeof makeExamGrid === 'function'){
								makeExamGrid();
						}
					}					
				}

				if(typeof reportScrngmakeGrid === 'function'){
					reportScrngmakeGrid();
				}
				jsSearch();
			}else if(typeof doSearch === 'function'){
				console.log("=doSearch=");
				if(typeof doMakeGrid === 'function'){
					doMakeGrid();
				}
				doSearch();		
			}else if(typeof makeCntntsGrid  === 'function'){
				console.log("=makeCntntsGrid=");
				makeCntntsGrid();
//			}else if(typeof makeGridTakeEx  === 'function'){
//				console.log("=makeGridTakeEx=");
//				makeGridTakeEx();
//			}else if(typeof remarkQstDetailList  === 'function'){
//				console.log("=remarkQstDetailList=");
//				remarkQstDetailList();
			}else if(typeof makeGridDetail  === 'function'){
				console.log("=makeGridDetail=");
				if($("#p_crscd").val() == undefined){
					makeGridDetail();	
				}else{
					makeGridDetail($("#p_crscd").val());
				}
				
			}*/
			
		}
    }

	function callFunction(val){
		console.log(val);
	}
	
    function fn_col_lock(yn){
    	if(yn){
    		var num = $('#m_col_count').val();
    		_options = $.extend(_options, {lock_col : num});
    		$('#btn_col').attr('onclick', 'fn_col_lock(false);');
    	}else{
    		_options = $.extend(_options, {lock_col : ''});
    		$('#btn_col').attr('onclick', 'fn_col_lock(true);');
    	}

	    $('[btnSearch]').trigger('click');
    }
    function fn_row_lock(yn){
    	if(yn){
    		var num = $('#m_row_count').val();
    		_options = $.extend(_options, {lock_row : num});
    		$('#btn_row').attr('onclick', 'fn_row_lock(false);');
    	}else{
    		_options = $.extend(_options, {lock_row : ''});
    		$('#btn_row').attr('onclick', 'fn_row_lock(true);');
    	}
	    $('[btnSearch]').trigger('click');
    }
    function fn_col_hide_list(){
    	if(!hide_yn){
			var colModel = $("#"+vObjId).jqGrid('getGridParam', 'colModel');
			var colNames = $("#"+vObjId).jqGrid('getGridParam', 'colNames');
			
			var headHtml = "";
			//colModel.forEach(function(obj, idx) {
			colModel.some(function(obj, idx){
				var idxColNames = String(colNames[idx]);
				console.log("colModels==>"+colModel[idx].name);
				console.log("colNames==>"+idxColNames);
				if(colModel[idx].name == 'CHILD_CNT'){
					console.log("break==>");
					return true;
				}
				if(colModel[idx].width != 0 && idxColNames.indexOf('checkbox') == '-1' ){
					console.log("run==>");
					var colNm = idxColNames;
					var colNmTitle = "";
					colNm = colNm.replaceAll("<br/>", " ");
					colNm = colNm.replaceAll('<span class="table-point">*</span>', "*");
					colNmTitle = colNm;
					if(colNm.length > 5){
						colNm = colNm.substr(0,5) + "...";
					}
					if(colModel[idx].hidden == true){
						headHtml += "<label title='"+ colNmTitle +"' class='checkbox'><input type='checkbox' id='"+ colModel[idx].name +"' name='"+ colModel[idx].name +"' onclick='fn_col_hide_show(\""+ colModel[idx].name +"\");' ><i></i><span></span>" + colNm + "</label>";

					}else{
						headHtml += "<label title='"+ colNmTitle +"' class='checkbox'><input type='checkbox' id='"+ colModel[idx].name +"' name='"+ colModel[idx].name +"' onclick='fn_col_hide_show(\""+ colModel[idx].name +"\");' checked><i></i><span></span>" + colNm + "</label>";
					}
//					headHtml += "<label title='"+ colNmTitle +"' class='checkbox'><input type='checkbox' id='"+ colModel[idx].name +"' name='"+ colModel[idx].name +"' onclick='fn_col_hide_show(\""+ colModel[idx].name +"\");' checked><i></i><span></span>" + colNm + "</label>";
				}
			});
		
			$popup.find('#col_area').html(headHtml);
    		$('.filter_colums').show();
    		hide_yn = true;
    	}else{
    		$popup.find('#col_area').empty();
    		$('.filter_colums').hide();
    		hide_yn = false;
    	}
    }

    function fn_col_hide_show(obj){
		if($("#"+obj).is(":checked")){
			$("#"+vObjId).jqGrid("showCol",obj);		
		}else{
			$("#"+vObjId).jqGrid("hideCol",obj);
		}
    }

