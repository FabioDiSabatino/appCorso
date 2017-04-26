/**
 * Created by fabiodisabatino on 22/04/17.
 */
var moduleDeviceList=(function () {
    //------------------------------------private method and attributes----------------------------------------//

    var categorieURL="tpl/categoria.tpl";
    var subCategorieURL="tpl/subCategoria.tpl"
    var contentSubCategorieURL="tpl/contentSubCategoria.tpl"

    var categorieTpl="";
    var subCategorieTpl="";
    var contentSubCategorieTpl="";


    var __init=function () {

        var categorie=data.categorie;
        var $accordion=$('.deviceAccordion');


        for (var i=0; i<categorie.length;i++)
        {
            var dataCategoria={
                nomeCategoria:categorie[i].nomeCategoria,
                idCategoria:categorie[i].idCategoria,
            }
            var tpl = Mustache.to_html(categorieTpl[0], dataCategoria);
            $accordion.append(tpl);

            var $categoria=$accordion.find('.'+categorie[i].idCategoria)

            for (var j=0;j<categorie[i].sub_categorie.length;j++)
            {

                var subCategorie=categorie[i].sub_categorie[j];
                var dataSubCategoria={
                    nomeSubCategoria:subCategorie.nomeSubCategoria,
                    idSubCategoria:subCategorie.idSubCategoria
                }
                var tpl2=Mustache.to_html(subCategorieTpl[0], dataSubCategoria);
                $categoria.append(tpl2);
                var $subCategoria=$categoria.find('.'+subCategorie.idSubCategoria);

                for (var y=0;y<subCategorie.content_subCategoria.length;y++)
                {
                    var contentSubCategoria=subCategorie.content_subCategoria[y];
                    var dataContentSubCategoria={
                        nomeDevice:contentSubCategoria.nomeDevice,
                        deviceImg:contentSubCategoria.imgDevice
                    }
                    var tpl3=Mustache.to_html(contentSubCategorieTpl[0], dataContentSubCategoria);
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

    var __getTemplate=function ( urlTemplate) {

        return $.get(urlTemplate);

    };

    var __setItemClickedListener=function () {
        
        $('.deviceLabel').on("click",function () {

            var imgURL=$(this).data('img');
            var nome=$(this).text();
            console.log(nome);
            moduleDeviceSelected.setDeviceSelected(nome,imgURL);
        })

    }


    //------------------------------------public method----------------------------------------//


    var init=function () {

        //inizializza il modulo
        //prendi i template delle categorie e delle sub categorie

        $.when(__getTemplate(categorieURL),__getTemplate(subCategorieURL),__getTemplate(contentSubCategorieURL))
            .done(function (tpl1,tpl2,tpl3) {
            categorieTpl=tpl1;
            subCategorieTpl=tpl2;
            contentSubCategorieTpl=tpl3;

            __init();
        });




    };

        //return an object with only public method
        return {
            initModule: init
        }




})();