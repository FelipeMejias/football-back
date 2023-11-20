//baseURL: 'https://football-back.herokuapp.com'
import axios from "axios";
import { back_aposta, back_apostas, back_atualizacaoMinhasApostas, back_classif, back_comparar, back_escanteios, back_favoritos, back_guru, back_marcaprimeiro, back_mediagols, back_minhasApostas, back_minhasCombs, back_partida, back_partidasgerais, back_placar, back_primeirogol, back_times, back_ultimogol } from "./back/rotas";
const api = axios.create({
  //baseURL:'http://localhost:4000'
  baseURL: 'https://foottball-back.onrender.com'
});


export function getTemposPrimeiro(camp,estadia){
    return back_primeirogol(camp,estadia)
};
export function getTemposUltimo(camp,estadia){
    return back_ultimogol(camp,estadia)
};
export function getTotaisPlacar(camp,metade,estadia){
    return back_placar(camp,metade,estadia)
};
export function getTotaisGols(camp,metade,estadia){
    return back_mediagols(camp,metade,estadia)
};
export function getEscanteios(camp,estadia){
    return back_escanteios(camp,estadia)
};
export function getMarcaPrimeiro(camp,estadia){
    return back_marcaprimeiro(camp,estadia)
};
export function getClassificacao(camp,rodada){
    return back_classif(camp,rodada)
};
export function getComparacao(camp,handicap){
    return back_comparar(camp,handicap)
};
export function getTime(camp,selected){
    return back_times(camp,selected)
};
export function getGuru(camp,mandante,visitante){
    return back_guru(camp,mandante,visitante)
};
export function getPartida(jogo,camp){
    return back_partida(camp,jogo)
};
export function getPartidas(){
    return back_partidasgerais()
};
export function getAposta(codigo){
    return back_aposta(codigo)
};
export function getApostas(pageBet){
    return back_apostas(pageBet)
};
export function getMinhasApostas(apostas){
    return back_minhasApostas(apostas)
};
export function getMinhasCombs(lista){
    return back_minhasCombs(lista)
};
export function getAtualizacaoMinhasApostas(lista){
    return back_atualizacaoMinhasApostas(lista)
};


