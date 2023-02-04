import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import Botao from "../../components/Botao";
import { EntradaTexto } from "../../components/EntradaTexto";
import { logar } from "../../service/auth";
import styles from "./styles";
import { Alerta } from "../../components/Alerta";
import { auth } from "../../config/firebase";
import { alteraDados, verificaSeTemEntradaVazia } from "../../utils/comum";
import { entradas } from "./entradas";

import animacaoCarregando from "../../../assets/animacaoCarregando.gif";

export default function Login({ navigation }) {
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });

  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setCarregando(false);
    });
    return () => estadoUsuario();
  }, []);

  async function realizarLogin() {
    // funcao para verificar se email ou senha sao vazios
    if (verificaSeTemEntradaVazia(dados, setDados)) return;

    const resultado = await logar(dados.email, dados.senha);
    if (resultado == "erro") {
      setStatusError(true);
      setMensagemError("E-mail ou senha não conferem");
      return;
    }
    navigation.replace("Principal");
  }

  if (carregando) {
    return (
      <View style={styles.containerAnimacao}>
        <Image source={animacaoCarregando} style={styles.imagem} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {entradas.map((entrada) => {
        return (
          <EntradaTexto
            key={entrada.id}
            {...entrada}
            value={dados[entrada.name]}
            onChangeText={(valor) =>
              alteraDados(entrada.name, valor, dados, setDados)
            }
          />
        );
      })}

      <Alerta
        msg={mensagemError}
        error={statusError}
        setError={setStatusError}
      />

      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
