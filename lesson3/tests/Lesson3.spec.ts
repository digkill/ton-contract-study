import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Lesson3 } from '../wrappers/Lesson3';
import '@ton/test-utils';

describe('Lesson3', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lesson3: SandboxContract<Lesson3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        lesson3 = blockchain.openContract(await Lesson3.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await lesson3.send(
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
            to: lesson3.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and lesson3 are ready to use
    });
});
