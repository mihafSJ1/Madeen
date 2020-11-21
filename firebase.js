firebase
      .database()
      .ref(`Client/` + CurrentID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("im client")
          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID) //current
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              title: title,
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,//العميل
                to: reciveID,
              },
            });

          firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID) //designer
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              title: title,
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,
                to: reciveID,
              },
            });

          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
                title: title,
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );
        }
      });
    //------------------------------------------------------------------------------------------------------

    firebase
      .database()
      .ref(`GraphicDesigner/` + CurrentID)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("im GraphicDesigner")
          console.log("reciveID" + reciveID)
          console.log("CurrentID" + CurrentID)
          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              title: title,
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,
                to: reciveID,
              },
            });


          firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID)
            .collection('AllChat')
            .doc(chatID) // بيكون اي دي الفورم
            .collection("MESSAGES")
            .add({
              title: title,
              text,
              createdAt: new Date().getTime(),
              user: {
                _id: CurrentID,
                to: reciveID,
              },
            });

          firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID)
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
                title: title,
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );
          firebase
            .firestore()
            .collection("UserID")
            .doc(CurrentID)
            .collection("AllChat")
            .doc(chatID) // بيكون اي دي الفورم
            .set(
              {
                title: title,
                latestMessage: {
                  to: reciveID,
                  text,
                  createdAt: new Date().getTime(),
                },
              },
              { merge: true }
            );

          firebase
            .firestore()
            .collection("UserID")
            .doc(reciveID)
            .set({
              field: ""
            })
        }
      });