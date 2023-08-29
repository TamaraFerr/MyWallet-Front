import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import AuthContext from "../contexts/AuthContext"

export default function TransactionsPage() {
  const {usuarioName, token} = useContext(AuthContext)
  const config = {headers: {authorization: `Bearer ${token}`}}
  const navigate = useNavigate
  const {type} = useParams()
  const tipoTexto = type === "entrada" ? "Entrada" : "Saída"
  const [form, setForm] = useState({value: "", description: ""})

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }
  
  useEffect(() => {
    if(!token || !usuarioName){
      navigate("/")
    }
  }, [])

  function novaTransicao(e){
    e.preventDefault()
    const body = {...form, type: type === "entrada" ? "entrada" : "saida"}

    axios.post(`${import.meta.env.VITE_API_URL}/transactions`, body, config)
    .then(res => navigate("/home"))
    .catch(err => alert(err.response.data))
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipoTexto}</h1>
      <form onSubmit={novaTransicao}>
        <input 
          required
          placeholder="Valor" 
          type="number" 
          data-test="registry-amount-input"
          onChange={handleForm}
          value={form.value}
          name="value"
          />
        <input 
          required
          placeholder="Descrição" 
          type="text" 
          data-test="registry-name-input"
          onChange={handleForm}
          value={form.description}
          name="description"
          />
        <button data-test="registry-save" type="submit">Salvar {tipoTexto}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
