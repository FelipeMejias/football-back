import { create } from "../bancos.js"

export async function createIta1(){
    let r
    r=7//================== RODADA 7 =====================//
    await create(r,'lecnap','2309301000')
    await create(r,'millaz','2309301300')
    await create(r,'salint','2309301545')
    await create(r,'bolemp','2310010730')
    await create(r,'udigen','2310011000')
    await create(r,'atajuv','2310011300')
    await create(r,'romfro','2310011545')
    await create(r,'sasmon','2310021330')
    await create(r,'torver','2310021330')
    await create(r,'fiocag','2310021545')
    r=6//================== RODADA 6 =====================//
    await create(r,'juvlec',[5,1],[57])
    await create(r,'cagmil',[3,5],[29,-40,-45,-60])
    await create(r,'empsal',[10,2],[34])
    await create(r,'verata',[4,1],[-13])
    await create(r,'napudi',[8,4],[19,39,74,-80,81])
    await create(r,'intsas',[8,6],[45,-54,-63])
    await create(r,'laztor',[4,2],[56,75])
    await create(r,'frofio',[8,10],[-19,70])
    await create(r,'monbol',[7,5],[])
    await create(r,'genrom',[1,7],[5,-22,45,74,81])
    r=5//================== RODADA 5 =====================//
    await create(r,'salfro',[8,6],[-12,52])
    await create(r,'lecgen',[4,3],[83])
    await create(r,'milver',[2,3],[8])
    await create(r,'sasjuv',[6,3],[12,-21,41,-78,82,90])
    await create(r,'lazmon',[1,3],[12,-36])
    await create(r,'empint',[3,6],[-51])
    await create(r,'atacag',[7,7],[33,76])
    await create(r,'udifio',[10,3],[-32,-90])
    await create(r,'bolnap',[5,5],[])
    await create(r,'torrom',[7,1],[-68,85])
    r=4//================== RODADA 4 =====================//
    await create(r,'juvlaz',[7,9],[10,26,-64,67])
    await create(r,'intmil',[5,0],[5,38,-57,69,79,90])
    await create(r,'gennap',[3,1],[40,56,-76,-84])
    await create(r,'cagudi',[4,6],[])
    await create(r,'monlec',[10,1],[-3,24])
    await create(r,'frosas',[5,6],[-7,-24,45,70,76,90])
    await create(r,'fioata',[3,4],[-20,35,45,-53,76])
    await create(r,'romemp',[2,6],[2,8,35,55,79,82,86])
    await create(r,'saltor',[1,2],[-15,-41,-50])
    await create(r,'verbol',[3,4],[])
    r=3//================== RODADA 3 =====================//
    await create(r,'sasver',[10,1],[11,-56,63,73])
    await create(r,'rommil',[3,5],[-9,-48,90])
    await create(r,'udifro',[3,5],[])
    await create(r,'bolcag',[5,2],[-22,59,89])
    await create(r,'naplaz',[7,2],[-30,32,52])
    await create(r,'atamon',[7,3],[35,42,62])
    await create(r,'torgen',[4,0],[90])
    await create(r,'intfio',[1,1],[23,53,58,73])
    await create(r,'empjuv',[3,7],[-24,-82])
    await create(r,'lecsal',[6,5],[6,90])
    r=2//================== RODADA 2 =====================//
    await create(r,'froata',[3,7],[5,24,-56])
    await create(r,'monemp',[6,5],[45,53])
    await create(r,'verrom',[1,12],[4,45,84])
    await create(r,'miltor',[2,1],[33,-36,43,45,65])
    await create(r,'juvbol',[6,2],[-24,80])
    await create(r,'fiolec',[3,3],[3,25,-49,-76])
    await create(r,'lazgen',[15,1],[-16])
    await create(r,'napsas',[12,4],[16,64])
    await create(r,'saludi',[7,5],[-57,72])
    await create(r,'cagint',[4,7],[-21,-30])
    r=1//================== RODADA 1 =====================//
    await create(r,'fronap',[4,6],[7,-24,-42,-79])
    await create(r,'empver',[2,4],[-75])
    await create(r,'genfio',[3,4],[-5,-11,-40,-56,58])
    await create(r,'intmon',[8,3],[8,76])
    await create(r,'sasata',[7,7],[-83,-90])
    await create(r,'romsal',[9,1],[17,-36,-49,82])
    await create(r,'leclaz',[5,2],[-26,85,87])
    await create(r,'udijuv',[7,3],[-2,-20,-45])
    await create(r,'torcag',[8,3],[])
    await create(r,'bolmil',[3,6],[-11,-21])
}