import { toNano } from '@ton/core';
import { Company } from '../wrappers/Company';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const company = provider.open(await Company.fromInit());

    await company.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(company.address);

    // run methods on `company`
}
