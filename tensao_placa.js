const connection = require('./connection');

let vetor = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]


const TENSAO_PLACA = async(data) =>{
    let query = []
    let ten,sum = 0,aux

    for (let index = 0; index < vetor.length; index++) {

      ten = await connection.execute(' SELECT '+
                                                    'T.TENSAO_PLACA AS TENSAO_PLACA '+
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
                                            
        if (ten[0][0] == undefined){
                query.push("0.00")
        }else{
                query.push((ten[0][0]['TENSAO_PLACA']).toFixed(2))
                aux = parseInt((ten[0][0]['TENSAO_PLACA']).toFixed(2))
                sum = sum + aux
        } 
        }
    return (sum/query.length).toFixed(2);

}

module.exports = TENSAO_PLACA;