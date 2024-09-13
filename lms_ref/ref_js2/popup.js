	var Layer_OPEN = function (obj) {
        $(obj).addClass('active');
	    $(obj).show();
	    $(obj).append('<div class="dim"></div>');
	    $('html').css('overflow', 'hidden');
	};

	var Layer_CLOSE = function (obj) {
	    $(obj).removeClass('active');
        $(obj).find('.dim').remove();
        $(obj).hide();
	    var dimLength = $('.dim').length;
	    if (dimLength < 2) {
	        $('html').css('overflow', '');
	    }
	};

	$(document).ready(function() {
		$('body').on('click', '.dim, .close', function () {
            var obj = '#' + $(this).closest('.pop-wrap').attr('id');
            if ($(obj).hasClass('not-dim')) {
                return;
            } else {
                Layer_CLOSE(obj);
            }
        });
        var $checkbox = $('.pop-body').find('.checkbox');
        $checkbox.on('change',function(){
            var $this = $(this);
            $this.toggleClass('active');
        });
	});