window.StepEkt = window.StepEkt || {};

//$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

jQuery.fn.extend({
	getMaxZ : function() {
		return Math.max.apply(null, jQuery(this).map(function() {
			var z;
			return isNaN(z = parseInt(jQuery(this).css("z-index"), 10)) ? 0 : z;
		}));
	},
	ncsCategoryList: function(options) {
    const defaultOption = {
        ncs_data : {},
        useBlock : "Y"
    };
    options = $.extend({}, defaultOption, options || {});

    // 클래스 코드들
    const classCodes = ['lrgClssCd', 'mddlClssCd', 'smllClssCd', 'mcroClssCd', 'abltyUntClssCd', 'abltyUntFctrClssCd']
  .map(key => ({ key, value: options[key] }))
  .filter(item => item.value != null && item.value !== "")  // null이나 빈 문자열이 아닌 경우만 필터
  .map(item => item.value);

    const $self = $(this);
    const $parent = $self.parent();

    function makeSelect(lvl, upNcsClssCd) {
        return new Promise((resolve, reject) => {
            const data = {
                p_lvl: lvl,
                useBlock: options.useBlock,
                upNcsClssCd: (upNcsClssCd != "") ? upNcsClssCd : null
            };
            StepEkt.ajax({
                url: CP + "/mngs/ekt/selectNcsClssListAjax.do",
                data: data,
                success: function(response) {
                    if (response.list.length > 0) {
                        const thisVal = classCodes[lvl - 1];
                        let str = `<div style="float:left; min-width:15%;" ncsDivArea="${lvl}"><select class="selectpicker" ncsSelectArea="${lvl}"><option value="">전체</option>`;
                        response.list.forEach(function(obj) {
                            str += `<option value="${obj.ncsClssCd}" ${obj.ncsClssCd == thisVal ? 'selected' : ''}>${obj.cdNm}</option>`;
                        });
                        str += `</select></div>`;
                        const $component = $(str);
                        $self.append($component);

                        $component.find('select').on('change', function() {
                            const selectedVal = $(this).val();
                            $self.find('[ncsDivArea]').each(function() {
                                if ($(this).attr('ncsDivArea') > lvl) {
                                    $(this).remove();
                                }
                            });

                            if (selectedVal != "") {
                                processSelect(lvl + 1, selectedVal);
                            } else {
                                refreshSelectPickers(lvl);
                            }
                        });

                        resolve(lvl);
                    } else {
                        resolve(-1);
                    }
                },
                fail: function() {
                    alert("작업 중 오류가 발생했습니다.");
                    reject();
                }
            });
        });
    }

    function refreshSelectPickers(upToLevel) {
        for (let i = 1; i <= upToLevel; i++) {
            $self.find(`[ncsSelectArea="${i}"]`).selectpicker('refresh');
        }
        $parent.find("[ncsDivArea]").css("display", "inline-block").css("margin-right", "5px");
        $parent.css("width", $parent.find("[ncsDivArea]").length > 1 ? "100%" : "");
    }

    function processSelect(lvl = 1, upNcsClssCd = '') {
        makeSelect(lvl, upNcsClssCd).then(nextLvl => {
            if (nextLvl > 0 && nextLvl < classCodes.length) {
                processSelect(nextLvl + 1, classCodes[nextLvl - 1]);
            } else {
                refreshSelectPickers(lvl);
            }
        }).catch(() => {
            console.log('An error occurred');
        });
    }

    processSelect();
	},
	ncsCategoryListReg : function(options) {
		const defaultOption = {
			ncs_data : {},
			useBlock : "Y"
		};
		options = $.extend({}, defaultOption, options || {});
		//console.table(options);

		const lrgClssCd = options.lrgClssCd;
		const mddlClssCd = options.mddlClssCd;
		const smllClssCd = options.smllClssCd;
		const mcroClssCd = options.mcroClssCd;
		const abltyUntClssCd = options.abltyUntClssCd;
		const abltyUntFctrClssCd = options.abltyUntFctrClssCd;

		const $self = $(this);
		const $parent = $self.parent();

		function makeSelect(lvl, upNcsClssCd) {
			const data = {
				p_lvl : lvl,
				useBlock : options.useBlock,
				upNcsClssCd : (upNcsClssCd != "") ? upNcsClssCd : null
			};
			StepEkt.ajax({
				url : CP + "/mngs/ekt/selectNcsClssListAjax.do",
				data: data,
				success: function(response) {
					if (response.list.length > 0) {
						let thisVal, nextVal;
						if (lvl == 1) {
							thisVal = lrgClssCd;
							nextVal = mddlClssCd;
						} else if (lvl == 2)  {
							thisVal = mddlClssCd;
							nextVal = smllClssCd;
						} else if (lvl == 3)  {
							thisVal = smllClssCd;
							nextVal = mcroClssCd;
						} else if (lvl == 4)  {
							thisVal = mcroClssCd;
							nextVal = abltyUntClssCd;
						} else if (lvl == 5)  {
							thisVal = abltyUntClssCd;
							nextVal = abltyUntFctrClssCd;
						} else if (lvl == 6)  {
							thisVal = abltyUntFctrClssCd;
							nextVal = '';
						}

						let str = `<div style="float:left; min-width:15%;" ncsDivArea="` + lvl + `"><select class="selectpicker" ncsSelectArea="` + lvl + `"><option value="">전체</option>`;
						response.list.forEach(function(obj, idx) { str += `<option value="` + obj.ncsClssCd + `" `; if (obj.ncsClssCd == thisVal) { str += `selected` }; str += `>` + obj.cdNm + `</option>`;});
						str += `</select></div>`;
						
						const $component = $(str);
						$component.find("select").on("change", function() {
							$self.find("[ncsDivArea]").each(function(idx, obj) {
								if ($(obj).attr("ncsDivArea") > lvl) {
									$(obj).remove();
								}
							});
							const $self2 = $(this);
							const value = $self2.val();
							if (value != "") {
								makeSelect(lvl + 1, value);
							}
							$parent.css("width", $parent.find("[ncsDivArea]").length > 1 ? "100%" : "");

							$parent.find("[ncsDivArea]").css("display", "inline-block").css("margin-right", "5px");
						});
						$self.append($component);
						$self.find("[ncsSelectArea="+ lvl +"]").selectpicker('refresh');
						$parent.css("width", $parent.find("[ncsDivArea]").length > 1 ? "100%" : "");
						$parent.find("[ncsDivArea]").css("display", "inline-block").css("margin-right", "5px");

						if (nextVal != undefined && nextVal != '') {
							makeSelect(lvl + 1, thisVal);
						}
					}
				},
				fail: function(result, data) {
					alert("작업 중 오류가 발생했습니다.");
				}
			});
		}
		makeSelect(1);
	},
	ncsCategoryListReset : function(options) {
		var $self = $(this);
		var $parent = $self.parent();
		[6, 5, 4, 3, 2].forEach(function(obj, idx) {
			$self.find("[ncsDivArea=" + obj + "]").remove();
		});
		$self.find("[ncsDivArea=1]").find('option:first').prop('selected', true);
		$self.find("[ncsDivArea=1]").selectpicker('refresh');

		$self.find("[ncsSelectArea=1]").find('option:first').prop('selected', true);
		$self.find("[ncsSelectArea=1]").selectpicker('refresh');
		$parent.css("width", $parent.find("[ncsDivArea]").length > 1 ? "100%" : "");

		$parent.find("[ncsDivArea]").css("display", "inline-block").css("margin-right", "5px");
	},
	ncsSelectValue : function(lvl) {
		var $self = $(this);
		var $parent = $self.parent();
		var value = "";
		if ($self.find("[ncsSelectArea=" + lvl + "] option:selected").length > 0) {
			value = $self.find("[ncsSelectArea=" + lvl + "] option:selected").val();
		}
		return value;
	}
});

