import { toNano } from '@ton/core';
import { Fund } from '../wrappers/Fund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const fund = provider.open(await Fund.fromInit());

    await fund.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(fund.address);

    // run methods on `fund`
}
