export default class Sanke {
    //表示蛇头的元素
    head: HTMLElement;
    //蛇的身体(包括蛇头)
    bodies: HTMLCollection;
    //获取蛇的容器；
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')
    }
    //获取蛇头的坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    //设置蛇头的坐标
    set X(value: number) {
        //如果新值和旧值相同，则直接返回不在修改
        if (this.X === value) return
        //x值的合法范围0-290之间
        if (value < 0 || value > 290) {
            //进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            //如果发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }

        }
        //移动身体
        this.moveBody()
        this.head.style.left = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody();
    }
    set Y(value: number) {
        //如果新值和旧值相同，则直接返回不在修改
        if (this.Y === value) return
        if (value < 0 || value > 290) {
            //进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        //修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            //如果发生了掉头，让蛇向反方向继续移动
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }

        }
        //移动身体
        this.moveBody();
        this.head.style.top = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody();
    }
    //蛇增加身体
    addBody() {
        //向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
    //添加一个蛇身体移动的方法
    moveBody() {
        /* 
        将后面的身体设置为前面身体的位置

        
        */
        //遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            //将值设置到当前身体上、
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }
    checkHeadBody() {
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
              throw new Error('撞到自己了 GAME OVER！')
            }
        }
    }
}