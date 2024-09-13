

$(document).ready(function() {

  $('#menuToggle').click(function() {

    var collapsedMargin = $('#sub, #main').css('margin-left');
    var collapsedLeft = $('#sub, #main').css('left');

    if(collapsedMargin === '280px' || collapsedLeft === '280px') {
      toggleMenu(-280,0);
    } else {
      toggleMenu(0,280);
    }

    if(collapsedMargin === '75px' || collapsedLeft === '70spx') {
      toggleMenu2(-30,0);
    } else {
      toggleMenu2(0,30);
    }

  });


  function toggleMenu(marginLeft, marginMain) {

    var emailList = ($(window).width() <= 768 && $(window).width() > 640)? 320 : 360;

    if($('#sub, #main').css('position') === 'relative') {

      $('.leftmenu').animate({left: marginLeft}, 'fast');
      $('.leftmenu').animate({left: marginMain}, 'fast');

      if($('body').css('overflow') == 'hidden') {
        $('body').css({overflow: ''});
      } else {
        $('body').css({overflow: 'hidden'});
      }

    } else {

      $('.leftmenu').animate({marginLeft: marginLeft}, 'fast');
      $('#sub, #main').animate({marginLeft: marginMain}, 'fast', function(){try{resizeJqGridWidth("grid", "gridDiv", "100%");toggleMenuCallback();}catch(e){}});

    }
  }

  $('#menuToggle2').click(function() {

    var collapsedMargin = $('#sub, #main').css('margin-left');
    var collapsedLeft = $('#sub, #main').css('left');

    if(collapsedMargin === '280px' || collapsedLeft === '280px') {
      toggleMenu(-280,0);
    } else {
      toggleMenu(0,280);
    }

  });


  function toggleMenu2(marginLeft, marginMain) {

    var emailList = ($(window).width() <= 768 && $(window).width() > 640)? 320 : 360;

    if($('#sub, #main').css('position') === 'relative') {

      $('.leftmenu').animate({left: marginLeft}, 'fast');
      $('.leftmenu').animate({left: marginMain}, 'fast');

      if($('body').css('overflow') == 'hidden') {
        $('body').css({overflow: ''});
      } else {
        $('body').css({overflow: 'hidden'});
      }

    } else {

      $('.leftmenu').animate({marginLeft: marginLeft}, 'fast');
      $('#sub, #main').animate({marginLeft: marginMain}, 'fast', function(){try{resizeJqGridWidth("grid", "gridDiv", "100%");toggleMenuCallback();}catch(e){}});

    }
  }

	
  $('ul.nav-tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');
 
    $('ul.nav-tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
 
    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })
	
$('.gnb li a').click(function(){

$('.gnb li a').removeClass('active');

$(this).addClass('active');
})
	
$('.gnb li .m').click(function(){

$('.gnb li .m').removeClass('active');

$(this).addClass('active');
})
	
$(".startoggle").click(function() {
$(this).toggleClass("active");
})


$(".context-menu").click(function(){
  $(".context-menu-list").toggle();
});
	
 
});

	


