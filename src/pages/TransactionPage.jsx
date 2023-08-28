import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {
  const {usuarioName, token} = useContext(AuthContext)
  const navigate = useNavigate

  useEffect(() => {
    if(!token || !usuarioName){
      navigate("/")
    }
  }, [])

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" type="text" data-test="registry-amount-input"/>
        <input placeholder="Descrição" type="text" data-test="registry-name-input"/>
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
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
