import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/lesson3.tact',
    options: {
        debug: true,
    },
};
