import "@stdlib/deploy";

message Withdraw{
    amount: Int as coins;
}

contract SendTon with Deployable {

    const MinTonForStorage: Int = ton("0.01"); // 1 KB for 2.5 year
    owner: Address;
    init() {
        self.owner = sender();
    }

    fun onlyOwner(){
        require(sender() == self.owner, "only owner is allowed to withdraw");
    }

    receive(){
        /*send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendIgnoreErrors,
            bounce: true,
            body: "Hey".asComment(),
            // init:
            // code:
        });*/
        
        // self.reply("Hey").asComment());

        /*
        context().bounced // true/false
        context().sender // sender()
        context().value // income value in TON
        context().raw // Slice of data
        */

        // accept incoming TON transfers
    } 

    receive("withdraw all"){
        self.onlyOwner();
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    receive("withdraw safe"){
        self.onlyOwner();
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: myBalance() - context().value - self.MinTonForStorage,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    receive(msg: Withdraw){
        self.onlyOwner();
        let amount: Int = min(msg.amount, myBalance() - context().value - self.MinTonForStorage);
        require(amount>0, "Insufficient balance");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amount,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    get fun balance(): Int{
        return myBalance();
    }
    
    
    //bounced()

}
