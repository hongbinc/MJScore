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

    public player1ScoreInput: any;
    public player2ScoreInput: any;
    public player3ScoreInput: any;
    public player4ScoreInput: any;

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

        let localStorageData = localStorage.getItem('MJScoreData');

        if (localStorageData) {
            this.playerScoreData = JSON.parse(localStorage.getItem('MJScoreData'));
        }

        this.initForm();

        this.player1ScoreInput = this.scoreInputForm.controls['player1Score'];
        this.player2ScoreInput = this.scoreInputForm.controls['player2Score'];
        this.player3ScoreInput = this.scoreInputForm.controls['player3Score'];
        this.player4ScoreInput = this.scoreInputForm.controls['player4Score'];

        // this.playerScoreData = [{
        //     player1Score: -12,
        //     player2Score: -12,
        //     player3Score: -12,
        //     player4Score: 36
        // }, {
        //     player1Score: -12,
        //     player2Score: -12,
        //     player3Score: -12,
        //     player4Score: 36
        // }]

        if (this.playerScoreData.length > 0) {
            this.playerScoreData.forEach(score => {
                this.playerOneTotalScore = this.playerOneTotalScore + score.player1Score;
                this.playerTwoTotalScore = this.playerTwoTotalScore + score.player2Score;
                this.playerThreeTotalScore = this.playerThreeTotalScore + score.player3Score;
                this.playerFourTotalScore = this.playerFourTotalScore + score.player4Score;
            });
        }
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
        if (!value || value < 0) return;


        value = Number(value);

        if (player === "1") {
            this.inputScores.player1Score = 3 * value;
            this.inputScores.player2Score = -value;
            this.inputScores.player3Score = -value;
            this.inputScores.player4Score = -value;

            this.player2ScoreInput.setValue(-value);
            this.player3ScoreInput.setValue(-value);
            this.player4ScoreInput.setValue(-value);
        } else if (player === "2") {
            this.inputScores.player1Score = -value;
            this.inputScores.player2Score = 3 * value;
            this.inputScores.player3Score = -value;
            this.inputScores.player4Score = -value;

            this.player1ScoreInput.setValue(-value);
            this.player3ScoreInput.setValue(-value);
            this.player4ScoreInput.setValue(-value);
        } else if (player === "3") {
            this.inputScores.player1Score = -value;
            this.inputScores.player2Score = -value;
            this.inputScores.player3Score = 3 * value;
            this.inputScores.player4Score = -value;

            this.player1ScoreInput.setValue(-value);
            this.player2ScoreInput.setValue(-value);
            this.player4ScoreInput.setValue(-value);
        } else if (player === "4") {
            this.inputScores.player1Score = -value;
            this.inputScores.player2Score = -value;
            this.inputScores.player3Score = -value;
            this.inputScores.player4Score = 3 * value;

            this.player1ScoreInput.setValue(-value);
            this.player2ScoreInput.setValue(-value);
            this.player3ScoreInput.setValue(-value);
        }
    }

    resetInputScore() {
        this.player1ScoreInput.setValue('');
        this.player2ScoreInput.setValue('');
        this.player3ScoreInput.setValue('');
        this.player4ScoreInput.setValue('');
    }

    formInput() {

    }

    saveScores() {

        let player1 = this.scoreInputForm.value.player1Score;
        let player2 = this.scoreInputForm.value.player2Score;
        let player3 = this.scoreInputForm.value.player3Score;
        let player4 = this.scoreInputForm.value.player4Score;

        if (!player1 || !player2 || !player3 || !player4) {
            return;
        }

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

        localStorage.setItem('MJScoreData', JSON.stringify(this.playerScoreData));
        console.log("Data", this.playerScoreData)
        this.resetInputScore();
    }

    gameReset() {
        localStorage.removeItem('MJScoreData');
        this.playerScoreData = [];
        this.playerOneTotalScore = 0;
        this.playerTwoTotalScore = 0;
        this.playerThreeTotalScore = 0;
        this.playerFourTotalScore = 0;
    }

    onSubmit({ value }) {

    }
}
