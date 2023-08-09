import moment from "moment/moment";

function aplicarMascaraDataISO(data) {
    if(data){

        return moment(data).locale('pt-br').format('DD/MM/YYYY');

    } 
    return undefined;

}

function aplicarMascaraDataHoraISO(data) {
    if(data){

        return moment(data).locale('pt-br').format('DD/MM/YYYY HH:mm:ss');

    } 
    return undefined;

}

function aplicarMascaraISOFormatoAmericano(data) {
    if(data){

        let dataAmericana = moment(data).locale('pt-br').format('YYYY/MM/DD HH:mm:ss');
        return dataAmericana + "T00:00:00";

    } 
    return undefined;

}

export default {
    aplicarMascaraDataISO,
    aplicarMascaraDataHoraISO,
    aplicarMascaraISOFormatoAmericano
}