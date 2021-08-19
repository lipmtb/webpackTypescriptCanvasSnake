let canvas_width = 500;
let canvas_height = 300;
let item_size = 20;//身体每节大小
let row_count = canvas_height / item_size;//15
let col_count = canvas_width / item_size;//25
enum DiffState{
    simple=500,
    difficult=300,
    ugly=100
}
export{
    canvas_width ,
    canvas_height, 
    item_size ,
    row_count,
     col_count ,
     DiffState
}