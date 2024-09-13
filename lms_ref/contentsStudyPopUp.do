<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- 원복 - CMS에서 처리 (GK)
    <style>
    .mob_menu_close {
        position: absolute;
        top: 150px !important;
        right: 2.5% !important;
        left:auto !important;
        display: inline-block;
        width: 38px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border : 2px solid white !important;
        background-color: rgb(34, 125, 249) !important;
        border-radius: 50%;
        transition: 0.5s all cubic-bezier(0.77, 0.2, 0.05, 1.0);
    }
    
    .mob_menu_close .icon_close {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url("../../../images/template9/resp/default/icon/icon_mob_menu_close.png") no-repeat;
        vertical-align: middle;
    }
    </style>
    -->
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta http-equiv="cache-control" content="no-cache">
            <meta http-equiv="pragma" content="no-cache">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi, viewport-fit=cover">
    
            <link rel="stylesheet" href="/step20UserCss/css/wbCommon.css">
    
            <title>대우정보처리회계학원 </title>
    
            <link rel="stylesheet" href="/js/common/toastr/toastr.css">
            <script>
    var jslang = "ko";
    </script>
    <script src="/js/common/multiLangSet.js"></script>
    <script src="/js/common/jquery/jquery-1.11.0.min.js"></script>
    <script src="/js/iframeJs.js"></script>
    <script src="/js/common/jquery/jquery-ui-1.9.2.custom.min.js"></script>
    <script src="/js/common/jquery/jquery.form.js"></script>
    <script src="/js/placeholders.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/common/json/json2.js"></script>
    <script src="/js/common/step.asp.grid.popup.js"></script>
    <script src="/js/template9/wbCommon.js"></script>
    <script src="/js/template9/jquery.mCustomScrollbar.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
    <script src="/js/template9/jquery.scrolling-tabs.js"></script>
    <script src="/js/template9/slick.js"></script>
    <script src="/js/renewal/usrs/bootstrap/bootstrap.min.js"></script>
    <script src="/js/renewal/usrs/bootstrap/bootstrap-select.min.js"></script>
    <script src="/js/common/toastr/toastr.js"></script>
    <!-- ## IE9이하 버전에서 html5 적용 스크립트 ## -->
    <!--[if lt IE 9]>
        <script src='/js/html5.js'></script>
        <script src="/js/respond.min.js"></script>
    <![endif]-->
    <script src="/se2/js/HuskyEZCreator.js"></script>
    <script src="/js/common/common.js"></script>
    <script src="/js/common/common_util.js"></script>
    <script>
    jQuery(function(){
        jQuery('form').each(function(){
            if(!jQuery(this).children('*').is('#mkey')){
                jQuery("<input>",{type:'hidden',name:'mkey',id:'mkey',value:'6216'}).appendTo(this);
            }
            jQuery("<button>",{style:'display:none'}).prependTo(this);
        });
    });
    </script>
    
    
            <script>
                function goMenu(url, cmkey, requireLogin){
                    jQuery("#form_menu").attr("action", url);
                    jQuery("#form_menu input[id=cmkey]").val(cmkey);
                    jQuery("#form_menu")[0].submit();
                }
    
                var learningPopupDupCheckKey = '88CE38207C4C24FBE4F7E6F84DD56E7F.tc_101_02_8eb351f1c6e949c6846a40ca73c5bace_75';
    
                var selectValiditionUrl = "/usrs/cms/classrm/getChasiEduyn.do";
                var selectPrgrsItmUrl = "/usrs/lms/classrm/classrmPrgrsItm.do";
                var insertStudyMemoUrl = "/usrs/cms/classrm/insertContentsStudyMemo.do";
                var insertStudyInqryUrl = "/usrs/lms/classrm/insertContentsInqry.do";
                var updateStudyCountUrl = "/usrs/cms/classrm/updateCmiJoincnt.do";
                var updateProgressUrl = "/usrs/cms/classrm/cmiBaseTimeCommit.do";
                var insertItemBookmarkUrl = '/usrs/cms/classrm/insertItemBookmark.do';
                var checkSessionUrl = "/session/checkSession.do"; //2023-10-24 eychoi 추가
                var getTokenResultUrl = "/session/getTokenResult.do"; //2023-10-24 eychoi 추가
    
                var initialAppData = {"subject_code":"","last_entry_data":{"group_id":"1","entry_title":"스프링 부트 스토리","entry_type":"video","entry_id":"2"},"version_code":"","ent_cd":"2020000523","crsseq_nm":"스프링 부트 기초","title":"스프링 부트 기초","is_preview_mode":false,"crscd":"45355","ent_nm":"DW아카데미학원","sys_cd":"ASP","crsseq_cd":76031,"crs_nm":"스프링 부트 기초","entries":[{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"1","datas":{"last_learning_time":134,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/01\/01_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":134,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/2\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/2\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/01\/01_01.mp4"},"memo":null,"id":"2","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"1","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/01\/01_02.mp4","contexts":{"content_name":"JDK 설치 및 설정","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/3\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/3\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/01\/01_02.mp4"},"memo":null,"id":"3","title":"JDK 설치 및 설정","is_completed":true},{"is_next":true,"group_id":"1","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/01\/01_03.mp4","contexts":{"content_name":"Eclipse(STS) 설치 및 단축키 사용","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/4\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/4\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/01\/01_03.mp4"},"memo":null,"id":"4","title":"Eclipse(STS) 설치 및 단축키 사용","is_completed":true},{"is_next":true,"group_id":"1","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/01\/01_04.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/5\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/5\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/01\/01_04.mp4"},"memo":null,"id":"5","title":"실전 스프링 부트","is_completed":true},{"is_next":true,"group_id":"1","datas":{"last_learning_time":194,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/01\/01_05.html","contexts":{"content_name":"평가하기","last_learning_time":194,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/6\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/1\/itm\/6\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/01\/01_05.html"},"memo":null,"id":"6","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"1","title":"실습 환경 설치"},{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"7","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/02\/02_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/8\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/8\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/02\/02_01.mp4"},"memo":null,"id":"8","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"7","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/02\/02_02.mp4","contexts":{"content_name":"프레임워크의 개념","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/9\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/9\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/02\/02_02.mp4"},"memo":null,"id":"9","title":"프레임워크의 개념","is_completed":true},{"is_next":true,"group_id":"7","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/02\/02_03.mp4","contexts":{"content_name":"스프링 프레임워크의 개념 및 특징","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/10\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/10\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/02\/02_03.mp4"},"memo":null,"id":"10","title":"스프링 프레임워크의 개념 및 특징","is_completed":true},{"is_next":true,"group_id":"7","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/02\/02_04.mp4","contexts":{"content_name":"스프링 부트의 개념 및 특징","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/11\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/11\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/02\/02_04.mp4"},"memo":null,"id":"11","title":"스프링 부트의 개념 및 특징","is_completed":true},{"is_next":true,"group_id":"7","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/02\/02_05.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/12\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/12\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/02\/02_05.mp4"},"memo":null,"id":"12","title":"실전 스프링 부트","is_completed":true},{"is_next":true,"group_id":"7","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/02\/02_06.html","contexts":{"content_name":"평가하기","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/13\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/7\/itm\/13\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/02\/02_06.html"},"memo":null,"id":"13","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"7","title":"스프링 부트 개념 및 특징"},{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"14","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/03\/03_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/15\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/15\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/03\/03_01.mp4"},"memo":null,"id":"15","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"14","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/03\/03_02.mp4","contexts":{"content_name":"스프링 부트 프로젝트 구조 이해","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/16\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/16\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/03\/03_02.mp4"},"memo":null,"id":"16","title":"스프링 부트 프로젝트 구조 이해","is_completed":true},{"is_next":true,"group_id":"14","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/03\/03_03.mp4","contexts":{"content_name":"스프링 부트 설정(Properties, Yaml) 이해","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/17\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/17\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/03\/03_03.mp4"},"memo":null,"id":"17","title":"스프링 부트 설정(Properties, Yaml) 이해","is_completed":true},{"is_next":true,"group_id":"14","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/03\/03_04.mp4","contexts":{"content_name":"웹 애플리케이션 작성","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/18\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/18\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/03\/03_04.mp4"},"memo":null,"id":"18","title":"웹 애플리케이션 작성","is_completed":true},{"is_next":true,"group_id":"14","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/03\/03_05.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/19\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/19\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/03\/03_05.mp4"},"memo":null,"id":"19","title":"실전 스프링 부트","is_completed":true},{"is_next":true,"group_id":"14","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/03\/03_06.html","contexts":{"content_name":"평가하기","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/20\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/14\/itm\/20\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/03\/03_06.html"},"memo":null,"id":"20","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"14","title":"스프링 부트 퀵 스타트"},{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"21","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/04\/04_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/22\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/22\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/04\/04_01.mp4"},"memo":null,"id":"22","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"21","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/04\/04_02.mp4","contexts":{"content_name":"메이븐을 이용한 라이브러리 의존성 관리","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/23\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/23\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/04\/04_02.mp4"},"memo":null,"id":"23","title":"메이븐을 이용한 라이브러리 의존성 관리","is_completed":true},{"is_next":true,"group_id":"21","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/04\/04_03.mp4","contexts":{"content_name":"스프링 부트 스타터(Starter) 이해","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/24\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/24\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/04\/04_03.mp4"},"memo":null,"id":"24","title":"스프링 부트 스타터(Starter) 이해","is_completed":true},{"is_next":true,"group_id":"21","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/04\/04_04.mp4","contexts":{"content_name":"사용자 정의 스타터 작성","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/25\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/25\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/04\/04_04.mp4"},"memo":null,"id":"25","title":"사용자 정의 스타터 작성","is_completed":true},{"is_next":true,"group_id":"21","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/04\/04_05.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/26\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/26\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/04\/04_05.mp4"},"memo":null,"id":"26","title":"실전 스프링 부트","is_completed":true},{"is_next":true,"group_id":"21","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/04\/04_06.html","contexts":{"content_name":"평가하기","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/27\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/21\/itm\/27\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/04\/04_06.html"},"memo":null,"id":"27","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"21","title":"스프링 부트 스타터"},{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"28","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/05\/05_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/29\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/29\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/05\/05_01.mp4"},"memo":null,"id":"29","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"28","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/05\/05_02.mp4","contexts":{"content_name":"자동 설정 개념과 동작 원리 이해","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/30\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/30\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/05\/05_02.mp4"},"memo":null,"id":"30","title":"자동 설정 개념과 동작 원리 이해","is_completed":true},{"is_next":true,"group_id":"28","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/05\/05_03.mp4","contexts":{"content_name":"사용자 정의 자동 설정","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/31\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/31\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/05\/05_03.mp4"},"memo":null,"id":"31","title":"사용자 정의 자동 설정","is_completed":true},{"is_next":true,"group_id":"28","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/05\/05_04.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/32\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/32\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/05\/05_04.mp4"},"memo":null,"id":"32","title":"실전 스프링 부트","is_completed":true},{"is_next":true,"group_id":"28","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/05\/05_05.html","contexts":{"content_name":"평가하기","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/33\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/28\/itm\/33\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/05\/05_05.html"},"memo":null,"id":"33","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"28","title":"스프링 부트 자동 설정"},{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"34","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/06\/06_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/35\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/35\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/06\/06_01.mp4"},"memo":null,"id":"35","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"34","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/06\/06_02.mp4","contexts":{"content_name":"스프링 부트와 테스트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/36\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/36\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/06\/06_02.mp4"},"memo":null,"id":"36","title":"스프링 부트와 테스트","is_completed":true},{"is_next":true,"group_id":"34","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/06\/06_03.mp4","contexts":{"content_name":"MockMvc를 활용한 웹 애플리케이션 테스트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/37\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/37\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/06\/06_03.mp4"},"memo":null,"id":"37","title":"MockMvc를 활용한 웹 애플리케이션 테스트","is_completed":true},{"is_next":true,"group_id":"34","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/06\/06_04.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/38\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/38\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/06\/06_04.mp4"},"memo":null,"id":"38","title":"실전 스프링 부트","is_completed":true},{"is_next":true,"group_id":"34","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/06\/06_05.html","contexts":{"content_name":"평가하기","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/39\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/34\/itm\/39\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/06\/06_05.html"},"memo":null,"id":"39","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"34","title":"스프링 부트 테스트(웹 애플리케이션 테스트)"},{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"40","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/07\/07_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/41\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/41\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/07\/07_01.mp4"},"memo":null,"id":"41","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"40","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/07\/07_02.mp4","contexts":{"content_name":"비즈니스 컴포넌트 작성","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/42\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/42\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/07\/07_02.mp4"},"memo":null,"id":"42","title":"비즈니스 컴포넌트 작성","is_completed":true},{"is_next":true,"group_id":"40","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/07\/07_03.mp4","contexts":{"content_name":"비즈니스 계층을 연동하는 웹 애플리케이션 테스트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/43\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/43\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/07\/07_03.mp4"},"memo":null,"id":"43","title":"비즈니스 계층을 연동하는 웹 애플리케이션 테스트","is_completed":true},{"is_next":true,"group_id":"40","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/07\/07_04.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/44\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/44\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/07\/07_04.mp4"},"memo":null,"id":"44","title":"실전 스프링 부트","is_completed":true},{"is_next":true,"group_id":"40","datas":{"last_learning_time":75,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/07\/07_05.html","contexts":{"content_name":"평가하기","last_learning_time":75,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/45\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/40\/itm\/45\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/07\/07_05.html"},"memo":null,"id":"45","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"40","title":"스프링 부트 테스트(통합 테스트)"},{"is_next":true,"subject_code":"202103749","entries":[{"is_next":true,"group_id":"46","datas":{"last_learning_time":85,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/08\/08_01.mp4","contexts":{"content_name":"스프링 부트 스토리","last_learning_time":85,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/47\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/47\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/08\/08_01.mp4"},"memo":null,"id":"47","title":"스프링 부트 스토리","is_completed":true},{"is_next":true,"group_id":"46","datas":{"last_learning_time":762,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/08\/08_02.mp4","contexts":{"content_name":"스프링 부트 로깅","last_learning_time":762,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/48\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/48\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/08\/08_02.mp4"},"memo":null,"id":"48","title":"스프링 부트 로깅","is_completed":true},{"is_next":true,"group_id":"46","datas":{"last_learning_time":0,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/08\/08_03.mp4","contexts":{"content_name":"스프링 부트 빌드","last_learning_time":0,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/49\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/49\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/08\/08_03.mp4"},"memo":null,"id":"49","title":"스프링 부트 빌드","is_completed":true},{"is_next":true,"group_id":"46","datas":{"last_learning_time":590,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/08\/08_04.mp4","contexts":{"content_name":"실전 스프링 부트","last_learning_time":590,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/50\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/50\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"video","contents_url":"olei\/2021\/life\/0312\/20210707094054\/08\/08_04.mp4"},"memo":null,"id":"50","title":"실전 스프링 부트","is_completed":true},{"is_next":false,"group_id":"46","datas":{"last_learning_time":60,"src":"https:\/\/cdn.e-koreatech.ac.kr\/Portal\/olei\/2021\/life\/0312\/20210707094054\/08\/08_05.html","contexts":{"content_name":"평가하기","last_learning_time":60,"watermark":"","lrsUrl":"https:\/\/lrs.step.or.kr\/lrs\/xAPI\/","stateId":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/51\/sbtm\/1\/users\/2024078630","description":"","rewind_btn":true,"forward_btn":true,"bookmarks":[],"playback_rate":[1.0,1.2,1.5,1.8,2.0],"baseurl":"https:\/\/daewoo.step.or.kr\/course\/76031\/ver\/202103749_21v1\/lssn\/46\/itm\/51\/sbtm\/1","account_name":"yuyunsuk@hanmail.net","name":"유윤석","control_bar":true,"homepage":"https:\/\/daewoo.step.or.kr"},"time_to_complete":0,"type":"html_url","contents_url":"olei\/2021\/life\/0312\/20210707094054\/08\/08_05.html"},"memo":null,"id":"51","title":"평가하기","is_completed":true}],"version_code":"202103749_21v1","id":"46","title":"스프링 부트의 로깅과 빌드"}],"is_sequence":true,"logo":"https:\/\/daewoo.step.or.kr\/step20UserCss\/img\/head\/logo.png","hidden_frame_url":"","id":76031,"cms_api_base_url":"https:\/\/cms23.step.or.kr:8443","rgtrDstnNo":2024078630,"interval_term_save_progress":10};
                var isApplication = (navigator.userAgent.indexOf("APP_Running") > -1);
                var isProgress = true;
                var isShowedNetworkErrorMsg = false;
                var ingItemid = null;
                var contentsPlayer = null;
    
                window.addEventListener('beforeunload', function(event) {
                    if (!isMobileBrowser() && !isMobileApp()) { 
                        opener.pageReload();
                        //opener.location.href = "javascript:goMenu('/usrs/lms/classrm/classrmPrgrsItm.do','" + 6216 + "')";
                    }
                });
    
                jQuery("#contentsPlayer").ready(function(){
    
                    
                        jsGetToastrNotification();
                    
    
                    contentsPlayer = document.getElementById("contentsPlayer");
    
                    // CMS 학습창 데이터 수신
                    window.addEventListener("message", function(event){
                        if(event.data.type == "save_html_progress" && isProgress){
                            doUpdateProgress(event.data.data, 'html'); 		// HTML 진도 처리
                        }else if(event.data.type == "save_video_progress" && isProgress){
                            doUpdateProgress(event.data.data, 'mp4'); 		// 비디오 진도 처리
                        }else if(event.data.type == "post_memo"){
                            doInsertStudyMemo(event.data.data); 	// 학습 메모
                        }else if(event.data.type == "post_question_with_files"){
                            doInsertStudyInqry(event.data.data);	// 학습 질문
                        }else if(event.data.type == "exit_player"){
                            doCloseIframe(event.data.data);			// 학습창 종료
                        }else if(event.data.type == "save_video_book_marks_data"){
                            doUpdateBookmark(event.data.data);		// 북마크 변경
                        }
                    });
    
                    //doInitPlayer();
                });
    
                function doInitPlayer(){
                    if(isApplication){
                        if(navigator.userAgent.indexOf("IOS APP_Running") > -1){
                            try{
                                window.webkit.messageHandlers.wbviewer.postMessage("btnHide");
                            }catch(error){
                            }
                        }else{
                            console.log("wbviewer://btnHide");
                        }
                    }
    
                    setTimeout(function(){
                        contentsPlayer.contentWindow.postMessage({
                            type : "initial_app_data",
                            data : initialAppData
                        }, "*");
                    }, 1000);
                }
    
                function doUpdateProgress(params, type){
                    var acsTkn = 'b889e2a9-4acd-4dff-b015-a667e88ce5cf';
                    
                    // 학습일 유효성 검사
                    if(Number(jQuery("#p_remainedudt").val()) <= 0 || jQuery("#p_clsng_yn").val() == "Y"){
                        return;
                    }
    
                    // 네트워크 유효성 검사
                    if(!navigator.onLine){
                            if(!isShowedNetworkErrorMsg){
                            isShowedNetworkErrorMsg = true;
                            alert("네트워크 연결이 원활하지 않습니다.\n연결 확인 후 학습을 진행하시기 바랍니다.");
                            }
                        return;
                    }else{
                        isShowedNetworkErrorMsg = false;
                    }
    
                    if(params != null){
                        var itemid = params.id;
    
                        var studytime = Number(params.learning_time_gap);
                        if (type == 'mp4') {
                            studytime= Number(params.actual_learning_time); // mp4 형식일 경우 actual_learning_time으로 계산
                        }
    
                        var location = Number(params.last_learning_time);
                        var playbackRate;
                        
                        if (params.playbackRate != null) {
                            playbackRate = params.playbackRate;
                        } else {
                            playbackRate = '1';
                        }
    
                        // 페이지 유효성 검사
                        if(itemid != ingItemid){
                            isProgress = doValiditionItemid(itemid);
    
                            if(!isProgress){
                                return false;
                            }
    
                            doUpdateStudyCount(itemid);
                        }
    
                        ingItemid = itemid;
                        isProgress = true;
    
                        console.log("[학습시간]: " + studytime + " [마지막위치]: " + location);
                        jQuery.ajax({
                            url : updateProgressUrl,
                            cache : false,
                            async : false,
                            dataType : 'json',
                            type : 'POST',
                            data : {
                                p_itemid : itemid,
                                p_studytime : studytime,
                                p_location : location,
                                p_contsid : jQuery("#p_contsid").val(),
                                p_crscd : jQuery("#p_crscd").val(),
                                p_crsseq_id : jQuery("#p_crsseq_id").val(),
                                p_year : jQuery("#p_year").val(),
                                playbackRate : playbackRate,
                                "p_learningPopupDupCheckKey": learningPopupDupCheckKey
                            },
                            success : function(data){
                                if(data.retVal <= 0){
                                    isProgress = doValiditionItemid(itemid);
                                }
    
                                if (!isMobileBrowser() && !isMobileApp() && data.isLearningPopupDup) {
                                    //window.close();
                                }
                            },
                            error : function(error){
                            }
                        });
                    }
                }
    
                function doValiditionItemid(itemid){
                    if(!isProgress){
                        return false;
                    }
    
                    var result = true;
    
                    jQuery.ajax({
                        url : selectValiditionUrl,
                        cache : false,
                        async : false,
                        dataType : 'json',
                        type : 'POST',
                        data : {
                            p_itemid : itemid,
                            p_contsid : jQuery("#p_contsid").val(),
                            p_contstype : jQuery("#p_contstype").val(),
                            p_crscd : jQuery("#p_crscd").val(),
                            p_crsseq_id : jQuery("#p_crsseq_id").val(),
                            p_year : jQuery("#p_year").val(),
                            p_empinsrnc_aply_yn : jQuery("#p_empinsrnc_aply_yn").val()
                        },
                        success : function(data){
                            var p_empinsrnc_check = jQuery("#p_empinsrnc_aply_yn").val();
    
                            if(data.p_frmatn_exam_yn == "Y"){
                                result = false;
                                isProgress = false;
    
                                alert("이전 차시에 제출된 형성평가를 완료하셔야 학습이 가능합니다.");
                                doMovePrevIframe();
                            }else if(data.p_off_time_yn == "Y" && data.p_complteyn != "Y"){
                                result = false;
                                isProgress = false;
    
                                alert("병행 학습으로 설정된 집체훈련 과정의 학습시간입니다.");
                                doClosePopup();
                            }else if(data.p_studytimePassYn == "N" && p_empinsrnc_check != "N"){
                                result = false;
                                isProgress = false;
    
                                var validitionMsg = "고용보험 환급 과정은 차시 단위 " + data.p_min_studytime + "분 이상 학습을 진행하셔야 다음 차시 학습이 가능합니다."
                                alert(validitionMsg);
                                doMovePrevIframe();
                            }else if(data.p_eduyn == "Y" && data.p_chapcha == "N" && p_empinsrnc_check != "N" && "N" == "N"){
                                result = false;
                                isProgress = false;
    
                                alert("해당 목차는 인증이 필요합니다.")
                                doMoveCaptcha(itemid, data.p_charsino);
                            }else if(data.p_eduyn == "N"){
                                result = false;
                                isProgress = false;
    
                                var validitionMsg = "해당과정의 일일학습분량을 초과하였습니다.";
                                if(p_empinsrnc_check != "N"){
                                    validitionMsg += "\n집체 및 원격 각 8시간, 합산 8시간(차시) 제한";
                                }
    
                                alert(validitionMsg);
                                doClosePopup();
                            }
                        },
                        error : function(error){
                        }
                    });
    
                    return result;
                }
    
                function doInsertStudyMemo(params){
                    if(params != null){
                        jQuery.ajax({
                            url : insertStudyMemoUrl,
                            cache : false,
                            async : true,
                            dataType : 'json',
                            type : 'POST',
                            data : {
                                p_crsseq_id : jQuery("#p_crsseq_id").val(),
                                p_contsid : jQuery("#p_contsid").val(),
                                p_itemid : params.id,
                                p_title :  + " 학습메모입니다.",
                                p_cntnt : params.memo
                            },
                            success : function(data){
                            },
                            error : function(error){
                            }
                        });
                    }
                }
    
                function doInsertStudyInqry(params){
                    if(params != null){
                        //var title = "스프링 부트 기초" + " 학습문의입니다.";
                        var title = params.title;
                        var cntnt = params.question;
                        var formData = new FormData();
    
                        formData.append("p_cntnts_crscd", jQuery("#p_crscd").val());
                        formData.append("p_cntnts_crsseq_id", jQuery("#p_crsseq_id").val());
                        formData.append("p_cntnts_contsid", jQuery("#p_contsid").val());
                        formData.append("p_cntnts_itemid", params.id);
                        formData.append("p_crs_bbs_type_cd", "13");
                        formData.append("p_ctgry_cd", "07");
                        formData.append("p_inqry_title", title);
                        formData.append("p_inqry_cntnt", cntnt.replaceAll("\n", "<br/>"));
                        formData.append("file_param", "cntnts_inqry_file");
    
                        if(params.files != null){
                            for(var i = 0; i < params.files.length; i++){
                                formData.append("cntnts_inqry_file@" + i, params.files[i]);
                            }
                        }
    
                        jQuery.ajax({
                            url : insertStudyInqryUrl,
                            cache : false,
                            contentType : false,
                            processData : false,
                            type : 'POST',
                            data : formData,
                            success : function(data){
                            },
                            error : function(error){
                            }
                        });
                    }
                }
    
                function doClosePopup(){
                    if(isApplication){
                        if(navigator.userAgent.indexOf("IOS APP_Running") > -1){
                            try{
                                window.webkit.messageHandlers.wbviewer.postMessage("btnShow");
                            }catch(error){
                            }
                        }else{
                            console.log("wbviewer://btnShow");
                        }
    
                        var form = document.contentForm;
                        form.mkey.value = "";
                        form.action = selectPrgrsItmUrl;
                        form.submit();
                    }else{
                        try{
                            opener.parent.doSurveyCheck();
                        }catch(error){
                        }
    
                        window.close();
                    }
                }
    
                function doMoveCaptcha(itemid, chasiNo){
                    if(isApplication){
                        var form = document.contentForm;
                        form.mkey.value = "";
                        form.p_captcha_check_yn.value = "Y";
                        form.p_captcha_item_id.value = itemid;
                        form.p_captcha_chasi_no.value = chasiNo;
                        form.action = selectPrgrsItmUrl;
                        form.submit();
                    }else{
                        try{
                            opener.parent.jsPrgrsCaptchaPopupDelay(itemid, chasiNo);
                        }catch(error){
                            window.close();
                        }
                    }
                }
    
                function doUpdateStudyCount(itemid){
                    jQuery.ajax({
                        url : updateStudyCountUrl,
                        cache : false,
                        async : true,
                        dataType : 'json',
                        type : 'POST',
                        data : {
                            p_selitem : itemid,
                            p_itemid : itemid,
                            p_contsid : jQuery("#p_contsid").val(),
                            p_crscd : jQuery("#p_crscd").val(),
                            p_crsseq_id : jQuery("#p_crsseq_id").val(),
                            p_year : jQuery("#p_year").val()
                        },
                        success : function(data){
                        },
                        error : function(error){
                        }
                    });
                }
    
                function doCloseIframe(params){
                    doClosePopup();
                }
    
                function doMovePrevIframe(){
                    contentsPlayer.contentWindow.postMessage({
                        type : "prev"
                    }, "*");
                }
    
                function doUpdateBookmark(params){
                    if(params != null){
                        var bookmarkNms = new Array();
                        var times = new Array();
    
                        if(params.bookmarks != null){
                            for(var i = 0; i < params.bookmarks.length; i++){
                                bookmarkNms.push(params.bookmarks[i].text);
                                times.push(params.bookmarks[i].time);
                            }
                        }
    
                        jQuery.ajax({
                            url : insertItemBookmarkUrl,
                            cache : false,
                            async : true,
                            dataType : 'json',
                            type : 'POST',
                            data : {
                                p_itemid : params.id,
                                p_contsid : jQuery("#p_contsid").val(),
                                p_bookmark_nms : new String(bookmarkNms),
                                p_times : new String(times)
                            },
                            success : function(data){
                            },
                            error : function(error){
                            }
                        });
                    }
                }
                
                //2023-10-24 eychoi 추가 : iframe sessionChkTarget 추가 및 세션체크
                /*var chkSessionTimer = setInterval( function() {
    
                    jQuery.ajax({
                        url : getTokenResultUrl,
                        cache : false,
                        async : true,
                        dataType : 'json',
                        type : 'POST',
                        success : function(data){
                            console.log(data);
                        },
                        error : function(error){
                        }
                    });
    
                    //console.log("# checkSession  iframe start #");
                    //jQuery("#sessionChkTarget").attr("src", checkSessionUrl);
                    //console.log("# checkSession  iframe end #");
                    }, (1000 * 20 * 1)); //10분  (1000 * 60) * 60  1초 * 60초 * 60
                */
                //2023-10-24 eychoi 끝
    
                function isMobileBrowser() {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                }
    
                function isMobileApp() {
                    return navigator.userAgent.indexOf("APP_Running") > -1 || navigator.userAgent.indexOf("IOS APP_Running") > -1;
                }
            </script>
    <title>Document</title>
