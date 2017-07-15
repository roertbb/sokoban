/*
	Programming and art made by Robert Banaszak (robb)
*/
var w = 300, h = 528; //528  -  400     
var full_places=0;  
var level_boxes = 2; //9,10 - 3
var can_move = true;
var number_of_level = 1;
var can_change = true;
var steps = 0;
var repeats = 0;
var const_align = 90;
var tab = 10; 
var can_restart = true;

var Boot = {
	preload: function() {
		game.load.image('load', 'assets/load.png');
	},
	create: function() {
		game.state.start('Load');
	}
}
var Load = {
	preload: function() {
		this.goFullScreen();
		game.stage.backgroundColor = '#ccd1d9';

		preload = game.add.sprite(w/2, h/2, 'load');
		preload.anchor.setTo(0.5);
		game.load.setPreloadSprite(preload);
		//loading assets
		game.load.spritesheet('tiles', 'assets/sokoban.png', 30, 30);
		game.load.image('logo', 'assets/logo.png');
		game.load.image('logo2', 'assets/logo2.png');
		game.load.image('logo3', 'assets/logo3.png');
		game.load.image('bar', 'assets/bar.png');
		game.load.image('menubar', 'assets/menubar.png');
		game.load.image('comp', 'assets/comp.png');
		game.load.image('controls', 'assets/controls.png');
		//game.load.audio('push', 'assets/push.wav');
		//game.load.bitmapFont('04font', 'assets/04font.png', 'assets/04font.fnt');
	},
	create: function() {
		game.state.start('Menu');//Menu
	},
	goFullScreen: function() {
		if (!this.game.device.desktop) {
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.parentIsWindow = true;
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.refresh();
		}
		else {
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
		}
	},
}
var Controls = {
	preload: function() {
		game.stage.backgroundColor = '#ccd1d9';
	},
	create: function() {
		bar = game.add.sprite(147, 58, 'bar');
		bar.anchor.setTo(0.5); bar.alpha = 0;
		controls = game.add.sprite(147, 58, 'controls');
		controls.anchor.setTo(0.5);	controls.alpha = 0;

		logo = game.add.sprite(150, 295, 'logo3');
		logo.anchor.setTo(0.5);
		text1 = game.add.text(75, 180, 'Use arrows or slide \n   to move', { font: '18px Arial', fill: '#656D78' }); 
		pic1 = game.add.sprite(165, 205, 'tiles');
		pic1.frame = 5;
		text2 = game.add.text(60, 270, 'Push          into', { font: '18px Arial', fill: '#656D78' });
		pic2 = game.add.sprite(105, 265, 'tiles');
		pic2.frame = 3;
		pic3 = game.add.sprite(195, 265, 'tiles');
		pic3.frame = 4;
		text3 = game.add.text(80, 330, 'Reset map by', { font: '18px Arial', fill: '#656D78' }); 
		pic4 = game.add.sprite(195, 325, 'tiles');
		pic4.frame = 9;
		text3 = game.add.text(70, 360, 'Return to menu by', { font: '18px Arial', fill: '#656D78' }); 
		pic4 = game.add.sprite(225, 355, 'tiles');
		pic4.frame = 11;
		text4 = game.add.text(150, 420, '', { font: '18px Arial', fill: '#656D78' });
		text4.anchor.setTo(0.5, 0);
		if (this.game.device.desktop)
			text4.text = '- click to start -';
		else
			text4.text = '- tap to start -';

		game.add.tween(bar).to({alpha: 1}, 750, Phaser.Easing.Bounce.Out, true).start();
		game.add.tween(controls).to({alpha: 1}, 750, Phaser.Easing.Bounce.Out, true).start();
		//game.add.tween(text1).to({alpha: 1}, 750, Phaser.Easing.Bounce.Out, true).start();
	},
	update: function() {
		if (game.input.activePointer.isDown)
				game.state.start('Game');
	},
}
var End = {
	preload: function() {
		game.stage.backgroundColor = '#ccd1d9';
	},
	create: function() {
		bar = game.add.sprite(147, 128, 'bar');
		bar.anchor.setTo(0.5); bar.alpha = 0;
		comp = game.add.sprite(147, 128, 'comp');
		comp.anchor.setTo(0.5);	comp.alpha = 0;

		score = game.add.text(147, 250, 'STEPS:  '+steps, { font: '16px Arial', fill: '#fff' }); 
		score.anchor.setTo(0.5); score.alpha = 0;
		repeat = game.add.text(147, 280, 'RESTARTS: '+repeats, { font: '16px Arial', fill: '#fff' });
		repeat.anchor.setTo(0.5); repeat.alpha = 0;
		thanks = game.add.text(147, 380, 'THANKS FOR PLAYING!', { font: '16px Arial', fill: '#fff' });
		thanks.anchor.setTo(0.5); thanks.alpha = 0

		game.add.tween(comp.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None).loop().start();
		game.add.tween(bar.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None).loop().start();

		btnmenu = game.add.sprite(5, 5, 'tiles');
		btnmenu.frame = 11; btnmenu.alpha = 0;
		btnmenu.inputEnabled = true;
		btnmenu.events.onInputDown.add(function() { game.state.start('Menu'); }, this);

		game.add.tween(bar).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();
		game.add.tween(comp).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();
		game.add.tween(score).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();
		game.add.tween(repeat).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();
		game.add.tween(thanks).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();
		game.add.tween(btnmenu).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();
		number_of_level=1; steps=0; repeats=0;
	},
}

