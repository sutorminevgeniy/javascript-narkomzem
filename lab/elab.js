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
    var valStart;
    var fps  = 50; // кадров в секунду (потом можно сделать изменяемую)
    var timeStep = Math.round(1000/fps);

    // стартовые значения параметров
    if(valName == 'scrollTop') {
        valStart = obj[valName];
    } else {
        valStart = obj.style[valName];
    }

    var start = Date.now(); // сохранить время начала

    var timer = setTimeout(function step() {
        // вычислить сколько времени прошло с начала анимации
        var timePassed = Date.now() - start;

        // проверка последний ли шаг
        if (timePassed >= time) {
            clearTimeout(timer);
            draw(obj, valName, valStart, valEnd, time);

            // вызов функции по завершению анимации
            if(func) func();
            return;
        }

        // рисует состояние анимации, соответствующее времени timePassed
        draw(obj, valName, valStart, valEnd, timePassed);

        setTimeout(step, timeStep);
    }, timeStep);

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