(function($) {
	$.each(['show', 'hide'], function(i, ev) {
		var el = $.fn[ev];
		$.fn[ev] = function() {
			var oldVisble = $(this).is(':visible');
			var ret = el.apply(this, arguments);
			if (oldVisble != $(this).is(':visible')) this.trigger(ev);
			return ret;
		};
	});
})(jQuery);

StepEkt.nvl = function(value, defaultValue) {
	if (value == null || value == undefined || value == '') {
		return defaultValue;
	}
	return value;
}

StepEkt.random = function(str) {
	return str + "_" + new Date().getTime() + "_" + parseInt(Math.random() * 1000000000);
};

StepEkt.dateToStr = function(timestamp) {
	var date = new Date(timestamp);
    return date.getFullYear() + `년 ` + (date.getMonth() + 1) + `월 ` + date.getDate() + `일`;
};

StepEkt.currenty = function(money) {
	try {
		return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		/*
		var formatter = new Intl.NumberFormat('ko-KR', {
			style: 'currency',
			currency: 'KRW',
			// These options are needed to round to whole numbers if that's what you want.
			//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
			//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
		});

		return formatter.format(money);
		*/
	} catch (e) {
		return money;
	}
};

StepEkt.prettySec = function(value) {
	var hour = parseInt(value / 3600);
	var min = parseInt((value % 3600) / 60);
	var sec = value % 60;

	if (hour > 0) {
		return hour + "시 " + min + "분 " + sec + "초";
	} else if (min > 0) {
		return min + "분 " + sec + "초";
	}
	return sec + "초";
};

