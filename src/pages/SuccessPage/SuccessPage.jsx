import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom";


export default function SuccessPage() {
    const serchparams = useLocation()
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{serchparams.state.title}</p>
                <p>{serchparams.state.data} - {serchparams.state.hora}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {serchparams.state.selecionados.sort((a, b) => a - b).map((item) => {
                    return (<p key={item}>Assento {item}</p>)
                })}

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {serchparams.state.name}</p>
                <p>CPF: {serchparams.state.cpf.slice(0, 3) + '.' + serchparams.state.cpf.slice(3, 6) + '.' + serchparams.state.cpf.slice(6, 9) + '-' + serchparams.state.cpf.slice(9)}</p>
            </TextContainer>
            <Link to={'/'}>
                <button data-test="go-home-btn">Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    line-height:26px;
    font-size:22px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
    p:first-child{
        font-size:24px;
    }

`