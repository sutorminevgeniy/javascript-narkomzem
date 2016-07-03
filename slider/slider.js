function slider(slidId, param){
    // Настройки слайдера
    var defaultDirection = param['direction'] || 'right'; // направление перемотки по умолчанию
    var widthSlide = param['width'] || 600;               // ширина слайда
    var stepTime = param['step'] || 1000;                 // время между сменами слайдера (мс)
    var animTime = param['animTime'] || 500;              // время анимации слайдера (мс)

    var nSliders, idTimeout;

    addEvent(window, 'load', function(){
        // Определениме колличества слайдов в слайдере
        var slids = getChildTags(document.getElementById(slidId), "UL");
        slids = getChildTags(slids[0], "LI");
        nSliders = slids.length;

        // Построение контрольных кнопок
        var ulControl = document.getElementById("control");
        for(var i=0; i<nSliders; i++){
            var liControl = document.createElement("LI");
            if(i == 0){
                liControl.setAttribute("class", "active")
            }
            ulControl.appendChild(liControl);
        }

        // Добавление обработчика на контрольные кнопки
        var liControl = getChildTags(document.getElementById("control"), "LI")
        for(var i=0; i<liControl.length; i++){
            addEvent(liControl[i], "click", eventControl);
        }

        // Добавление обработчика клику ну кнопку "<<"
        var prev = document.getElementById('prev');
        addEvent(prev, 'click', eventPrev);

        // Добавление обработчика клику ну кнопку ">>"
        var next = document.getElementById('next');
        addEvent(next, 'click', eventNext);

        // Автоперемотка
        idTimeout = setTimeout(stepSliders, stepTime);
    });

    // функция пролистывания слайдера на один шаг
    function stepSliders(direction){
        direction = direction || defaultDirection;

        var sliderUl = getChildTags(document.getElementById('slid'), 'UL')[0];
        var left = parseInt(sliderUl.style['left'], 10);
        var leftEnd;

        if(direction == 'left'){
            if(isNaN(left) || left == 0) left = -widthSlide*nSliders;
            leftEnd = (left + widthSlide);
        } else if(direction == 'right'){
            if(isNaN(left)) left = 0;
            if(left == (-widthSlide*(nSliders-1))) left = widthSlide;
            leftEnd = (left - widthSlide);
        }
        //sliderUl.style['left'] = (leftEnd) + 'px';
        animate(sliderUl, 'left', leftEnd, animTime)

        // перемещение активной контрольной кнопки
        var activeSlide = Math.floor(-leftEnd/widthSlide);
        var liControl = getChildTags(document.getElementById('control'), "LI");
        for(var i=0; i<liControl.length; i++){
            if(i == activeSlide){
                liControl[i].setAttribute("class", "active")
            } else {
                liControl[i].removeAttribute("class")
            }
        }

        idTimeout = setTimeout(stepSliders, stepTime);
    }

    // функция пролистывания слайдера в укказанную позицию
    function posSliders(number){
        number = number || 0;

        var sliderUl = getChildTags(document.getElementById('slid'), 'UL')[0];
        var left = -number*widthSlide;
        sliderUl.style['left'] = (left) + 'px';

        // перемещение активной контрольной кнопки
        var liControl = getChildTags(document.getElementById('control'), "LI");
        for(var i=0; i<liControl.length; i++){
            if(i == number){
                liControl[i].setAttribute("class", "active")
            } else {
                liControl[i].removeAttribute("class")
            }
        }
    }

    // Обработчик нажатия на контрольную кнопку
    function eventControl(e){
        e = e || event;
        var target = e.tafget || e.srcElement;

        // определение номера контрольной кнопки
        var nLi = 0;
        var prevSibling = target;
        while(prevSibling = prevSibling.previousSibling){
            if(prevSibling.nodeName == "LI") nLi++;
        }

        posSliders(nLi);
    }
                    
    // Обработчик клика ну кнопку "<<"
    function eventPrev(e){
        e = e || event;

        stepSliders('left');    
        // Отмена действия по умолчанию
        removeDefault(e)
    }

    // Обработчик клика ну кнопку ">>"
    function eventNext(e){
        e = e || event;

        stepSliders('right');
        // Отмена действия по умолчанию
        removeDefault(e)
    }
}