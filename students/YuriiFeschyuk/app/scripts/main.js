
require.config({
    paths:{
        "jquery":"../lib/jquery/dist/jquery.min"
    }
});
require(["jquery",'app'], function($, app){

    // $(".gallery").click(function(event){
    //     var $curentTarget = $(event.target).parent();
    //     var $span = $curentTarget.find('span');
    //     $span.text(Number($span.text())+1);
    //     localStorage.setItem($curentTarget.attr("id"), $span.text());
    // });

    $(".gallery").click(function(event){ // у мене цей варіант також робить...
       var curentTarget = event.target.parentNode;
       var span = curentTarget.querySelector('span');
       span.innerText = Number(span.innerText)+1;
       localStorage.setItem(curentTarget.id, span.innerText);
    });
});