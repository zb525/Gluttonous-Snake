//定义食物类Food
class Food{
    //定义一个属性表示食物所对应的元素
    element:HTMLElement
    constructor(){
        //获取页面中的food元素并将其赋值给element
     this.element=document.getElementById('food')!
    }
    //定义一个获取食物X轴的方法
    get X(){
        return this.element.offsetLeft
    }
    //定义一个获取食物X轴的方法
    get Y(){
        return this.element.offsetTop
    }
    //修改食物的位置
    chang(){
        //生成一个随机的位置
        //食物的位置最小是0，最大是290
        //蛇移动一次是一格，一格的大小是10，所以就要求食物的坐标必须是整10、
        let top=Math.round( Math.random()*29)*10
        let left=Math.round( Math.random()*29)*10
        this.element.style.top=top+'px'
        this.element.style.left=left+'px'
    }
}
export default Food