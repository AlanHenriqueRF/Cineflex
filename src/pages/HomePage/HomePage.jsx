import styled from "styled-components"
import EachMovie from "./EachMovie"

export default function HomePage(props) {
    // console.log(props.filmes)
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {(props.filmes).map((movie) => <EachMovie key={movie.id} link={movie.posterURL} />)} 
                {/* Renderizando cada filme, pois acredito que cada filme tem um com comportamento*/ }
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
