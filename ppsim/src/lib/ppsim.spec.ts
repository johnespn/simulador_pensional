import test from 'ava';
import { moneyToStock, profitPerWeek as profitPerWeekPerStockAmount , TOTAL_ACCIONES, ARRIENDO, SEMANAS_X_MES, holderFn, operarPeriodo as reducePeriod, STOCK_VALUE, } from './ppsim';

test('moneyToStock', t => {
    t.is(0, moneyToStock(123)(0) )
    t.is(10, moneyToStock(1)(10))
    t.is(0.1, moneyToStock(5000)(500))
});

test('profit', t => {
    t.is(0, profitPerWeekPerStockAmount(0))
    t.is(53, Math.round(profitPerWeekPerStockAmount(1)))
    t.is( (ARRIENDO / SEMANAS_X_MES ) / 2 , profitPerWeekPerStockAmount(TOTAL_ACCIONES / 2))
    t.is(ARRIENDO / SEMANAS_X_MES, profitPerWeekPerStockAmount(TOTAL_ACCIONES))
});

test('operarPeriodo', t => {
    const zero = holderFn(0,0,0)
    const firstWeekMarker = holderFn(1,0,0)
    const firstWeekResult = holderFn(1,1,0)
    t.deepEqual(firstWeekResult, reducePeriod(zero, firstWeekMarker))

    const profitOneWeekOneStock = profitPerWeekPerStockAmount(1)
    t.is(52.972283005105766, profitOneWeekOneStock)
    const oneWeekToStock = moneyToStock(STOCK_VALUE)(profitOneWeekOneStock)
    t.is(0.0017283950617283952,oneWeekToStock)
    
    const secondWeekMarker = holderFn(2,0,0)
    const secondWeekResult = holderFn(2,2.0017283950617283952,profitOneWeekOneStock)
    t.deepEqual(secondWeekResult, reducePeriod(firstWeekResult, secondWeekMarker))
    
});


