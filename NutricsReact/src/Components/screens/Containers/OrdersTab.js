
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Dimensions,
    SectionList,
    Alert,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { AsyncStorage } from "react-native";
import MenuList from '../Rows/MenuList';


import colors from '../../../styles/colors/index';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { Card } from '../../commons/Card';


const HEADER_EXPANDED_HEIGHT = 280
const HEADER_COLLAPSED_HEIGHT = 60


class OrdersTab extends Component {


    constructor(props) {
        super(props);
        this.state = {
            monProgress: 0.2,
            tueProgress: 0.2,
            wedProgress: 0.2,
            thuProgress: 0.2,
            friProgress: 0.2,
            satProgress: 0.2,
            sunProgress: 0.2,
            monSelected: true,
            tueSelected: true,
            wedSelected: true,
            thuSelected: true,
            friSelected: true,
            satSelected: true,
            sunSelected: true,
            scrollY: new Animated.Value(0)

        };
        this.onMondaySelected = this.onMondaySelected.bind(this)
        this.onTuesdaySelected = this.onTuesdaySelected.bind(this)
        this.onWedSelected = this.onWedSelected.bind(this)
        this.onThuSelected = this.onThuSelected.bind(this)
        this.onFriSelected = this.onFriSelected.bind(this)
        this.onSatSelected = this.onSatSelected.bind(this)
        this.onSunSelected = this.onSunSelected.bind(this)
        this.setProg = this.setProg.bind(this)

    }

    onMondaySelected() {
        this.setState({
            monSelected: true,
            tueSelected: false,
            wedSelected: false,
            thuSelected: false,
            friSelected: false,
            satSelected: false,
            sunSelected: false,

        })
    }
    onTuesdaySelected() {
        this.setState({
            monSelected: false,
            tueSelected: true,
            wedSelected: false,
            thuSelected: false,
            friSelected: false,
            satSelected: false,
            sunSelected: false,

        })
    }
    onWedSelected() {
        this.setState({
            monSelected: false,
            tueSelected: false,
            wedSelected: true,
            thuSelected: false,
            friSelected: false,
            satSelected: false,
            sunSelected: false,

        })
    }
    onThuSelected() {
        this.setState({
            monSelected: false,
            tueSelected: false,
            wedSelected: false,
            thuSelected: true,
            friSelected: false,
            satSelected: false,
            sunSelected: false,

        })
    }
    onFriSelected() {
        this.setState({
            monSelected: false,
            tueSelected: false,
            wedSelected: false,
            thuSelected: false,
            friSelected: true,
            satSelected: false,
            sunSelected: false,

        })
    }
    onSatSelected() {
        this.setState({
            monSelected: false,
            tueSelected: false,
            wedSelected: false,
            thuSelected: false,
            friSelected: false,
            satSelected: true,
            sunSelected: false,

        })
    }
    onSunSelected() {
        this.setState({
            monSelected: false,
            tueSelected: false,
            wedSelected: false,
            thuSelected: false,
            friSelected: false,
            satSelected: false,
            sunSelected: true,

        })
    }
    setProg() {
        this.setState({
            monProgress: 0.2,
            tueProgress: 0.3,
            wedProgress: 0.4,
            thuProgress: 0.5,
            friProgress: 0.6,
            satProgress: 0.7,
            sunProgress: 0.8
        })
    }

    getSelectedProgress(selected) {
        switch (selected) {
            case this.state.monSelected:
                return this.state.monProgress;
                break;
            case this.state.tueSelected:
                return this.state.tueProgress;
                break;
            case this.state.wedSelected:
                return this.state.wedProgress;
                break;
            case this.state.thuSelected:
                return this.state.thuProgress;
                break;
            case this.state.friSelected:
                return this.state.friProgress;
                break;
            case this.state.satSelected:
                return this.state.satProgress;
                break;
            case this.state.sunSelected:
                return this.state.sunProgress;
                break;
        }
    }

