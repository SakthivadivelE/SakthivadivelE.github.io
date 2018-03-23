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
 var playerCollisionGroup;
 var coinCollisionGroup;
 var enemyCollisionGroup;
var Game = {

    preload : function() {
        game.load.image('background', 'assets/images/background_1.png');
        game.load.image('background2', 'assets/images/background_2.png');
        game.load.spritesheet('coin', 'assets/images/coin.png',32,32);
        game.load.spritesheet('player', 'assets/images/spritesheetvolt_run.png',79,108);
        game.load.image('enemy', 'assets/images/enemies.png');
        game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
    
    },

    create : function() {
         game.physics.startSystem(Phaser.Physics.P2JS);
         game.physics.p2.setImpactEvents(true);
         game.physics.p2.restitution = 1;

        playerCollisionGroup = game.physics.p2.createCollisionGroup();
        coinCollisionGroup = game.physics.p2.createCollisionGroup();
        enemyCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();
     
        tile=game.add.tileSprite(0,0,1200,600,'background');
       
        cursors = game.input.keyboard.createCursorKeys();
        coins = game.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.P2JS;

        coins.setAll('checkWorldBounds', true);
        coins.setAll('outOfBoundsKill', true);
        enemies = game.add.group();
        enemies.enableBody = true;
     
         enemies.physicsBodyType = Phaser.Physics.P2JS;
        enemies.setAll('checkWorldBounds', true);
        enemies.setAll('outOfBoundsKill', true);
        this.createPlayer();
        this.displayScore();
        this.displayTime();
     
          game.time.events.loop(Phaser.Timer.SECOND * 10,this.createEnemy, this);

      
    },

    createEnemy: function() {
        enemies.create(1220,game.rnd.realInRange((50),(game.world.height-350)), 'enemy', 0);
    },

    displayTime: function() {
         timeText=game.add.bitmapText(game.width-180, 0, 'desyrel', this.updateTimeText(), 64);
        game.time.events.loop(Phaser.Timer.SECOND,this.countDownTime, this);
    },

    countDownTime:function() {
     lifeTime -=1;
      if(lifeTime < 0) {
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
      
        game.physics.p2.enable(player, false);
        player.body.setRectangle(20, 20);
        player.body.collideWorldBounds=true;
        player.body.setCollisionGroup(playerCollisionGroup);
       player.y=game.world.height-player.height;
        player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30, true);
        player.animations.play('run');
        player.body.gravity.y=3000;
         player.body.collides([coinCollisionGroup],this.collisionHandler,this);
    },

    createCoins : function () {
        // var coin=coins.create(1220,game.rnd.realInRange((game.world.height/3),(game.world.height-150)), 'coin', 0);
            var coin=coins.create(1220,220, 'coin', 0);
        coin.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        coin.animations.play('spin');

      
       coin.body.setRectangle(20, 20);
       coin.body.setCollisionGroup(coinCollisionGroup);
       coin.body.collides([playerCollisionGroup]);
        coins.add(coin);
    },

    update: function() {
        if(coins !== null) {
         
              coins.forEach(function(item) {
            if(item) {        
                item.body.velocity.x = coinSpeed;
            }
    }, this);
}

  if(enemies !== null) {
           
              enemies.forEach(function(item) {
            if(item) {        
                item.body.velocity.x = -1000;
            }
    }, this);
}

  player.x=300;
    if (cursors.right.isDown)
    {
        player.x +=10;
    }

      if (cursors.up.isDown)
    {
        player.y -=20;
        player.body.gravity.y=0;
    }

     if (cursors.up.isUp)
    {
        // player.body.gravity.y=3000;
    }

      if (cursors.down.isDown)
    {
        player.y +=20;
    }

  tile.tilePosition.x -= 5;

  if(game.time.now > coinTime) {
        this.createCoins();
        coinTime=game.time.now + coinInterval;
  }
},

enemyCollisionHandler:function() {
    game.state.start('Game_Over',true,false,score);
},

collisionHandler :function (body1,body2) {
    console.error('called');
  if(body2.sprite !== null) {
    body2.sprite.destroy();
  }

   // body2.sprite.destroy();
    //player.animations.stop(true);
    setTimeout(()=>{
            // player.animations.play('run');
    },200);
    score+=10;
    coinSpeed=coinSpeed-100 < -1200 ? -1200 : coinSpeed-100;
    coinInterval=coinInterval-100 < 1000 ? 1000 : coinInterval-100;
    if(score >= 150) {
           tile.loadTexture('background2');
    }
 
    scoreText.setText('score:'+score);
}
};