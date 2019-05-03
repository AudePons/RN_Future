// SignUp.js
import React from 'react'
import { Image, StyleSheet, Text, TextInput, View, Button, TouchableHighlight } from 'react-native'
import GradientButton from 'react-native-gradient-buttons';
import * as firebase from 'firebase';

export default class SignUp extends React.Component {

    state = { email: '', password: '', confirm_password: '', errorMessage: null }
    handleSignUp = () => {
        this.setState({ errorMessage: '', loading: true });
        const { email, password, confirm_password } = this.state;


        if (password == confirm_password) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this.setState({ errorMessage: '', loading: false });
                    this.props.navigation.navigate('Login');
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ errorMessage: 'Un ou plusieurs sont invalid(s)', loading: false });
                });
        } else {
            this.setState({ errorMessage: 'Mots de passe différents.', loading: false });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 300, height: 100, marginBottom: 30 }}
                    source={require('../assets/images/08_logo.png')}
                />
                <Text style={{ color: 'red', marginBottom: 10 }}>
                    {this.state.errorMessage}
                </Text>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Mot de passe"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Confirmer votre mot de passe"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={confirm_password => this.setState({ confirm_password })}
                    value={this.state.confirm_password}
                />

                <GradientButton
                    style={{ marginVertical: 8 }}
                    text="S'inscrire"
                    textSyle={{ fontSize: 18 }}
                    gradientBegin="#1f99ca"
                    gradientEnd="#52f7ff"
                    gradientDirection="diagonal"
                    height={50}
                    width={250}
                    radius={30}
                    impact
                    impactStyle='Light'
                    onPressAction={this.handleSignUp}
                />

                <TouchableHighlight
                    style={{
                        height: 40,
                        marginTop: 15
                    }} onPress={() => this.props.navigation.navigate('Auth')}>
                    <Text>Vous avez déjà un compte ? Connectez-vous.</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddd'
    },
    textInput: {
        marginBottom: 15, borderRadius: 30, backgroundColor: '#fafafa', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, width: 300
    },
})