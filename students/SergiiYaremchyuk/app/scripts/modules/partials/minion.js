define("modules/partials/minion", [], function () {
    return {

        "getMinionHTML": function (minion) {

            var count_click = localStorage.getItem(minion.id) || minion.count;

            /* Тут я виконав конвертацію li в jquery об*єкт: $($('template#minion_li').html()).
             * Тому що всередині тега template, jquery не здійснює пошук, типу $('template#minion_li').find('li.item').
             * Можна було обгорнути шаблон у іньший блок, наприклад div. Але WebShtorm каже що так не можна)
             * Можна було б зробити його прихованим, а у всіх об'єктів які клонуються забирати display: none,
             * або певний клас. Тому я обрав цей варіант. Єдиний його недолік, що його не підтримує IE.
             */
            var $li = $($('template#minion_li').html());
            $li.attr('data-minion-id', minion.id);
            $li.find('img').attr('src', 'images/' + minion.image).attr('title', minion.title);
            $li.find('span.counter').text(count_click);

            return $li;


            // Якби не було шаблону, я б створював елемени ось так
            /*var $li = $('<li>').addClass("item").attr('data-minion-id', minion.id),
             $image = $('<img>').attr('src', 'images/' + minion.image).attr('title', minion.title),
             $span = $('<span>').addClass("counter").text(count_click);
             $li.append($image).append($span);*/
        },
        "addClick": function (self) {
            var minion_id = self.data('minion-id'),
                count_click = +self.find('span.counter').text();

            count_click++;
            self.find('span.counter').text(count_click);
            localStorage.setItem(minion_id, count_click);
        }
    }

});