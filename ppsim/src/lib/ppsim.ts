export const SEMANAS_X_MES = (30/7)
export const APORTE = 0.16
export const SMLV = 828116
export const ARRIENDO = SMLV
export const VIS = 50000000 
export const APORTE_MES = SMLV * APORTE
export const ANOS_PARA_PROPIETARIO = VIS/(APORTE_MES*12)
export const TOTAL_ACCIONES = Math.round((VIS/APORTE_MES*52/12))
export const STOCK_VALUE = VIS / TOTAL_ACCIONES

export type holder = { week:number, stock:number, profit:number }

export const holderFn = (_week:number,_stock:number,_profit:number):holder => {
    return { week:_week, stock:_stock, profit:_profit }
}

export const moneyToStock = (moneyPerStock:number) => (money:number) => 
    money === 0 ? 0 : money / moneyPerStock

export const profitPerWeek = (ACCIONES_POSEIDAS: number) => 
        ACCIONES_POSEIDAS === 0 
            ? 0 
            : ( (ARRIENDO / SEMANAS_X_MES) / TOTAL_ACCIONES ) * ACCIONES_POSEIDAS 

export const operarPeriodo = (acc:holder,current:holder) => {
    if(acc.week === 0 )return holderFn(1,1,0)
    
    const totalOwner = acc.stock >= TOTAL_ACCIONES 
    const interes = ( TOTAL_ACCIONES - acc.stock ) * STOCK_VALUE * (0.006 / SEMANAS_X_MES  )
    const r = Math.round
    if(!totalOwner) console.log(`${r(acc.week)} - ${r(acc.stock)} - ${r(acc.profit)} - ${r(interes)}`)
    const currentProfit = profitPerWeek(acc.stock)
    return totalOwner
            ? acc 
            : holderFn( 
                    current.week, 
                    //this will depend if the week is sequentially next otherwise this may vary
                    acc.stock + 1 + moneyToStock(STOCK_VALUE)( currentProfit ) , 
                    currentProfit 
                )
    }

export function startSim(): void {
    console.error('Iniciando PPSIM');

    console.log(`Valor de SMLV ${SMLV}`)
    console.log(`APORTE X MES ${APORTE_MES} `)
    console.log(`Valor VIS ${VIS}`)

    console.log(`Propietario en: ${ANOS_PARA_PROPIETARIO} anos`);
    console.log(`Numero de acciones/semanas: ${TOTAL_ACCIONES} `)
    
    //Tarea, simular un rendimiento progresivo aplicado a recompra de acciones
    const WEEKS_ARRAY = [...Array(TOTAL_ACCIONES).keys()]
    //
    // const savings = () => SMLV / 10

    //{ acciones: 0, rendimiento: 0} , { acciones: 4, rendimiento: $1000 }, { acciones: 8.001, rendimiento: $20010 } 
    const SIM = WEEKS_ARRAY
        .map( x => holderFn(x,0,0) )
        .reduce( operarPeriodo )
    
    console.log(SIM);

    console.log(`Propietario con utilidad en 
        ${SIM.week} semanas = 
        ${SIM.week/SEMANAS_X_MES} meses = 
        ${SIM.week/SEMANAS_X_MES/12} anos`);
    
    
}