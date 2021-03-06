import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Modal,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  View,
  Button,
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import * as firebase from 'firebase';

const FireBase = require('../../ConnexionBD.js');
const adresseMail = null;
const mdp = null;
const mdpVerif = null;

class ModalSignUp extends React.Component {
  state = {
    modalVisible2: false,
    adresseMailText: '',
    mdpText: '',
    mdpVerifText: '',
    mailVide: false,
    mdpVide: false,
    mdpVerifVide: false
  };
  //ouvre le modal
  openModalSignUp() {
    this.setState({ modalVisible2: true });
  }
  //ferme le modal
  closeModalSignUp() {
    this.setState({ modalVisible2: false });
  }
  //crée un compte
  creerCompte = async () => {
    //vérifie si les 3 champs ont été complêtés
    if (adresseMail && mdp && mdpVerif) {
      //vérifie si les deux mots de passe sont égaux
      if (mdp == mdpVerif) {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(adresseMail, mdp);
          Alert.alert(
            'Compte ajouté !',
            'Félicitation !\n\nVotre compte a été créé avec succès !',
            [{ text: 'OK', onPress: () => this.closeModalSignUp() }]
          );
          //créer la bd associées à l'utilisateur
          let monUid = firebase.auth().currentUser.uid;
          let chaine = {
            Jour: 0,
            Semaine: 0,
            Mois: 0,
            Total: 0
          };
          firebase
            .database()
            .ref(monUid + '/Cal')
            .set(chaine);
          firebase
            .database()
            .ref(monUid + '/Eco')
            .set(chaine);
          firebase
            .database()
            .ref(monUid + '/Distance')
            .set(chaine);
          firebase
            .database()
            .ref(monUid + '/Co2')
            .set(chaine);
        } catch (error) {
          alert(error.toString());
        }
      } else {
        Alert.alert(
          'Mauvais mot de passe',
          'Les deux mots de passes ne correspondent pas.'
        );
        this.setState({ mdpVide: true });
        this.setState({ mdpVerifVide: true });
      }
    } else {
      Alert.alert('Champ manquants', 'Veuillez saisir tous les champs.');
      if (!adresseMail) {
        this.setState({ mailVide: true });
      }
      if (!mdp) {
        this.setState({ mdpVide: true });
      }
      if (!mdpVerif) {
        this.setState({ mdpVerifVide: true });
      }
    }
  };

  render() {
    return (
      <View>
        <Modal
          visible={this.state.modalVisible2}
          animationType={'slide'}
          onRequestClose={() => this.closeModalSignUp()}
          backgroundColor={'blue'}
        >
          <ImageBackground
            source={require('../../img/accueil2.png')}
            style={{
              width: '100%',
              height: '110%'
            }}
          >
            <KeyboardAvoidingView
              keyboardVerticalOffset={-150}
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center'
              }}
              behavior="position"
              contentContainerStyle={{
                width: '100%',
                height: '100%',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  marginTop: 30,
                  marginBottom: 30,
                  fontSize: 28,
                  fontFamily: 'notoserif',
                  color: 'white'
                }}
              >
                <Text> Bienvenue sur Dé-chaîné{'\n'}</Text>
                <Text>l'application pour cyclistes,{'\n'}</Text>
                <Text> qui protège votre vélo</Text>
              </Text>
              <Text style={styles.textInputs}>Entrez votre adresse mail :</Text>
              <TextInput
                style={{
                  width: '60%',
                  height: 50,
                  fontSize: 15,
                  color: 'white',
                  marginBottom: 30,
                  marginTop: 10
                }}
                placeholder="Adresse mail"
                autoCorrect={false}
                keyboardType={'email-address'}
                onChangeText={text => {
                  this.setState({ adresseMailText: text });
                  adresseMail = text;
                  this.setState({ mailVide: false });
                }}
                placeholderTextColor={(this.state.mailVide && 'red') || 'white'}
                underlineColorAndroid={(this.state.mailVide && 'red') || null}
              />
              <Text style={styles.textInputs}>
                Entrez un mot de passe pour votre compte :
              </Text>
              <TextInput
                style={{
                  width: '60%',
                  height: 50,
                  fontSize: 15,
                  color: 'white',
                  marginBottom: 30,
                  marginTop: 10
                }}
                placeholder="Mot de passe"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({ mdpText: text });
                  mdp = text;
                  this.setState({ mdpVide: false });
                }}
                placeholderTextColor={(this.state.mdpVide && 'red') || 'white'}
                underlineColorAndroid={(this.state.mdpVide && 'red') || null}
              />
              <Text style={styles.textInputs}>Confirmez le mot de passe :</Text>
              <TextInput
                style={{
                  width: '60%',
                  height: 50,
                  fontSize: 15,
                  color: 'white',
                  marginBottom: 30,
                  marginTop: 10
                }}
                placeholder="Mot de passe"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({ mdpVerifText: text });
                  mdpVerif = text;
                  this.setState({ mdpVerifVide: false });
                }}
                placeholderTextColor={
                  (this.state.mdpVerifVide && 'red') || 'white'
                }
                underlineColorAndroid={
                  (this.state.mdpVerifVide && 'red') || null
                }
              />
              <View
                style={{
                  width: '59%',
                  flex: 1,
                  flexDirection: 'row',
                  maxHeight: 35,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flex: 1,
                    maxWidth: 140,
                    paddingLeft: 20,
                    alignItems: 'center'
                  }}
                >
                  <Button
                    onPress={() => this.closeModalSignUp()}
                    title="Annuler"
                    style={{ flex: 1, marginRight: 5, paddingRight: 20 }}
                    color={'grey'}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    maxWidth: 140,
                    paddingLeft: 20,
                    alignItems: 'center'
                  }}
                >
                  <Button onPress={() => this.creerCompte()} title="Valider" />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </Modal>
        <TouchableHighlight
          onPress={() => this.openModalSignUp()}
          underlayColor={null}
        >
          <Text
            style={{
              textDecorationLine: 'underline',
              marginTop: 40,
              color: 'white'
            }}
          >
            Créer un compte Dé-chaine
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  container2: {
    width: '100%',
    height: '110%',
    alignItems: 'center',
    flex: 1
  },
  modalContent: {
    borderRadius: 500,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  textInputs: {
    color: 'white',
    fontSize: 16
  },
  textMdpLost: {
    marginTop: 50,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ModalSignUp;
