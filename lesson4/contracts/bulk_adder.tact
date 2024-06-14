import "@stdlib/deploy";

message Reach {
    counter: Address;
    target: Int as uint32;
}

message CounterValue {
    amount: Int as uint32;
}

contract BulkAdder with Deployable {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //
    target: Int as uint32;
    init() {
        self.target = 0;
    }

    // step 1
    receive(msg: Reach){
        self.target = msg.target; // 5
        send(SendParameters{
            to: msg.counter,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: "query".asComment()
        });
    }

    // step 3
    receive(msg: CounterValue){
        if(self.target>msg.amount){
            send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: "increment".asComment()
            });
        }
    }
}
