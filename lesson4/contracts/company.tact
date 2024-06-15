import "@stdlib/deploy";

message Deposit{
    amount: Int as uint32;
    queryId: Int as uint32;
}

contract Company with Deployable {

    balance: Int as uint256;

    init() {
        self.balance = 0;
    }

    receive(msg: Deposit){
        self.balance = self.balance + msg.amount;
    }

    get fun balance(): Int {
        return self.balance;
    }
}
