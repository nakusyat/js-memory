var Smile = function(img_width, img_height, x_position, y_position, img_src, img_cover, guessed_status) {

    this.x_pos = x_position;
    this.y_pos = y_position;
    this.img_width = img_width;
    this.img_heigh = img_height;
    this.img = document.createElement('img');
    this.img_src = img_src;
    this.img_cover = img_cover;
    this.guessed = guessed_status;

    this.init = function(){
        this.img.src = img_cover;
        this.img.style.position = "absolute";
        this.img.style.width = this.img_width + 'px';
        this.img.style.height = this.img_heigh + 'px';
        this.img.style.left = this.x_pos + 'px';
        this.img.style.top = this.y_pos + 'px';
    };

    this.set_img_src = function() {
        this.img.style.opacity = 0;
        this.img.src = this.img_src;
        this.img.style.backgroundColor = 'lightyellow';
        $(this.img).transition({ opacity: 1 });

    };

    this.set_img_cover = function() {
        this.img.style.opacity = 0;
        this.img.src = this.img_cover;
         this.img.style.backgroundColor = 'transparent';
        $(this.img).transition({ opacity: 1 });
    };

    this.set_guessed_status = function (guessed_status) {
        this.guessed = guessed_status;
    };

    this.get_guessed_status = function(){
        return this.guessed;
    };
    this.init();
};