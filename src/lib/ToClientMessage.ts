import {RoundData} from "@/lib/RoundData";

export interface PlayerList {
    players: Array<string>;
}

export interface RoundDataMessage {
    data: RoundData;
}

export interface PoseQuestion {
    question: string;
}

export default interface ToClientMessage {
    PlayerList?: PlayerList;
    RoundData?: RoundDataMessage;
    PoseQuestion?: PoseQuestion;
}
