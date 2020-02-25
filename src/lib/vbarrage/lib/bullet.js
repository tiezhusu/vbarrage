export default class Bullet {
    // 弹幕构造器
    constructor(content,options) {
        // 弹幕内容
        this.msg = content.msg;
        this.avatar = content.avatar;
        this.nickname = content.nickname;
        // 配置参数

        this.x = options.x;
        this.y = options.y;
        this.dx = options.dx;
        this.fontSize = options.fontSize
        this.fontStyle = options.fontStyle
        this.height = 36
        this.bulletBorder = options.bulletBorder,
        this.bulletAvatar = options.bulletAvatar,
        this.bulletNickname = options.bulletNickname 

        this.offsetX = Math.random() * 55 + 5;
    }


    // 弹幕外边框
    initBorder(ctx) {
        // 绘制边框
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.lineWidth="2";
        ctx.strokeStyle="black";
        ctx.rect(this.x+this.offsetX,this.y,42+this.msgWidth,36);
        ctx.stroke();
        this.x += this.offsetX
        this.offsetX = 0
    }

    // 用户头像
    initAvatar(ctx) {
        // 绘制头像
        ctx.beginPath();
        ctx.arc(this.x+this.offsetX+18,this.y+18,15,0,2*Math.PI);
        ctx.fill();
    }

    // 用户昵称

    initNickname(){

    }

    // 文字内容
    initMessage(ctx){

        // 绘制文本
        ctx.font=`${this.fontSize}px ${this.fontStyle}`;

        this.msgWidth = ctx.measureText(this.msg).width;
        this.width = 45 + this.msgWidth
        ctx.textBaseline = 'top'
        ctx.fillText(this.msg,this.x+this.offsetX+36,this.y+6);
    }

    // 绘制
    draw(ctx){
        this.initMessage(ctx)
        if(this.bulletAvatar) this.initAvatar(ctx)
        if(this.bulletBorder) this.initBorder(ctx)
        if(this.bulletNickname) this.initNickname(ctx)
    }

    update(ctx) {
        this.x -= this.dx
        this.draw(ctx)
    }

}