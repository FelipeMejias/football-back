arquivo=open("esc.txt","r",encoding="utf=8")
arquivoW=open("escw.txt","w",encoding="utf=8")

listaNomes=['Athletico Paranaense','Atlético Mineiro','Bahia','Botafogo','Bragantino','Chapecoense','Corinthians','Coritiba','Cruzeiro','Flamengo','Fluminense','Grêmio','Internacional','Mirassol','Palmeiras','Remo','Santos','São Paulo','Vasco da Gama','Vitória']
listaTimes=['cap','cam','bah','bot','bra','cha','cor','ctb','cru','fla','flu','gre','int','mir','pal','rem','san','sao','vas','vit']

for l in arquivo.readlines():
    linha=l.strip()
    partes=linha.split('\t')
    print(partes)
    man=partes[2]
    vis=partes[5]
    mandante=listaTimes[listaNomes.index(man)]
    visitante=listaTimes[listaNomes.index(vis)]
    escMan=partes[7]
    escVis=partes[8]
    arquivoW.write(mandante+visitante+','+escMan+','+escVis+'\n')