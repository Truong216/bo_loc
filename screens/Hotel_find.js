import React, {useState, useRef} from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, ScrollView, TextInput, Dimensions,FlatList } from 'react-native';
import { Color } from '../components/Color'; 
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { keyWordSuggestion, getHotels, getInforHotel } from '../redux/actions'
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet from "react-native-gesture-bottom-sheet";
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import {DATA} from '../components/Data';
import { set } from 'lodash';
const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;
export default function Hotel_find({ navigation }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [displayedDate, setDisplayedDate] = useState(moment())
  const [minDate, setMinDate] = useState(moment().set("date", 17))
  const setDates = (dates) => {
    dates.startDate ? setStartDate(dates.startDate) : setEndDate(dates.endDate);
  };
  const dispath = useDispatch();
  const dataKeyWords = useSelector(state => state.keyWordReducer);
  const [person, setPerson] = useState(2);
  const [room, setRoom] = useState(1);
  const [kid, setKid] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const renderPlace = ({ item }) => {
    return (
      <View style={styles.city_background}> 
         <Image resizeMode="cover" style={styles.placeImage} source={item.link} /> 
          <View style={styles.city_img_title}>
          <Text style={styles.city_name}>{item.title}</Text>
          </View>
      </View>
      );
  };

  const bottomSheet = useRef();
  return(
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={hp/1.35}>
        <View style={styles.bottomSheet}>
          <View style={styles.bottom_row}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", width: wp/4}}>
              <Text style={{fontSize: 40}}>{room}</Text>
              <Text style={{ fontWeight: 'bold'}}>Phòng</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", width: wp/3.2}}>
              <TouchableOpacity onPress={() => room > 1 ? setRoom(room - 1) : setRoom(1)}> 
                <AntDesign name="minuscircle" size={50} color="#f3f3f3" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRoom(room + 1)}>
                <AntDesign name="pluscircle" size={50} color={Color.primary} />
              </TouchableOpacity>
            </View>
            </View>
              <View style={styles.bottom_row}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", width: wp/2.5}}>
                  <Text style={{fontSize: 40}}>{person}</Text>
                  <View style={{justifyContent: 'space-between', height: hp/18}}>
                    <Text style={{ fontWeight: 'bold'}}>Người lớn</Text>
                    <Text style={{fontSize: 12, color: 'grey'}}>Từ 13 tuổi trở lên</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", width: wp/3.2}}>
                  <TouchableOpacity onPress={() =>person > 1 ? setPerson(person - 1) : setPerson(1)}> 
                    <AntDesign name="minuscircle" size={50} color="#e0e0e0"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPerson(person + 1)}>
                    <AntDesign name="pluscircle" size={50} color={Color.primary} />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom_row}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", width: wp/3}}>
                      <Text style={{fontSize: 40}}>{kid}</Text>
                      <View style={{justifyContent: 'space-between', height: hp/18}}>
                        <Text style={{ fontWeight: 'bold'}}>Trẻ em</Text>
                        <Text style={{fontSize: 12, color: 'grey'}}>Dưới 13 tuổi</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", width: wp/3.2}}>
                    <TouchableOpacity onPress={() =>kid > 1 ? setKid(kid - 1) : setKid(1)}>
                    <AntDesign name="minuscircle" size={50} color="#e0e0e0"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setKid(kid + 1)}>
                    <AntDesign name="pluscircle" size={50} color={Color.primary} />
                    </TouchableOpacity>
                    </View>
                </View>
                
          </View>
          <View style={styles.button_view}>
                <TouchableOpacity
                  style={styles.Bottomsheet_Button}
                  onPress={
                    () => {setRooms(room), setAdults(person),  bottomSheet.current.close()}     
                }
                >
                  <Text style={{color: "#fff", fontSize: 20, fontWeight: '400'}}>Áp Dụng</Text>
                </TouchableOpacity>
                </View>
        </BottomSheet>    
      <ScrollView style={styles.scrollView_container} showsVerticalScrollIndicator={false}>
        <View style={styles.Img_Background}>
          <ImageBackground style={styles.background} source={require('../assets/hotel_find.jpg')}>
            <LinearGradient locations={[0, 1]}  colors= 
              {['rgba(0,0,0,0)', '#f3f3f3']} 
              style={styles.linearGradient}>
            </LinearGradient>
          </ImageBackground> 
        </View>
        <View style={styles.Input_container}>
          <TextInput
            style={{ height: 40, borderColor: '#fff', borderWidth: 1, width: wp*(8/10), borderRadius: 8, paddingLeft: 8, backgroundColor: '#fff' }}
            onChangeText={text => dispath(keyWordSuggestion(text))
            }
          />
          <View style={{justifyContent: 'center', alignItems:'center', position: 'relative', zIndex: 3, top: 50}}>
          {
            dataKeyWords.length > 0?
            <FlatList
              data={dataKeyWords}
              renderItem={({ item }) => (
                
                <TouchableOpacity
                  onPress={ async () => {
                    await dispath(getHotels(item)); 
                    navigation.navigate('Detail', {});
                  }}
                  style={{padding: 8, backgroundColor: '#fff', width: wp*(8/10), position: 'relative'}}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
                
              )}
              keyExtractor={(item) => item.search_id}
            >
            </FlatList> 
            : <View style={{height: 0}}></View>
          }
          </View>
          <View style={styles.info_Container}>
          <View style={styles.info_date}>
                  <DateRangePicker
                    onChange={setDates}
                    endDate={endDate}
                    startDate={startDate}
                    displayedDate={displayedDate}
                    minDate={minDate}
                    selectedStyle={{backgroundColor: Color.primary}}
                    presetButtons={true}
                    buttonTextStyle={{paddingLeft: wp/15, paddingRight: wp/15, color: Color.primary}}
                    buttonStyle={{borderColor: Color.primary}}
                    range
                    >
                      <View style={{justifyContent: 'space-between', height: '100%'}}>
                      <Text style={styles.info_date_title}>CHỌN NGÀY</Text>
                      <Text style={styles.info_date_day}>12 Dec - 15 Dec</Text>
                      </View>
                      </DateRangePicker>
                    </View>           
                    <View style={styles.info_person}>
                      <TouchableWithoutFeedback onPress={() => bottomSheet.current.show()} style={{justifyContent: 'space-between', height: '100%'}}>
                        <Text style={styles.info_date_title}>SỐ PHÒNG</Text>
                        <Text style={styles.info_date_day}>{rooms} Room - {adults} Adults</Text>
                      </TouchableWithoutFeedback>
                    </View>
          </View>
          <View style={styles.loginButton}>
            <Text style={{color: "#fff", fontSize: 24, fontWeight: '400'}}>Tìm Kiếm</Text>
          </View>
        </View>
        <View style={styles.city_container}>
          <Text style={[styles.Title, {flex: 0.15}]}>Điểm Đến Hàng Đầu</Text>
          <View style={{flex: 0.8}}> 
            <FlatList 
              renderItem = {renderPlace}
              keyExtractor={item => item.id}
              data = {DATA}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.hot_deal}>
          <Text style={[styles.Title, {flex: 0.1}]}>Giá Tuyệt Vời</Text>
          <View style={{flex: 0.9, justifyContent: "center"}}>
             <ScrollView style={{height: 500}}>
              <View style={styles.hot_deal_items}>
                <View style={styles.hot_deal_img}>
                  <Image style={{width:'100%', height:150, borderTopLeftRadius: 15, borderBottomLeftRadius: 15,}} source={require('../assets/Welcome.jpg') }></Image>
                </View>
                <View style={styles.hot_deal_info}>
                  <Text numberOfLines= {2} style={styles.suggestion_name}>Cereja Hotel {'&'} Resort Đà Lạt by alibaba và 40 tên cướp alibaba</Text> 
                  <Text numberOfLines= {2} style={{fontSize: 12, color: 'grey', paddingLeft: 10, marginTop: 15, paddingBottom: 10}}>73 Trương Định, Quận 3, Hồ Chí ah</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.4}}>
                      <View style={{flexDirection: 'row', paddingLeft: 10, marginTop: 10}}>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>    
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>     
                      </View>    
                      <View style={{marginLeft: 10,borderColor: 'black',backgroundColor: Color.primary,width: 50, marginTop: 10, alignItems:"center" }}>  
                      <Text style={{color:'white',  fontSize: 12}}>9.0</Text>        
                      </View> 
                    </View>
                    <View style={{flex: 0.6,alignItems: "center", justifyContent: "center", marginTop: 5}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>435.000 đ</Text>
                      <Text style={{}}>/Đêm</Text>
                    </View>
                  </View>    
                </View>
              </View>
              <View style={styles.hot_deal_items}>
                <View style={styles.hot_deal_img}>
                  <Image style={{width:'100%', height:150, borderTopLeftRadius: 15, borderBottomLeftRadius: 15,}} source={require('../assets/Welcome.jpg') }></Image>
                </View>
                <View style={styles.hot_deal_info}>
                  <Text numberOfLines= {2} style={styles.suggestion_name}>Cereja Hotel {'&'} Resort Đà Lạt by alibaba và 40 tên cướp alibaba</Text> 
                  <Text numberOfLines= {2} style={{fontSize: 12, color: 'grey', paddingLeft: 10, marginTop: 15, paddingBottom: 10}}>73 Trương Định, Quận 3, Hồ Chí ah</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.4}}>
                      <View style={{flexDirection: 'row', paddingLeft: 10, marginTop: 10}}>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>    
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>     
                      </View>    
                      <View style={{marginLeft: 10,borderColor: 'black',backgroundColor: Color.primary,width: 50, marginTop: 10, alignItems:"center" }}>  
                      <Text style={{color:'white',  fontSize: 12}}>9.0</Text>        
                      </View> 
                    </View>
                    <View style={{flex: 0.6,alignItems: "center", justifyContent: "center", marginTop: 5}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>435.000 đ</Text>
                      <Text style={{}}>/Đêm</Text>
                    </View>
                  </View>    
                </View>
              </View>
              <View style={styles.hot_deal_items}>
                <View style={styles.hot_deal_img}>
                  <Image style={{width:'100%', height:150, borderTopLeftRadius: 15, borderBottomLeftRadius: 15,}} source={require('../assets/Welcome.jpg') }></Image>
                </View>
                <View style={styles.hot_deal_info}>
                  <Text numberOfLines= {2} style={styles.suggestion_name}>Cereja Hotel {'&'} Resort Đà Lạt by alibaba và 40 tên cướp alibaba</Text> 
                  <Text numberOfLines= {2} style={{fontSize: 12, color: 'grey', paddingLeft: 10, marginTop: 15, paddingBottom: 10}}>73 Trương Định, Quận 3, Hồ Chí ah</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.4}}>
                      <View style={{flexDirection: 'row', paddingLeft: 10, marginTop: 10}}>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>    
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>     
                      </View>    
                      <View style={{marginLeft: 10,borderColor: 'black',backgroundColor: Color.primary,width: 50, marginTop: 10, alignItems:"center" }}>  
                      <Text style={{color:'white',  fontSize: 12}}>9.0</Text>        
                      </View> 
                    </View>
                    <View style={{flex: 0.6,alignItems: "center", justifyContent: "center", marginTop: 5}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>435.000 đ</Text>
                      <Text style={{}}>/Đêm</Text>
                    </View>
                  </View>    
                </View>
              </View>
              <View style={styles.hot_deal_items}>
                <View style={styles.hot_deal_img}>
                  <Image style={{width:'100%', height:150, borderTopLeftRadius: 15, borderBottomLeftRadius: 15,}} source={require('../assets/Welcome.jpg') }></Image>
                </View>
                <View style={styles.hot_deal_info}>
                  <Text numberOfLines= {2} style={styles.suggestion_name}>Cereja Hotel {'&'} Resort Đà Lạt by alibaba và 40 tên cướp alibaba</Text> 
                  <Text numberOfLines= {2} style={{fontSize: 12, color: 'grey', paddingLeft: 10, marginTop: 15, paddingBottom: 10}}>73 Trương Định, Quận 3, Hồ Chí ah</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.4}}>
                      <View style={{flexDirection: 'row', paddingLeft: 10, marginTop: 10}}>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star" size={13} color={Color.primary} style={{paddingRight: 1}}/>    
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>
                        <FontAwesome name="star-o" size={13} color={Color.primary} style={{paddingRight: 1}}/>     
                      </View>    
                      <View style={{marginLeft: 10,borderColor: 'black',backgroundColor: Color.primary,width: 50, marginTop: 10, alignItems:"center" }}>  
                      <Text style={{color:'white',  fontSize: 12}}>9.0</Text>        
                      </View> 
                    </View>
                    <View style={{flex: 0.6,alignItems: "center", justifyContent: "center", marginTop: 5}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>435.000 đ</Text>
                      <Text style={{}}>/Đêm</Text>
                    </View>
                  </View>    
                </View>
              </View> 
            </ScrollView> 
          </View>
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  scrollView_container: {
  },
  Img_Background: {
    width: '100%',
    height: 500,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 50,
  },
  Input_container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '90%',
    height: 220,
    marginTop: '55%',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 25,
  },
  Input: {
    borderRadius: 15,
    backgroundColor: "#fff",
    width: '90%',
    height: '20%'
  },
  info_Container: {
    width: "90%",
    height: "20%",
    flexDirection: 'row',
    zIndex: -1,
  },
  info_date: {
    flex: 0.5,
    borderRightColor: '#fff',
    borderRightWidth: 1,
    justifyContent: "space-between",
    zIndex: -1
  },
  info_date_title: {
    fontSize: 10,
    color: '#fff',
  },
  info_date_day: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff'
  },
  info_person: {
    flex: 0.5,
    paddingLeft: 10,
    justifyContent: "space-between",
    zIndex: -1
  },
  city_container: {
    marginTop: 20,
    width: '100%',
    height: 240,
    paddingLeft: 20,
    zIndex: -1
  },
  city_scrollView: {
    height: 200
  },
  city_background: {
    width: 280,
    height: 170,
    marginRight: 20,
    borderRadius:15,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  city_img_title: {
    position:'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 15
  },
  city_name: {
    position: 'absolute',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 20,
    left: 20 
  },
  hot_deal: {
    width: '100%',
    height: 500,
    paddingLeft: 20,
  },
  hot_deal_items: {
    width: '94%',
    height: 150,
    marginBottom: 20,
    flexDirection: 'row',
    flex: 1,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,
  },
  hot_deal_img: {
    flex: 0.4,
  },
  hot_deal_info: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  suggestion_name: {
    fontWeight: 'bold', 
    fontSize: 14, 
    top:  10,
    marginLeft: 10
  },
  bottomSheet:{
    marginHorizontal: wp/14,
    height: hp/1.6,
  },
  bottom_row: {
    height: hp/8,
    justifyContent: "space-between",
    borderBottomColor: "#dbd7d7",
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  linearGradient: {
    position:'absolute',
    width:wp,
    height:'70%'
   },
   loginButton: {
    width: wp*(7/10),
    height: hp*(9/10)*(1/14),
    backgroundColor: '#54d3c2',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    zIndex: -1
  },
  Bottomsheet_Button: {
    width: wp*(9/10),
    height: hp*(9/10)*(1/14),
    backgroundColor: '#54d3c2',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  button_view: {
    width: wp,
    height: hp/8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 8,
  },
  shadowOpacity: 0.46,
  shadowRadius: 11.14,
  elevation: 17,
  },
  placeImage: { 
    width: 280, 
    height: 170 , 
    borderRadius: 15,
  }
})