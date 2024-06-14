import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/bulk_adder.tact',
    options: {
        debug: true,
    },
};
