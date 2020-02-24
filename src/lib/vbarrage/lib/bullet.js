export default class Bullet {
    // 弹幕构造器
    constructor(x,y,dx,avatar,msg,nickname) {
        // 以上5个参数分别为横坐标，纵坐标，横向移动速度，纵向移动速度，半径。
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.msg = msg;
        this.avatar = avatar;
        this.nickname = nickname
        this.height = 36
        this.offsetX = Math.random() * 55 + 5;
    }


    // 弹幕外边框
    initBorder() {
        console.log('ssss')
    }

    // 用户头像
    initAvatar() {

    }

    // 用户昵称

    initName(){

    }

    // 文字内容
    initMessage(){

    }

    // 绘制
    draw(ctx){
        // 绘制头像
        ctx.beginPath();
        ctx.arc(this.x+this.offsetX+18,this.y+18,15,0,2*Math.PI);
        ctx.fill();

        // 绘制文本
        ctx.font="20px Arial";

        let msgWidth = ctx.measureText(this.msg).width;
        this.width = 45 + msgWidth
        ctx.textBaseline = 'top'
        ctx.fillText(this.msg,this.x+this.offsetX+36,this.y+6);
        // 绘制边框
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.lineWidth="2";
        ctx.strokeStyle="black";
        ctx.rect(this.x+this.offsetX,this.y,42+msgWidth,36);
        ctx.stroke();

        this.x += this.offsetX
        this.offsetX = 0
    }

    update(ctx) {
        this.x -= this.dx
        this.draw(ctx)
    }

}