import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";

function errosFirebase(error) {
  let msg = "";

  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      msg = "Esse email já está em uso";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      msg = "Email inválido";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      msg = "A senha precisa de no minimo 6 caracteres";
      break;
    default:
      msg = "Erro desconhecido";
  }
  return msg;
}

export async function cadastrar(email, senha) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario);
      return "sucesso";
    })
    .catch((error) => {
      console.log(error);
      return errosFirebase(error);
    });
  return resultado;
}

export async function logar(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario);
      return "sucesso";
    })
    .catch((error) => {
      console.log(error);
      return "erro";
    });
  return resultado;
}