</head>
<body>

    documents.write

    <form id="contentForm" name="contentForm" method="post" onsubmit="return false;"><button style="display:none"></button>
        <input type="hidden" id="p_contsid" name="p_contsid" value="0037630">
        <input type="hidden" id="p_contstype" name="p_contstype" value="H">
        <input type="hidden" id="p_crscd" name="p_crscd" value="45355">
        <input type="hidden" id="p_crsseq_id" name="p_crsseq_id" value="76031">
        <input type="hidden" id="p_year" name="p_year" value="2024">
        <input type="hidden" id="p_clsng_yn" name="p_clsng_yn" value="N">
        <input type="hidden" id="p_empinsrnc_aply_yn" name="p_empinsrnc_aply_yn" value="N">
        <input type="hidden" id="p_remainedudt" name="p_remainedudt" value="195">

        <input type="hidden" id="p_captcha_check_yn" name="p_captcha_check_yn" value="">
        <input type="hidden" id="p_captcha_item_id" name="p_captcha_item_id" value="">
        <input type="hidden" id="p_captcha_chasi_no" name="p_captcha_chasi_no" value="">
    <input type="hidden" name="mkey" id="mkey" value="6216"></form>

    <!-- <iframe id="contentsPlayer" src="//player.step.or.kr/player/index.html" allow="autoplay" onload="doInitPlayer()" frameborder="0" height="100%" width="100%" style="overflow:hidden; overflow-x:hidden; overflow-y:hidden; position:absolute; top:0px; left:0px; right:0px; bottom:0px;" allowfullscreen="true"></iframe> -->

    <iframe id="contentsPlayer" src="./index.html" allow="autoplay" onload="doInitPlayer()" frameborder="0" height="100%" width="100%" style="overflow:hidden; overflow-x:hidden; overflow-y:hidden; position:absolute; top:0px; left:0px; right:0px; bottom:0px;" allowfullscreen="true"></iframe>

    <iframe id="sessionChkTarget" src="" style="display: none;"></iframe>
</body>
</html>