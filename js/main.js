var game;

game = new Phaser.Game(1200, 600, Phaser.AUTO, '');
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);
game.state.add('Menu', Menu);

game.state.start('Menu');