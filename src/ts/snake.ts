enum Arrow {  //移动方向
    LEFT = 37,
    TOP = 38,
    RIGHT = 39,
    BOTTOM = 40
}
enum BodyLen {
    MINLEN = 4,//蛇身最短长度
    MAXLEN = 30
}
import {
    row_count,
     col_count ,
     DiffState
}from "./variables";

export default class Snake {
    private stateNum:DiffState=DiffState.simple;//默认简单
    private startTimer: number = 0;
    public canRun: boolean = true;
    private drct: Arrow = Arrow.RIGHT; //37 左，38上  ，39右 ，40 下
    // private lastDrct: Arrow = Arrow.RIGHT;
    private snakeBodyArr: { x: number, y: number }[] = [];
    private foodObj: { x: number, y: number } = { x: 100, y: 100 };
    public ct: CanvasRenderingContext2D | null;
    private item_size: number = 0;//身体每节大小，20px默认
    constructor(ct: CanvasRenderingContext2D | null, item_size: number) {
        this.ct = ct;
        this.item_size = item_size;
        this.initSnake();
        this.setWhereFood();
        this.fillFood();
        this.run = this.run.bind(this);
        document.addEventListener("keydown", (e) => {

            if (Arrow[e.keyCode] && this.drct !== e.keyCode) {

                this.setArrow(e.keyCode);
            }

        }, false)
    }
    setDiffState(stanum:DiffState){
        console.log(stanum);
        this.stateNum=stanum;
    }
    restart(){
        this.canRun=true;
        this.clearFood();
        this.clearSnake();
        this.snakeBodyArr=[];
        this.initSnake();
        this.setWhereFood();
        this.fillFood();
        this.drct=Arrow.RIGHT;
        requestAnimationFrame(this.run);
    }
    //初始化位置
    initSnake(): void {
        for (let i = 0; i < BodyLen.MINLEN; i++) {
            this.snakeBodyArr.push({ x: i, y: 0 });
        }

        this.fillBody();//绘制

    }

    //绘制蛇
    fillBody(): void {
        // console.log(this.snakeBodyArr);
        this.ct!.fillStyle = "#ff0";
        for (let item of this.snakeBodyArr) {
            this.ct?.fillRect(item.x * this.item_size + 1, item.y * this.item_size + 1, this.item_size - 1, this.item_size - 2);
        }

    }

    //初始化食物的位置，不能与蛇重叠
    setWhereFood(): void {

        let foodX = Math.floor(Math.random() * col_count);
        let foodY = Math.floor(Math.random() * row_count);
        for (let item of this.snakeBodyArr) {
            if (foodX === item.x && foodY === item.y) {
                this.setWhereFood();
            }
        }
        this.foodObj.x = foodX;
        this.foodObj.y = foodY;

    }
    //绘制食物
    fillFood(): void {

        this.ct!.fillStyle = "#f00";
        this.ct?.fillRect(this.foodObj.x * this.item_size + 1, this.foodObj.y * this.item_size + 1, this.item_size - 1, this.item_size - 2);

    }



    //清除蛇的绘制
    clearSnake(): void {
        for (let item of this.snakeBodyArr) {
            this.ct?.clearRect(item.x * this.item_size + 1, item.y * this.item_size + 1, this.item_size - 1, this.item_size - 2);
        }

    }

    //清除食物
    clearFood(): void {
        this.ct?.clearRect(this.foodObj.x * this.item_size + 1, this.foodObj.y * this.item_size + 1, this.item_size - 1, this.item_size - 2);
    }

    //设置方向
    setArrow(arrow: Arrow): void {

        if ((this.drct === Arrow.LEFT) && (arrow === Arrow.RIGHT)) {
            return;
        }
        if ((this.drct === Arrow.RIGHT) && (arrow === Arrow.LEFT)) {
            return;
        }
        if ((this.drct === Arrow.TOP) && (arrow === Arrow.BOTTOM)) {

            return;
        }
        if ((this.drct === Arrow.BOTTOM) && (arrow === Arrow.TOP)) {

            return;
        }


        this.drct = arrow;
    }

    //蛇往某一个方向跑动
    run(stamp: number): void {

        if (!this.startTimer) {
            this.startTimer = stamp;
        }

        if (stamp - this.startTimer > this.stateNum) {
            this.startTimer = stamp;
            //重新绘制

            this.clearSnake();
            this.clearFood();
            this.nextBody(this.drct);
            this.fillFood();
            if (this.testOuter()) {
                this.fillBody();

              
            }else{
                this.canRun=false;
                alert("游戏失败")
                return;
            }


        }

        if (this.canRun) {

            requestAnimationFrame(this.run);
        }

    }
    testOuter(): boolean {
        
        return this.snakeBodyArr.every((item)=>{
            return item.x>=0&&item.x<col_count&&item.y>=0&&item.y<row_count;
        });
    }
    stopRun(): void {
        this.canRun = false;
    }

    nextBody(arrow: Arrow): void {

        switch (arrow) {
            case Arrow.LEFT: {
                let tarX = this.snakeBodyArr[this.snakeBodyArr.length - 1].x - 1;
                let tarY = this.snakeBodyArr[this.snakeBodyArr.length - 1].y

                this.snakeBodyArr.push({
                    x: tarX,
                    y: tarY
                });

                if (tarX === this.foodObj.x && tarY === this.foodObj.y) {
                    this.setWhereFood();
                } else {

                    this.snakeBodyArr.shift();
                }

                break;
            }
            case Arrow.TOP: {
                let tarX = this.snakeBodyArr[this.snakeBodyArr.length - 1].x;
                let tarY = this.snakeBodyArr[this.snakeBodyArr.length - 1].y - 1

                this.snakeBodyArr.push({
                    x: tarX,
                    y: tarY
                });
                if (tarX === this.foodObj.x && tarY === this.foodObj.y) {
                    this.setWhereFood();
                } else {

                    this.snakeBodyArr.shift();
                }
                break;
            }

            case Arrow.BOTTOM: {
                let tarX = this.snakeBodyArr[this.snakeBodyArr.length - 1].x;
                let tarY = this.snakeBodyArr[this.snakeBodyArr.length - 1].y + 1

                this.snakeBodyArr.push({
                    x: tarX,
                    y: tarY
                });
                if (tarX === this.foodObj.x && tarY === this.foodObj.y) {
                    this.setWhereFood();
                } else {

                    this.snakeBodyArr.shift();
                }
                break;
            }
            case Arrow.RIGHT: {
                let tarX = this.snakeBodyArr[this.snakeBodyArr.length - 1].x + 1;
                let tarY = this.snakeBodyArr[this.snakeBodyArr.length - 1].y;
                this.snakeBodyArr.push({
                    x: tarX,
                    y: tarY
                });
                if (tarX === this.foodObj.x && tarY === this.foodObj.y) {
                    this.setWhereFood();
                } else {

                    this.snakeBodyArr.shift();
                }
                break;
            }
            default: {

            }
        }


    }
}