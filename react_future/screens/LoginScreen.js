// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Image } from 'react-native'
import GradientButton from 'react-native-gradient-buttons';
import * as firebase from 'firebase';

export default class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null, loading: false }

    async loginWithFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            Expo.Constants.manifest.extra.firebase.appId,
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);

            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential).catch((error) => {
                // Handle Errors here.
            });
        }
    }

    handleLogin = () => {
        this.setState({ errorMessage: '', loading: true });
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ errorMessage: '', loading: false });
                this.props.navigation.navigate('Main');
            })
            .catch(() => {
                this.setState({ errorMessage: 'Identifiant ou mot de passe incorrect(s)', loading: false });
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={{ width: 300, height: 100, marginBottom: 30 }}
                    source={require('../assets/images/08_logo.png')}
                />

                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />

                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Mot de passe"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />

                <GradientButton
                    style={{ marginVertical: 8 }}
                    text="Connexion"
                    textSyle={{ fontSize: 18 }}
                    gradientBegin="#1f99ca"
                    gradientEnd="#52f7ff"
                    gradientDirection="diagonal"
                    height={50}
                    width={250}
                    radius={30}
                    impact
                    impactStyle='Light'
                    onPressAction={this.handleLogin}
                />

                <TouchableHighlight
                    style={{
                        height: 40,
                        marginTop: 15
                    }} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text>Vous n'avez pas encore de compte ? Inscrivez-vous.</Text>
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
    button: {
        backgroundColor: '#0097e6',
        color: '#FFFFFF',
        borderRadius: 10
    }
})