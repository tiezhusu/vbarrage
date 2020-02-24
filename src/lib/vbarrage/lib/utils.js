
// 产生随机浮点数，使弹幕不与边框重叠或超出边框
function randomFloatFromRange(low,hight) {
    return Math.random() * (hight - low + 1) + low
}

// 获取两个弹幕之间的距离
function getDistance(x1,y1,w1,h1,x2,y2,h2) {
    // true为已碰撞，false为未碰撞
    if(y1 >= y2) {
        if((y1-y2) > h2) {
            return false
        }else{
            // y轴上有一定重叠情况
            if(x1 === x2) {
                // 两者均为未开始移动的弹幕
                return true
            }else if(x1+w1 < x2){
                return false
            }else {
                return true
            }
        }
    }else {
        if((y2-y1) > h1) {
            return false
        }else{
            // y轴上有一定重叠情况
            if(x1 === x2) {
                // 两者均为未开始移动的弹幕
                return true
            }else if(x1+w1 < x2){
                return false
            }else {
                return true
            }
        }
    }
}

const utils = {randomFloatFromRange,getDistance}
export default utils