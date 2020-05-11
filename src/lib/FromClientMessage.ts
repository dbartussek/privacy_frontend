
export interface Initialize {
    name: string;
}

export interface Answer {
    yes: boolean;
}

export interface Guess {
    number: string;
}

export default interface FromClientMessage {
    Initialize?: Initialize;
    Answer?: Answer;
    Guess?: Guess;
}
