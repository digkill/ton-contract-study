import "@stdlib/deploy";

contract SendTon with Deployable {

    owner: Address;
    init() {
        self.owner = sender();
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
        require(sender() == self.owner, "only owner is allowed to withdraw");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    get fun balance(): String{
        return myBalance().toCoinsString();
    }
    
    
    //bounced()

}
