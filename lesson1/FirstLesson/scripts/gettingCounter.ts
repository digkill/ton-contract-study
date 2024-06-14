import { FirstContract } from '../wrappers/FirstContract';
import { NetworkProvider } from '@ton/blueprint';
export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(await FirstContract.fromInit(53465464n));
    
    const counter = await firstContract.getCounter()
    const id = await firstContract.getId()

    console.log(`Counter - ${counter}; Id - ${id}`)

}