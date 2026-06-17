import fs from "fs";
import csv from "csv-parser";

const listaNomes = [
  'Athletico-PR',
  'Atlético-MG',
  'Bahia',
  'Botafogo',
  'Bragantino',
  'Chapecoense',
  'Corinthians',
  'Coritiba',
  'Cruzeiro',
  'Flamengo',
  'Fluminense',
  'Grêmio',
  'Internacional',
  'Mirassol',
  'Palmeiras',
  'Remo',
  'Santos',
  'São Paulo',
  'Vasco da Gama',
  'Vitória'
];

const listaTimes = [
  'cap','cam','bah','bot','bra','cha','cor','ctb','cru','fla',
  'flu','gre','int','mir','pal','rem','san','sao','vas','vit'
];

const codigoTime = (nome) => {
  const index = listaNomes.indexOf(nome);
  return index >= 0 ? listaTimes[index] : "???";
};

const jogos = [];

fs.createReadStream("bra26.csv")
  .pipe(csv())
  .on("data", (jogo) => {
    jogos.push(jogo);
  })
  .on("end", () => {

    jogos.reverse();

    for (const jogo of jogos) {

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
      const [hora, minuto] = jogo.Horário.split(":");

      const data =
        ano.slice(2) +
        mes.padStart(2, "0") +
        dia.padStart(2, "0") +
        hora.padStart(2, "0") +
        minuto.padStart(2, "0");

      console.log(
        `['${codigo}',[0,0],[${eventos.join(",")}],'${data}'],`
      );
    }
  });