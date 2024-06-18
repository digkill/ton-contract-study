import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Item } from '../wrappers/Item';
import '@ton/test-utils';
import { Item2 } from '../build/Item/tact_Item2';
import { Item3 } from '../build/Item/tact_Item3';

describe('Item', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let item: SandboxContract<Item>;
    let item2: SandboxContract<Item2>;
    let item3: SandboxContract<Item3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        item = blockchain.openContract(await Item.fromInit());
        item2 = blockchain.openContract(await Item2.fromInit());
        item3 = blockchain.openContract(await Item3.fromInit(1n));

        deployer = await blockchain.treasury('deployer');

        let deployResult = await item.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: item.address,
            deploy: true,
            success: true,
        });

        deployResult = await item2.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: item2.address,
            deploy: true,
            success: true,
        });

        deployResult = await item3.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: item3.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and item are ready to use
    });

    it("should return addresses", async()=>{
        const firstAddress = await item.getMyAddress()
        const secondAddress = await item2.getMyAddress()

        const otherAddress1 = await item2.getOtherAddress()
        const otherAddress2 = await item.getOtherAddress()

        expect(firstAddress).toEqualAddress(otherAddress1)
        expect(secondAddress).toEqualAddress(otherAddress2)

        console.log("firstAddress - ", firstAddress)
        console.log("otherAddress1 - ", otherAddress1)

        console.log("secondAddress - ", secondAddress)
        console.log("otherAddress2 - ", otherAddress2)
    });

    it("should deploy new contract", async()=>{
        const deployer = await blockchain.treasury('deployer');
        const notExistAddress = await item3.getOtherAddress(14n);

        console.log("notExistAddress - ", notExistAddress)

        await item3.send(deployer.getSender(), {
            value: toNano("0.2")
        }, {
            $$type: `DeployContract`,
            id: 14n
        })

        const newItem = blockchain.openContract(await Item3.fromInit(14n));
        const newItemAddress = await newItem.getMyAddress()

        console.log("newItemAddress - ", notExistAddress)

        const id = await newItem.getId()

        console.log("id - ", id)
    })
});
