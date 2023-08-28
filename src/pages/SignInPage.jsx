import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

export default function SignInPage() {
  const {setToken, setUsuarioName} = useContext(AuthContext)
  const [form, setForm] = useState({email: "", password: ""})
  const navigate = useNavigate()

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function formSubmit(e){
    e.preventDefault()
    
    axios.post(`${import.meta.env.VITE_API_URL}/login`, form)
    .then(res => {
      setToken(res.data.token)
      setUsuarioName(res.data.usuarioName)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("usuarioName", res.data.usuarioName)
      navigate("/home")
      console.log(res.data)
    })
    .catch(err => alert(err.response.data))
  }


  return (
    <SingInContainer>
      <form onSubmit={formSubmit}>
        <MyWalletLogo />
        <input 
        placeholder="E-mail" 
        type="email" 
        data-test="email"
        required
        name="email"
        onChange={handleForm}
        value={form.email}
        />
        <input 
        placeholder="Senha" 
        type="password" 
        minLength={3}
        autoComplete="new-password" 
        data-test="password"
        required
        name="password"
        onChange={handleForm}
        value={form.password}
        />
        <button data-test="sign-in-submit" type="onSubmit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
