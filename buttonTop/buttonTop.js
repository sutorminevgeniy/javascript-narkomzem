function buttonTop(butId, param){
    addEvent(window, 'load', function(){
        var butTop = document.getElementById(butId);
        // убираем действие по умолчанию
        addEvent(butTop, 'click', function(){
            removeDefault(event)
        });
        // Добавление обработчика клику ну кнопку "вверх"
        addEvent(butTop, 'click', scTop);

        // Добавление обработчика появления кнопки вверх
        addEvent(window, 'scroll', displayTop);

        // Обработчик появления кнопки "вверх"
        function displayTop(){
            // начальные условия
            var showTop = param.showTop || 0;

            // Появление или скрытие кнопки
            if(document.body.scrollTop >= showTop){
                butTop.style['display'] = 'block';
            } else {
                butTop.style['display'] = '';
            }
        }

        // обработчик нажатия кнопкм "вверх"
        function scTop(e){
            e = e || event;
            var butTop = e.target || e.srcElement;

            //  Начальные условия
            var time = param.time || 0 ; // время мс
            var fps  = param.fps  || 50; // 50 кадров в секунду
            
            // Отключение обработчика на время выполнения
            removeEvent(butTop, 'click', scTop);
            
            // Плавный подъём
            animate(document.body, 'scrollTop', 0, time, function(){
                addEvent(butTop, 'click', scTop);
            });

            // Отмена действия по умолчанию
            removeDefault(e);
        }
    });
}

