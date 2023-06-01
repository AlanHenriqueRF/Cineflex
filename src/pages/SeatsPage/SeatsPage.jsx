import { Link, createSearchParams, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios";
import Eachseat from "./Eachseat";


export default function SeatsPage() {
    const parametro = useParams();
    const [acentos, setacetos] = useState(null)

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [ids, setIds] = useState([])

    const [selecionados, setSelecionados] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametro.idSessao}/seats`

        const promise = axios.get(url);

        promise.then((resposta) => {

            setacetos(resposta.data)
        })

        promise.catch((error) => {
            console.log(error.response)
        })
    }, [])


    function addcompra(e) {
        e.preventDefault();
        if (ids.length === 0) {
            alert('Escolha pelo menos um banco!')
        }
        else if (cpf.length != 11) {
            alert('No campo cpf, so é permitido números, e 11 digitos')
        }
        else {
            const novacompra = { ids: ids, name: name, cpf: cpf }

            const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', novacompra)
            promise.then(() => {
                navigate("/sucesso", 
                {state: { ...novacompra, selecionados: selecionados, data: acentos.day.date, hora: acentos.name, title: acentos.movie.title }})
            })
            promise.catch(erro => { alert('estamos com problemas no servidor') })
        }
    }

    if (acentos === null) {
        return <h1>Carregando...</h1>
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {acentos.seats.map(seat => {
                    return (
                        <Eachseat key={seat.id} seat={seat} ocupado={seat.isAvailable} name={seat.name} lista_acentos={ids} selecionados={selecionados} setSelecionados={setSelecionados} setIds={setIds} />
                    )
                })}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color={'#1AAE9E'} border={'#0E7D71'} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={'#C3CFD9'} border={'#7B8B99'} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={'#FBE192'} border={'#F7C52B'} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={addcompra}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input data-test="client-name"
                    type="text"
                    id='name'
                    // name="name" 
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input type="number"
                    data-test="client-cpf"
                    id='cpf'
                    // name="cpf" 
                    placeholder="Digite seu CPF..."
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required />

                <button data-test="book-seat-btn" type='submit' >Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={acentos.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{acentos.movie.title}</p>
                    <p>{acentos.day.weekday} - {acentos.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => typeof (props.border) === 'object' ? props.border[0] : props.border};         // Essa cor deve mudar
    background-color: ${props => typeof (props.color) === 'object' ? props.color[0] : props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`