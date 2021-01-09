import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.css']
})
export class DiceGameComponent implements OnInit {

  scores: any =[];
  roundScore: any; 
  activePlayer: number;
  prevDiceRoll: any;
  gamePlaying: boolean;
  diceHide: boolean;
  dice1: number;
  dice2: number;
  score: number = 0;
  PlayerOneScore: number = 0;
  playerTwoScore: number = 0;
  winningScore: any;
  playerOneName: string = "PLAYER 1";
  playerTwoName: string = "PLAYER 2";

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  // Function that initializes the game
    init() {

      // Setting the 'gamePlaying' variable to 'true' 
      this.gamePlaying = true;

      // Setting the 'diceHide' variable to 'false'
      this.diceHide = false;

      // Setting both scores back to 0
      this.scores = [0,0];

      // Setting the activePlayer back to being 'Player 1'
      this.activePlayer = 0;

      // Setting the roundScore back to 0
      this.roundScore = 0;

      this.playerOneName = "PLAYER 1";
      this.playerTwoName = "PLAYER 2";
      this.PlayerOneScore = 0;
      this.playerTwoScore = 0;
    }

  rollDice() {

     // Checking if the game is being played
    if(this.gamePlaying) {

    // Create two random numbers for the dices
    this.dice1 = Math.floor(Math.random() * 6) + 1;
    this.dice2 = Math.floor(Math.random() * 6) + 1;

    this.diceHide = true;

    if(this.dice1 === 6 && this.prevDiceRoll === 6) {
      // Player looses his entire score
      this.scores[this.activePlayer] = 0;

      this.scores.forEach(element => {
        if (element == 0) {
          this.PlayerOneScore = 0;
        }else if(element == 1){
          this.playerTwoScore = 0;
        }
      });
      // this.score = 0;
      this.nextPlayer();

  // Update the round score if the rolled number was not a 1 
  } else if (this.dice1 !== 1 && this.dice2 !== 1) {
      // Add score if the dice number is different from 1
      this.roundScore += this.dice1 + this.dice2;
  } else {
      // Next player's turn  
      this.nextPlayer();
  }

  // Saving the previous dice roll on a variable 
  this.prevDiceRoll = this.dice1;
 

    }

  }

  diceHold() {

    if (this.gamePlaying) {
      // this.scores[this.activePlayer] += this.roundScore;
      if(this.activePlayer == 0) {
        this.PlayerOneScore += this.roundScore;
      }else if(this.activePlayer == 1) {
        this.playerTwoScore += this.roundScore;
      }
 
      this.winningScore = 50;

      if (this.PlayerOneScore >= this.winningScore || this.playerTwoScore >= this.winningScore) {
          if (this.activePlayer == 0) {
            this.playerOneName = 'Winner!';
            this.diceHide = false;
            this.gamePlaying = false;
          } else if(this.activePlayer == 1) {
            this.playerTwoName = 'Winner!';
            this.diceHide = false;
            this.gamePlaying = false;
          }
      } else {
        this.nextPlayer();
      }
    }
  }

  nextPlayer() {
    this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
    this.roundScore = 0;
    this.diceHide = false;

  }



}
