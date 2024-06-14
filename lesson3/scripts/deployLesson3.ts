import { toNano } from '@ton/core';
import { Lesson3 } from '../wrappers/Lesson3';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const lesson3 = provider.open(await Lesson3.fromInit());

    await lesson3.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(lesson3.address);

    // run methods on `lesson3`
}
