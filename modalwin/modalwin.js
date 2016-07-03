(function(){
    addEvent(window, 'load', function(){
        var i;

        // Модальное окно
        var aOpen = document.getElementsByTagName('A');
		
	for(i=0; i<aOpen.length; i++){
	    if(aOpen[i].getAttribute('data-modalwin')==='on'){
		// подключение обработчика
		addEvent(aOpen[i], 'click', function(e){
		    e = e || event;
		    var target = e.target || e.srcElement;
		    var aHref, imgM, imgH, imgW, liteM, winH, winW;
		    
		    removeDefault(e);
		    
		    imgM = document.getElementById('liteboxImg');
		    aHref = target.getAttribute('href');
		    // замена адреса во вслывающей картинке
		    imgM.setAttribute('src', aHref);

		    document.getElementById('liteboxFon').style['display'] = 'block';
		    winH =  window.innerHeight;
		    winW = window.innerWidth;
		    
		    imgM.style['max-height'] = (winH-100)+'px';
		    imgM.style['max-width'] = (winW-100)+'px';
		    imgH =  imgM.offsetHeight;
		    imgW = imgM.offsetWidth;

		    liteM = document.getElementById('litebox');
		    liteM.style['top'] = Math.round((winH-imgH)/2)+'px';
		    liteM.style['left'] = Math.round((winW-imgW)/2)+'px';

		    document.getElementById('liteboxFon').style['opacity'] = '1';
		});
	    }
	}
        
        
	var aClose = document.getElementById('liteboxClose');
        // подключение обработчика
        addEvent(aClose, 'click', function(e){
            e = e || event;
            removeDefault(e);
            document.getElementById('liteboxFon').style['opacity'] = '';
            document.getElementById('liteboxFon').style['display'] = 'none';
        });
    });
})();