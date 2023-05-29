import styled from "styled-components"
import { useState } from "react"

export default function Eachseat(props) {
    const [cor, setCor] = useState(props.ocupado ? '#C3CFD9':'#FBE192')
    const [bord, setBord] = useState(props.ocupado ? '#808F9D':'#F7C52B')

    // console.log(props.seat)

    function seleciona(ja_selecionado){
        if (ja_selecionado){
            setCor('#1AAE9E')
            setBord('#0E7D71')
            props.setIds([...props.lista_acentos,props.seat.id])
            props.setSelecionados([...props.selecionados,props.seat.name])
            
            props.seat.isAvailable = false
        }
        
        else if (props.lista_acentos.includes(props.seat.id)){
            props.seat.isAvailable = true
            props.lista_acentos.splice(props.lista_acentos.indexOf(props.seat.id),1)
            props.selecionados.splice(props.selecionados.indexOf(props.seat.name),1)
            props.setSelecionados(props.setSelecionados)
            props.setIds(props.lista_acentos) 
            setCor('#C3CFD9')
            setBord('#808F9D')
        }
        else{
            alert("Esse assento não está disponível")
        }
    }
    return (
        <SeatItem color={cor} border={bord} onClick={()=>seleciona(props.seat.isAvailable)}>
            {props.seat.name}
        </SeatItem>
    )
}


const SeatItem = styled.div`
    border: 1px solid ${props => props.border};         // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`