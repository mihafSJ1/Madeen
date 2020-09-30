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
} from "react-native";
import { CheckBox } from "react-native-elements";
import * as yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import CalendarIconComponent from "./CalendarIconComponent";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import FirebaseKeys from "./FirebaseKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}

//-------------------------------------------- Data
const numericKeyboard = /[^0-9]/;

const data = [
  {
    label: "السداد دفعة واحدة",
  },
  {
    label: "السداد بالتقسيط",
  },
];

const installmentsArray = [
  {
    label: "",
    priceValueArr: "",
    durationValueArr: "",
    installmentsTypeArr: "yearly",
    selected: true,
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

const installmentsDropDownArray = [];

var year,
  days,
  week,
  month = 0;

var dateDiffDays,
  dateDiffMonths,
  dateDiffYears = new Date();

export default class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      installmentsState: "",
      priceState: 0,
      durationState: 0,
      submittedDateState: moment().format("YYYY-MM-DD"),
    };
  }
  //-------------------------------------------- Calculations
  repaymentOnce(eDate) {
    const submittedDate = moment();
    const expectedDate = moment(eDate);
    dateDiffDays = expectedDate.diff(submittedDate, "days");
    dateDiffMonths = expectedDate.diff(submittedDate, "months");
    dateDiffYears = expectedDate.diff(submittedDate, "years");

    year = Math.round(dateDiffDays / 365);
    week = Math.round((dateDiffDays % 365) / 7);
    month = Math.round((dateDiffDays % 365) / 30);
    days = Math.round((dateDiffDays % 365) % 7);
  }

  repayementInstallments(price) {
    if (year != 0) {
      var yearlyPrice = Math.round(price / year);
      installmentsArray[0].label =
        ArabicNumbers(yearlyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(year) +
        " سنة";
      installmentsArray[0].priceValueArr = yearlyPrice;
      installmentsArray[0].durationValueArr = year;
      installmentsArray[0].installmentsTypeArr = "yearly";
    }

    if (month != 0) {
      var monthlyPrice = Math.round(price / month);
      installmentsArray[1].label =
        ArabicNumbers(monthlyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(month) +
        " شهر";
      installmentsArray[1].priceValueArr = monthlyPrice;
      installmentsArray[1].durationValueArr = month;
      installmentsArray[1].installmentsTypeArr = "monthly";
    }

    if (week != 0) {
      var weeklyPrice = Math.round(price / week);
      installmentsArray[2].label =
        ArabicNumbers(weeklyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(week) +
        " اسبوع";
      installmentsArray[2].priceValueArr = weeklyPrice;
      installmentsArray[2].durationValueArr = week;
      installmentsArray[2].installmentsTypeArr = "weekly";
    }

    if (days != 0) {
      var dailyPrice = Math.round(price / days);
      installmentsArray[3].label =
        ArabicNumbers(dailyPrice) +
        " ريال سعودي لمدة " +
        ArabicNumbers(days) +
        " يوم";
      installmentsArray[3].priceValueArr = dailyPrice;
      installmentsArray[3].durationValueArr = days;
      installmentsArray[3].installmentsTypeArr = "daily";
    }

    for (var i = 0, j = 0; i < installmentsArray.length; i++) {
      if (installmentsArray[i].durationValueArr == 0) continue;
      installmentsDropDownArray[j++] = installmentsArray[i];
    }
  }

  //-------------------------------------------- Form Submission
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  onSubmitPress(values) {
    const { currentUser } = this.state;
    const requestID = firebase.database().ref("requests/").push({
      price: values.price,
      expectedDate: values.expectedDate,
      submittedDate: this.state.submittedDateState,
      repaymentType: values.repaymentType,
      reason: values.reason,
      userid: currentUser.uid,
      rqeuestStatus: "Waiting",
      installemntPrice: this.state.priceState,
      installemntDuration: this.state.durationState,
      installmentsType: this.state.installmentsState,
    });

    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .push({
        requestId: requestID.key,
      });
    alert(requestID.key);
  }

  requestSchema = yup.object({
    price: yup
      .number()
      .typeError("المبلغ لا بد أن يكون بأرقام إنجليزية")
      .required("ادخال المبلغ مطلوب")
      .integer("المبلغ لا بد أن  يكون عدد صحيح")
      .max(20000, "المبلغ لا بد أن يكون أقل من أو يساوي ٢٠ ألف ريال")
      .min(1, "المبلغ لا بد أن يكون أكبر من أو يساوي ريال"),
    expectedDate: yup.string().required("التاريخ المتوقع لإكمال السداد مطلوب"),
    reason: yup.string().min(3, "السبب لا بد أن  يكون ٣ أحرف فأكثر"),
    //trim spaces
  });

  //-------------------------------------------- Rencdring react component
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={require("./assets/RequestBackground.png")}
        />
        <View style={styles.registerBackground}>
          <KeyboardAwareScrollView>
            <Text style={styles.header}>إنشاء طلب </Text>
            <Formik
              validationSchema={this.requestSchema}
              initialValues={{
                user: "",
                usersSelect: false,
                price: "",
                expectedDate: new Date(),
                repaymentType: "",
                reason: "",
                rqeuestStatus: "Waiting",
                submittedDate: new Date(),
              }}
              onSubmit={(values, action) => {
                alert(this.state.installmentsState);
                this.onSubmitPress(values);
              }}
            >
              {(props, setFieldValue) => (
                <View style={styles.requestContainer}>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>
                      التدين من شخص محدد{" "}
                    </Text>
                    <CheckBox
                      style={styles.checkbox}
                      checkedColor="#CBCA9E"
                      checkedIcon="check-box"
                      iconType="material"
                      uncheckedIcon="check-box-outline-blank"
                      onPress={() =>
                        props.setFieldValue(
                          "usersSelect",
                          !props.values.usersSelect
                        )
                      }
                      checked={props.values.usersSelect}
                    />
                  </View>

                  <Text style={styles.textNote}>
                    ملاحظة : عند اختيار هذا الخيار سيظهر طلبك للشخص المحدد فقط{" "}
                  </Text>

                  {props.values.usersSelect ? (
                    <DropDownPicker
                      style={styles.DropDownPicker}
                      items={[
                        { label: "رهام", value: "رهام", selected: true },
                        { label: "رغد", value: "رغد" },
                      ]}
                      value={props.values.user}
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
                        props.setFieldValue(users, item.label)
                      }
                    />
                  ) : null}

                  <Text style={styles.textInputTitle}>المبلغ </Text>
                  <TextInput
                    style={styles.textInput}
                    // placeholderTextColor="#57694C"
                    placeholder="المبلغ"
                    value={props.values.price}
                    onChangeText={props.handleChange("price")}
                    keyboardType="numeric"
                    onBlur={props.handleBlur("price")}
                  />
                  <Text style={styles.textError}>
                    {props.touched.price && props.errors.price}
                  </Text>
                  <Text style={styles.textInputTitle}>
                    التاريخ المتوقع لإكمال السداد{" "}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    // placeholderTextColor="#57694C"
                    placeholder="التاريخ "
                    value={props.values.expectedDate}
                    editable={false}
                    onChangeText={
                      (this.repaymentOnce(props.values.expectedDate),
                      this.repayementInstallments(props.values.price))
                    }
                    onBlur={props.handleBlur("expectedDate")}
                  />

                  <DatePicker
                    hideText
                    style={styles.datePicker}
                    date={props.values.expectedDate}
                    mode="date"
                    calendar="arabic"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={new Date()}
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
                    onDateChange={(date) => {
                      props.setFieldValue("expectedDate", date);
                    }}
                  />
                  <Text style={styles.textError}>
                    {props.touched.expectedDate && props.errors.expectedDate}
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
                        props.setFieldValue("repaymentType", e.label)
                      }
                    />
                  </View>
                  {props.values.repaymentType == data[1].label ? (
                    <DropDownPicker
                      style={styles.DropDownPicker}
                      items={installmentsDropDownArray}
                      placeholder="إختر الفترة"
                      placeholderStyle={{ color: "#CBCBCC" }}
                      value={props.values.user}
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
                      }
                    />
                  ) : (((year == month) == days) == week) == 0 ? (
                    <Text
                      style={[
                        styles.textNote,
                        { color: "#9B9B7A", top: -75, right: 10 },
                      ]}
                    >
                      السداد بعد {ArabicNumbers(year)} سنه و{" "}
                      {ArabicNumbers(month)} أشهر و {ArabicNumbers(week)} إسبوع
                      و {ArabicNumbers(days)} يوم
                    </Text>
                  ) : null}
                  <Text style={styles.textInputTitle}>السبب </Text>
                  <TextInput
                    multiline
                    style={[styles.textInput, { height: 100 }]}
                    placeholder="السبب"
                    onChangeText={props.handleChange("reason")}
                    value={props.values.reason}
                    onBlur={props.handleBlur("reason")}
                  />
                  <Text style={styles.textError}>
                    {props.touched.reason && props.errors.reason}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#D4CEC9" }]}
                      onPress={() => navigation.navigate("Home")}
                    >
                      <Text style={styles.buttonText}> إالغاء </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#CBCA9E" }]}
                      onPress={
                        (() => props.setFieldValue("installmentsType", "ww"),
                        () => props.handleSubmit())
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
    //  overflow:"hidden",
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

  registerBackground: {
    flex: 1,
    height: 200,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: "#fff",
  },
  DropDownPicker: {
    marginTop: -10,
    borderRadius: 50,
  },

  background: {
    bottom: 400,
    position: "absolute",
    height: 480,
    // paddingBottom:100,
  },
  header: {
    fontFamily: "Bahij_TheSansArabic-Light",
    color: "#404040",
    fontSize: 30,
    margin: 20,
    top: 30,
    textAlign: "center",
    justifyContent: "center",
  },
  registerBackground: {
    marginTop: 70,
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
    marginTop: 10,
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

  radio: {
    marginTop: -35,
  },
  datePicker: {
    bottom: 52,
    left: 56,
    paddingRight: 340,
  },
});
