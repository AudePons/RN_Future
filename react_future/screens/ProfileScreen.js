import * as React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableHighlight } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import * as firebase from 'firebase';

export default class Profile extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = { name: '' };

    handleLogout() {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    componentWillMount() {
        let userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            let name = (snapshot.val() && snapshot.val().name) || 'Anonymous';

            if (name === 'Anonymous')
                this.props.navigation.navigate('Auth');
            else
                this.setState({ name });
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={{ uri: 'https://vignette.wikia.nocookie.net/fairytail/images/c/ca/Natsu_X792.png/revision/latest?cb=20181111122101' }} />
                        <Text style={styles.name}>Aude PONS </Text>
                        <Text style={styles.userInfo}>aude.pons@ynov.com </Text>
                        <Text style={styles.userInfo}>Bordeaux</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <GradientButton
                        style={{ marginVertical: 8, marginLeft: 40 }}
                        text="Télécharger mon CV"
                        textSyle={{ fontSize: 18 }}
                        gradientBegin="#1f99ca"
                        gradientEnd="#52f7ff"
                        gradientDirection="diagonal"
                        height={50}
                        width={250}
                        radius={30}
                        impact
                        impactStyle='Light'
                    />

                    <View style={styles.item}>
                        <View style={styles.iconContent}>
                            <Image style={styles.icon} source={{ uri: 'https://nsa40.casimages.com/img/2019/04/18/19041802193190992.png' }} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.info}>www.aude-pons.fr</Text>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View style={styles.iconContent}>
                            <Image style={styles.icon} source={{ uri: 'https://nsa40.casimages.com/img/2019/04/18/190418024405696860.png' }} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.info}>Développeur</Text>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View style={styles.infoContent}>
                            <Text style={styles.info}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu accumsan orci, eu egestas lorem. Integer dolor quam, pulvinar in ligula et, convallis porta sapien. Sed sit amet dictum magna, non malesuada neque. Pellentesque tellus odio, sagittis nec dolor sit amet, condimentum tincidunt ligula. Maecenas pharetra pretium ex sit amet aliquet. Mauris imperdiet urna sit amet dolor ultricies, a ullamcorper tortor molestie. In dignissim, dui quis pretium fringilla, odio tortor convallis turpis, non gravida quam dolor nec turpis.</Text>
                        </View>
                    </View>

                    <GradientButton
                        style={{ marginVertical: 8, marginLeft: 40 }}
                        text="Déconnexion"
                        textSyle={{ fontSize: 18 }}
                        gradientBegin="#ca1f44"
                        gradientEnd="#ff5252"
                        gradientDirection="diagonal"
                        height={50}
                        width={250}
                        radius={30}
                        impact
                        impactStyle='Light'
                        onPressAction={this.handleLogout}
                    />

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: "#3a3a3a",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "white",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#d2d2d2",
        fontWeight: '600',
    },
    body: {
        backgroundColor: "#fafafa",
        alignItems: 'flex-start',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,

    },
    item: {
        flexDirection: 'row',
        backgroundColor: "#dddddd",
        marginTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,

    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    iconContent: {

        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 18,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "black",
    },
    bouton: {
        flexDirection: "row", justifyContent: "center", alignItems: 'center'
    }
});