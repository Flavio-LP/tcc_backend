const connection = require('./connection');

let vetor = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]


const POTENCIA_TURBINA = async(data) =>{
    let query = []
    let pot,sum = 0, aux

    for (let index = 0; index < vetor.length; index++) {

      pot = await connection.execute(' SELECT '+
                                                    'T.POTENCIA_TURBINA AS POTENCIA_TURBINA '+
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
        if (pot[0][0] == undefined){
                query.push("0.00")
        }else{
                query.push((pot[0][0]['POTENCIA_TURBINA']))
                aux = parseInt((pot[0][0]['POTENCIA_TURBINA']))
                sum = sum + aux
        } 
        }

    return sum/query.length;

}

module.exports = POTENCIA_TURBINA;