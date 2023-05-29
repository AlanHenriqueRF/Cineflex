import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios";

export default function SessionsPage() {
    // aqui precisa ter algo que indetifique o filme clicado, acredito que a forma melhor, é com usestate, para pegar a props que foi clicada
    //
    const parametro = useParams();
    // console.log(parametro)

    const [lista_sessoes, setListasessoes] = useState(null)


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametro.idFilme}/showtimes`

        const promise = axios.get(url);

        promise.then((resposta) => {
            // console.log(resposta.data)
            setListasessoes(resposta.data)
        })

        promise.catch((error) => {
            console.log(error.response)
        })
    }, [])
    if (lista_sessoes === null) {
        return <h1>Carregando...</h1>
    }
    return (
        <PageContainer>
            Selecione o horário
            <EscolhaHorario>

                {lista_sessoes.days.map(day => {
                    return (
                        <SessionContainer data-test="movie-day" key={day.id}>
                            {day.weekday.slice(0, day.weekday.indexOf('-')!==-1 ? day.weekday.indexOf('-'):day.weekday.length)} - {day.date}
                            <ButtonsContainer>
                                {day.showtimes.map(time => {
                                    return (
                                        <Link to={`/assentos/${time.id}`} key={time.id}>
                                            <button data-test="showtime" >
                                                {time.name}
                                            </button>
                                        </Link>)
                                })}
                            </ButtonsContainer>

                        </SessionContainer>
                    )
                })}

            </EscolhaHorario>

            <FooterContainer data-test="footer">
                <div>
                    <img src={lista_sessoes.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{lista_sessoes.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const EscolhaHorario = styled.div`
    margin-top:40px;
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        margin-bottom:11px;
    }
    a {
        text-decoration: none;
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