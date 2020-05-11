import ToClientMessage, {PlayerList, PoseQuestion, RoundDataMessage} from "@/lib/ToClientMessage";
import FromClientMessage from "@/lib/FromClientMessage";

export default class Connection {
    private socket: WebSocket;
    public name: string;

    public handlePlayerList?: (l: PlayerList) => void = undefined;
    public handleRoundData?: (l: RoundDataMessage) => void = undefined;
    public handlePoseQuestion?: (l: PoseQuestion) => void = undefined;

    private constructor(socket: WebSocket, name: string) {
        this.socket = socket;
        this.name = name;
    }

    static async connect(
        address: string,
        name: string,
    ): Promise<Connection> {
        // The center piece
        const socket = new WebSocket(address);

        // Once the socket has been opened, resolve this promise
        let resolve_socket_open_promise!: (value: WebSocket) => void;
        const socket_open_promise: Promise<WebSocket> = new Promise(r => {
            resolve_socket_open_promise = r;
        });
        socket.onopen = () => {
            resolve_socket_open_promise(socket);
        };

        const connection = new Connection(socket, name);

        socket.onmessage = event => {
            const data: ToClientMessage = JSON.parse(event.data);
            console.log(data);

            if (data.PlayerList && connection.handlePlayerList) {
                (connection.handlePlayerList)(data.PlayerList);
            }
            if (data.RoundData && connection.handleRoundData) {
                (connection.handleRoundData)(data.RoundData);
            }
            if (data.PoseQuestion && connection.handlePoseQuestion) {
                (connection.handlePoseQuestion)(data.PoseQuestion);
            }
        };

        await socket_open_promise;

        connection.sendMessage({
            Initialize: {
                name,
            }
        });

        return connection;
    }

    sendMessage(message: FromClientMessage) {
        this.socket.send(JSON.stringify(message));
    }

    sendAnswer(yes: boolean) {
        this.sendMessage({
            Answer: {
                yes,
            }
        })
    }
    sendGuess(number: string) {
        this.sendMessage({
            Guess: {
                number,
            }
        })
    }
}
