import "@stdlib/deploy";

/*message Deploy {
    queryId: Int as uint64;
}

message DeployOk {
    queryId: Int as uint64;
}

trait Deployable {
    receive(deploy: Deploy) {
        self.notify(DeployOk{queryId: deploy.queryId}.toCell());
    }
}*/

message Add {
    amount: Int as uint32;
}

contract FirstContract with Deployable {

    id: Int as uint32;
    counter: Int as uint32; // max 2**32 == 4294967296
    

    // Empty lesson1() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //
    init(id: Int) {
        self.id = id;
        self.counter = 0;
    }

    receive("increment"){
        self.counter = self.counter + 1;
    }

    receive(msg: Add){
        self.counter = self.counter + msg.amount;
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int {
        return self.id;
    }
}
