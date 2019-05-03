import React from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import { ExpoLinksView } from '@expo/samples';

export default class PublishScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = { libelle: '', entreprise: '', city: '', salary:'', description:'', errorMessage: null }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Libellé du poste"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={libelle => this.setState({ libelle })}
          value={this.state.libelle}
        />
        <TextInput
          placeholder="Entreprise"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={entreprise => this.setState({ entreprise })}
          value={this.state.entreprise}
        />
        <TextInput
          placeholder="Ville"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={city => this.setState({ city })}
          value={this.state.city}
        />
        <TextInput
          placeholder="Rémunération"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={salary => this.setState({ salary })}
          value={this.state.salary}
        />
        <TextInput
          placeholder="Description de l'offre d'emploi"
          style={styles.textInput}
          multiline={true}
          onChangeText={description => this.setState({description})}
          value={this.state.description}/>

        <GradientButton
          style={{ marginVertical: 8, marginLeft: 80, marginTop: 20 }}
          text="Publier l'offre"
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#dddddd',
  },
  textInput: {
    borderRadius: 30, backgroundColor: '#fafafa', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, width: 400, marginTop: 25, marginLeft: 6
},
});