var Menu = {
	create: function() {

		logo2 = game.add.sprite(147, 528, 'logo2');
		logo2.anchor.setTo(0.5);
		logo2.alpha = 0.1
		logo = game.add.sprite(150, -30, 'logo');
		logo.anchor.setTo(0.5);
		logo.alpha = 0.1;

		bar = game.add.sprite(150, 400, 'bar');
		bar.anchor.setTo(0.5);
		bar.alpha = 0;
		button = game.add.sprite(150, 400, 'menubar');
		button.anchor.setTo(0.5);
		button.alpha = 0;

		push = game.add.audio('push');

		game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {game.add.tween(logo).to({y:'200', alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();}, this);
		game.add.tween(logo2).to({y:'-357', alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();
		game.add.tween(button.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None).loop().start();
		game.add.tween(bar.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None).loop().start();

    	game.time.events.add(Phaser.Timer.SECOND * 1, function() {game.add.tween(button).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start(); game.add.tween(bar).to({alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true).start();}, this);
		
	},
	update: function() {
		if (game.input.activePointer.isDown)
				game.state.start('Controls');
	},
}
var Game = {
	create: function() {
		cursor = game.input.keyboard.createCursorKeys();
		this.drawLevel(number_of_level);

		debug = game.add.text(50, 10, '', { font: '16px Arial', fill: '#fff' }); 

		btnmenu = game.add.sprite(5, 5, 'tiles');
		btnmenu.frame = 11;
		btnmenu.inputEnabled = true;
		btnmenu.events.onInputDown.add(function() { game.state.start('Menu'); }, this);
		btnrestart = game.add.sprite(265, 5, 'tiles');
		btnrestart.frame = 9;
		btnrestart.inputEnabled = true;
		btnrestart.events.onInputDown.add(this.restart, this);

		var swipeCoordX,
        swipeCoordY,
        swipeCoordX2,
        swipeCoordY2,
        swipeMinDistance = 50;

        if (can_move) {
        	can_move = false;
        	hero.isMoving = true;
		    game.input.onDown.add(function(pointer) {
		        swipeCoordX = pointer.clientX;
		        swipeCoordY = pointer.clientY;    
		    }, this);

		    game.input.onUp.add(function(pointer) {
		        swipeCoordX2 = pointer.clientX;
		        swipeCoordY2 = pointer.clientY;
		        var distX = swipeCoordX2 - swipeCoordX;
		        var distY = swipeCoordY2 - swipeCoordY;
		        if(Math.abs(distX)>Math.abs(distY)*2 && Math.abs(distX)>10){
					if(distX>0){
			                this.move_right(); //push.play();
			            }
			            else{
			                this.move_left(); //push.play();
			            }
				}
				if(Math.abs(distY)>Math.abs(distX)*2 && Math.abs(distY)>10){
					if(distY>0){
			                this.move_down(); //push.play();
			            }
			            else{
			                this.move_up(); //push.play();
			            }
				}
		    }, this); 
	    }   
	},
	update: function() {
		debug.text = ' LEVEL:  '+number_of_level+'      STEPS:  '+steps;
		
		this.movement();
		/*if (rKey.isDown) {
			if (can_change) {
				this.restart();
				can_change = false;
			}
		} */
	},
	checkLevel: function() {
		full_places = 0;
		boxes.forEach(function(b){
			places.forEach(function(p){
				if (b.x == p.x && b.y == p.y) {
					full_places++;
				}
			},this)
		},this);

		if (number_of_level<9) {
			if (full_places == 2) {
				this.killLevel();
				number_of_level++;
				can_move = false;
				this.drawLevel(number_of_level);
			}
		}
		if (number_of_level == 9 || number_of_level == 10) {
			if (full_places == 3) {
				this.killLevel();
				number_of_level++;
				this.drawLevel(number_of_level);
			}
		}
	},
	restart: function() {
		if (can_restart) {
			can_restart = false;
			this.killLevel();
			can_move = false;
			this.drawLevel(number_of_level);
			repeats++;
		}
	},
	move_up: function() {
		can_move = false;
		var posx = Math.ceil(hero.x/30);
		var posy = Math.ceil(hero.y/30)-const_align/30;
		if (level[posy-1][posx]==4 && level[posy-2][posx]!==3 && level[posy-2][posx]!==4)
		{
			this.move(0, -1);
			this.move_box(0, -1);
			level[posy][posx]=0;
			level[posy-1][posx]=6;
			level[posy-2][posx]=4;
			hero.frame = 6;
		}
		else if (level[posy-1][posx]!==3 && level[posy-1][posx]!==4) {
			this.move(0, -1);
			level[posy][posx]=0;
			level[posy-1][posx]=6;	
			hero.frame = 6;
		}
		else this.move(0, 0);		
	},
	move_down: function() {
		can_move = false;
		var posx = Math.ceil(hero.x/30);
		var posy = Math.ceil(hero.y/30)-const_align/30;
		if (level[posy+1][posx]==4 && level[posy+2][posx]!==3 && level[posy+2][posx]!==4)
		{
			this.move(0, 1);
			this.move_box(0, 1);
			level[posy][posx]=0;
			level[posy+1][posx]=6;
			level[posy+2][posx]=4;
			hero.frame = 8;
		}
		else if (level[posy+1][posx]!==3 && level[posy+1][posx]!==4) {
			this.move(0, 1);
			level[posy][posx]=0;
			level[posy+1][posx]=6;	
			hero.frame = 8;
		}
		else this.move(0, 0);
	},
	move_left: function() {
		can_move = false;
		var posx = Math.ceil(hero.x/30);
		var posy = Math.ceil(hero.y/30)-const_align/30;
		if (level[posy][posx-1]==4 && level[posy][posx-2]!==3 && level[posy][posx-2]!==4)
		{
			this.move(-1, 0);
			this.move_box(-1, 0);
			level[posy][posx]=0;
			level[posy][posx-1]=6;
			level[posy][posx-2]=4;
			hero.frame = 7;
		}
		else if (level[posy][posx-1]!==3 && level[posy][posx-1]!==4) {
			this.move(-1, 0);
			level[posy][posx]=0;
			level[posy][posx-1]=6;
			hero.frame = 7;	
		}
		else this.move(0, 0);
	},
	move_right: function() {
		can_move = false;
		var posx = Math.ceil(hero.x/30);
		var posy = Math.ceil(hero.y/30)-const_align/30;
		if (level[posy][posx+1]==4 && level[posy][posx+2]!==3 && level[posy][posx+2]!==4)
		{
			this.move(1, 0);
			this.move_box(1, 0);
			level[posy][posx]=0;
			level[posy][posx+1]=6;
			level[posy][posx+2]=4;
			hero.frame = 5;
		}
		else if (level[posy][posx+1]!==3 && level[posy][posx+1]!==4) {
			this.move(1, 0);
			level[posy][posx]=0;
			level[posy][posx+1]=6;
			hero.frame = 5;	
		}
		else this.move(0, 0);
	},
	movement: function() {

		if (can_move) {
			if (cursor.up.isDown) {
				this.move_up();
			}
			else if (cursor.down.isDown) {
				this.move_down();
			}
			else if (cursor.left.isDown) {
				this.move_left();
			}
			else if (cursor.right.isDown) {
				this.move_right();
			}
		}
	},
	move: function(x, y) {
  		if (hero.isMoving) { return; }
  		hero.isMoving = true;
		game.add.tween(hero).to({x: hero.x + x * 30, y: hero.y + y * 30}, 250, Phaser.Easing.Linear.InOut, true).onComplete.add(function() { if(x!=0 || y!=0) steps++; hero.isMoving = false; can_move = true; this.checkLevel();}, this);
	},
	move_box: function(x, y) {
		boxes.forEach(function(e){
			if (x==0 && y==-1) { //up
				if (e.x == hero.x && e.y == hero.y-30) {
					game.add.tween(e).to({x: e.x + x * 30, y: e.y + y * 30}, 250, Phaser.Easing.Linear.InOut, true).onComplete.add(function() {this.checkLevel(); }, this);
				}
			} else if (x==0 && y==1) { //down
				if (e.x == hero.x && e.y == hero.y+30) {
					game.add.tween(e).to({x: e.x + x * 30, y: e.y + y * 30}, 250, Phaser.Easing.Linear.InOut, true).onComplete.add(function() {this.checkLevel(); }, this);
				}
			} else if (x==-1 && y==0) { //left
				if (e.x == hero.x-30 && e.y == hero.y) {
					game.add.tween(e).to({x: e.x + x * 30, y: e.y + y * 30}, 250, Phaser.Easing.Linear.InOut, true).onComplete.add(function() {this.checkLevel(); }, this);
				}
			} else if (x==1 && y==0) { //right
				if (e.x == hero.x+30 && e.y == hero.y) {
					game.add.tween(e).to({x: e.x + x * 30, y: e.y + y * 30}, 250, Phaser.Easing.Linear.InOut, true).onComplete.add(function() {this.checkLevel(); }, this);
				}
			}
		}, this);
	},
	killLevel: function() { 
		places.forEach(function(e) {
			game.add.tween(e).to({x:'-300'}, 300, Phaser.Easing.Linear.In).start(); }, this);
		boxes.forEach(function(e) {
			game.add.tween(e).to({x:'-300'}, 300, Phaser.Easing.Linear.In).start(); }, this);
		elements.forEach(function(e) {
			game.add.tween(e).to({x:'-300'}, 300, Phaser.Easing.Linear.In).start(); }, this);
		game.add.tween(hero).to({x:'-300'}, 300, Phaser.Easing.Linear.In).start();
	},
	drawLevel: function(number) {

		switch (number) {
			case 1: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level1[i][j]; level_bkg[i][j]=level1_bkg[i][j]; } } break; }
			case 2: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level2[i][j]; level_bkg[i][j]=level2_bkg[i][j]; } } break; }
			case 3: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level3[i][j]; level_bkg[i][j]=level3_bkg[i][j]; } } break; }
			case 4: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level4[i][j]; level_bkg[i][j]=level4_bkg[i][j]; } } break; }
			case 5: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level5[i][j]; level_bkg[i][j]=level5_bkg[i][j]; } } break; }
			case 6: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level6[i][j]; level_bkg[i][j]=level6_bkg[i][j]; } } break; }
			case 7: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level7[i][j]; level_bkg[i][j]=level7_bkg[i][j]; } } break; }
			case 8: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level8[i][j]; level_bkg[i][j]=level8_bkg[i][j]; } } break; }
			case 9: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level9[i][j]; level_bkg[i][j]=level9_bkg[i][j]; } } break; }
			case 10: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=level10[i][j]; level_bkg[i][j]=level10_bkg[i][j]; } } break; }
			case 11: { for (i=0;i<10;i++){ for (j=0;j<10;j++){ level[i][j]=levelend[i][j]; level_bkg[i][j]=levelend_bkg[i][j]; }} 
				game.time.events.add(Phaser.Timer.SECOND * 1, function() {game.state.start('End');}, this);
				break; }
		}
		elements = game.add.group();
		for (var i=0; i<10; i++) {
			for (var j=0; j<10; j++) {
				if (level_bkg[j][i] == 1) {
					var tile = game.add.sprite(i*30+300,j*30+const_align, 'tiles');
					tile.frame = 0;
					elements.add(tile);
				} else if (level_bkg[j][i] == 2) {
					var tile = game.add.sprite(i*30+300,j*30+const_align, 'tiles');
					tile.frame = 1;
					elements.add(tile);
				}
			}
		}
		places = game.add.group();
		boxes = game.add.group();
		for (var i=0; i<10; i++) {
			for (var j=0; j<10; j++) {
				if (level[j][i] == 3) { //wall
					var tile = game.add.sprite(i*30+300,j*30+const_align, 'tiles');
					tile.frame = 2;
					elements.add(tile);
				} else if (level[j][i] == 5) { //place
					var tile = game.add.sprite(i*30+300,j*30+const_align, 'tiles');
					tile.frame = 4;
					places.add(tile);
				} else if (level[j][i] == 4) { //box
					var til = game.add.sprite(i*30+300,j*30+const_align, 'tiles');
					til.frame = 3;
					boxes.add(til);
					til.moveUp();
				} else if (level[j][i] == 6) { //hero
					hero = game.add.sprite(i*30+300,j*30+const_align, 'tiles');
					hero.frame = 5;
				}
			}
		}
		this.checkLevel();
		places.forEach(function(e) {
			game.add.tween(e).to({x:'-300'}, 300, Phaser.Easing.Linear.In).start(); }, this);
		boxes.forEach(function(e) {
			game.add.tween(e).to({x:'-300'}, 300, Phaser.Easing.Linear.In).start(); }, this);
		elements.forEach(function(e) {
			game.add.tween(e).to({x:'-300'}, 300, Phaser.Easing.Linear.In).start(); }, this);
		game.add.tween(hero).to({x:'-300'}, 300, Phaser.Easing.Linear.In, true).onComplete.add(function() { hero.isMoving = false; can_move = true; can_change = true; can_restart = true;}, this);
	},
}

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameDiv');
game.state.add('Boot', Boot);
game.state.add('Load', Load);
game.state.add('Controls', Controls);
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('End', End);
game.state.start('Boot');




