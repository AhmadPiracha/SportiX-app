  // const registerUser = async () => {
  //   setIsLoading(true);
  
  //   const passwordHash = SHA256(password).toString();
  
  //   try {
  //     // Create user in Firebase Authentication
  //     const userCredential = await auth.createUserWithEmailAndPassword(email, passwordHash);
  //     const user = userCredential.user;
  
  //     // Send email verification
  //     await user.sendEmailVerification();
  
  //     // Wait for user to verify email before adding to Firestore
  //     auth.onAuthStateChanged(async (user) => {
  //       if (user && user.emailVerified) {
  //         // Define variables for user data
  //         const userData = {
  //           displayName: displayName,
  //           email: email,
  //           password: passwordHash,
  //         };
  
  //         // Add user data to Firestore collection
  //         await db.collection("users").doc(user.uid).set(userData);
  
  //         console.log("User registered successfully!");
  //         setIsLoading(false);
  //         setDisplayName("");
  //         setEmail("");
  //         setPassword("");
  //         setConfirmPassword("");
  //         navigation.navigate("Login");
  //       } else if (user) {
  //         setIsLoading(false);
  //         alert("Please verify your email before continuing.");
  //       }
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     Alert.alert(error.message);
  //   }
  // };

    // const registerUser = () => {
  //   setIsLoading(true);
  //   // auth
  //   //   .createUserWithEmailAndPassword(email, password)
  //   //   .then(() => {
  //   //     auth.currentUser
  //   //       .sendEmailVerification({
  //   //         handleCodeInApp: true,
  //   //         url: "https://sportix-app-7e67e.web.app",
  //   //       })
  //   //       .then(() => {
  //   //         console.log("Email sent!");
  //   //         console.log(auth.currentUser);
  //   //         // Alert.alert(
  //   //         //   "Email sent!",
  //   //         //   "Please check your email to verify your account."
  //   //         // );
  //   //         alert("Please check your email to verify your account.");
  //   //         if (auth.currentUser.emailVerified) {
  //   //           db.collection("users").doc(auth.currentUser.uid).set({
  //   //             displayName: displayName,
  //   //             email: email,
  //   //             password: password,
  //   //           });
  //   //         } else {
  //   //           alert("Please check your email");
  //   //         }
  //   //       })
  //   //       .catch((error) => {
  //   //         console.log(error.message);
  //   //       })
  //   //       .then(() => {
  //   //         db.collection("users").doc(auth.currentUser.uid).set({
  //   //           displayName: displayName,
  //   //           email: email,
  //   //           password: password,
  //   //         });
  //   //       })
  //   //       .catch((error) => {
  //   //         console.log(error.message);
  //   //       })
  //   //       .then(() => {
  //   //         console.log("User registered successfully!");
  //   //         setIsLoading(false);
  //   //         setDisplayName("");
  //   //         setEmail("");
  //   //         setPassword("");
  //   //         setConfirmPassword("");
  //   //         navigation.navigate("Login");
  //   //       })
  //   //       .catch((error) => {
  //   //         setIsLoading(true);
  //   //         Alert.alert(error.message);
  //   //       });
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });

  //   // UPDATED CODE FOR FIREBASE AUTHENTICATION AND VERIFICATION

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       auth.currentUser
  //         .sendEmailVerification({
  //           handleCodeInApp: true,
  //           url: "https://sportix-app-7e67e.web.app",
  //         })
  //         .then(() => {
  //           console.log("Email sent!");
  //           console.log(auth.currentUser);
  //           alert("Please check your email to verify your account.");
  //           // Wait for user to verify email before adding to Firebase
  //           auth.onAuthStateChanged((user) => {
  //             if (user) {
  //               if (user.emailVerified) {
  //                 // Define variables for user data
  //                 const userData = {
  //                   displayName: displayName,
  //                   email: email,
  //                   password: password,
  //                 };
  //                 // Add user data to Firestore collection
  //                 db.collection("users")
  //                   .doc(user.uid)
  //                   .set(userData)
  //                   .then(() => {
  //                     console.log("User registered successfully!");
  //                     setIsLoading(false);
  //                     setDisplayName("");
  //                     setEmail("");
  //                     setPassword("");
  //                     setConfirmPassword("");
  //                     navigation.navigate("Login");
  //                   })
  //                   .catch((error) => {
  //                     setIsLoading(true);
  //                     Alert.alert(error.message);
  //                   });
  //               } else {
  //                 alert("Please verify your email before continuing.");
  //               }
  //             }
  //           });
  //         })
  //         .catch((error) => {
  //           console.log(error.message);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const registerUser = () => {
  //   setIsLoading(true);

  //   // auth
  //   //   .createUserWithEmailAndPassword(email, password)
  //   //   .then(() => {
  //   //     auth.currentUser
  //   //       .sendEmailVerification({
  //   //         handleCodeInApp: true,
  //   //         url: "https://sportix-app-7e67e.web.app",
  //   //       })
  //   //       .then(() => {
  //   //         console.log("Email sent!");
  //   //         console.log(auth.currentUser);
  //   //         alert("Please check your email to verify your account.");

  //   //         // Define variables for user data
  //   //         const userData = {
  //   //           displayName: displayName,
  //   //           email: email,
  //   //           password: password,
  //   //         };

  //   //         // Wait for user to verify email before adding to Firebase
  //   //         const unsubscribe = auth.onAuthStateChanged((user) => {
  //   //           if (user && user.emailVerified) {
  //   //             // Add user data to Firestore collection
  //   //             db.collection("users")
  //   //               .doc(user.uid)
  //   //               .set(userData)
  //   //               .then(() => {
  //   //                 console.log("User registered successfully!");
  //   //                 setIsLoading(false);
  //   //                 setDisplayName("");
  //   //                 setEmail("");
  //   //                 setPassword("");
  //   //                 setConfirmPassword("");
  //   //                 navigation.navigate("Login");
  //   //               })
  //   //               .catch((error) => {
  //   //                 setIsLoading(false);
  //   //                 Alert.alert(error.message);
  //   //               })
  //   //               .finally(() => {
  //   //                 // Remove the listener once it's called
  //   //                 unsubscribe();
  //   //               });
  //   //           } else if (user) {
  //   //             setIsLoading(false);
  //   //             alert("Please verify your email before continuing.");
  //   //           }
  //   //         });

  //   //         // Add a timeout to ensure that the listener is removed after a certain amount of time
  //   //         setTimeout(() => {
  //   //           unsubscribe();
  //   //         }, 10000);
  //   //       })
  //   //       .catch((error) => {
  //   //         setIsLoading(false);
  //   //         console.log(error.message);
  //   //       });
  //   //   })
  //   //   .catch((error) => {
  //   //     setIsLoading(false);
  //   //     console.log(error);
  //   //   });

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       // Define variables for user data
  //       const userData = {
  //         displayName: displayName,
  //         email: email,
  //         password: password,
  //       };
  //       db.collection("users")

  //         .doc(auth.currentUser.uid)
  //         .set(userData)
  //         .then(() => {
  //           console.log("User registered successfully!");
  //           setIsLoading(false);
  //           setDisplayName("");
  //           setEmail("");
  //           setPassword("");
  //           setConfirmPassword("");
  //           navigation.navigate("Login");
  //         })
  //         .catch((error) => {
  //           setIsLoading(false);
  //           Alert.alert(error.message);
  //         });
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //     });
  // };

  // const registerUser = async () => {
  //   setIsLoading(true);

  //   const passwordHash = SHA256(password).toString();

  //   auth
  //     .createUserWithEmailAndPassword(email, passwordHash)
  //     .then(() => {
  //       const userData = {
  //         displayName: displayName,
  //         email: email,
  //         password: passwordHash,
  //       };

  //       db.collection("users")
  //         .doc(auth.currentUser.uid)
  //         .set(userData)
  //         .then(() => {
  //           console.log("User registered successfully!");
  //           setIsLoading(false);
  //           setDisplayName("");
  //           setEmail("");
  //           setPassword("");
  //           setConfirmPassword("");
  //          navigation.navigate("Login")
  //           // console.log("Navigation Called")
  //         })
  //         .catch((error) => {
  //           setIsLoading(false);
  //           Alert.alert(error.message);
  //         });
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //     });
  // };
