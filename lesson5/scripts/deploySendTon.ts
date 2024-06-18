import { toNano } from '@ton/core';
import { SendTon } from '../wrappers/SendTon';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sendTon = provider.open(await SendTon.fromInit());

    await sendTon.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sendTon.address);

    // run methods on `sendTon`
}
