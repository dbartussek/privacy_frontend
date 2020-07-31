import Connection from "@/lib/Connection";
import {RoundData} from "@/lib/RoundData";

export enum PlayerState {
    Answer,
    Guess,
    Waiting,
}

export default class Game {
    players: Array<string> = [];
    has_answered: Array<string> = [];

    rounds: Array<RoundData> = [];

    connection: Connection;

    playerState = PlayerState.Waiting;

    currentQuestion = '';

    refreshCallback?: () => void;

    public constructor(connection: Connection) {
        this.connection = connection;

        connection.handlePoseQuestion = (message) => {
            this.playerState = PlayerState.Answer;
            this.currentQuestion = message.question;
            this.refresh();
        };
        connection.handlePlayerList = (message) => {
            this.players = message.players;
            this.has_answered = message.has_answered;
            this.refresh();
        };
        connection.handleRoundData = (message) => {
            this.rounds.unshift(message.data);
            this.refresh();
        }
    }

    public answer(yes: boolean) {
        if (this.playerState == PlayerState.Answer) {
            this.connection.sendAnswer(yes);
            this.playerState = PlayerState.Guess;
        }

        this.refresh();
    }
    public guess(number: string) {
        if (this.playerState == PlayerState.Guess) {
            this.connection.sendGuess(number);
            this.playerState = PlayerState.Waiting;
        }

        this.refresh();
    }

    private refresh() {
        if (this.refreshCallback) {
            (this.refreshCallback)()
        }
    }
}
