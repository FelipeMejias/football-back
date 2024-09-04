import { bancoUsuarios } from "./1_____usuarios.js"

export const bancoTorneios=[
    {id:1,nome:'geral',jogadores:[]}
]

export function cadastrar(nome,senhaCript){
    const id=bancoUsuarios.length+1
    const novoUsu={id,nome,senhaCript}
    bancoUsuarios.push(novoUsu)
    return {id,nome}
}
export function login(usuario){
    const user=acharUsuario(usuario)
    return user
}
export function acharUsuario(usu){
    for(let item of bancoUsuarios){
        if(item.nome==usu)return item
    }
    return undefined
}
export function torneiosUsuario(usuId){
    const resp=[]
    for(let item of bancoTorneios){
        if(item.jogadores.length==0){
            resp.push({...item,jogadores:bancoUsuarios})
        }else if(item.jogadores.includes(usuId))
            resp.push(item)
    }
return resp
}
