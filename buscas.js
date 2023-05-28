const connection = require('./connection');

let vetor = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]


const buscas = async(data) =>{
    let query = []
    let day

    for (let index = 0; index < vetor.length; index++) {

      day = await connection.execute(' SELECT '+
                                                    'T.IRR_SOLAR AS IRRADIACAO_SOLAR_PLACA '+
                                            'FROM ' +
                                                    'projeto_tcc T' +
                                            ' WHERE '+
                                                    'date_format(T.DATA_CAPTURA, "%d/%m/%Y") = "' +data +'"' +
                                            ' AND '+
                                                   'date_format(T.DATA_CAPTURA, "%H:%i")'+ 
                                            '='+
                                                '( SELECT' +
                                                        ' '+ vetor[index] +' '+ 
                                                'FROM ' +	
                                                        'projeto_tcc P' +
                                                ' WHERE ' +
                                                        'date_format(P.DATA_CAPTURA, "%d/%m/%Y") = "' +data +'"' +
                                                ' LIMIT 1'+
                                                ' )'+
                                            ' LIMIT '+ 
                                                    '1 '
                                                    )
        if (day[0][0] == undefined || day[0][0] == null){
                
                query.push("0.00")
        }else{
                if(day[0][0]['IRRADIACAO_SOLAR_PLACA'] == null){
                query.push("0.00")
                }else{
                        query.push((day[0][0]['IRRADIACAO_SOLAR_PLACA']).toFixed(2))
                }
                
        } 
        }
    return query;

}

module.exports = buscas;
