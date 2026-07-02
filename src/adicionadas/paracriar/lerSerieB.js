import fs from "fs";
const listaNomes=['Clube Atlético','América Mineiro','Atlético GO','Avaí','Botafogo SP','Ceará','CRB','Criciúma',
    'Cuiabá','Fortaleza','Goiás','juventude','Londrina','Náutico','Novorizontino','Operário PR',
    'Ponte Preta','São Bernardo','Esporte Recife','Vila Nova']

const listaTimes=['ath','amg','ago','ava','bot','cea','crb','cri','cui','for', 'goi','juv','lon','nau','nov','ope','pon','sao','spo','vil']

const codigoTime = (nome) => {
  const index = listaNomes.indexOf(nome.trim());
  if(index >= 0 ){
    return listaTimes[index]
    }else{
        console.log(nome)
        return "???"
    }
};

const linhas = fs.readFileSync('serieb.txt', 'utf-8').split('\n');

for(let linha of linhas){
    const itens=linha.split('\t')
    const jogo={
        Mandante:itens[1],Visitante:itens[3],
        Gols_Mandante:itens[2][0],Gols_Visitante:itens[2][4],
        Data:itens[0],
        Gols_Mandante_Primeiro_Tempo:itens[4][0],Gols_Visitante_Primeiro_Tempo:itens[4][2],
        
    }
    const codigo =
        codigoTime(jogo.Mandante) +
        codigoTime(jogo.Visitante);

      const eventos = [];

      // gols do primeiro tempo
      const golsMandante1T = Number(jogo.Gols_Mandante_Primeiro_Tempo || 0);
      const golsVisitante1T = Number(jogo.Gols_Visitante_Primeiro_Tempo || 0);

      for (let i = 0; i < golsMandante1T; i++) {
        eventos.push(1);
      }

      for (let i = 0; i < golsVisitante1T; i++) {
        eventos.push(-1);
      }

      // gols do segundo tempo
      const golsMandante2T =
        Number(jogo.Gols_Mandante) - golsMandante1T;

      const golsVisitante2T =
        Number(jogo.Gols_Visitante) - golsVisitante1T;

      for (let i = 0; i < golsMandante2T; i++) {
        eventos.push(46);
      }

      for (let i = 0; i < golsVisitante2T; i++) {
        eventos.push(-46);
      }

      const [dia, mes, ano] = jogo.Data.split("/");
      const [hora, minuto] = ["12","12"];

      const data =
        ano.slice(2) +
        mes.padStart(2, "0") +
        dia.padStart(2, "0") +
        hora.padStart(2, "0") +
        minuto.padStart(2, "0");
        console.log( `['${codigo}',[0,0],[${eventos.join(",")}],'${data}'],`);
        //`['${codigo}',[${escMan},${escVis}],[${eventos.join(",")}],'${data}'],`
}