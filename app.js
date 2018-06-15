const KEY = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let user1 = [];
let user2 = [];

let playUser = 'O';
let isPc = confirm("PC랑 하기");


$(".un-select").on("click", function(){
    let len = $(this).attr("class").length;

    if(len > 0){
        if(isPc){
            if(playLocal($(this))) return;

            if($(".un-select").length == 0){
                alert("무승부");
                return;
            }

            if(playPc()) return;
        }else{
            play($(this));
        }
    }
});

function playLocal(tag){

    let index = Number(tag.attr("data-index"));
    user1.push(index);
    tag.text("O");
    if(isWin(user1)){
        alert("user Win!");
        return true;
    }
    tag.removeClass('un-select');

}

function playPc(){
    let pc = PC();

    if(pc == null){
        pc = Math.floor(Math.random() * 8);
        while(1){
            if(user1.indexOf(pc) != -1 || user2.indexOf(pc) != -1){
                pc = Math.floor(Math.random() * 8);
            }else{
                break;
            }
        }
    }

    user2.push(pc);
    $('td[data-index='+(pc)+']').text("X");
    $('td[data-index='+(pc)+']').removeClass('un-select');
    if(isWin(user2)){
        alert("pc Win!");
        return true;
    }
}

//2인
function play(tag){
    let index = Number(tag.attr("data-index"));
    tag.text(playUser);

    if(playUser == 'O'){
        user1.push(index);
        if(isWin(user1)){
            alert("O Win!");
        }else
            playUser = 'X';
    }
    else{
        user2.push(index);
        if(isWin(user2)){
            alert("X Win!");
        }else
            playUser = 'O';
    }
    tag.removeClass('un-select');
}

function isWin(user){
    for(let i = 0; i < 8; i++){
        let count = 0;
        for(let j = 0; j < 3; j++){
            if(user.indexOf(KEY[i][j]) != -1)
                count++;
        }

        if(count >= 3)
            return true;
    }
    return false;
}

function PC(){
    for(let i = 0; i < 8; i++){
        let count = [];
        for(let j = 0; j < 3; j++){
            if(user1.indexOf(KEY[i][j]) != -1){
                count.push(KEY[i][j]);
            }
        }
        if(count.length >= 2){
            for(let k = 0; k < 3; k++){
                if(count.indexOf((KEY[i][k])) == -1){
                    if(user1.indexOf(KEY[i][k]) != -1 || user2.indexOf(KEY[i][k]) != -1){
                        console.log(KEY[i][k]);
                        continue;
                    }else{
                        return KEY[i][k];
                    }
                }
            }
        }
    }
    return null;
}