    GetSectionListItem = (item) => {

        Alert.alert(item.gender)

    }
    renderItem(rowData){
        const { width: SCREEN_WIDTH } = Dimensions.get('screen')

        {
            return (
                <Card>
                    <Image
                        style={[styles.image, {width: 300}]}
                        source={{ uri: rowData.image }} />
                    <View style={styles.detailWrapper}>
                        <Text>
                            {rowData.name}
                        </Text>
                    </View>
                </Card>
            );
        }
    }


    render() {
        const monColor = this.state.monSelected ? 1 : 0.4
        const tueColor = this.state.tueSelected ? 1 : 0.4
        const wedColor = this.state.wedSelected ? 1 : 0.4
        const thuColor = this.state.thuSelected ? 1 : 0.4
        const friColor = this.state.friSelected ? 1 : 0.4
        const satColor = this.state.satSelected ? 1 : 0.4
        const sunColor = this.state.sunSelected ? 1 : 0.4
        const { width: SCREEN_WIDTH } = Dimensions.get('screen')
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        })
        const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT + 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const heroTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT - 120],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const macrosOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT - 180],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        const A = [{ name: 'Raman', age: '25', gender: 'male', image: 'https://dandelionroom.co.za/wp-content/uploads/2017/11/crystal-pansy-11.jpg' }, { name: 'Daman', age: '25', gender: 'male', image: 'https://www.the-iceberg.org/wp-content/uploads/2017/09/Feeding-Your-Performance-01-With-Video-Button.jpg' }, { name: 'Eaman', age: '25', gender: 'male', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/97/2d/food-image.jpg' }];

        const B = [{ name: 'Qaman', age: '25', gender: 'male', image: 'https://img.washingtonpost.com/rf/image_908w/2010-2019/WashingtonPost/2012/09/11/Food/Images/10000562H13856847.jpg' }, { name: 'Waman', age: '25', gender: 'male', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/97/2d/food-image.jpg' }, { name: 'Gaman', age: '25', gender: 'male', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/97/2d/food-image.jpg' }];

        const C = [{ name: 'Zaman', age: '25', gender: 'male', image: 'https://www.whatsuplife.in/gurgaon/blog/wp-content/uploads/2015/09/Chaat-Chowk.jpg' }, { name: 'Raman', age: '25', gender: 'male', image: 'http://revistavenamerica.com/admin/wp-content/uploads/2016/03/ICC-Sydney-catering.jpg' }, { name: 'Daman', age: '25', gender: 'male', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/97/2d/food-image.jpg' }];

        const D = [{ name: 'Raman', age: '25', gender: 'male', image: 'https://humanfactors.jmir.org/article/viewFile/7287/1/122614' }, { name: 'Daman', age: '25', gender: 'male', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTQr8PtvYsRSgUw03SW8dVSiHoqLLYnlFsU3BgrjnXc4j3S3tpmw' }, { name: 'Qaman', age: '25', gender: 'male', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/e0/97/2d/food-image.jpg' }];

        return (
            <View style={styles.container}>
                {/* <Animated.View style={[styles.header, { height: headerHeight, width: SCREEN_WIDTH, position: 'absolute', top: 0, left: 0}]}> */}
                <Animated.View style={[styles.header, { height: headerHeight, width: SCREEN_WIDTH }]}>
                    <Animated.View style={[styles.progressContainter, { opacity: heroTitleOpacity }]}>
                        <TouchableOpacity style={[styles.progressWrapper]} onPress={this.onMondaySelected}>
                            <Progress.Bar
                                progress={this.state.monProgress}
                                animated={true}
                                width={80}
                                height={30}
                                color={colors.white}
                                opacity={monColor}
                                borderColor={colors.white}
                                style={{
                                    transform: [{ rotate: '-90deg' }],
                                    marginLeft: -15,
                                    marginRight: -15,
                                }} />
                            <Text style={styles.textStyle}>Mon</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.progressWrapper]} onPress={this.onTuesdaySelected}>
                            <Progress.Bar
                                progress={this.state.tueProgress}
                                animated={true}
                                width={80}
                                height={30}
                                color={colors.white}
                                opacity={tueColor}
                                borderColor={colors.white}
                                style={{
                                    transform: [{ rotate: '-90deg' }],
                                    marginLeft: -15,
                                    marginRight: -15,
                                }} />
                            <Text style={styles.textStyle}>Tue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.progressWrapper]} onPress={this.onWedSelected}>
                            <Progress.Bar
                                progress={this.state.wedProgress}
                                animated={true}
                                width={80}
                                color={colors.white}
                                opacity={wedColor}
                                borderColor={colors.white}
                                height={30}
                                style={{
                                    transform: [{ rotate: '-90deg' }],
                                    marginLeft: -15,
                                    marginRight: -15,
                                }} />
                            <Text style={styles.textStyle}>Wed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.progressWrapper]} onPress={this.onThuSelected}>
                            <Progress.Bar
                                progress={this.state.thuProgress}
                                animated={true}
                                width={80}
                                color={colors.white}
                                opacity={thuColor}
                                borderColor={colors.white}
                                height={30}
                                style={{
                                    transform: [{ rotate: '-90deg' }], marginLeft: -15,
                                    marginRight: -15,
                                }} />
                            <Text style={styles.textStyle}>Thu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.progressWrapper]} onPress={this.onFriSelected}>
                            <Progress.Bar
                                progress={this.state.friProgress}
                                animated={true}
                                width={80}
                                color={colors.white}
                                opacity={friColor}
                                borderColor={colors.white}
                                height={30}
                                style={{
                                    transform: [{ rotate: '-90deg' }],
                                    marginLeft: -15,
                                    marginRight: -15,
                                }} />
                            <Text style={styles.textStyle}>Fri</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.progressWrapper]} onPress={this.onSatSelected}>
                            <Progress.Bar
                                progress={this.state.satProgress}
                                animated={true}
                                width={80}
                                color={colors.white}
                                opacity={satColor}
                                borderColor={colors.white}
                                height={30}
                                style={{
                                    transform: [{ rotate: '-90deg' }],
                                    marginLeft: -15,
                                    marginRight: -15,
                                }} />
                            <Text style={styles.textStyle}>Sat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.progressWrapper]} onPress={this.onSunSelected}>
                            <Progress.Bar
                                progress={this.state.sunProgress}
                                animated={true}
                                width={80}
                                color={colors.white}
                                opacity={sunColor}
                                borderColor={colors.white}
                                height={30}
                                style={{
                                    transform: [{ rotate: '-90deg' }],
                                    marginLeft: -15,
                                    marginRight: -15,
                                }} />
                            <Text style={styles.textStyle}>Sun</Text>
                        </TouchableOpacity>

                    </Animated.View>


                    <Animated.View style={{ alignItems: 'center', justifyContent: 'space-around', height: 100, backgroundColor: colors.primaryColor, marginTop: 5, opacity: macrosOpacity }}>
                        <View style={{ alignSelf: 'center', width: 60, marginLeft: 5 }}>
                            <Text style={styles.macroTextTitle}
                            >CALORIES</Text>
                            <View style={{ borderBottomColor: colors.white, borderBottomWidth: 1, opacity: 0.4 }}></View>
                            <Text style={styles.macroText}>2000</Text>
                        </View>
                        <Animated.View style={styles.macrosRow}>
                            <View>
                                <Text style={styles.macroTextTitle}>CARBS</Text>
                                <View style={{ borderBottomColor: colors.white, borderBottomWidth: 1, opacity: 0.4 }}></View>
                                <Text style={styles.macroText}>172 g</Text>
                            </View>

                            <TouchableOpacity onPress={() => this.setProg()}><Text style={styles.targetText}>Target</Text></TouchableOpacity>

                            <View>
                                <Text style={styles.macroTextTitle}>FAT</Text>
                                <View style={{ borderBottomColor: colors.white, borderBottomWidth: 1, opacity: 0.4 }}></View>
                                <Text style={styles.macroText}>100 g</Text>
                            </View>
                        </Animated.View>
                        <View style={{ alignSelf: 'center', width: 60, marginLeft: 5 }}>
                            <Text style={styles.macroTextTitle}
                            >PROTIEN</Text>
                            <View style={{ borderBottomColor: colors.white, borderBottomWidth: 1, opacity: 0.4 }}></View>
                            <Text style={styles.macroText}>258 g</Text>
                        </View>
                    </Animated.View>
                </Animated.View>
                <View style={[styles.bottomCurve, { width: SCREEN_WIDTH / 5, alignSelf: 'center', marginTop: -3 }]}
                >
                </View>
                <View style={styles.mainContent}>
                </View>

                {/* <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingTop: HEADER_EXPANDED_HEIGHT}]} */}

                
                <ScrollView contentContainerStyle={[styles.scrollContainer, {  backgroundColor: colors.white, width: SCREEN_WIDTH,marginTop:30,paddingBottom:100}]}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }
                        }])}
                    scrollEventThrottle={16}>
                    
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>Breakfast</Text>
                        <TouchableOpacity style={{ flexDirection: 'row'}}><Text style={{color:colors.black,opacity:0.8}}>See all </Text> <Icon
                            name="angle-right"
                            color={colors.black}
                            size={16}
                            style={{  opacity: 0.8 }}
                           /></TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={A}
                        renderItem={({ item: rowData }) => this.renderItem(rowData)}
                        keyExtractor={(item, index) => index}
                    />
                    

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <Text>Entrees</Text>
                        <TouchableOpacity style={{ flexDirection: 'row' }}><Text style={{ color: colors.black, opacity: 0.8 }}>See all </Text> <Icon
                            name="angle-right"
                            color={colors.black}
                            size={16}
                            style={{ opacity: 0.8 }}
                        /></TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={B}
                        renderItem={({ item: rowData }) => this.renderItem(rowData)}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <Text>Snacks</Text>
                        <TouchableOpacity style={{ flexDirection: 'row' }}><Text style={{ color: colors.black, opacity: 0.8 }}>See all </Text> <Icon
                            name="angle-right"
                            color={colors.black}
                            size={16}
                            style={{ opacity: 0.8 }}
                        /></TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={C}
                        renderItem={({ item: rowData }) => this.renderItem(rowData)}
                        keyExtractor={(item, index) => index}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <Text>Specials</Text>
                        <TouchableOpacity style={{ flexDirection: 'row' }}><Text style={{ color: colors.black, opacity: 0.8 }}>See all </Text> <Icon
                            name="angle-right"
                            color={colors.black}
                            size={16}
                            style={{ opacity: 0.8 }}
                        /></TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={D}
                        renderItem={({ item: rowData }) => this.renderItem(rowData)}
                        keyExtractor={(item, index) => index}
                    />

                    
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,

    },
    header: {
        backgroundColor: colors.primaryColor,
        paddingTop: 70,
    },
    bottomCurve: {
        height: 40,
        backgroundColor: colors.primaryColor,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        transform: [
            { scaleX: 5 }
        ],
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 10,
    },
    scrollContainer: {
        padding: 16
    },
    image: {
        height: 150,
        borderRadius: 5,
    },
    detailWrapper:{
        width:'100%',
        height:40,
        position:'absolute',
        bottom:0,
        backgroundColor:colors.white,
       
    },
    progressContainter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.primaryColor,
    },
    progressWrapper: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        marginTop: 25,
        fontWeight: '200',
        color: colors.white,
        opacity: 0.9

    },
    targetText: {

        fontWeight: '700',
        fontSize: 16,
        color: colors.white,
        opacity: 1
    },
    macrosRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    macroText: {
        alignSelf: 'center',
        fontWeight: '200',
        fontSize: 10,
        color: colors.white,
        opacity: 1
    },
    macroTextTitle: {
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 10,
        color: colors.white,
        opacity: 1,

    },
    SectionHeaderStyle: {

        backgroundColor: '#CDDC39',
        fontSize: 20,
        padding: 5,
        color: '#fff',
        width: '100%'
    },

    SectionListItemStyle: {
        fontSize: 15,
        padding: 5,
        color: '#000',
        backgroundColor: '#F5F5F5',
        width: '100%',

    }





});


export default OrdersTab;