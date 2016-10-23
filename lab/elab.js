// Полифил  для кроссбпаузерности requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Наследует методы родительского класса в дочерний
function extend(Child, Parent) {
    Child.prototype = inherit(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.parent = Parent.prototype;
}
// Создает объект наследник от данного
function inherit(proto) {
    function F() {}
    F.prototype = proto;
    return new F;
}


// Привязывает обработчик к событию элемента
function addEvent(element, event_name, handler){ 
    if (element.addEventListener) {
        element.addEventListener(event_name, handler, false); 
    } else if (element.attachEvent) {
        element.attachEvent('on' + event_name, handler); 
    } else {
        element['on' + event_name] = handler; 
    } 
}
/*
    function eventControl(e){
        e = e || event;
        var target = e.tafget || e.srcElement;

    }
*/
// Удаляет обработчик к событию элемента
function removeEvent(element, event_name, handler){ 
    if (element.removeEventListener) {
        element.removeEventListener(event_name, handler, false); 
    } else if (element.detachEvent) {
        element.detachEvent('on' + event_name, handler); 
    } else {
        element['on' + event_name] = null; 
    } 
}
// Отмена события по умолчанию
function removeDefault(event){ 
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}


// функция анимации
function animate(obj, valName, valEnd, time, func){
    var valStart, timer;

    // стартовые значения параметров
    if(valName == 'scrollTop') {
        valStart = obj[valName];
    } else {
        valStart = obj.style[valName];
    }

    var start = Date.now(); // сохранить время начала

    timer = requestAnimationFrame(function step() {
        // вычислить сколько времени прошло с начала анимации
        var timePassed = Date.now() - start;

        // проверка последний ли шаг
        if (timePassed >= time) {
            draw(obj, valName, valStart, valEnd, time);

            // вызов функции по завершению анимации
            if(func) func();
            return;
        }

        // рисует состояние анимации, соответствующее времени timePassed
        draw(obj, valName, valStart, valEnd, timePassed);

        timer = requestAnimationFrame(step);
    });

    // функция изменения параметра
    function draw(obj, valName, valStart, valEnd, timePassed){
        valStart = parseInt(valStart, 10);
        if(isNaN(valStart)) valStart = 0;
        valEnd = parseInt(valEnd, 10);
        if(isNaN(valEnd)) valEnd = 0;
        // Текущее значение параметра
        var valQur = Math.round(valStart + (valEnd - valStart) * timePassed / time);
        if(valName == 'scrollTop') {
            obj[valName] = valQur;
        } else {
            obj.style[valName] = valQur + 'px';
        }
    }
}


// Получения масива тега из родителя
function getChildTags(parent, tagName){
    var result = [];

    var childNods = parent.childNodes;
    // проверка на соответствие тегу
    if(childNods){
        for(var i=0; i<childNods.length; i++){
            if(childNods[i].nodeName == tagName) result.push(childNods[i]);
        }
    }

    return result;
}
// Получения масива классов из родителя
function getChildClass(parent, className){
    var result = [];

    var childNods = parent.childNodes;
    // проверка на соответствие классу
    if(childNods){
        for(var i=0; i<childNods.length; i++){
            if(childNods[i].nodeType == 1){
                if(childNods[i].getAttribute('class') == className) result.push(childNods[i]);
            }
        }
    }

    return result;
}