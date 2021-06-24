import Snake from './snake'
import Food from './Food'
import ScorePanel from './scorePanel'
export default class GameControl {
    //蛇
    snake: Snake;
    //食物
    food: Food;
    //记分牌
    scorePanel: ScorePanel;
    //创建一个属性来储存蛇的移动方向(也就是按键的方向)
    direction: string = '';
    //创建一个属性用来记录游戏是否结束
    isLive=true
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    //游戏的初始化方法，调用后游戏开始
    init() {
        //绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))
      this.run()

    }
    //创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        //需要检查event。key的值是否合法(用户时候按了正确的按键)
        console.log(event.key);
        this.direction = event.key
    }
    //创建一个控制蛇移动的方法
    run() {
        /* 
        根据方向(this.direction)来使蛇的位置改变
        向上  top 减少
        向下  top 增加
        向左  left  减少
        向右 left  增加
        */
        //获取蛇现在的坐标
        let X = this.snake.X
        let Y = this.snake.Y
        //根据按键方向来修改x值和y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                //向上移动top减少
                Y -= 10
                break;
            case "ArrowDown":
            case "Down":
                //向下移动top增加
                Y += 10
                break;
            case "ArrowLeft":
            case "Left":
                //向左移动left减少
                X -= 10
                break;
            case "ArrowRight":
            case "Right":
                //向右移动left增加
                X += 10
                break;

        }
        //检查蛇是否吃到食物
        this.checkEat(X,Y)
        
       


        //修改蛇的x值和y值
        try{
            this.snake.X=X
            this.snake.Y=Y
        }catch(e){
            //进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
            alert(e.message+'GAME OVER')
            //将isLive设置为false
            this.isLive=false
        }
    
        //开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)
         //定义一个方法，用来检查蛇是否吃到食物
         
        }
        checkEat(X:number,Y:number){
           if(X===this.food.X && Y===this.food.Y){
                  //食物的位置要进行设置
           this.food.chang();
           //分数增加
           this.scorePanel.addSore()
          //蛇要增加一节
          this.snake.addBody()
           }
        };
    /* 
    ArrowUp
    ArrowDown
    ArrowRight
    ArrowLeft
    
    
    */
}