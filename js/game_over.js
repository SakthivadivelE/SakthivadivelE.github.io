var score;
var Game_Over = {
    init :function(score) {
        score=score;
    },
   
    create : function() {
        game.add.sprite(0,0,'background');
        var text;
        if(score >=500) {
            text=game.add.bitmapText(400, 200, 'desyrel','You win...\nYou scored : '+score, 64);
        } else {
            text=game.add.bitmapText(400, 200, 'desyrel','Game over...\nYou scored : '+score, 64);
        }
     
        text.angle=-05;
        var gr=game.add.graphics(0,0);
        gr.lineStyle(5,'0x000000');
        gr.beginFill('0x008000');
        gr.drawRoundedRect(0,0,200,60,10);
        gr.endFill();
        var insText=game.add.bitmapText(3,0,'desyrel','Restart',42);
        insButton=game.add.button(game.width/2,game.height/2 + 100,gr.generateTexture(),this.buttonClick,this,2,1,0);
        insText.anchor.setTo(0.5);
        insButton.anchor.setTo(0.5);
        insButton.addChild(insText);
        gr.destroy();
    },
    buttonClick : function() {
        score= 0;
        game.state.start('Menu',true,true);
    }
};