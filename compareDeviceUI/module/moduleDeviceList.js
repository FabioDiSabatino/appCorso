/**
 * Created by fabiodisabatino on 22/04/17.
 */
var moduleDeviceList=(function () {
    //------------------------------------private method and attributes----------------------------------------//

    var __categorieURL="tpl/categoria.tpl";
    var __subCategorieURL="tpl/subCategoria.tpl";
    var __contentSubCategorieURL="tpl/contentSubCategoria.tpl";

    var __categorieTpl="";
    var __subCategorieTpl="";
    var __contentSubCategorieTpl="";




    var __getTemplate=function ( urlTemplate) {

        return $.get(urlTemplate);

    };

    var __getData=function(){

        var url="http://127.0.0.1/categories";

        return $.get(url);

    };

    var __setItemClickedListener=function () {

        $('.deviceLabel').on("click",function () {

            var imgURL=$(this).data('img');
            var nome=$(this).text();

            moduleDeviceSelected.setDeviceSelected(nome,imgURL);
        })

    };

    var __init=function () {

           $.when(__getData()).done(function (data) {

               console.log(data);
               var categories;
               var $accordion=$('.deviceAccordion');


               for (var i=0; i<data.length;i++)
               {
                   categories=data[i];
                   var dataCategoria={
                       nomeCategoria:categories.categoryname,
                       idCategoria:categories.categoryid
                   };

                   console.log("category id: "+categories.categoryid);
                   var tpl = Mustache.to_html(__categorieTpl[0], dataCategoria);
                   $accordion.append(tpl);

                   var $categoria=$accordion.find('.'+categories.categoryid);

                   var subCategorie;
                   for (var j=0;j<categories.brands.length;j++)
                   {
                        subCategorie=categories.brands[j];
                        console.log(subCategorie);
                       var dataSubCategoria={
                           nomeSubCategoria:subCategorie.brandname,
                           idSubCategoria:categories.categoryid+""+subCategorie.brandid
                       };


                       var tpl2=Mustache.to_html(__subCategorieTpl[0], dataSubCategoria);
                       $categoria.append(tpl2);
                       var $subCategoria=$categoria.find('.'+categories.categoryid+subCategorie.brandid);

                       var contentSubCategoria;

                       for (var z=0;z<subCategorie.devices.length;z++)
                       {
                           contentSubCategoria=subCategorie.devices[z];
                           var dataContentSubCategoria={
                               nomeDevice:contentSubCategoria.model,
                               deviceImg:contentSubCategoria.imageurl
                           };

                           var tpl3=Mustache.to_html(__contentSubCategorieTpl[0], dataContentSubCategoria);
                           $subCategoria.append(tpl3);

                       }

                   }
               }


               $accordion.accordion({
                   heightStyle: "fill"
               });

               $(".categoriaAccordion").accordion({
                   collapsible:true,
                   active: false,
                   heightStyle: "content"
               });

               __setItemClickedListener();

           });





    };


    //------------------------------------public method----------------------------------------//


    var init=function () {

        //inizializza il modulo
        //prendi i template delle categorie e delle sub categorie

        $.when(__getTemplate(__categorieURL),__getTemplate(__subCategorieURL),__getTemplate(__contentSubCategorieURL))
            .done(function (tpl1,tpl2,tpl3) {
            __categorieTpl=tpl1;
            __subCategorieTpl=tpl2;
            __contentSubCategorieTpl=tpl3;

            __init();
        })

    };

        //return an object with only public method
        return {
            initModule: init
        }

})();