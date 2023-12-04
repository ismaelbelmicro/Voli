import { useState } from "react";

export default function usePost() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [resposta, setReposta] = useState("");

  async function cadastrarDados<T>({ url, dados }: { url: string; dados: T }) {
    try {
      const resposta = await fetch(`http://localhost:8080/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      setSucesso(true);
      const respostaConvertida = await resposta.json();
      setReposta(respostaConvertida.token);
    } catch (erro) {
      setErro("Não foi possível enviar os dados");
    }
  }

  return { cadastrarDados, sucesso, erro, resposta };
}
