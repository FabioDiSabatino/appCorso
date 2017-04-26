/**
 * Created by fabiodisabatino on 22/04/17.
 */
(function (metaData) {
    $(document).ready(function () {

        $('.mainContent').matchHeight({
            property: 'height',
            target: $('.bodySize')
        });

        moduleDeviceList.initModule();
        moduleDeviceSelected.initModule();






    })



}());