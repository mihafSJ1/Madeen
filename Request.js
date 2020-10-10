import React from "react";
import { Formik } from "formik";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import RadioButtonRN from "radio-buttons-react-native";
import { ArabicNumbers } from "react-native-arabic-numbers";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { CheckBox, ThemeConsumer } from "react-native-elements";
import * as yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import CalendarIconComponent from "./CalendarIconComponent";
import { withNavigation } from 'react-navigation';

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import FirebaseKeys from "./FirebaseKeys";
import RequestBackgroundComp from "./RequestBackgroundComp";
import { da } from "date-fns/locale";
// import TopBar from "./TopBar";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}

//-------------------------------------------- Data
let applicationUsers = [];
let installmentsDropDownArray = [];
const numericKeyboard = /[^0-9]/;

const data = [
  {
    label: "السداد دفعة واحدة",
  },
  {
    label: "السداد بالتقسيط",
  },
];

const  installmentsArray = [
  {
    label: "",
    priceValueArr: "",
    durationValueArr: "",
    installmentsTypeArr: "yearly",
   
  },
  {
    label: "",
    priceValueArr: "",
    durationValueArr: "",
    installmentsTypeArr: "monthly",
  },
  {
    label: "",
    priceValueArr: "",
    durationValueArr: "",
    installmentsTypeArr: "weekly",
  },
  {
    label: "",
    priceValueArr: "",
    durationValueArr: "",
    installmentsTypeArr: "daily",
  },
];

 

var year,
  days,
  week,
  month = 0;

var dateDiffDays,
  dateDiffWeeks,
  dateDiffMonths,
  dateDiffYears = new Date();

// var tomorrow,
//   today = moment();
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

