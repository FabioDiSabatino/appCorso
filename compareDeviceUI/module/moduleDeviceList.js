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

        var url="http://10.150.52.180:3000/categories";

        return $.get(url);

    };

    var __setItemClickedListener=function () {

        $('.deviceLabel').on("click",function () {

            var imgURL=$(this).data('img');
            var nome=$(this).text();
            console.log(nome);
            moduleDeviceSelected.setDeviceSelected(nome,imgURL);
        })

    };

    var __init=function () {

           $.when(__getData()).done(function (dati) {

               console.log(dati);

           });

            var categorie=data.categorie;
            var $accordion=$('.deviceAccordion');


            for (var i=0; i<categorie.length;i++)
            {
                var dataCategoria={
                    nomeCategoria:categorie[i].nomeCategoria,
                    idCategoria:categorie[i].idCategoria,
                };

                var tpl = Mustache.to_html(__categorieTpl[0], dataCategoria);
                $accordion.append(tpl);

                var $categoria=$accordion.find('.'+categorie[i].idCategoria)

                for (var j=0;j<categorie[i].sub_categorie.length;j++)
                {

                    var subCategorie=categorie[i].sub_categorie[j];
                    var dataSubCategoria={
                        nomeSubCategoria:subCategorie.nomeSubCategoria,
                        idSubCategoria:subCategorie.idSubCategoria
                    }
                    var tpl2=Mustache.to_html(__subCategorieTpl[0], dataSubCategoria);
                    $categoria.append(tpl2);
                    var $subCategoria=$categoria.find('.'+subCategorie.idSubCategoria);

                    for (var y=0;y<subCategorie.content_subCategoria.length;y++)
                    {
                        var contentSubCategoria=subCategorie.content_subCategoria[y];
                        var dataContentSubCategoria={
                            nomeDevice:contentSubCategoria.nomeDevice,
                            deviceImg:contentSubCategoria.imgDevice
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