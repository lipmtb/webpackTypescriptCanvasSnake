import Snake from "./snake"

import {
    canvas_width,
    canvas_height,
    item_size,
    row_count,
    col_count,
    DiffState
} from "./variables";

document.addEventListener("DOMContentLoaded", () => {


    //主要区域
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas-snake");
    let context = canvas.getContext("2d");
    // console.log(row_count, col_count);
    pannelFoundation(context);//初始化基本线条
    let snake = new Snake(context, item_size);


    //控制区域
    let sBtn = <HTMLButtonElement>document.getElementById("start-btn");
    let sTopBtn = <HTMLButtonElement>document.getElementById("stop-btn");
    let reBtn = <HTMLButtonElement>document.getElementById("restart-btn");
    let stateSelect = <HTMLSelectElement>document.getElementById("select-state");
    stateSelect?.addEventListener("change", (e) => {
        if (e.currentTarget) {

            //    console.log((e.currentTarget as HTMLSelectElement).value);
            let statnum:DiffState= parseInt((e.currentTarget as HTMLSelectElement).value);
            snake.setDiffState(statnum);
        }
        stateSelect.blur();
    }, false)

    sBtn.addEventListener("click", () => {
        requestAnimationFrame(snake.run)
        snake.canRun = true;
    }, false)

    sTopBtn.addEventListener("click", () => {
        snake.stopRun();
    }, false)

    reBtn.addEventListener("click", () => {
        snake.restart();
    }, false)
}, false);


//绘制活动区域线条
function pannelFoundation(ct: CanvasRenderingContext2D | null) {
    ct!.lineWidth = 2;
    ct!.strokeStyle = "#3ca5dd";

    //绘制行
    for (let row = 0; row < row_count - 1; row++) {
        ct?.beginPath();
        ct?.moveTo(0, item_size + item_size * row);
        ct?.lineTo(canvas_width, item_size + item_size * row);
        ct?.closePath();
        ct?.stroke();

    }

    //绘制列
    for (let col = 0; col < col_count - 1; col++) {
        ct?.beginPath();
        ct?.moveTo(item_size + item_size * col, 0);
        ct?.lineTo(item_size + item_size * col, canvas_height);
        ct?.closePath();
        ct?.stroke();

    }
}