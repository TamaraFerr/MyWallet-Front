import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  const [form, setForm] = useState({name: "", email: "", password: "", confirmPassword: ""})
  const navigate = useNavigate()

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function formSubmit(e){
    e.preventDefault() 
    
    if(form.password !== form.confirmPassword){
      alert("Senhas incorretas")
      return
    }

    delete form.confirmPassword
    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, form)
    .then(res => navigate("/"))
    .catch(err => alert(err.response.data))
  }

  return (
    <SingUpContainer>
      <form onSubmit={formSubmit}>
        <MyWalletLogo />
        <input 
        placeholder="Nome" 
        type="text" 
        data-test="name"
        required
        name="name"
        onChange={handleForm}
        value={form.name}
        />
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
        <input 
        placeholder="Confirme a senha" 
        type="password" 
        minLength={3}
        autoComplete="new-password" 
        data-test="conf-password"
        required
        name="confirmPassword"
        onChange={handleForm}
        value={form.confirmPassword}
        />
        <button data-test="sign-up-submit" type="onSubmit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
