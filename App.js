import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const CLOUD_CONTROLLER_URL = "https://api.sys.oakley.cf-app.com";
const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImtleS0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJmNWFkNDE3Nzg0MzI0NTVjOWZkNjg2ZTExOGQwNzM4ZCIsInN1YiI6IjE4YWFiZjY3LTgyYTktNGM4MC1hYzgzLTQxODQ1ZGRlMDE5NCIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsImFjdHVhdG9yLnJlYWQiLCJjbG91ZF9jb250cm9sbGVyLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci51c2VyIiwib3BlbmlkIiwiY2xvdWRfY29udHJvbGxlci5hZG1pbiJdLCJjbGllbnRfaWQiOiJhcHBzX21hbmFnZXJfanMiLCJjaWQiOiJhcHBzX21hbmFnZXJfanMiLCJhenAiOiJhcHBzX21hbmFnZXJfanMiLCJ1c2VyX2lkIjoiMThhYWJmNjctODJhOS00YzgwLWFjODMtNDE4NDVkZGUwMTk0Iiwib3JpZ2luIjoidWFhIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluIiwiYXV0aF90aW1lIjoxNTMwMTE4MTIwLCJyZXZfc2lnIjoiYzgzYTM3N2MiLCJpYXQiOjE1MzAxMTk5MzQsImV4cCI6MTUzMTMyOTUzNCwiaXNzIjoiaHR0cHM6Ly91YWEuc3lzLm9ha2xleS5jZi1hcHAuY29tL29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbImNsb3VkX2NvbnRyb2xsZXIiLCJhY3R1YXRvciIsIm9wZW5pZCIsImFwcHNfbWFuYWdlcl9qcyJdfQ.WM59v7ikPhLSOBiXOgRASLjMqOWeX8E3ns_pMpV2QhxplqtYGfcqNqYsp2oqsnj14XsQ3Wj8LjBRG74T81rh15CDlyUR8ju53gs5LczsU9qCAhal-j730CZqerIXICPp02j-XWlY1qhY32Y91QTCMArdIB2vrUjt-kGGuBhCCqmeEsQBQ3wbLab6RHGBOpWcPrWg6dqitFfXcGtgiTgAwWGcS5CGGc1LOa1QslYnPjxXyW52V24SRbCx85asWY2jGoicaVt0E_mIPtEYVAvRbXKRaTpESVNz70YF0JjEsI7LYfJdc13GCTnbuJ5hzlgAERjJaE0TRFwjEsX9bAeqKQ"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: 'orgs'};
  }

  componentDidMount = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `bearer ${accessToken}`
        }
      };
      console.log({options});
      const response = await fetch("http://api.sys.oakley.cf-app.com/v2/organizations?page=1&results-per-page=50&order-by=name&order-direction=asc", options);
      const {resources} = await response.json();
      this.setState({orgs: resources});
    } catch (e) {
      console.log(e)
    }
  };

  render() {
    const {orgs = []} = this.state;
    const content = orgs.map(org => {
      return <View style={styles.orgs}><Button key={org.metadata.guid}
                                               title={org.entity.name}>{org.entity.name}</Button></View>
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}><Text>You have {orgs.length} orgs</Text></View>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0543a8'
  },
  orgs: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bdffaf',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});
