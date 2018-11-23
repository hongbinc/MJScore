import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerScore } from './score-form.model';

@Component({
    selector: 'app-score-form',
    templateUrl: './score-form.component.html',
    styleUrls: ['./score-form.component.less']
})

export class ScoreFormComponent implements OnInit {

    public playerScoreData: PlayerScore[] = [];
    public scoreInputForm: FormGroup;

    public playerOneTotalScore: number = 0;
    public playerTwoTotalScore: number = 0;
    public playerThreeTotalScore: number = 0;
    public playerFourTotalScore: number = 0;

    private inputScores: PlayerScore = {
        player1Score: 0,
        player2Score: 0,
        player3Score: 0,
        player4Score: 0
    }

    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.initForm();

        this.playerScoreData = [{
            player1Score: -12,
            player2Score: -12,
            player3Score: -12,
            player4Score: 36
        }, {
            player1Score: -12,
            player2Score: -12,
            player3Score: -12,
            player4Score: 36
        }]
    }

    public defaultScoreModel() {
        return {
            player1Score: 0,
            player2Score: 0,
            player3Score: 0,
            player4Score: 0
        }
    }

    public initForm() {
        this.scoreInputForm = this.fb.group({
            player1Score: ['', []],
            player2Score: ['', []],
            player3Score: ['', []],
            player4Score: ['', []]
        });
    }

    onInputChange(player, value) {
        if (!value) return;


        value = Number(value);

        if (player === "1") {
            this.inputScores.player1Score = value;
            this.inputScores.player2Score = -value;
            this.inputScores.player3Score = -value;
            this.inputScores.player4Score = -value;

            this.scoreInputForm.controls['player2Score'].setValue(-value);
            this.scoreInputForm.controls['player3Score'].setValue(-value);
            this.scoreInputForm.controls['player4Score'].setValue(-value);
        } else if (player === "2") {
            this.inputScores.player1Score = -value;
            this.inputScores.player2Score = value;
            this.inputScores.player3Score = -value;
            this.inputScores.player4Score = -value;

            this.scoreInputForm.controls['player1Score'].setValue(-value);
            this.scoreInputForm.controls['player3Score'].setValue(-value);
            this.scoreInputForm.controls['player4Score'].setValue(-value);
        } else if (player === "3") {
            this.inputScores.player1Score = -value;
            this.inputScores.player2Score = -value;
            this.inputScores.player3Score = value;
            this.inputScores.player4Score = -value;

            this.scoreInputForm.controls['player1Score'].setValue(-value);
            this.scoreInputForm.controls['player2Score'].setValue(-value);
            this.scoreInputForm.controls['player4Score'].setValue(-value);
        } else if (player === "4") {
            this.inputScores.player1Score = -value;
            this.inputScores.player2Score = -value;
            this.inputScores.player3Score = -value;
            this.inputScores.player4Score = value;

            this.scoreInputForm.controls['player1Score'].setValue(-value);
            this.scoreInputForm.controls['player2Score'].setValue(-value);
            this.scoreInputForm.controls['player3Score'].setValue(-value);
        }
    }

    resetInputScore() {
        this.scoreInputForm.controls['player1Score'].setValue('');
        this.scoreInputForm.controls['player2Score'].setValue('');
        this.scoreInputForm.controls['player3Score'].setValue('');
        this.scoreInputForm.controls['player4Score'].setValue('');
    }

    formInput() {

    }

    saveScores() {
        console.log("save", this.inputScores)
        let scores = this.defaultScoreModel();
        scores.player1Score = this.inputScores.player1Score;
        scores.player2Score = this.inputScores.player2Score; 
        scores.player3Score = this.inputScores.player3Score; 
        scores.player4Score = this.inputScores.player4Score;
        
        this.playerScoreData.push(scores);

        this.playerOneTotalScore = this.playerOneTotalScore + this.inputScores.player1Score;
        this.playerTwoTotalScore = this.playerTwoTotalScore + this.inputScores.player2Score;
        this.playerThreeTotalScore = this.playerThreeTotalScore + this.inputScores.player3Score;
        this.playerFourTotalScore = this.playerFourTotalScore + this.inputScores.player4Score;

        console.log("Data", this.playerScoreData)
        this.resetInputScore();
    }

    onSubmit({ value }) {

    }
}
