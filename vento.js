const connection = require('./connection');

let vetor = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

const vento = async(data) =>{
    let query = []
    let day

    for (let index = 0; index < vetor.length; index++) {

      day = await connection.execute(' SELECT '+
                                                    'T.VEL_VENTO AS VELOCIDADE_DO_VENTO '+
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
        
        if (day[0][0] == undefined){
                
                query.push("0.00")
        }else{
                query.push((day[0][0]['VELOCIDADE_DO_VENTO']).toFixed(2))
        } 
        }
        

    return query;

}

module.exports = vento;