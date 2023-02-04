import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Cabecalho from "../../components/Cabecalho";
import Produto from "../../components/Produtos";
import styles from "./styles";
import { auth } from "../../config/firebase";
import { BotaoProduto } from "../../components/BotaoProduto";
import { pegarProdutos, pegarProdutosTempoReal } from "../../service/firestore";

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarDadosProdutos() {
    setRefreshing(true);
    const produtosFirestore = await pegarProdutos();
    setProdutos(produtosFirestore);
    setRefreshing(false);
  }

  useEffect(() => {
    carregarDadosProdutos();

    pegarProdutosTempoReal(setProdutos);
  }, []);

  function deslogar() {
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <Cabecalho logout={deslogar} />
      <Text style={styles.texto}>Usuário: {usuario.email}</Text>

      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarDadosProdutos}
          />
        }
      >
        {produtos?.map((produto) => {
          return (
            <TouchableOpacity
              key={produto.id}
              onPress={() => navigation.navigate("DadosProduto", produto)}
            >
              <Produto nome={produto.nome} preco={produto.preco} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
    </View>
  );
}
