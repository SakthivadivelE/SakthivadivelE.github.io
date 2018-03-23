var button;
var WHRATIO;
var scaleRate;
var gameHeight;
var gameWidth;

var content = [
   "The game theme is collect coins to earn points",
   "Your goal is to earn 500 points within 3 minutes",
   "You can get 10 points per each coin you collect",
   "If any enemies touch yourself then the game is over",
   "If you earn 500 points within the time limit, ",
   "you are the winner."
];

var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 120;
var lineDelay = 400;
var text;
var insButton;
var Menu = {

    init : function() {
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setResizeCallback(this.resizeGame, this);
        WHRATIO = 1200/ 600;
    },

    preload : function() {
        game.load.image('button','assets/images/button.png');
        game.load.image('background', 'assets/images/background_1.png');
        game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
    },
    create : function() {
      game.stage.backgroundColor='0x8A2BE2';
      game.add.sprite(0,0,'background');
      button=game.add.button(game.world.width/2,game.world.height/2,'button',this.buttonClick,this,2,1,0);
      button.anchor.setTo(0.5);
      this.addInstructionButton();
    },

    buttonClick :function() {
        game.state.start('Game');
    },

    addInstructionButton :function() {
        var gr=game.add.graphics(0,0);
        gr.lineStyle(5,'0x000000');
        gr.beginFill('0x008000');
        gr.drawRoundedRect(0,0,250,60,10);
        gr.endFill();
        var insText=game.add.bitmapText(3,0,'desyrel','Instructions',42);
        insButton=game.add.button(button.x,button.bottom+50,gr.generateTexture(),this.InsButtonClick,this,2,1,0);
         insText.anchor.setTo(0.5);
        insButton.anchor.setTo(0.5);
        insButton.addChild(insText);
        gr.destroy();
    },

    InsButtonClick :function() {
        button.y -=100;
        insButton.inputEnabled=false;
        var gr=game.add.graphics(0,0);
        gr.lineStyle(5,'0x000000');
        gr.beginFill('0x008000');
        gr.drawRoundedRect(0,0,770,250,10);
        gr.endFill();
        var textBox=game.add.sprite(200,insButton.y -150,gr.generateTexture())
         text = game.add.bitmapText(32, 5,'desyrel', '',32);
         textBox.addChild(text);
    this.nextLine();
    gr.destroy();
    },

    resizeGame: function() {
	 let w = window.innerWidth,
            h = window.innerHeight;

        if (w >= h * WHRATIO) {
            gameHeight = h;
            gameWidth = h * WHRATIO;

        } else {
            gameWidth = w;
            gameHeight = w / WHRATIO;
        }

        scaleRate = gameHeight / 600;
        game.scale.setUserScale(scaleRate,scaleRate);
	},

    nextLine : function() {

    if (lineIndex === content.length)
    {
        return;
    }
    line = content[lineIndex].split(' ');
    wordIndex = 0;
    game.time.events.repeat(wordDelay, line.length, this.nextWord, this);
    lineIndex++;
},

nextWord : function() {
    text.text = text.text.concat(line[wordIndex] + " ");
    wordIndex++;
    if (wordIndex === line.length)
    {
        text.text = text.text.concat("\n");
        game.time.events.add(lineDelay, this.nextLine, this);
    }

}

};