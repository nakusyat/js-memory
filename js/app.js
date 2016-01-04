var x_pos = 0;
var y_pos = 15;
var smile_width = 100;
var smile_height = 100;
var smiles = [];
var last_active_smile = {};
var pre_last_active_smile = {};
var img_src;
var img_cover = 'image/src/cover2.png';
var open_element_count = 0;

var app = angular.module('memory', [ ]);
    app.controller('PanelController', function($scope) {
        this.initMemory = function(){
            initSmileys();
        };
    });

var initSmileys = function () {
    for( var i=0; i<4; i++) {
        for( var j=0; j<5; j++) {
            img_src = getRandomInt(1, 10);
            while( smileyValidation(img_src, smiles)) {
                img_src = getRandomInt(1, 10);
            }
            smiles.push(img_src);
            createSmile(x_pos, y_pos, 'image/src/nature/' + img_src + '.png');
            x_pos += 125;
        }
        x_pos = 0;
        y_pos += 125;
    }
};

var smileyValidation = function(val, arr) {
    var occurence_count = 0;
    arr.map(function(value) {
        if(val === value) {
            occurence_count += 1;
        }
    });

    if(occurence_count < 2) {
        return false;
    } else {
        return true;
    }
};

var createSmile = function(x_position, y_position, img_src) {
    var smile = new Smile(smile_width, smile_height, x_position, y_position, img_src, img_cover, false);
        smile.img.onclick = function() {
            smileOnClickStep(smile);
        };

        angular.element('#panel')[0].appendChild(smile.img);
};

var smileOnClickStep = function(smile) {
    if(!smile.get_guessed_status()) {
        smile.set_img_src();
        if(!last_active_smile.hasOwnProperty('x_pos')) {
            last_active_smile = smile;
        } else if(last_active_smile.hasOwnProperty('x_pos') && !pre_last_active_smile.hasOwnProperty('x_pos') && !Object.is(last_active_smile, smile) && smile.img_src === last_active_smile.img_src) {
            last_active_smile.set_guessed_status(true);
            smile.set_guessed_status(true);
            last_active_smile = {};
            pre_last_active_smile = {};
            open_element_count += 2;
        } else if(last_active_smile.hasOwnProperty('x_pos') && !pre_last_active_smile.hasOwnProperty('x_pos') && !Object.is(last_active_smile, smile) && smile.img_src !== last_active_smile.img_src) {
            pre_last_active_smile = last_active_smile;
            last_active_smile = smile;
        } else if(last_active_smile.hasOwnProperty('x_pos') && pre_last_active_smile.hasOwnProperty('x_pos') && !Object.is(last_active_smile, pre_last_active_smile) && pre_last_active_smile.img_src !== last_active_smile.img_src) {
            if(Object.is(last_active_smile, smile)) {
                pre_last_active_smile.set_img_cover();
                pre_last_active_smile = {};
            } else if(Object.is(pre_last_active_smile, smile)) {
                last_active_smile.set_img_cover();
                last_active_smile = pre_last_active_smile;
                pre_last_active_smile = {};
            } else {
                pre_last_active_smile.set_img_cover();
                last_active_smile.set_img_cover();
                pre_last_active_smile = {};
                last_active_smile = smile;
            }
        }

        if(open_element_count === smiles.length) {
            alert('Congratulations');
        }
    }
};
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
