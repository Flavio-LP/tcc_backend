const connection = require('./connection');

let vetor = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]


const CORRENTE_TURBINA = async(data) =>{
    let query = []
    let cor,sum = 0,aux

    for (let index = 0; index < vetor.length; index++) {

      cor = await connection.execute(' SELECT '+
                                                    'T.CORRENTE_TURBINA AS CORRENTE_TURBINA '+
                                            'FROM ' +
                                                    'projeto_tcc T' +
                                            ' WHERE '+
                                                    'date_format(T.DATA_CAPTURA, "%d/%m/%Y") = "' + data +'"' +
                                            ' AND '+
                                                   'date_format(T.DATA_CAPTURA, "%H:%i")'+ 
                                            '='+
                                                '( SELECT' +
                                                        ' '+ vetor[index] +' '+ 
                                                'FROM ' +	
                                                        'projeto_tcc P' +
                                                ' WHERE ' +
                                                        'date_format(P.DATA_CAPTURA, "%d/%m/%Y") = "' + data +'"' +
                                                ' LIMIT 1'+
                                                ' )'+
                                            ' LIMIT '+ 
                                                    '1 '
                                            ) 
                                            
        if (cor[0][0] == undefined){
                query.push("0.00")
        }else{
                query.push((cor[0][0]['CORRENTE_TURBINA']))
                aux = parseInt((cor[0][0]['CORRENTE_TURBINA']))
                sum = sum + aux
        } 
        }
    return (sum/query.length).toFixed(2);

}

module.exports = CORRENTE_TURBINA;
