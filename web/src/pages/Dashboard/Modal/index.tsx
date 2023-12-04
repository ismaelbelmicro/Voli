import { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
} from "@mui/material";
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Botao from "../../../components/Botao";
import Subtitulo from "../../../components/Subtitulo";
import IProfissional from "../../../types/IProfissional";
import usePost from "../../../usePost";
import autenticaStore from "../../../stores/autentica.store";

const BoxCustomizado = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border: none;
  border-radius: 16px;
  padding: 1em 5em;
`;

const Container = styled.div`
  text-align: left;
`;

const ContainerEndereco = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0 1em;
`;

const ContainerSwitch = styled.div`
  text-align: center;
`;

const TextoSwitch = styled.p`
  color: var(--cinza);
`;

const BotaoCustomizado = styled(Botao)`
  width: 50%;
  display: block;
  margin: 0 auto;
`;

export default function ModalCadastro({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [crm, setCrm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [imagem, setImagem] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [estado, setEstado] = useState("");
  const label = { inputProps: { "aria-label": "Atende por plano?" } };
  const [planosSelecionados, setPlanosSelecionados] = useState<String[]>([]);
  const [possuiPlano, setPossuiPlano] = useState(false);
  const { cadastrarDados } = usePost();
  const { usuario } = AutenticaStore;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setPlanosSelecionados([...planosSelecionados, checkboxValue]);
    } else {
      setPlanosSelecionados(
        planosSelecionados.filter((plano) => plano !== checkboxValue)
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const profissional: IProfissional = {
      nome: nome,
      crm: crm,
      especialidade: especialidade,
      possuiPlanoSaude: possuiPlano,
      senha: password,
      estaAtivo: true,
      imagem: imagem,
      email: email,
      telefone: telefone,
      endereco: {
        cep: cep,
        rua: rua,
        estado: estado,
        numero: numero,
        complemento: complemento,
      },
    };

    await cadastrarDados({
      url: "especialista",
      dados: profissional,
      token: usuario.token,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal de cadastro do especialista"
      aria-describedby="Nesse modal terá os dados de cadastro do especialista"
    >
      <BoxCustomizado>
        <Titulo>cadstre o especialista inserindo os dados abaixo:</Titulo>
        <form>
          <Container>
            <CampoDigitacao
              tipo="text"
              label="Nome"
              valor={nome}
              placeholder="Digite seu nome completo"
              onChange={setNome}
            />
            <CampoDigitacao
              tipo="email"
              label="Email"
              valor={email}
              placeholder="Insira seu endereço de email"
              onChange={setEmail}
            />
            <CampoDigitacao
              tipo="password"
              label="Senha"
              valor={password}
              placeholder="Digite seu nome completo"
              onChange={setPassword}
            />
            <CampoDigitacao
              tipo="text"
              label="Especialidade"
              valor={especialidade}
              placeholder="Qual sua especialidade?"
              onChange={setEspecialidade}
            />
            <CampoDigitacao
              tipo="text"
              label="CRM"
              valor={crm}
              placeholder="Insira seu número de registro"
              onChange={setCrm}
            />
            <CampoDigitacao
              tipo="tel"
              label="Telefone"
              valor={telefone}
              placeholder="(DDD) XXXXX-XXXX"
              onChange={setTelefone}
            />
            <CampoDigitacao
              tipo="text"
              label="Insira a URL da imagem"
              valor={imagem}
              placeholder="Insira o url da imagem"
              onChange={setImagem}
            />
            <CampoDigitacao
              tipo="number"
              label="Endereço"
              valor={cep}
              placeholder="Insira o CEP"
              onChange={setCep}
            />

            <ContainerEndereco>
              <CampoDigitacao
                tipo="text"
                valor={rua}
                placeholder="Rua"
                onChange={setRua}
              />
              <CampoDigitacao
                tipo="text"
                valor={numero}
                placeholder="numero"
                onChange={setNumero}
              />
              <CampoDigitacao
                tipo="text"
                valor={complemento}
                placeholder="Complemento"
                onChange={setComplemento}
              />
              <CampoDigitacao
                tipo="text"
                valor={estado}
                placeholder="estado"
                onChange={setEstado}
              />
            </ContainerEndereco>
          </Container>
          <ContainerSwitch>
            <Subtitulo>Atender por plano?</Subtitulo>
            <Switch
              {...label}
              onChange={() => {
                possuiPlano ? setPossuiPlano(false) : setPossuiPlano(true);
              }}
            />
            <TextoSwitch>Não/Sim</TextoSwitch>
          </ContainerSwitch>
          {possuiPlano ? (
            <>
              <Subtitulo>Selecione os planos:</Subtitulo>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChange} value="Sulamerica" />
                  }
                  label="Sulamerica"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChange} value="Sulamerica" />
                  }
                  label="Unimed"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChange} value="Sulamerica" />
                  }
                  label="Bradesco"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChange} value="Sulamerica" />
                  }
                  label="Amil"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChange} value="Sulamerica" />
                  }
                  label="Biosaúde"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChange} value="Sulamerica" />
                  }
                  label="Biovida"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChange} value="Sulamerica" />
                  }
                  label="Outro"
                />
              </FormGroup>
            </>
          ) : (
            ""
          )}
          <BotaoCustomizado>Cadastrar</BotaoCustomizado>
        </form>
      </BoxCustomizado>
    </Modal>
  );
}
