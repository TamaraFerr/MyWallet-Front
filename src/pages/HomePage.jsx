import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import TransactionsItens from "../components/TransactionsItens"
import { useState } from "react"

export default function HomePage() {
  const {usuarioName, token, setToken, setUsuarioName} = useContext(AuthContext)
  const [transacao, setTransacao] = useState([])
  const config = {headers: {authorization: `Bearer ${token}`}}
  const navigate = useNavigate()

  useEffect(() => {
    if(!token || !usuarioName){
      navigate("/")
    }

    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
    .then(res => setTransacao(res.data))
    .catch(err => alert(err.response.data))
  }, [])

  function logout(){

    axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, config)
    .then(() => {
      setToken(undefined)
      setUsuarioName(undefined)
      localStorage.clear()
      navigate("/")
    })
    .catch(err => alert(err.response.data))
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {usuarioName}</h1>
        <BiExit data-test="logout" onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transacao.map((tra) => <TransactionsItens key={tra._id} transacoes={tra}/>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"} data-test="total-amount">2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br/>saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`