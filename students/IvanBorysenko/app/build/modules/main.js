define('modules/main',['jquery'], function () {

    var gallery = $("ul.gallery");

    $(".gallery").on('click','.item',function(){
        var id = ($(this).attr('id')),
            localData = parseInt(localStorage.getItem(id))||0;
        localStorage.setItem(id,localData+1);
        $(this).find("span").text(localData+1);
    })

    $.ajax({
        url:"data/minions.json",
        dataType: "json",
        success:function(data){
            data.forEach(function(minion){
                var item =$("<li \>").addClass("item").attr("id",minion.id),
                    img  =$("<img \>").attr("src","images/"+minion.image),
                    span =$("<span \>").addClass("counter").html(localStorage.getItem(minion.id)||minion.count);
                item.append(img,span);
                gallery.append(item);
            })
        },
        error(err){
            alert("Load failed");
        }
    })

});
