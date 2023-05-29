import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import seats_list from "./Seatslist"
import axios from 'axios'
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'azzAzkq1NHnZSZdRO61xBJt6';
    const [lista_filmes, setListafilme] = useState([])

    useEffect(() => {
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/movies'

        const promise = axios.get(url);

        promise.then((resposta) => {
            setListafilme(resposta.data)
        })

        promise.catch((error) => {
            console.log(error.response)
        })
    }, [])

    return (
        <BrowserRouter>
            <NavContainer>
                <Link to={'/'}>
                    CINEFLEX
                </Link>
            </NavContainer>
            <Routes>
                <Route path="/" element={<HomePage filmes={lista_filmes} />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage/>} />
                <Route path="/assentos/:idSessao" element={<SeatsPage />} />

            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
