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

export default {
    aplicarMascaraDataISO,
    aplicarMascaraDataHoraISO
}