var userNameFromDB = "";

 class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      installmentsState: "",
      priceState: 0,
      durationState: 0,
      submittedDateState: moment().format("YYYY-MM-DD"),
      userValue: [],
      // repaymentType : [],
    };

  }

  //-------------------------------------------- Calculations
  repaymentOnce(eDate) {
    var time = new Date(eDate).getTime() - new Date().getTime();
    var totalDays = time / (1000 * 3600 * 24);

    year = Math.floor(totalDays / 365);
    totalDays = totalDays % 365;

    month = Math.floor(totalDays / 30);
    totalDays = totalDays % 30;

    week = Math.floor(totalDays / 7);
    totalDays = totalDays % 7;

    days = Math.floor(totalDays);
  }

  repayementInstallments(price, eDate) {
   
    const submittedDate = moment();
    const expectedDate = moment(eDate);
    dateDiffDays = expectedDate.diff(submittedDate, "days");
    dateDiffWeeks = expectedDate.diff(submittedDate, "weeks");
    dateDiffMonths = expectedDate.diff(submittedDate, "months");
    dateDiffYears = expectedDate.diff(submittedDate, "years");
    if (dateDiffYears != 0) {
      var yearlyPrice = (price / dateDiffYears).toFixed(2);
      if(yearlyPrice !=0){
      installmentsArray[0].label =
        ArabicNumbers(yearlyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(dateDiffYears) +
        " سنة";
      installmentsArray[0].priceValueArr = yearlyPrice;
      installmentsArray[0].durationValueArr = dateDiffYears;
      installmentsArray[0].installmentsTypeArr = "yearly";
    }
  }

    if (dateDiffMonths != 0) {
      var monthlyPrice = (price / dateDiffMonths).toFixed(2);
      if(monthlyPrice !=0){
      installmentsArray[1].label =
        ArabicNumbers(monthlyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(dateDiffMonths) +
        " شهر";
      installmentsArray[1].priceValueArr = monthlyPrice;
      installmentsArray[1].durationValueArr = dateDiffMonths;
      installmentsArray[1].installmentsTypeArr = "monthly";
    }
  }

    if (dateDiffWeeks != 0) {
      if(weeklyPrice !=0){
      var weeklyPrice = (price / dateDiffWeeks).toFixed(2);
      installmentsArray[2].label =
        ArabicNumbers(weeklyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(dateDiffWeeks) +
        " اسبوع";
      installmentsArray[2].priceValueArr = weeklyPrice;
      installmentsArray[2].durationValueArr = dateDiffWeeks;
      installmentsArray[2].installmentsTypeArr = "weekly";
    }
  }
    if (dateDiffDays != 0) {
      var dailyPrice = (price / dateDiffDays).toFixed(2);
      if(dailyPrice !=0){
      installmentsArray[3].label =
        ArabicNumbers(dailyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(dateDiffDays) +
        " يوم";
      installmentsArray[3].priceValueArr = dailyPrice;
      installmentsArray[3].durationValueArr = dateDiffDays;
      installmentsArray[3].installmentsTypeArr = "daily";
    }
  }
    for (var i = 0, j = 0; i < installmentsArray.length; i++) {
      if (
        installmentsArray[i].durationValueArr == 0 &&
        installmentsArray[i].priceValueArr == 0
      )
        continue;

      installmentsDropDownArray[j++] = installmentsArray[i];
    }
  // this.setState({
  //   repaymentType: installmentsDropDownArray})
 
      
  }

  
  //-------------------------------------------- Form Submission
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    firebase
      .database()
      .ref("users/")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().email != currentUser.email) {
            applicationUsers.push({
              fullName: child.val().fullName,
              label: child.val().email,
            });
          }
        });
      });
    
      // this.setState({
      //   repaymentType: installmentsDropDownArray})
      // alert(applicationUsers);
      this.setState({
        userValue: applicationUsers,
      })
    
     


  }


  onSubmitPress(values, props) {
    
    const { currentUser } = this.state;
    if (values.usersSelect == false){
      values.user = "";
    }

    // vif (values.repaymentType == ""){

    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .on("value", (snapshot) => {
        // userNameFromDB = snapshot.val().fullName;
      });
     

    const requestID = firebase
      .database()
      .ref("requests/")
      .push(
        {
          price: values.price,
          expectedDate: values.expectedDate,
          submittedDate: this.state.submittedDateState,
          repaymentType: values.repaymentType,
          reason: values.reason,
          userid: currentUser.uid,
          userName: userNameFromDB,
          rqeuestStatus: "Waiting",
          installemntPrice: this.state.priceState,
          installemntDuration: this.state.durationState,
          installmentsType: this.state.installmentsState,
          creditor: values.user,
          
        },
        function (error) {
          if (error) {
            alert(error);
          } else {
            Alert.alert(
              "تنبيه ",
              "تم إرسال الطلب بنجاح   ",
              [
               
                { text: "موافق", onPress: () =>  props.navigate('squares') }
              ],
              { cancelable: false }
            );
        
          
             
           
          }
        }
      );
  }

  requestSchema = yup.object({
    price: yup
      .number()
      .typeError("المبلغ لا بد أن يكون بأرقام إنجليزية")
      .required("المبلغ مطلوب")
      .integer("المبلغ لا بد أن  يكون عدد صحيح")
      .max(20000, "المبلغ لا بد أن يكون أقل من أو يساوي ٢٠ ألف ريال")
      .min(10, "المبلغ  مطلوب و لا بد أن يكون أكبر من أو يساوي ١٠ ريال"),
    expectedDate: yup
      .date() 
      .min(tomorrow, "التاريخ مطلوب ولا بد أن لا يكون  ضمن ٢٤ ساعة القادمة"),
    // .test(
    //   "enteranceExpectedDate",
    //   "التاريخ المتوقع لإكمال السداد مطلوب",
    //   (val) => {
    //     return props.values.expectedDate == new Date();
    //   }
    // ),
    reason: yup.string().trim().min(3, "السبب لا بد أن  يكون ٣ خانات فأكثر"),

    usersSelect: yup.bool(),
    user: yup
      .string()
      .notRequired()
      .when("usersSelect", {
        is: (val) => val == true,
        then: yup.string().required("اختيار المدين مطلوب"),
        otherwise: yup.string().notRequired(),
      }),
  });

  //-------------------------------------------- Rendering react component
  render() {
 
 
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <RequestBackgroundComp />
        </View>

        <View style={styles.registerBackground}>
          <KeyboardAwareScrollView>
            <Text style={styles.header}>إنشاء طلب </Text>
            <Formik
              validationSchema={this.requestSchema}
              initialValues={{
                installmentRepayment:"",
                user: "",
                usersSelect: false,
                price: 0,
                expectedDate: today,
                repaymentType: "",
                reason: "",
                rqeuestStatus: "Waiting",
                submittedDate: new Date(),
              }}
              onReset= {(values, { resetForm })=> {
                // resetForm.resetForm()
                // this.props.navigation.navigate("squares")
              }}
              // onReset={(values,action)=>{
              //   action.resetForm()
              //   this.props.navigation.navigate("squares")

              // }}
              onSubmit={(values, action) => {
                action.resetForm()
               
                this.onSubmitPress(values,this.props.navigation);
              
              }}
            >
              {(formprops, setFieldValue) => (
                <View style={styles.requestContainer}>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>التدين من شخص محدد</Text>

                    <CheckBox
                      style={styles.checkbox}
                      checkedColor="#CBCA9E"
                      checkedIcon="check-box"
                      iconType="material"
                      uncheckedIcon="check-box-outline-blank"
                      onPress={() =>
                        formprops.setFieldValue(
                          "usersSelect",
                          !formprops.values.usersSelect
                        )
                      }
                      checked={formprops.values.usersSelect}
                    />
                  </View>

                  <Text style={styles.textNote}>
                    ملاحظة : عند اختيار هذا الخيار سيظهر طلبك للشخص المحدد فقط{" "}
                  </Text>

                  {formprops.values.usersSelect ? (
                    <DropDownPicker
                      style={styles.DropDownPicker}
                      items={applicationUsers}
                      placeholder="اختر دائن "
                      placeholderStyle={{ color: "#CBCBCC" }}
                     
                      value={formprops.values.user}
                      containerStyle={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 50,
                        borderColor: "#CBCA9E",
                      }}
                      style={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 50,
                        borderColor: "#57694C",
                        borderWidth: 1,
                        width: 100,
                      }}
                      arrowColor="#9b9b7a"
                      arrowSize={18}
                      containerStyle={{
                        width: 352,
                        height: 40,
                        marginLeft: 35,
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 60,
                        borderBottomRightRadius: 50,
                        marginBottom: 25,
                      }}
                      itemStyle={{
                        backgroundColor: "#fff",
                        textAlign: "right",
                        flexDirection: "row-reverse",
                        justifyContent: "flex-start",
                        fontFamily: "Bahij_TheSansArabic-Light",

                        // to make the list to the right side
                      }}
                      selectedLabelStyle={{
                        color: "#57694C",
                        fontFamily: "Bahij_TheSansArabic-Light",
                      }}
                      activeLabelStyle={{
                        color: "#57694C",
                      }}
                      labelStyle={{
                        backgroundColor: "#fff",
                        fontSize: 16,
                        textAlign: "right",
                        color: "#000",
                        fontFamily: "Bahij_TheSansArabic-Light",
                      }}
                      style={{
                        flexDirection: "row-reverse",
                        // to support RTL
                      }}
                      onChangeItem={(item) =>
                        formprops.setFieldValue("user", item.label)
                      }
                    />
                  ) : null}
                  <Text style={[styles.textError, { top: -20 }]}>
                    {formprops.errors.user}
                  </Text>
                  <Text style={styles.textInputTitle}>
                    المبلغ <Text style={styles.textError}> *</Text>
                  </Text>
{/* 
{alert(formprops.values.expectedDate)} */}

                  <TextInput
                    style={styles.textInput}
                    // placeholderTextColor="#57694C"
                    placeholder="المبلغ"
                    value={formprops.values.price}
                    onChangeText={formprops.handleChange("price")}
                    keyboardType="numeric"
                    onBlur={formprops.handleBlur("price")}
                  />
                  <Text style={styles.textError}>
                    {formprops.touched.price && formprops.errors.price}
                  </Text>
                  <Text style={styles.textInputTitle}>
                    التاريخ المتوقع لإكمال السداد{" "}
                    <Text style={styles.textError}> *</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    // placeholderTextColor="#57694C"
                    placeholder="التاريخ"
                    value={formprops.values.expectedDate}
                    editable={false}
                    onChangeText={
                      (this.repaymentOnce(formprops.values.expectedDate),
                      this.repayementInstallments(
                        formprops.values.price,
                        formprops.values.expectedDate
                      ))
                    }
                    onBlur={formprops.handleBlur("expectedDate")}
                  />

                  <DatePicker
                    hideText
                    style={styles.datePicker}
                    date={formprops.values.expectedDate}
         
                    onOpenModal={()=>{formprops.setFieldValue("expectedDate", tomorrow)}}
                    mode="date"
                    calendar="arabic"
                    locale={"ar"}
                    placeholder={new yup.date()}
                    format="YYYY-MM-DD"
                    minDate={tomorrow}
                    showDateSelect
                    confirmBtnText="تم"
                    cancelBtnText="إلغاء"
                    iconComponent={<CalendarIconComponent />}
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                      btnTextCancel: {
                        fontFamily: "Bahij_TheSansArabic-Light",
                        color: "#404040",
                        fontSize: 17,
                      },
                      btnTextConfirm: {
                        fontFamily: "Bahij_TheSansArabic-Light",
                        color: "#9B9B7A",
                        fontSize: 17,
                      },
                    }}
                    // onPressCancel={
                    //   ()=>this.setState({
                    //     repaymentType:[]
                    //   }),
                    //     ()=> formprops.setFieldValue("expectedDate", today)
                    // }

               
                 
                    onDateChange={(date) => {
                    
                        formprops.setFieldValue("expectedDate", date);
                     
                      
                      // formprops.setFieldValue("expectedDate", date);
                    }}
                  />
                    { console.log(formprops.values.expectedDate)}
                  <Text style={[styles.textError, { top: -50 }]}>
                    {formprops.touched.expectedDate && formprops.errors.expectedDate}
                  </Text>
                  <View style={styles.radio}>
                    <RadioButtonRN
                      initial={1}
                      data={data}
                      box={false}
                      circleSize={10}
                      activeColor={"#CBCA9E"}
                      style={{
                        flexDirection: "row-reverse ",
                        justifyContent: "flex-end",
                        left: 160,
                        marginTop: -15,
                        textAlign: "right",
                      }}
                      boxStyle={{
                        justifyContent: "flex-end",
                        textAlign: "right",
                        flexDirection: "column-reverse ",
                      }}
                      textStyle={{
                        fontSize: 17,
                        textAlign: "right",
                        left: 50,
                        bottom: 20,
                        // marginLeft: 160,
                        fontFamily: "Bahij_TheSansArabic-Light",
                        marginRight: -110,
                        // backgroundColor: "#000",
                      }}
                      selectedBtn={(e) =>
                        formprops.setFieldValue("repaymentType", e.label)
                      }
                    />
                      { console.log(formprops.values.installmentRepayment)}
                  </View>
                  {formprops.values.repaymentType == data[1].label ? (
                    formprops.values.expectedDate == today   ||formprops.values.price <10 || formprops.values.expectedDate == tomorrow || (dateDiffDays == 0 && dateDiffMonths == 0 && dateDiffYears == 0 && dateDiffWeeks == 0) ||
                    (year == -1 && month == -1 && days == -1 && week == -1) ?
                    <Text style={[styles.repaymentTextError, { top:-22,marginBottom:4 }]}>
                    لظهور الفترات حدد المبلغ و التاريخ المتوقع لإكمال
                    السداد{" "}
                  </Text> :
                  
                    <DropDownPicker
                      style={styles.DropDownPicker}
                      items={installmentsDropDownArray}
                      searchableError={() => (
                        <Text style={[styles.textError, { marginRight: 4 }]}>
                        لطفًا التاريخ  لا يكون  ضمن الآربع وعشرون ساعة القادمة   
                        </Text>
                      )}
                      placeholder="إختر الفترة"
                      placeholderStyle={{ color: "#CBCBCC" }}
                      value={formprops.values.user}
                      containerStyle={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 50,
                        borderColor: "#CBCA9E",
                      }}
                      style={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 50,
                        borderColor: "#57694C",
                        borderWidth: 1,
                        width: 100,
                      }}
                      arrowColor="#9b9b7a"
                      arrowSize={18}
                      containerStyle={{
                        width: 352,
                        height: 40,
                        marginLeft: 35,
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 60,
                        borderBottomRightRadius: 50,
                        marginBottom: 35,
                      }}
                      itemStyle={{
                        backgroundColor: "#fff",
                        textAlign: "right",
                        flexDirection: "row-reverse",
                        justifyContent: "flex-start",
                        fontFamily: "Bahij_TheSansArabic-Light",
                        // to make the list to the right side
                      }}
                      selectedLabelStyle={{
                        color: "#57694C",
                        fontFamily: "Bahij_TheSansArabic-Light",
                      }}
                      activeLabelStyle={{
                        color: "#57694C",
                      }}
                      labelStyle={{
                        backgroundColor: "#fff",
                        fontSize: 16,
                        textAlign: "right",
                        color: "#000",
                        fontFamily: "Bahij_TheSansArabic-Light",
                      }}
                      style={{
                        flexDirection: "row-reverse",
                        // to support RTL
                      }}
                      onChangeItem={(item) =>
                        this.setState({
                          installmentsState: item.installmentsTypeArr,
                          priceState: item.priceValueArr,
                          durationState: item.durationValueArr,
                        })
                        // (item2) => formprops.setFieldValue('installmentRepayment',item2.label)
                     
                      }
                    />
                   
                  ) : (year == 0 && month == 0 && days == 0 && week == 0) ||
                    (year == -1 && month == -1 && days == -1 && week == -1) ? (
                    <Text style={styles.repaymentTextError}>
                      لظهور المدة حدد التاريخ المتوقع لإكمال السداد{" "}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.textNote,
                        { color: "#9B9B7A", top: -75, right: 10 },
                      ]}
                    >
                      السداد بعد
                      {year != 0 ? (
                        <Text> {ArabicNumbers(year)} سنه </Text>
                      ) : null}
                      {month != 0 ? (
                        year != 0 ? (
                          <Text> و {ArabicNumbers(month)} شهر</Text>
                        ) : (
                          <Text> {ArabicNumbers(month)} شهر </Text>
                        )
                      ) : null}
                      {week != 0 ? (
                        year != 0 || month != 0 ? (
                          <Text> و {ArabicNumbers(week)} إسبوع</Text>
                        ) : (
                          <Text> {ArabicNumbers(week)} إسبوع </Text>
                        )
                      ) : null}
                      {days != 0 ? (
                        year != 0 || month != 0 || week != 0 ? (
                          <Text> و {ArabicNumbers(days)} يوم</Text>
                        ) : (
                          <Text> {ArabicNumbers(days)} يوم </Text>
                        )
                      ) : null}
                    </Text>
                  )}
                  
                  <Text style={[styles.textInputTitle, { marginTop: -15 }]}>
                    السبب{" "}
                  </Text>
                  <TextInput
                    multiline
                    style={[styles.textInput, { height: 75 }]}
                    placeholder="السبب"
                    onChangeText={formprops.handleChange("reason")}
                    value={formprops.values.reason}
                    onBlur={formprops.handleBlur("reason")}
                  />
                  <Text style={styles.textError}>
                    {formprops.touched.reason && formprops.errors.reason}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    
                      style={[styles.button, { backgroundColor: "#D4CEC9" }]}
                      onPress={() => formprops.handleReset(), () => this.props.navigation.navigate("squares")}
              
                      
                     
                      // formprops.setFieldValue("expectedDate",tomorrow),
                      // () =>  formprops.setFieldValue("price",0),

                      //   () =>  formprops.setFieldValue("reason",""),
                      //   () =>this.props.navigation.navigate("squares")
                      // }
                      
                    >
                       {/* <button type='reset'></button> */}
                      <Text style={styles.buttonText}> إلغاء </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#CBCA9E" }]}
                      onPress={
                        // (() => formprops.setFieldValue("installmentsType", "ww"),
                        () => formprops.handleSubmit()
                      }
                    >
                      <Text style={styles.buttonText}> إنشاء طلب </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign: "right",
    fontFamily: "Bahij_TheSansArabic-Light",
    flex: 1,
    marginTop: -40,
    backgroundColor: "#F2F4F1",
    justifyContent: "center",
    fontSize: 25,
  },
  checkboxLabel: {
    marginTop: 15,
    marginLeft: 190,
    fontSize: 17,
    fontFamily: "Bahij_TheSansArabic-Light",
  },
  checkbox: {
    marginLeft: -20,
  },

  DropDownPicker: {
    marginTop: -10,
    borderRadius: 50,
  },

  background: {
    bottom: 500,
    position: "absolute",
    height: 480,
    // paddingBottom:100,
  },

  header: {
    fontFamily: "Bahij_TheSansArabic-Light",
    color: "#404040",
    fontSize: 30,
    margin: 20,
    top: 0,
    marginBottom: 0,
    textAlign: "center",
    justifyContent: "center",
  },
  registerBackground: {
    marginTop: 160,
    // overflow:'scroll',
    // overflow: "hidden",
    flex: 1,
    height: 700,
    
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "#fff",
  },
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 17,
    marginTop: 1,
    marginBottom: 5,
    textAlign: "right",
    color: "#404040",
    marginRight: 35,
  },

  button: {
    alignItems: "center",
    width: 170,
    height: 30,
    marginTop: 50,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    bottom: 30,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    fontSize: 30,
  },

  textInput: {
    marginBottom: 13,
    marginLeft: 35,
    alignItems: "center",
    borderColor: "#DBDBDB",
    width: 350,
    backgroundColor: "#fff",
    height: 38,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 5,
    textAlign: "right",
    paddingRight: 10,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  textNote: {
    color: "#9B9B7A",
    fontSize: 13,
    bottom: 30,
    textAlign: "right",
    marginBottom: -10,
    marginRight: 30,
    fontFamily: "Bahij_TheSansArabic-Bold",
  },
  textError: {
    color: "#A4161A",
    fontSize: 13,
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    marginRight: 30,
    bottom: 10,
  },
  repaymentTextError: {
    color: "#A4161A",
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 13,
    bottom: 75,
    textAlign: "right",
    marginBottom: -10,
    marginRight: 30,
  },
  radio: {
    marginTop: -35,
  },
  datePicker: {
    bottom: 52,
    left: 56,
    paddingRight: 340,
  },
});

export default withNavigation(Request);
