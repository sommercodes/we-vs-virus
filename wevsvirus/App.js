/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Container, Header, Body, Title, Segment, Button, Text, H1, H2, Root } from 'native-base';
import { LineChart, ContributionGraph, PieChart } from 'react-native-chart-kit';

export default class App extends React.Component {
    state = {
        scanned: false,
        showQR: true,
        showDashboard: false
    }
    onSuccess = e => {
        Alert.alert(
            'Equipment successfully scanned',
            '',
            [,
              {text: 'OK'},
            ],
            { cancelable: false }
          )
        this.setState({scanned: true})
    }
    reloadScanner = () => {
        this.setState({scanned: false})
        this.scanner.reactivate();
    }
    showQR = () => {
        this.setState({
            showQR: true,
            showDashboard: false
        })
    }
    showDashboard = () => {
        this.setState({
            showQR: false,
            showDashboard: true
        })
    }
    render() {
        const maskData = [
            { date: "2017-01-02", count: 15 },
            { date: "2017-01-03", count: 29 },
            { date: "2017-01-04", count: 36 },
            { date: "2017-01-05", count: 44 },
            { date: "2017-01-06", count: 52 },
            { date: "2017-01-30", count: 26 },
            { date: "2017-01-31", count: 35 },
            { date: "2017-01-01", count: 29 },
            { date: "2017-01-02", count: 44 },
            { date: "2017-01-05", count: 22 },
            { date: "2017-01-30", count: 45 },
            { date: "2017-01-15", count: 65 },
            { date: "2017-01-16", count: 34 },
            { date: "2017-01-17", count: 50 },
            { date: "2017-01-18", count: 13 },
            { date: "2017-01-19", count: 20 }
          ];
        return (
            <Root>
                <Container>
                    <Header>
                        <Body>
                            <Title>Health Sidekick</Title>
                        </Body>
                    </Header>
                    <Container>
                        <Segment style={styles.segment}>
                            <Button first active={this.state.showQR} onPress={this.showQR}>
                                <Text>Scanner</Text>
                            </Button>
                            <Button onPress={this.showDashboard} active={this.state.showDashboard} last>
                                <Text>Dashboard</Text>
                            </Button>
                        </Segment>
                        {this.state.showQR && <QRCodeScanner
                            ref={(node) => { this.scanner = node }}
                            vibrate={Platform.OS == "android"}
                            onRead={this.onSuccess}
                            showMarker={true}
                            // flashMode={QRCodeScanner.Constants.FlashMode.torch}
                            topContent={
                            <H1>
                                QR Scanner
                            </H1>
                            }
                            bottomContent={
                            <Container style={styles.reloadButton}>
                                {!this.state.scanned &&<Text>Scan equipment codes to mark their usage</Text>}
                                {this.state.scanned && <Button 
                                    onPress={this.reloadScanner}>
                                    <Text>Scan another item</Text>
                                </Button>}
                            </Container>
                            }
                        />}
                        {this.state.showDashboard && <Container>
                            <H2 style={styles.dashboardTitle}>Monthly Mask Usage</H2>
                            <Container style={styles.chart}>
                                <LineChart
                                    data={{
                                    labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100
                                        ]
                                        }
                                    ]
                                    }}
                                    width={Dimensions.get("window").width - 20} // from react-native
                                    height={220}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                    yAxisInterval={1}
                                    chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                    }}
                                    bezier
                                    style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                    }}
                                />
                            </Container>
                            <H2 style={styles.dashboardTitle}>Daily Mask Usage</H2>
                            <Container style={styles.chart}>
                                <ContributionGraph
                                    values={maskData}
                                    endDate={new Date("2017-04-01")}
                                    numDays={105}
                                    width={Dimensions.get("window").width - 20}
                                    height={220}
                                    chartConfig={{
                                        backgroundColor: '#0091EA',
                                        backgroundGradientFrom: '#0091EA',
                                        backgroundGradientTo: '#0091EA',
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    }}
                                    bezier
                                    style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                    }}
                                />
                            </Container>
                            <Container>
                            </Container>
                        </Container>}
                    </Container>
                </Container>
        </Root>
        )
    }
}

const styles = StyleSheet.create({
    reloadButton: {
    marginTop: 20,
    },
    segment: {
        backgroundColor: Colors.white
    },
    chart: {
        paddingLeft: 10,
        paddingRight: 10
    },
    dashboardTitle: {
        textAlign: 'center'
    }
});
