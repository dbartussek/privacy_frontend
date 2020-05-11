
export interface RoundData {
    question: string;

    yes: number;
    no: number;

    guesses: {[key: string]: string};
}