StepEkt.arraySortByKey = function(array, key) {
	return array.sort(function(a, b) {
		var x = a[key];
		var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
};

StepEkt.existsList = function(src, list) {
	var result = false;
	$.each(list, function(idx, obj) {
		if (src == obj) {
			result = true;
			return false;
		}
	});
	return result;
};

StepEkt.imagePreview = function(options) {
	var file = options.file;
	var image = options.image;
	if (image.attr("src") == undefined || image.attr("src") == "") {
		image.hide();
	}
	image.on("error", function() {
		image.hide();
	});
	file.change(function() {
		var files = this.files;
		if (files && files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				image.attr("src", e.target.result);
				image.show();
			}
			reader.readAsDataURL(files[0]);
		}
	});
};

StepEkt.emailList = function(options) {
	var list = options.list;
	var directName = options.directName;
	var listPlace = options.listPlace;
	var targetPlace = options.targetPlace;
	listPlace.empty();
	$.each(list, function(idx, obj) {
		var option = $("<option></option>").attr("value", obj).text(obj);
		listPlace.append(option);
	});
	(function() {
		var option = $("<option></option>").attr("value", "").text(directName);
		listPlace.append(option);
	})();
	listPlace.on("change", function() {
		var value = listPlace.find("option:selected").val();
		if (value == "") {
			targetPlace.removeAttr("disabled");
		} else {
			targetPlace.attr("disabled", true);
		}
		targetPlace.val(value);
	});
	listPlace.trigger("change");
};

StepEkt.scrollOn = function() {
	//var scrollTop = parseInt($('html').css('top'));
	$('html').removeClass('noscroll');
	//$('html,body').scrollTop(-scrollTop);
	if (window.stepEktScrollTop != null) {
		$('html,body').scrollTop(-window.stepEktScrollTop);
		console.log('scrollOn', 'window.stepEktScrollTop', window.stepEktScrollTop);
	}
};

StepEkt.scrollOff = function() {
	if ($(document).height() > $(window).height()) {
		var stepEktScrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();
		//$('html').addClass('noscroll').css('top', -stepEktScrollTop);
		window.stepEktScrollTop = stepEktScrollTop;
		console.log('scrollOff', 'window.stepEktScrollTop', window.stepEktScrollTop);
	}
};

StepEkt.blockUI = function() {
	StepEkt.isBlock = StepEkt.isBlock || false;
	if (! StepEkt.isBlock) {
		StepEkt.isBlock = true;
		StepEkt.scrollOff();
	}
	$.blockUI.defaults.message = `<img src='` + CP + `/asset/image/loading.gif'/>`;
	//$.blockUI({ baseZ : $("body *").getMaxZ() });
	$.blockUI({
        baseZ: $("body *").getMaxZ(),
        css: {
            border: 'none', // 테두리 없음
            backgroundColor: 'transparent' // 배경색 없음
        }
    });
};

StepEkt.unblockUI = function() {
	StepEkt.isBlock = StepEkt.isBlock || false;
	if (StepEkt.isBlock) {
		StepEkt.isBlock = false;
		StepEkt.scrollOn();
	}
	$.unblockUI();
};

StepEkt.ajax = function(options) {
	var defaultOption = {
		useBlock: "Y",
		method: "GET",
		dataType: "json",
		async: true,
		success: function() {},
		fail: function() { alert("작업 중 오류가 발생했습니다."); },
		complete: function() {}
	};
	options = $.extend({}, defaultOption, options || {});
	if (options.useBlock == "Y") {
		StepEkt.blockUI();
	}
	var data = options.data;
	if (data == undefined) {
		data = {};
	} else {
		if (data instanceof jQuery) {
			data = data.get(0)
		}
		if (data.nodeName == "FORM") {
			data = new FormData(data);
		}
	}
	var ajaxData = {
		url: options.url,
		data: data,
		type: options.method,
		async: options.async
	};
	if (options.dataType != null) {
		ajaxData.dataType = options.dataType; // return type
	}
	if (data instanceof FormData) {
		ajaxData.contentType = false;
		ajaxData.processData = false;
	}

//	console.log('options.contentType:'+options.contentType);
	///*
	if(options.contentType != null){
		ajaxData.contentType = options.contentType;
	}
	//*/
	$.ajax(ajaxData).done(function(response) {
		if (options.useBlock == "Y") {
			StepEkt.unblockUI();
		}
		//console.log(response);
		var result = response.result;
		var data = response;

		if (result == 0) {
			options.success(data);
		} else if (result == -1) {
			alert("로그인 상태가 아닙니다.");
			location.href = CP + "/login/login.do";
		} else if (result == -2) {
			alert("사용권한이 없습니다.");
			location.href = CP + "/";
		} else if (result == -3) { // binding error
			options.fail(result, data);
		} else {
			options.fail(result, data);
		}
	}).fail(function(response) {
		if (options.useBlock == "Y") {
			StepEkt.unblockUI();
		}
		alert("작업 중 오류가 발생했습니다.");
	}).always(function(response) {
		options.complete(response);
	});
};

StepEkt.dext = {
	ready : function(dextEditorId, newFunc) {
		var oldFunc = window.dext_editor_loaded_event;
		window.dext_editor_loaded_event = function(editor) {
			if (editor.ID == dextEditorId) {
				//DEXT5.util.getEditorByName(dextEditorId);
				setTimeout(newFunc, 0);
			}

			if (oldFunc != null && oldFunc != undefined) {
				oldFunc(editor);
			}
		}
	}
};

StepEkt.viewer = {
	_createDextObj : function(dextEditorId) {
		return {
			getId : function() {
				return dextEditorId;
			},
			getHtmlValue : function() {
				return DEXT5.getHtmlValue(dextEditorId);
			},
			getTextValue : function() {
				return DEXT5.getBodyTextValue(dextEditorId);
			},
			setHtmlValue : function(value) {
				return DEXT5.setHtmlContents(value, dextEditorId);
			},
			setTextValue : function() {
				return DEXT5.setBodyTextContents(value, dextEditorId);
			}
		};
	},
	find : function(options) {
		defaultOption = {
			placeHolder: ""
		};
		options = $.extend({}, defaultOption, options || {});
		var dextEditorId = options.placeHolder.attr("dextEditorId");
		return this._createDextObj(dextEditorId);
	},
	create : function(options) {
		defaultOption = {
			placeHolder: "",
			width: "100%",
			height: "100%",
			ready: null
		};
		options = $.extend({}, defaultOption, options || {});
		var dextEditorId = StepEkt.random("deId");
		var placeHolder = options.placeHolder;
		if (placeHolder.length == 0) {
			console.error("placeHolder error");
			return {};
		}
		var placeHolderId = placeHolder.attr("id");
		placeHolder.attr("dextEditorId", dextEditorId);
		if (placeHolderId == undefined || placeHolderId == "") {
			placeHolderId = StepEkt.random("deId");
			placeHolder.attr("id", placeHolderId);
		}
		if (options.ready != null) {
			StepEkt.dext.ready(dextEditorId, options.ready);
		}
		DEXT5.config.EditorHolder = placeHolderId;
		DEXT5.config.Width = options.width;
		DEXT5.config.Height = options.height;
        DEXT5.config.Mode = "view";
        DEXT5.config.HandlerUrl = location.origin + CP + "/editor/dext5editorHandler.do";
		new Dext5editor(dextEditorId);
		return this._createDextObj(dextEditorId);
	}
};

StepEkt.editor = {
	_createDextObj : function(dextEditorId) {
		return {
			getId : function() {
				return dextEditorId;
			},
			getHtmlValue : function() {
				return DEXT5.getHtmlValue(dextEditorId);
			},
			getBodyValue : function() {
				return DEXT5.getBodyValue(dextEditorId);
			},
			getTextValue : function() {
				return DEXT5.getBodyTextValue(dextEditorId);
			},
			setHtmlValue : function(value) {
				return DEXT5.setHtmlContents(value, dextEditorId);
			},
			setBodyValue : function(value) {
				return DEXT5.setBodyValue(value, dextEditorId);
			},
			setTextValue : function(value) {
				if (value == null) {
					value = "";
				} else {
					value = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
				}
				return DEXT5.setBodyValue(value, dextEditorId);
			}
		};
	},
	find : function(options) {
		defaultOption = {
			placeHolder: ""
		};
		options = $.extend({}, defaultOption, options || {});
		var dextEditorId = options.placeHolder.attr("dextEditorId");
		return this._createDextObj(dextEditorId);
	},
	create : function(options) {
		defaultOption = {
			placeHolder: "",
			width: "100%",
			height: "100%",
			ready: null,
			dialogWindow: window
		};
		options = $.extend({}, defaultOption, options || {});
		var maxZ = $("body *").getMaxZ();
		var dextEditorId = StepEkt.random("deId");
		var placeHolder = options.placeHolder;
		if (placeHolder.length == 0) {
			console.error("placeHolder error");
			return {};
		}
		var placeHolderId = placeHolder.attr("id");
		placeHolder.attr("dextEditorId", dextEditorId);
		if (placeHolderId == undefined || placeHolderId == "") {
			placeHolderId = StepEkt.random("dehId");
			placeHolder.attr("id", placeHolderId);
		}

		if (options.ready != null) {
			StepEkt.dext.ready(dextEditorId, options.ready);
		}
		DEXT5.config.EditorHolder = placeHolderId;
		DEXT5.config.Width = options.width;
		DEXT5.config.Height = options.height;
        DEXT5.config.Mode = "edit";
		DEXT5.config.DialogWindow = options.dialogWindow;
        DEXT5.config.HandlerUrl = location.origin + CP + "/editor/dext5editorHandler.do";
		new Dext5editor(dextEditorId);
		return this._createDextObj(dextEditorId);
	}
};

StepEkt.uploader = {
	create : function(options) {
		defaultOption = {
			width: "100%",
			height: "100%"
		};
		options = $.extend({}, defaultOption, options || {});
		var maxZ = $("body *").getMaxZ();
		var dextUploaderName = StepEkt.random("duId");
		var placeHolder = options.placeHolder;
		if (placeHolder.length == 0) {
			console.error("placeHolder error");
			return {};
		}
		var placeHolderId = placeHolder.attr("id");
		if (placeHolderId == undefined || placeHolderId == "") {
			placeHolderId = StepEkt.random("duhId");
			placeHolder.attr("id", placeHolderId);
		}
        DEXT5UPLOAD.config.Width = options.width;
        DEXT5UPLOAD.config.Height = options.height;
        DEXT5UPLOAD.config.UseFileSort = '0';
        DEXT5.config.HandlerUrl = location.origin + CP + "/editor/dext5editorHandler.do";
		new Dext5Upload(dextUploaderName);
		var retObj = {
		};
		return retObj;
	}
};

StepGrid = {
	create : function(options, isChangeEvent, isClickEvent) {
		defaultOption = {
			gridId: StepEkt.random("grid"),
			popupHolder: "",
			width: "100%",
			height: "100%",
			rowHeight : "",
			ready: function() {},
			scroll: function() {},
			lblFunctions: {},
			events: [],
			footer: "",
			editable: false,
			doubleClickEnabled: false,
			filterable: false
		};

		defaultColumn = {
			type: "DataGridColumn",
			headerText:""
		};

		var extOptions = $.extend({}, defaultOption, options || {});

		function getLayoutStr(options) {
			var layoutStr = ``;

			if (options.layout != null) {
				layoutStr = `<?xml version="1.0" encoding="utf-8"?><rMateGrid>`;

				if (options.layout.options != null) {
					options.layout.options.forEach(function(option) {
						var str = `<` + option.type;
						for (var key in option) {
							if (key == "type") {
							} else {
								str += ` ` + key + `="` + option[key] + `"`;
							}
						}
						str += `/>`;
						layoutStr += str;
					});
				}

				var lockStr = ``;

				if (options.lock_row != null && options.lock_row != "") {
					lockStr += ` lockedRowCount="` + options.lock_row + `" `;
				}
				if (options.lock_col != null && options.lock_col != "") {
					lockStr += ` lockedColumnCount="` + options.lock_col + `" `;
				}

				layoutStr += `<NumberFormatter id="numfmt" useThousandsSeparator="true"/>`;
				layoutStr += `<DateFormatter id="datefmt" formatString="YYYY.MM.DD"/>`;
				layoutStr += `<PercentFormatter id="percfmt" useThousandsSeparator="true"/>`;

				//DataGrid 레이아웃 설정 시작
				layoutStr += `<DataGrid id="dg1" `+lockStr+`headerColors="[#F9F9FB,#F9F9FB]" verticalAlign="middle" textAlign="center"`;

				//행높이 설정시 DataGrid의 마지막에 행높이 추가
				if(!isEmpty(options.rowHeight)) {
					let rowHeight = options.rowHeight;
					//레이아웃 추가
					appendLayout("rowHeight", rowHeight);
				}

				//선택모드 설정 (multipleCells, multipleRows, none, singleCell, singleRow중 택1)
				if(!isEmpty(options.selectorControl)) {
					let selectionMode = options.selectorControl;
					if(selectionMode != "multipleCells" && selectionMode != "multipleRows" && selectionMode != "none"
						&& selectionMode != "singleCell" && selectionMode != "singleRow") {
						selectionMode = "singleRow"; //기본값 설정
					}
					//레이아웃 추가
					appendLayout("selectionMode", selectionMode);
				}

				//컬럼 정렬가능여부 조정 (true,false중 택일, 기본 false)
				if(!isEmpty(options.sortableColumns)) {
					let sortableColumns = options.sortableColumns;
					if(sortableColumns != "true" && sortableColumns != "false") {
						sortableColumns = "false";
					}
					//레이아웃 추가
					appendLayout("sortableColumns", sortableColumns);
				}

				//수평스크롤 옵션 유효성 체크 (auto, on, off)
				if(!isEmpty(options.horizontalScrollPolicy)) {
					let horizontalScrollPolicy = options.horizontalScrollPolicy;
					if(horizontalScrollPolicy != "auto" && horizontalScrollPolicy != "on" && horizontalScrollPolicy != "off") {
						horizontalScrollPolicy = "auto";
					}
					//레이아웃 추가
					appendLayout("horizontalScrollPolicy", horizontalScrollPolicy);
				}

				//수정모드 지정 (true,false중 택일, 기본 false)
				if(!isEmpty(options.editable)) {
					let editable = options.editable;
					if(editable != "true" && editable != "false") {
						editable = "false";
					}
					//레이아웃 추가
					appendLayout("editable", editable);
				}

				//더블클릭 가능 여부 (true,false중 택일, 기본 false, true의 경우 더블클릭하면 해당 셀을 수정할수 있게 됩니다)
				if(!isEmpty(options.doubleClickEnabled)) {
					let doubleClickEnabled = options.doubleClickEnabled;
					if(doubleClickEnabled != "true" && doubleClickEnabled != "false") {
						doubleClickEnabled = "false";
					}
					//레이아웃 추가
					appendLayout("doubleClickEnabled", doubleClickEnabled);

				}

				layoutStr += `>`;
				//DataGrid 레이아웃 설정 끝
				if (options.layout.columns != null) {
					layoutStr += `<columns>`;
					options.layout.columns.forEach(function(column) {
						column = $.extend({}, defaultColumn, column);
						processColumn(column);
					});
					layoutStr += `</columns>`;
				} else if (options.layout.groupColumns != null) {
					layoutStr += `<groupedColumns>`;
					options.layout.groupColumns.forEach(function (column) {
						column = $.extend({}, defaultColumn, column);
						processColumn(column);
					});
					layoutStr += `</groupedColumns>`;
				}

				// footer 설정
				if (options.footer == "footer_smsEmlUseStatusList"){
					// SMS/EML 사용 현황
					layoutStr += `<footers>`;
					layoutStr += `<DataGridFooter height="35">`;
					layoutStr += `<DataGridFooterColumn label="합계" colSpan = "5" textAlign="center"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{smsCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{emlCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `</DataGridFooter>`;
					layoutStr += `</footers>`;
				} else if (options.footer == "footer_companyDealingStateMain"){
					// 업채별 매매현황
					layoutStr += `<footers>`;
					layoutStr += `<DataGridFooter height="35">`;
					layoutStr += `<DataGridFooterColumn label="합계" colSpan = "3" textAlign="center"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{okCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{cancelCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{sellCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{rejectCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `</DataGridFooter>`;
					layoutStr += `</footers>`;
				} else if (options.footer == "footer_profitStatus"){
					// 과정별 매출현황
					layoutStr += `<footers>`;
					layoutStr += `<DataGridFooter height="35">`;
					layoutStr += `<DataGridFooterColumn label="합계" colSpan = "7" textAlign="center"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{prchsAmt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{rfndAmt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{prftAmt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `</DataGridFooter>`;
					layoutStr += `</footers>`;
				} else if (options.footer == "footer_saleStatusByCourse"){
					// 과정별 판매현황
					layoutStr += `<footers>`;
					layoutStr += `<DataGridFooter height="35">`;
					layoutStr += `<DataGridFooterColumn label="합계" colSpan = "11" textAlign="center"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{prchsCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `<DataGridFooterColumn summaryOperation="SUM" dataColumn="{rfndCnt}" formatter="{numfmt}" textAlign="right"/>`;
					layoutStr += `</DataGridFooter>`;
					layoutStr += `</footers>`;
				}

				//레이아웃 추가하는 함수
				function appendLayout(optionName, option) {
					layoutStr += ` ` + optionName + `="` + option + `"`
				}

				function getType(column) {
					var type = column.type;
					if (type == "group") {
						return "DataGridColumnGroup";
					} else if (type == "select") {
						return "DataGridSelectorColumn";
					}
					return type;
				}
				function processColumn(column) {
					layoutStr += `<` + getType(column);
					var group = [];
					for (var key in column) {
						var value = column[key];
						if (key == "type") {
						} else if (key == "group") {
							group = value;
						} else if (key == "labelJsFunction") {
							layoutStr += ` ` + key + `="` + options.gridId + value + `"`;
						} else if (key == "visible") {
							layoutStr += ` ` + key + `="` + value + `"`;
						} else if (key == "headerText") {
							layoutStr += ` ` + key + `="` + value.replaceAll("<", "&lt;").replaceAll(">", "&gt;") + `"`;
						} else {
							layoutStr += ` ` + key + `="` + value + `"`;
						}
					}
					if ((options.filterable && (isEmpty(column.popfilterable) || column.popfilterable)) == true ) {
						layoutStr += ` filterable="true"  filterType="list" `;
					} else {
						layoutStr += ` filterable="false" `;
					}
					layoutStr += `>`;

					$.each(group, function (idx, column) {
						column = $.extend({}, defaultColumn, column);
						processColumn(column);
					});
					layoutStr += `</` + getType(column) + `>`;
				}
				layoutStr += `</DataGrid>`;
				layoutStr += `<Style>`;
				layoutStr += `.makeCellAsLink{`;
				layoutStr += `text-decoration: underline;`
				layoutStr += `color:#0000ff;cursor:hand;`
				layoutStr += `font-weight:bold;`
				layoutStr += `}`;
				layoutStr += `</Style>`;
				layoutStr += `<Box id="messageBox" width="100%" height="100%" backgroundAlpha="0.3" backgroundColor="#CCCCCC" verticalAlign="middle" horizontalAlign="center" visible="false">`;
				layoutStr += `<Label id="messageLabel" text="" fontSize="18px" fontWeight="bold" color="#666" textAlign="center"/>`;
				layoutStr += `</Box>`;
				layoutStr += `</rMateGrid>`;
			}
//			console.log(layoutStr);
			return layoutStr;
		}

		if (extOptions.popupHolder != null && extOptions.popupHolder != "") {
			extOptions.popupHolder.css("cursor", "pointer").click(function(evt) {
				evt.preventDefault();
				$("[areaGridPopupManage]").remove();
				let posTop = extOptions.popupHolder.offset().top;
				let fixedTop = posTop - 250;


				let popupGridApp;  // 그리드를 포함하는 div 객체
    			let popupGridRoot;   // 데이터와 그리드를 포함하는 객체
				let popupDataGrid;	//실제 그리드를 표시하는 컴포넌트

				let searchedText;

				//그리드객체들 로딩
				loadGridObject();

				function loadGridObject() {
					popupGridApp = document.getElementById(extOptions.gridId);  // 그리드를 포함하는 div 객체
	    			popupGridRoot = popupGridApp.getRoot();   // 데이터와 그리드를 포함하는 객체
					popupDataGrid = popupGridRoot.getDataGrid();	//실제 그리드를 표시하는 컴포넌트
				}

				//필터내에서 셀렉션 모드 변경했을경우 필터닫았을때 원래대로 되돌리기 위한 변수
				let oldSelectionMode = popupDataGrid.getSelectionMode();

				if ( fixedTop < 0 ) fixedTop = 0;
				var popupStr =
					`<div class="master_title" style="top:`+fixedTop+`px; left:300px; width:350px !important" areaGridPopupManage>
						<div class="filter_layer">
							<button type="button" class="filter_close" btnClose>
								<img src="` + CP + `/asset/img/filter_close.png">
							</button>
							<ul>
								<li>
									<span>보기</span>
									<select class="selectpicker" m_count></select>
								</li>
								<li>
									<span>찾기</span>
									<input type="text" class="normal_input" m_search_text>
									<div class="filter_search">
										<button class="btn bg01" btn_prev>이전</button>
										<button class="btn bg05" btn_next>다음</button>
									</div>
								</li>
							</ul>
							<div class="filter_btns">
								<button type="button" btn_filter="Y"><img src="` + CP + `/asset/popup/img/common/master_ico1.png" class="mr_5">필터</button>
								<div>
									<button type="button" btn_col_lock><img src="` + CP + `/asset/popup/img/common/master_ico4.png" class="mr_5">열고정</button>
									<div class="filter_select">
										<select class="selectpicker" m_col_count></select>
									</div>
								</div>
								<button type="button" btn_filter="N"><img src="` + CP + `/asset/popup/img/common/master_ico2.png" class="mr_5">필터 취소</button>
								<div>
									<button type="button" btn_row_lock><img src="` + CP + `/asset/popup/img/common/master_ico5.png" class="mr_5">행고정</button>
									<div class="filter_select">
										<select class="selectpicker" m_row_count></select>
									</div>
								</div>
								<button type="button" btn_col_hide="Y"><img src="` + CP + `/asset/popup/img/common/master_ico3.png" class="mr_5">컬럼 숨기기</button>
							</div>
							<div class="filter_colums" areaColumn></div>
						</div>
					</div>`;
				var $popup = $(popupStr);
				$("body").append($popup);
				[10, 20, 50, 100].forEach(function(obj) {
					$popup.find("[m_count]").append(`<option value="` + obj + `" ` + (options.pageUnit == obj ? `selected="selected"` : ``) + `>` + obj + `개</option>`);
				});
				popupDataGrid.getColumns().forEach(function(obj, idx) {
					var column = obj;
					if (idx == 0) {
						$popup.find("[m_col_count]").append(`<option value="0">해제</option>`);
					}
					if (column.className == "DataGridColumn") {
						var headerText = column._headerText;
						var option = $(`<option value="` + (idx + 1) + `"></option>`);
						option.attr("title", headerText);
						function getSize(str) {
							var size = 0;
							for (var i = 0; i < str.length; i++) {
								var length = escape(str.charAt(i)).length;
								if (length > 4) {
									size++;
								}
								size++;
							}
							return size;
						}
						if (getSize(headerText) > 8) {
							headerText = headerText.substring(0, 3) + "...";
						}
						option.text(headerText);
						$popup.find("[m_col_count]").append(option);
					}
				});
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function(obj, idx) {
					if (idx == 0) {
						$popup.find("[m_row_count]").append(`<option value="0">해제</option>`);
					}
					$popup.find("[m_row_count]").append(`<option value="` + obj + `">` + obj + `</option>`);
				});

				//컬럼 숨기기 그리기
				columnHideFunc();


				//컬럼 숨기기 항목 그리는 함수
				function columnHideFunc() {
					$popup.find("[areaColumn]").empty();
					loadGridObject();
					popupDataGrid.getColumns().forEach(function(obj, idx) {
						var column = obj;
						if (column.className == "DataGridColumn" && !isEmpty(column._headerText)) {
							var headerText = column._headerText;
							var $columnInfo = $(`<label class="checkbox"><input type="checkbox"><i></i><span></span>` + headerText + `</label>`);
							$columnInfo.attr("title", headerText);
							if (~-encodeURI(headerText).split(/%..|./).length > 19) {}

							//체크박스 이벤트 등록
							$columnInfo.find("input[type=checkbox]").prop("checked", column._visible).attr("idx", idx).change(function() {
								var self = this;
								//이벤트가 동작할때는 popupDataGrid를 다시 불러와서 처리(다른 기능으로 layout이 변경돼서 그리드객체가 바뀔수있음)
								popupDataGrid.getColumns()[idx].setVisible(self.checked);
							});
						}
						$popup.find("[areaColumn]").append($columnInfo);
					});
				}

				$popup.find("[btnClose]").click(function(evt) {
					evt.preventDefault();
					popupDataGrid.setSelectionMode(oldSelectionMode);
					$popup.remove();
					return false;
				});
				$popup.find("[m_col_count]").val(dataGrid.getLockedColumnCount());
				$popup.find("[m_row_count]").val(dataGrid.getLockedRowCount());
				$popup.find("[m_count]").change(function() {
					options.pageUnit = $popup.find("[m_count]").val();
					extOptions.search();
				});

				$popup.find("[m_search_text]").on("change", function(evt) {
					searchedText = "";
				});

				$popup.find("[m_search_text]").on("keydown", function(evt) {
					if (evt.keyCode == 13) {
						let searchVal = $popup.find("[m_search_text]").val();
						if (isEmpty(searchVal)) {
							alert("검색어를 입력해 주시기 바랍니다.");
							return false;
						}

						//singleCell로 설정할경우 매개변수의 값까지 찾아질수있음
//					    popupDataGrid.setSelectionMode('singleCell');
						findSearchValue(searchVal);
					}
				});
				$popup.find("[btn_prev]").click(function(evt) {
					evt.preventDefault();
					var searchVal = $popup.find("[m_search_text]").val();

					if(isEmpty(searchVal)){
			    		alert("검색어를 입력해 주시기 바랍니다.");
						return false;
			    	}

					if (isEmpty(searchedText)) {
						findSearchValue(searchVal);
						return;
					}

					popupGridRoot.searchPrevious();
				});
				$popup.find("[btn_next]").click(function(evt) {
					evt.preventDefault();

					var searchVal = $popup.find("[m_search_text]").val();
			    	if(searchVal == ""){
			    		alert("검색어를 입력해 주시기 바랍니다.");
						return false;
			    	}

					if (isEmpty(searchedText)) {
						findSearchValue(searchVal);
						return;
					}

				    popupGridRoot.searchNext();
				});

				function findSearchValue(value) {
					let result = popupGridRoot.search(value);

					if (result == true) {
						searchedText = value;
				    } else {
						alert(value+" 을(를) 찾을 수 없습니다");
						searchedText = "";
					}
				}

				$popup.find("[btn_filter]").click(function(evt) {
					evt.preventDefault();
					extOptions.filterable = ($(this).attr("btn_filter") == "Y") ? true : false;
					popupGridApp.setLayout(getLayoutStr(extOptions));

					//컬럼 숨기기 그리기 setLayout실행시간이 길어서 타이아웃 설정
					setTimeout(() => columnHideFunc(), 100);

					return false;
				});
				$popup.find("[btn_col_lock]").click(function(evt) {
					evt.preventDefault();
					extOptions.lock_col = $popup.find("[m_col_count]").val();
					gridApp.setLayout(getLayoutStr(extOptions));

					//컬럼 숨기기 그리기 setLayout실행시간이 길어서 타이아웃 설정
					setTimeout(() => columnHideFunc(), 100);
					return false;
				});

//				$popup.find("[m_col_count]").click(function(evt) {
//					evt.preventDefault();
//					extOptions.lock_col = $popup.find("[m_col_count]").val();
//					gridApp.setLayout(getLayoutStr(extOptions));
//
//					//컬럼 숨기기 그리기 setLayout실행시간이 길어서 타이아웃 설정
//					setTimeout(() => columnHideFunc(), 100);
//					return false;
//				});

				$popup.find("[m_col_count]").change(function() {
					extOptions.lock_col = $popup.find("[m_col_count]").val();
					gridApp.setLayout(getLayoutStr(extOptions));

					//컬럼 숨기기 그리기 setLayout실행시간이 길어서 타이아웃 설정
					setTimeout(() => columnHideFunc(), 100);
				});
				$popup.find("[m_row_count]").change(function() {
					extOptions.lock_row = $popup.find("[m_row_count]").val();
					gridApp.setLayout(getLayoutStr(extOptions));

					//컬럼 숨기기 그리기 setLayout실행시간이 길어서 타이아웃 설정
					setTimeout(() => columnHideFunc(), 100);
				});
//				$popup.find("[btn_row_lock]").click(function(evt) {
//					evt.preventDefault();
//					extOptions.lock_row = $popup.find("[m_row_count]").val();
//					gridApp.setLayout(getLayoutStr(extOptions));
//
//					//컬럼 숨기기 그리기 setLayout실행시간이 길어서 타이아웃 설정
//					setTimeout(() => columnHideFunc(), 100);
//					return false;
//				});
				$popup.find("[btn_col_hide]").click(function(evt) {
					evt.preventDefault();
					var status = $popup.find("[btn_col_hide]").attr("btn_col_hide");
					if (status == "Y") { // 숨김상태
						$popup.find("[btn_col_hide]").attr("btn_col_hide", "N");
						$popup.find("[areaColumn]").show();
					} else { // 보임상태
						$popup.find("[btn_col_hide]").attr("btn_col_hide", "Y");
						$popup.find("[areaColumn]").hide();
					}
					return false;
				});
				$popup.find(".selectpicker").selectpicker("refresh").on('loaded.bs.select', StepEkt.selectpickerTitle);;
				$popup.show();
				return false;
			});
		}

		// labelJsFunction 시작
		for (var key in extOptions.lblFunctions) {
			(function(key) {
				var functionName = extOptions.gridId + key;
				window[functionName] = extOptions.lblFunctions[key];
			})(key);
		}
		// labelJsFunction 종료

		var gridReadyHandlerName = StepEkt.random("gridReadyHandler");
		var gridApp = null;
		var gridRoot = null;
		var dataGrid = null;
		var vpos = 0;
		var lastVpos = 0;	// 마지막 스크롤 위치
		var _isReady = false;
		var _isReturn = false;

		window[gridReadyHandlerName] = function(id) {
			gridApp = document.getElementById(id);  // 그리드를 포함하는 div 객체
			gridRoot = gridApp.getRoot();   // 데이터와 그리드를 포함하는 객체

			window[gridReadyHandlerName] = null;

			gridRoot.addEventListener("layoutComplete", function(event) {
				dataGrid = gridRoot.getDataGrid();	// 그리드 객체
				dataGrid.addEventListener("scroll", function(event) {
					if (event.direction == "vertical") {
						vpos = event.position;
						if (vpos == 0) {
							return;
						}
						console.log("vpos : "+vpos);
						console.log("dataGrid.getMaxVerticalScrollPosition() : "+dataGrid.getMaxVerticalScrollPosition());
						if (vpos >= dataGrid.getMaxVerticalScrollPosition()) {
							if (vpos != lastVpos) {
								lastVpos = vpos;
								(function() {
									extOptions.scroll();
								})();
							}
						}
					}
				});
				$.each(extOptions.events, function(idx, evtObj) {
					if (evtObj.id != null && evtObj.id != "") {
						(function() {
							var selector = gridRoot.getObjectById(evtObj.id);
							selector.addEventListener(evtObj.event, function(evt) {
								evtObj.callback(evt, selector);
							});
						})();
					} else {
						(function() {
							if (evtObj.event == "itemDataChanged") {
								gridRoot.addEventListener(evtObj.event, function(evt) {
									evtObj.callback(evt);
								});
							} else {
								dataGrid.addEventListener(evtObj.event, function(evt) {
									evtObj.callback(evt);
								});
							}
						})();
					}
				});
				dataGrid.setVerticalScrollPosition(vpos);
			});
			gridRoot.addEventListener("dataComplete", function(event) {
				dataGrid = gridRoot.getDataGrid();
				if (isChangeEvent) {
					dataGrid.addEventListener("change", function(event) {
						var rowIndex = event.rowIndex;
				        var columnIndex = event.columnIndex;
			            var rows = dataGrid.getSelectedIndices();
						var rowdata = gridRoot.dataSet[rows];

		            	rowSelected(rows, rowdata);
					});
				}
				if (isClickEvent) {
					dataGrid.addEventListener("itemClick", function(event) {
						event.preventDefault();
				    	var rowIndex = event.rowIndex;
				        var columnIndex = event.columnIndex;
			            var rows = dataGrid.getSelectedIndices();
						var rowdata = gridRoot.dataSet[rows];

						if (extOptions.itemClicked) {
			            	extOptions.itemClicked(rowIndex, columnIndex, rows, rowdata);
						} else if (window.itemClicked) {
			            	itemClicked(rowIndex, columnIndex, rows, rowdata);
						}
					});
				}
				dataGrid.addEventListener("filterClick", function(event) {
					var collection = gridRoot.getCollection();
					if (collection._localIndex.length > 0) {
						retObj.hideNoDataMessage();
					} else {
						retObj.showNoDataMessage();
					}
				});
			});

			gridApp.setLayout(getLayoutStr(extOptions));

			_isReady = true;

			function _ready() {
				if (_isReturn) {
					extOptions.ready();
				} else {
					setTimeout(_ready, 100);
				}
			}

			setTimeout(_ready, 0);
		}

		rMateGridH5.create(extOptions.gridId, extOptions.parentId, "rMateOnLoadCallFunction=" + gridReadyHandlerName, extOptions.width, extOptions.height);

		var retObj = {
			gridId : extOptions.gridId,
			isReady : function() {
				return _isReady;
			},
			setData : function(data) {
				vpos = 0;
				lastVpos = 0;
				this.hideNoDataMessage();
				gridApp.setData(data);
			},
			addData : function(data) {
				gridApp.addData(data);
			},
			getSelectedCheck : function(selectorId) {
				try {
					var selectorColumn = gridRoot.getObjectById(selectorId);
					var indices = selectorColumn.getSelectedIndices();
					var collection = gridRoot.getCollection();
					var sData = collection.getSource();
					var list = [];
					indices.forEach(function(index) {
						list.push(sData[index]);
					});
					return list;
				} catch {
					return[];
				}
			},
			getSelectedIndex : function() {
				return dataGrid.getSelectedIndex();
			},
			setSelectedIndex : function(num) {
				dataGrid.setSelectedIndex(num);
			},
			getSelectedItem : function() {
				return dataGrid.getSelectedItem();
			},
			getSelectedItemsIndices : function() {
				return dataGrid.getSelectedIndices();
			},
			getSelectedItemsData : function() {
				return dataGrid.getSelectedItems();
			},
			removeItemAt : function(index) {
				gridRoot.removeItemAt(index);
			},
			getLength: function() {
				return gridRoot.getLength();
			},
			getSelectedRowId : function(num) {	// 선택된 row의 id 읽기
				return gridRoot.dataSet[num].id;
			},
			getCollection : function() {
				return gridRoot.getCollection();
			},
			getDataSet : function() {
				return gridRoot.dataSet;
			},
			getSelectedRowData : function(num) {	// 선택된 row의 자료 읽기
				return gridRoot.dataSet[num];
			},
			getLastRowData : function() {	// 마지막 줄의 자료 읽기
				let dsLength = gridRoot.dataSet.length;
				if (dsLength > 0) {
					return gridRoot.dataSet[dsLength-1];
				}
				else {
					return undefined;
				}
			},
			getCurrentGridRoot : function() {
				return gridRoot;
			},
			setGridColumnTextValue(column_title, change_text) {
			    let selectorColumn = gridRoot.getObjectById("selector");
			    let selectedIndices = selectorColumn.getSelectedIndices();

			    for (let i = 0; i < selectedIndices.length; i++) {
			        gridRoot.setItemFieldAt(change_text, selectedIndices[i], column_title);
			    }
			},
			removeSelected: function(selector) {
				gridRoot.removeSelectorColumnSelectedIndices(selector);
			},
			getRowCount: function() {
				return gridRoot.dataSet.length;
			},
			clear: function() {
				gridApp.setData([]);
			},
			noData: function() {
				this.showNoDataMessage("조회된 결과가 없습니다.");
				gridApp.setData([]);
			},
			showNoDataMessage: function(msg) {
				if (msg == null || msg == "") { msg = "조회된 결과가 없습니다."; }
				var messageLabel = gridRoot.getObjectById("messageLabel");
				if (messageLabel != undefined) {
					messageLabel.setText(msg);
				}
				var messageBox = gridRoot.getObjectById("messageBox");
				if (messageBox != undefined) {
					messageBox.setVisible(true);
				}
			},
			hideNoDataMessage: function() {
				var messageBox = gridRoot.getObjectById("messageBox");
				if (messageBox != undefined) {
					messageBox.setVisible(false);
				}
			},
			findText: function(str) {
			    // 검색할 문자열 지정
			    gridRoot.setSearchString(str);
			    dataGrid.setSelectionMode('singleCell');
			    // 검색 실행
			    var result = gridRoot.search(str);

			    if (result == false) {
			        alert(str+ "을(를) 찾을 수 없습니다");
			    } else {
			    }
			    return result;
			},
			findTextPrev: function() {
				gridRoot.searchPrevious();
			},
			findTextNext: function() {
				gridRoot.searchNext();
			},
			isExists: function(searchColumn, searchStr) {
				let exists = false;
				const data = this.getGridData();

				data.forEach(function(obj) {
					if (searchStr == obj[searchColumn]) {
						exists = true;
						return false;
					}
				});

				return exists;
			},
			getOption: function() {
				return extOptions;
			},
			setColumnVisible(columnNo, check) {
			    dataGrid = gridRoot.getDataGrid();
			    columns = dataGrid.getColumns();
			    columns[columnNo].setVisible(check);
			},
			setLayout() {
				gridApp.setLayout(getLayoutStr(extOptions));
			}
			/*최재현 추가 그리드 리턴함수 시작*/
			,
			getGridData: function() {
				return gridRoot.getGridData();
			},
			resize : function() {
			    gridApp.resize();
			},
			getGridApp : function() {
			    return gridApp; //gridApp리턴
			},
			/*최재현 추가 그리드 리턴함수 끝*/
			// 수정 작업 결과 가져오기 (그리드에서 작업된 입력,수정,삭제 내용을 가져옵니다)
			// 데이터는 배열 형태로
			//  idx: 행번호
			//  job: 수행 작업 (I:입력, U:수정, D:삭제)
			//  data: 행의 자료
			//  를 가지고 있으며 삭제가 먼저 오도록 정렬되어 있습니다
			getChangedData : function() {
		  		var changedData = gridRoot.getChangedData();
			    if (changedData.length == 0){
					if( gridRoot.getRemoveAllData() ) {
			            //alert("전체 삭제 되었습니다.");
			        }else{
			           // alert("변경된 자료가 없습니다.");
					}
				}else{
					return changedData;
			    }
			} //hbkang 추가 그리드 행 삽입
		};

		_isReturn = true;

		return retObj;
	}
};

StepEkt.getHtml = function(options) {
    defaultOption = {
        type: "GET",
        async: true,
        callback: function(html) {}
    };
    options = $.extend({}, defaultOption, options || {});
	/*2023-05-10 최재현 매개변수 data 추가 시작*/
    var data = options.data;
    if (data == undefined) {
        data = {};
    } else {
        if (data instanceof jQuery) {
            data = data.get(0)
        }
        if (data.nodeName == "FORM") {
            data = new FormData(data);
        }
    }
	/*2023-05-10 최재현 매개변수 data 추가 끝*/
    var ajaxData = {
        url: options.url,
        data: data,	/*2023-05-10 최재현 매개변수 data 추가*/
        type: options.type,
        async: options.async
    };
    StepEkt.blockUI();
    $.ajax(ajaxData).done(function(response) {
        options.callback(response);
    }).fail(function(response) {
    }).always(function(response) {
        StepEkt.unblockUI();
    });
};

StepEkt.selectCmsVerInfo = function(options) {
	defaultOptions = {};
	options = $.extend({}, defaultOption, options || {});
	StepEkt.ajax({
		url: CP + "/coursemgmt/selectCmsVerInfoAjax.do",
		data: { verCd: options.verCd },
		method: "GET",
		success: function(data) {
			data.cmsLssnList.forEach(function(obj, idx) {
				obj.lssnNo = obj.nthSeq;
			});
			options.callback(data.cmsInfo, data.cmsLssnList, data.cmsNcsList, data.cmsPicList);
		}
	});
};

StepEkt.selectpickerTitle = function() {
	// bs의  selectpicker 후에 option의 title을 selectpicker의 title로 처리한다.
	var $el = $(this);
	var $selectpicker = $el.data('selectpicker');
	var $element = $selectpicker.$element;
	var $elements = $selectpicker.selectpicker.main.elements;
	$element.find("option").each(function(idx, obj) {
		var tooltip_title = $(obj).attr('title');
		if (tooltip_title != null && tooltip_title != "") {
			$($elements[idx]).attr("title", tooltip_title);
		}
	});
};

StepEkt.replaceChild = function($parents, nodeName, $selector, value) {
	let findStr = "";
	Object.keys($selector).forEach(function(key, idx) {
		findStr += "[" + key + "=" + $selector[key] + "]";
	});
	$parents.find(findStr).remove();
	let createEle = $("<" + nodeName + ">");
	Object.keys($selector).forEach(function(key, idx) {
		createEle.attr(key, $selector[key]);
	});
	createEle.val(value);
	$parents.append(createEle);
};

StepEkt.createFormDataByAppId = function(appId, $app) {
	if ($app == null) {
		$app = $("[app=" + appId + "]");
	}
	const formData = new FormData();
	// set : 중복이름 불가
	// append : 중복이름 가능

	$app.find("input").each(function(idx, obj) {
		const $obj = $(obj);
		const name = $obj.attr("name");
		const type = $obj.attr("type");
		const key = name + "_" + appId;
		const hasKey = obj.hasAttribute(key);
		if (name != "" && hasKey) {
			if (type == "text") {
				formData.append(name, $obj.val());
			} else if (type == "hidden") {
				formData.append(name, $obj.val());
			} else if (type == "number") {
				formData.append(name, $obj.val());
			} else if (type == "file") {
				if (obj.files[0]) {
					formData.append(name, obj.files[0]);
				}
			} else if (type == "radio") {
				if ($obj.prop("checked")) {
					formData.append(name, $obj.val());
				}
			} else if (type == "checkbox") {
				if ($obj.prop("checked")) {
					formData.append(name, $obj.val());
				}
			}
		} else {
			console.error(obj);
		}
	});

	$app.find("textarea").each(function(idx, obj) {
		const $obj = $(obj);
		const name = $obj.attr("name");
		const key = name + "_" + appId;
		const hasKey = obj.hasAttribute(key);
		if (name != "" && hasKey) {
			formData.append(name, $obj.val());
		}
	});

	$app.find("select").each(function(idx, obj) {
		const $obj = $(obj);
		const name = $obj.attr("name");
		const type = $obj.attr("type");
		const key = name + "_" + appId;
		const hasKey = obj.hasAttribute(key);
		if (name != "" && hasKey) {
			formData.append(name, $obj.val());
		}
	});

	(function() {
		for (const [key, value] of formData.entries()) {
			//console.log(key, value);
		}
	})();

	return formData;
};

StepEkt.doSampleDown = function(rfileName, sfileName) {
	const $iframe = $("<iframe style='display:none' width='0' height='0'></iframe>");
	$("body").append($iframe);
	$iframe.attr("src", CP + "/fileDownServlet?filePath=/sample&rFileName=" + rfileName + "&sFileName=" + sfileName);
	setTimeout(function() { $iframe.remove(); }, 60000);
};

StepEkt.doFileDown = function(url) {
	const $form = $("<form target='_blank'>");
	$("body").append($form);
	$form.attr("action", url).submit();
	setTimeout(function() { $form.remove(); }, 60000);
};

StepEkt.logoUrl = function(url) {
	if (url != null && (url.startsWith("/olei/") || url.startsWith("/Polaris/") || url.startsWith("/coursemaster/") || url.startsWith("/VT/") )) {
		return  CMS_FILE_GET_PATH + url;
	}
	return url;
};

StepEkt.strLen = function(str) {
	const koreanMatches = str.match(/[가-힣]/g);
	const koreanLength = koreanMatches ? koreanMatches.length * 3 : 0;
	const nonKoreanLength = str.replace(/[가-힣]/g, '').length;
	const totalLength = koreanLength + nonKoreanLength;
	return totalLength;
};

StepEkt.strCut = function(str, maxBytes) {
	let totalBytes = 0;
	let cutIndex = 0;

	for (let i = 0; i < str.length; i++) {
		const charCode = str.charCodeAt(i);
		const byteSize = charCode < 128 ? 1 : 3; // UTF-8 기준

		if (totalBytes + byteSize <= maxBytes) {
			totalBytes += byteSize;
			cutIndex = i + 1;
		} else {
			break;
		}
	}

	return str.substring(0, cutIndex);
};

StepEkt.scrollTop = function() {
	window.scrollTo(0, 0);
};

StepEkt.scrollTopFrame = function() {
	try {
		parent.window.scrollTo(0, 0);
	} catch (e) {
		console.log(e);
	}
};

StepEkt.scrollTop = function() {
	try {
		window.parent.postMessage({
			method : "scrollTop"
		},"*");
	} catch (e) {
		console.log(e);
	}
};

StepEkt.parseQueryString = function(appendObject) {
	const queryString = window.location.search;
	const paramsObject = {};

	if (queryString) {
		const paramsArray = queryString.slice(1).split('&');
		paramsArray.forEach(param => {
			const [key, value] = param.split('=');
			paramsObject[key] = value;
		});
	}

	Object.keys(appendObject).forEach(key => {
		const value = appendObject[key];
		paramsObject[key] = value;
	});

	return Object.entries(paramsObject).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
};