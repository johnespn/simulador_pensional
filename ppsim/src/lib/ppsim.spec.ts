import test from 'ava';
import { startSim } from './ppsim';

test('start', t => {
    t.notThrows(startSim);
});
