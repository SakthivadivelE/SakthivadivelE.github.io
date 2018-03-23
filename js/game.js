 var tile;
 var cursors;
 var coins=null;
 var nextFire=0;
 var player;
 var score=0;
 var scoreText;
 var lifeTime=180;
 var timeText;
 var minute;
 var second;
 var enemies;
 var coinSpeed=-500;
 var coinTime=4000;
 var coinInterval=4000;
 var coinTimer;
 var emitter;
var Game = {

    init:function() {
         game.load.image('background', 'assets/images/background_1.png');
         tile=game.add.tileSprite(0,0,1200,600,'background');
    },

    preload : function() {
        game.load.image('background2', 'assets/images/background_2.jpg');
        game.load.spritesheet('coin', 'assets/images/coin.png',32,32);
        game.load.spritesheet('player', 'assets/images/spritesheetvolt_run.png',79,108);
        game.load.image('enemy', 'assets/images/enemies.png');
        game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
    },

    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        coins = game.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.ARCADE;
        coins.setAll('checkWorldBounds', true);
        coins.setAll('outOfBoundsKill', true);
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.setAll('checkWorldBounds', true);
        enemies.setAll('outOfBoundsKill', true);
        this.createPlayer();
        this.displayScore();
        this.displayTime();
        game.time.events.loop(Phaser.Timer.SECOND * 10,this.createEnemy, this);
    },

    createEnemy: function() {
        var enemy=enemies.create(1220,game.rnd.realInRange((50),(game.world.height-350)), 'enemy', 0);
        enemy.body.velocity.x = -1000;
    },

    displayTime: function() {
         timeText=game.add.bitmapText(game.width-180, 0, 'desyrel', this.updateTimeText(), 64);
        game.time.events.loop(Phaser.Timer.SECOND,this.countDownTime, this);
    },

    countDownTime:function() {
     lifeTime -=1;
      if(lifeTime < 0) {
            lifeTime=180;
            coinSpeed=-500;
            coinTime=4000;
            coinInterval=4000;
                game.state.start('Game_Over',true,false,score);
     }
        timeText.setText(this.updateTimeText());
    },

    updateTimeText: function() {
        second=Math.floor(lifeTime % 60);
        minute=Math.floor(lifeTime / 60);
        if(minute < 10) {
            minute= '0'+minute;
        }

        if(second<10) {
              second= '0'+second;
        }
        return minute+':'+second;
    },

    displayScore :function() {
        scoreText=game.add.bitmapText(10, 0, 'desyrel', 'score:' + score.toString(), 64);
    },

    createPlayer : function() {
        player=game.add.sprite(300,200,'player');
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds=true;
        player.y=game.world.height-player.height;
        player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30, true);
        player.animations.play('run');
    },

    createCoins : function () {
        var coin=game.add.sprite(1220,game.rnd.realInRange((game.world.height/3),(game.world.height-150)), 'coin', 0);
        coin.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        coin.animations.play('spin');
        coins.add(coin);
    },

    update: function() {
        if(coins !== null) {
            game.physics.arcade.collide(player, coins, this.collisionHandler);
              coins.forEach(function(item) {
            if(item) {        
                item.body.velocity.x = coinSpeed;
            }
    }, this);
  
}

  if(enemies !== null) {
              game.physics.arcade.collide(player, enemies, this.enemyCollisionHandler);
    //           enemies.forEach(function(item) {
    //         if(item) {        
    //             item.body.velocity.x = -1000;
    //         }
    // }, this);
      player.body.velocity.y=1000;
}

  player.x=300;
    if (cursors.right.isDown)
    {
        player.x +=10;
    }

      if (cursors.up.isDown)
    {
        player.y -=50;
      if(player.y < -30)
      {
          player.y=-30;
      }
    }

      if (cursors.down.isDown)
    {
        player.y +=50;
      if(player.y > 485)
      {
         player.y=485; 
      }
    }

 // tile.tilePosition.x -= 5;

  var count = 1;

  tile.tilePosition.x -= Math.sin(count) * 4;

  if(game.time.now > coinTime) {
        this.createCoins();
        coinTime=game.time.now + coinInterval;
  }
},

enemyCollisionHandler:function() {
       lifeTime=180;
       coinSpeed=-500;
       coinTime=4000;
       coinInterval=4000;
       game.state.start('Game_Over',true,false,score);
},

winAnimation : function() {
    emitter = game.add.emitter(0, 0, 200);
    emitter.makeParticles('coin');
    emitter.gravity = 200;
    emitter.x = player.x;
    emitter.y = player.y;
    emitter.start(true, 2000, null, 10);
    player.animations.stop(true);
},

collisionHandler :function (player,coin) {
    coin.destroy();
    player.animations.stop(true);
    score+=10;
    coinSpeed=coinSpeed-100 < -1200 ? -1200 : coinSpeed-100;
    coinInterval=coinInterval-100 < 1000 ? 1000 : coinInterval-100;
    if(score >= 250) {
        if(score >= 500) {
             tile.loadTexture('background');
              enemies.setAll('alpha', 0.005);
              player.y=300;
              emitter = game.add.emitter(0, 0, 500);
              emitter.width=300;
              emitter.height=200;
    emitter.makeParticles('coin');
    emitter.gravity = 200;
    player.x=game.width/2;
    emitter.x = player.x;
    emitter.y = player.y;
    emitter.start(true, 500, null, 10);
    setTimeout(()=>{
        lifeTime=180;
        coinSpeed=-500;
        coinTime=4000;
        coinInterval=4000;
        game.state.start('Game_Over',true,false,score);
    },2000);
    } else {
        tile.loadTexture('background2'); 
        setTimeout(()=>{
            player.animations.play('run');
        },400);
    }    
    } else {
         setTimeout(()=>{
             player.animations.play('run');
    },400);
    }
    scoreText.setText('score:'+score);
}
};