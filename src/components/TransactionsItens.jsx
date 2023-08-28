import dayjs from "dayjs"
import styled from "styled-components"

export default function TransactionsItens({transacoes}){
    const {date, value, description, type} = transacoes
    return(
        <ListItemContainer>
            <div>
                <span>{dayjs(date).format("DD/MM")}</span>
                <strong data-test="registry-name">{description}</strong>
            </div>
            <Value color={type} data-test="registry-amount">{value}</Value>
      </ListItemContainer>
    )
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
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