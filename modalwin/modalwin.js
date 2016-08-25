(function(){
    addEvent(window, 'load', function(){
        var i, modWin;

        function ModalWin(){
            var that = this;
            // создание модального окна
            this.modalClose = document.createElement('a');
            this.modalClose.setAttribute('id', 'liteboxClose');
            this.modalContent = document.createElement('div');
            this.modalContent.setAttribute('id', 'liteboxContent');

            this.modal = document.createElement('div');
            this.modal.setAttribute('id', 'litebox');
            this.modal.appendChild(this.modalClose);
            this.modal.appendChild(this.modalContent);

            this.modalFon = document.createElement('div');
            this.modalFon.setAttribute('id', 'liteboxFon');
            this.modalFon.appendChild(this.modal);

            document.body.appendChild(this.modalFon);

            this.aHref = '';
            this.content = null;

            // подключение обработчика
            addEvent(this.modalClose, 'click', function(e){
                e = e || event;
                removeDefault(e);

                that.hide();
                that.close();
                if(isAncor(that.aHref)) {
                    document.body.appendChild(that.content);
                } else {
                    that.removeContent();
                }
            });           
        }
        ModalWin.prototype.setContent = function (elem){
            this.content = elem;
            this.modalContent.appendChild(elem);
        }
        ModalWin.prototype.removeContent = function (){
            var childs = this.modalContent.children;
            for(i = childs.length-1; i >= 0; i--){
                this.modalContent.removeChild(childs[i]);
            }
        };
        ModalWin.prototype.open = function (){
            this.modalFon.style['display'] = 'block';
        };
        ModalWin.prototype.close = function (){
            this.modalFon.style['display'] = 'none';
        };
        ModalWin.prototype.show = function (){
            this.modalFon.style['opacity'] = '1';
        };
        ModalWin.prototype.hide = function (){
            this.modalFon.style['opacity'] = '';
        }

        //---------------------------------------------------------------------

        // Модальное окно
        var aOpen = document.getElementsByTagName('A');
        
        for(i=0; i<aOpen.length; i++){
            if(aOpen[i].getAttribute('data-modalwin')==='on'){
                // подключение обработчика
                addEvent(aOpen[i], 'click', function(e){
                    e = e || event;
                    var target = e.target || e.srcElement;
                    var aHref, contentMod, contentModH, contentModW, liteM, winH, winW;
                    
                    removeDefault(e);
                    
                    aHref = target.getAttribute('href');

                    winW = window.innerWidth;
                    winH =  window.innerHeight;

                    // вслывающая картинка
                    if(isImg(aHref)) {
                        contentMod = document.createElement('img');
                        contentMod.setAttribute('id', 'liteboxImg');
                        contentMod.setAttribute('src', aHref);

                        if(!modWin) {
                            modWin = new ModalWin();
                        }

                        modWin.aHref = aHref;
                        modWin.setContent(contentMod);

                        addEvent(contentMod, 'load', function(){
                            
                            modWin.open();

                            contentMod.style['max-height'] = (winH-100)+'px';
                            contentMod.style['max-width'] = (winW-100)+'px';
                            contentModH =  contentMod.offsetHeight;
                            contentModW = contentMod.offsetWidth;

                            liteM = document.getElementById('litebox');
                            liteM.style['top'] = Math.round((winH-contentModH)/2)+'px';
                            liteM.style['left'] = Math.round((winW-contentModW)/2)+'px';

                            modWin.show();
                        });
                    }

                    // якорь
                    if(isAncor(aHref)) {
                        contentMod = document.getElementById(aHref.slice(1));

                        if(!modWin) {
                            modWin = new ModalWin();
                        }

                        modWin.aHref = aHref;
                        modWin.setContent(contentMod);
                            
                        modWin.open();

                        contentModH =  contentMod.offsetHeight;
                        contentModW = contentMod.offsetWidth;

                        liteM = document.getElementById('litebox');
                        liteM.style['top'] = Math.round((winH-contentModH)/2)+'px';
                        liteM.style['left'] = Math.round((winW-contentModW)/2)+'px';

                        modWin.show();
                    } 
                });
            }
        }

        //---------------------------------------------------------------------

        function isImg(strURL) {
            strURL = strURL || '';
            var posDot, rashirenie;
            var rashArray = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
            
            posDot = strURL.indexOf('.');
            if(posDot === -1) {
                return false;
            }

            rashirenie = strURL.slice(posDot + 1).toLowerCase();
            if(rashArray.indexOf(rashirenie) === -1) {
                return false;
            }

            return true;
        }

        function isAncor(strURL) {
            if(strURL[0] === '#'){
                return true;
            }
            return false;
        }
    });
})();