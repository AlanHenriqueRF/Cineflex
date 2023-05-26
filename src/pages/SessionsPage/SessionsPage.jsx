import styled from "styled-components"

export default function SessionsPage(props) {
    // aqui precisa ter algo que indetifique o filme clicado, acredito que a forma melhor, é com usestate, para pegar a props que foi clicada
    //
    return (
        <PageContainer>
            Selecione o horário
            <EscolhaHorario>

                {props.session.days.map(day => {
                    return (
                        <SessionContainer key ={day.id}>
                            {day.weekday.slice(0, day.weekday.indexOf('-'))} - {day.date}
                            <ButtonsContainer>
                                {day.showtimes.map(time => {
                                    return (
                                        <button key={time.id}>
                                            {time.name}
                                        </button>)
                                })}
                            </ButtonsContainer>
                        </SessionContainer>
                    )
                })}

            </EscolhaHorario> 

            <FooterContainer>
                <div>
                    <img src={props.session.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{props.session.title}</p>
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