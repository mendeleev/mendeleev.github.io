/**
 * Created by student on 27.03.16.
 */

define("modules/gallery", ['jquery'], function ($) {

    /**
     * Загружаем миньенов
     * @return {promice}
     */
    function getMinions(){
        return $.ajax({
            url: "data/minions.json",
            dataType: "json"
        });
    }

    /**
     * рендерим галерею
     * @param minions {array}
     */
    function renderGallery($minions){

        var $storageMinions = JSON.parse(localStorage.getItem('minions'));
        var $gallery = $('.gallery');
        var $count = 0;

        $minions.forEach(function($item){

            // получаем счетчики
            if($storageMinions.hasOwnProperty($item.title)){
                $count = $storageMinions[$item.title];
            } else {
                setCount($item.title);
                $count = 0;
            }

            var $li = '<li class="item" data-title="'+$item.title+'">' +
                '<img src="images/'+$item.img+'" alt="" />'+
                '<span class="counter">'+$count+'</span></li>';

            $gallery.append($li);

        });
    }

    /**
     * Счетчик
     * @param key {str}
     * @return {int}
     */
    function setCount($key){
        var $storageMinions = JSON.parse(localStorage.getItem('minions'));
        if($storageMinions.hasOwnProperty($key)){
            $storageMinions[$key] += 1;
        } else {
            $storageMinions[$key] = 0;
        }
        localStorage['minions'] = JSON.stringify($storageMinions);

        return $storageMinions[$key];
    }

    /**
     * обработчик на клик по картинке
     * @return {vaid}
     */
    function bindCounter(){
        $('li.item').on('click', function(){
            var $title = $(this).data('title');
            $(this).find('.counter').html( setCount($title) );
        });
    }

    /**
     * clear storage
     */
    function clear(){
        localStorage['minions'] = JSON.stringify({});
    }

    /**
     * создаем хранилище
     */
    if(!localStorage['minions']){
        clear();
    }

    /**
     * run
     */
    getMinions().done(function(responce){
        renderGallery(responce);
        bindCounter();
        //clear();
    }).fail(function(error){
        console.log(error);
    });

});