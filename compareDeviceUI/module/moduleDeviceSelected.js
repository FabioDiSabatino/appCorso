/**
 * Created by fabiodisabatino on 23/04/17.
 */
var moduleDeviceSelected=(function () {

    //------------------------------------private method and attributes----------------------------------------//


    var __defaultImg="./img/addDevice.png";


    var __init=function () {

        $('.alert').alert('close');
    };


    var __isEmpty=function ($box) {

        if ($box.find('.panelDevice').hasClass('empty')){
            return true;
        }
        else return false;
    };

    // add device selected in the panel passed as parameter
    var __addDevice=function ($box,deviceName,urlImg) {
        $box.find('.panelDevice').removeClass('empty');
        $box.find('.deviceImg').attr('src',urlImg);
        $box.find('.footerDevice').text(deviceName);
        $box.find('.panel-heading').children().removeClass('hidden');
    };


    var __setRemoveDeviceListener=function () {

        var $removeIcon=$('.glyphicon-remove');

        $removeIcon.on('click',function (event) {

            var box=$(this).attr("data-remove");
            var $box=$('.'+box+'DeviceBox');

            $box.find('.panelDevice').addClass('empty')
            $box.find('.deviceImg').attr('src',__defaultImg);
            $box.find('.footerDevice').text("");
            $box.find('.panel-heading').children().addClass('hidden');




        })
    };


    var __setDeviceSelected=function (deviceName,urlImg) {


        var $leftBox=$('.leftDeviceBox');
        var $rightBox=$('.rightDeviceBox');


        if (__isEmpty($leftBox)){

            __addDevice($leftBox,deviceName,urlImg)

        }
        else if (__isEmpty($rightBox))
        {
           __addDevice($rightBox,deviceName,urlImg)
        }
        else {
            $('.modal').modal();
        }

        __setRemoveDeviceListener();

    };



    //------------------------------------public method----------------------------------------//



    return {
        initModule:__init,
        setDeviceSelected:__setDeviceSelected
    }




})();