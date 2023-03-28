---
marp: true
footer: CS571 Building User Interfaces | Cole Nelson | Lecture 16: React Native 2
paginate: true
theme: uncover
style: |
  section {
    text-align: left
  }
  .center-info {
    text-align: center
  }
---


<br>

# **React Native 2**
### CS571: Building User Interfaces


<br>

#### Cole Nelson

---

### Announcements

 - Thursday's class will be recorded & uploaded to Kaltura. [CypherCon 2023](https://cyphercon.com/). **No in-person class.**
 - Modality Feedback:
   - **In-Person:** Asking questions, meeting people, consistent schedule, food, end-of-class q's
   - **Online:** Flexibility, pausing/speed control, no Bascom Hill

---

### What will we learn today?

<div>

 - A review of React Native
 - Other core React Native concepts
 - Using animations
 - Using modals

</div>

---

### What is "True Native" Development?

Building specifically for the device (e.g. Android or iOS) that you want to support.

**iOS**: Objective-C or Swift w/ Cocoapods
**Android**: Java or Kotlin w/ Maven or Gradle

---

### Pros and Cons of True Native

**Pros**

<div>

 - Organic User Experience
 - Optimized Apps
 - Fine-Grained Control

</div>

**Cons**

<div>

 - Expensive
 - Little Code Reuse
 - Less Sense of Abstraction

 </div>

---

### Alternatives to True Native

**No mobile app!** Do we really need an app? Could a responsive webpage be just as effective?

**WebView!** Can we take our existing code and just slap it into a WebView? e.g. Apache Cordova

**Cross-Platform!** Can we use a library or framework that will make our code work natively on Android *and* iOS? e.g. React Native


---

### What is React Native?

A JS framework for building native, cross-platform mobile applications using React, developed by Facebook in 2015.

Unlike ReactJS, which was a library, React Native is a framework that includes everything* that we will need to build mobile applications.

React Native supports iOS and Android development.


---

### What stays the same?

<div>

 - Using NPM for our library management
 - Using complex APIs
 - Core React features
   - React Hooks (useEffect, useState, etc.)
   - Passing props and state management
   - Controlled vs Uncontrolled Inputs
   - Memoization

</div>


---

### What changes?
 - This isn't a browser!
   - No more DOM!
   - No more CSS!
     - No more Bootstrap!
   - No more sessionStorage, localStorage, or cookies.
 - Wider variety of inputs
   - Sensors
   - Gestures
 - [React Navigation](https://reactnavigation.org/) vs [React Router](https://reactrouter.com/en/main)

---

### Conversions to Know

![bg 75%](figures/tableeq.png)

<br><br><br><br><br><br><br><br>

[Image Source](https://reactnative.dev/docs/intro-react-native-components)

---


### Hello World!

```javascript
import React from 'react';
import { Text, View } from 'react-native';

function MyApp() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Try editing me! 🎉
      </Text>
    </View>
  );
}

export default MyApp;
```

[Expo Snack](https://snack.expo.dev/)

---

### Styling

Because React Native does not use a "browser", we can't use CSS styles. Instead, we create JavaScript stylesheets.

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 40,
  },
  ...
});
```

---

### Styling

Style definitions can be done inline or via stylesheets. You can also combine both methods.

```javascript
<View>
 <Text style={styles.label}>First label</Text>
 <Text style={{fontSize: 28, color:'tomato'}}>Second label</Text>
 <Text style={[styles.label, {fontSize: 20, color:'gray'}]}>Third label</Text>
</View>
```

[Snack Solution](https://snack.expo.dev/@ctnelson1997/styling)

---

### Images

`Image` not `img` (must be imported!)

Must specify a width and height: the default is 0!

`source` not `src` which takes an object (not a string)

```jsx
<Image
  style={{
    width: 100,
    height: 100
  }}
  source={{
    uri: "https://example.com/me.png"
  }}
/>
```

---

### Cross-Platform Development

React Native provides a number of components that utilize platform capabilities that may not be available in other platforms, thus for cross-platform development, we need to utilize multiple platform-specific components.

e.g. `TouchableNativeFeedback` only works on Android; a *similar* effect can be achieved using `TouchableHighlight` on iOS.

---

### Differentiating by Platform

```javascript
if (Platform.OS === 'android') {
  return (
    <TouchableNativeFeedback> ... </TouchableNativeFeedback>
  );
} else {
  return (
    <TouchableHighlight> ... </TouchableHighlight>
  );
}
```

Optionally, create two components e.g. `MyButton.ios.js` and `MyButton.android.js.`

[Snack Solution](https://snack.expo.dev/@ctnelson1997/platform-specific-components-snack)

---

### Cross-Platform: Dimensions

Mobile devices vary significantly in screen size, and we o"en need to obtain screen dimensions of the device using the `Dimensions` class in `react-native`.

```javascript
getScreenSize = () => {
 const screenWidth = Math.round(Dimensions.get('window').width);
 const screenHeight = Math.round(Dimensions.get('window').height);
 return { screenWidth: screenWidth, screenHeight: screenHeight };
} 
```

---

### ScrollView

Like a `View`, but scrollable! Make sure it is flex-ible.

```jsx
<View style={{flex: 1}}>
  <ScrollView>
    { /* A bunch of content here! */ }
  </ScrollView>
</View>
```

Alternatively, `FlatList` functions the same, but does lazy loading. Furthermore, `SectionList` provides more configuration options.

---

# FindMyBadgers Demo
As a React Native app.

[Snack Solution](https://snack.expo.dev/@ctnelson1997/find-my-badgers)

---

### React **Native**

Things that differentiate mobile from the web...

<div>

 - Animations
 - Navigation
 - Gestures
 - Sensing

</div>

---

### Animations using `Animated`

Provides *visual aesthetics*, *entertainment* and *feedback*.

```jsx
import { Animated } from 'react-native'
```

May also consider using a third-party-library like [react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated) or [lottie](https://www.npmjs.com/package/lottie-react-native).

[Animated Docs](https://reactnative.dev/docs/animated)

---

### Animated

`Animated` provides animations for...

<div>

 - `View`
 - `Text`
 - `Image`
 - `ScrollView`
 - `FlatList`
 - `SectionList`

</div>

... e.g. `<Animated.View>{/* ... */}</Animated.View>`

---

### Animated

These are animated using...

<div>

 - `Animated.timing`, 
 - `Animated.spring`
 - `Animated.decay`
 
</div>

... which manipulate an `Animated.Value`, e.g.

```jsx
Animated.timing(opVal, {
  toValue: 1,
  duration: 10000, // in ms
  useNativeDriver: true // must include
})
```

---

### Animated

`Animated.Value` is used in combination with [useRef](https://react.dev/reference/react/useRef).

```jsx
const opVal = useRef(new Animated.Value(0)).current
```

To run an animation on page load...

```jsx
useEffect(() => {
  Animated.timing(opVal, {
    toValue: 1,
    duration: 10000,
    useNativeDriver: true
  }).start() // don't forget this!
}, [])
```

---

```jsx
export default function FadeInView(props) {
  const opVal = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opVal, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View>
      <Animated.View
        style={{
          height: 100, width: 100, opacity: opVal
          backgroundColor: "cyan",
        }}>
      </Animated.View>
    </View>
  );
}
```

[Expo Snack](https://snack.expo.dev/@ctnelson1997/simple-animation)


---

### Animated

Can control many animations using...

<div>

 - `Animated.parallel`
 - `Animated.sequence`
 - `Animated.loop`

</div>

###

`start()` and `stop()` apply to the set of animations

---

In parallel...

```jsx
useEffect(() => {
  Animated.parallel([
    Animated.timing(height, {
      toValue: 800,
      duration: 10000,
      useNativeDriver: false, // cannot use native driver for height/width!
    }),
    Animated.timing(width, {
      toValue: 500,
      duration: 10000,
      useNativeDriver: false,
    })
  ]).start()
}, []);
```

---

In sequence...

```jsx
useEffect(() => {
  Animated.sequence([
    Animated.timing(sizeVal, {
      toValue: 500,
      duration: 10000,
      useNativeDriver: false,
    }),
    Animated.timing(sizeVal, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    })
  ]).start()
}, []);
```

---

In loop...

```jsx
useEffect(() => {
  Animated.loop( // not an array!
    Animated.sequence([
      Animated.timing(sizeVal, {
        toValue: 500,
        duration: 10000,
        useNativeDriver: false,
      }),
      Animated.timing(sizeVal, {
        toValue: 0,
        duration: 10000,
        useNativeDriver: false,
      })
    ])
  ).start()
}, []);
```

---

# Animated Demo
In class, let's [build this](https://snack.expo.dev/@ctnelson1997/animated-example) together.

---

### Animated

You cannot *directly* add/subtract/multiply/divide `Animated.value`. Instead, you must use...

<div>

 - `Animated.add(v1, v2)`
 - `Animated.subtract(v1, v2)`
 - `Animated.multiply(v1, v2)`
 - `Animated.divide(v1, v2)`

</div>

---

### Animated

e.g. start at 50 and grow from there.

```jsx
<Animated.View
  style={{
    backgroundColor: "blue",
    height: Animated.add(height, 50),
    width: Animated.add(width, 50)
  }}>
</Animated.View>
```

---

### Your turn!

Fork [FindMyBadger (React Native)](https://snack.expo.dev/@ctnelson1997/find-my-badgers). Can you add animations so that...
 - The picture fades in?
 - The picture gradually becomes bigger?
 - The screen automatically scrolls down to the bottom?

[Expo Snack Solution](https://snack.expo.dev/@ctnelson1997/findmybadgers-animated)

---

### Modal

A secondary window.

```jsx
import { Modal } from 'react-native'
```

Alternative: [react-native-modal](https://www.npmjs.com/package//react-native-modal)

![bg left](figures/modal_close.png)
![bg right](figures/modal_open.png)

---

### Modal

What you need...

<div>

 1. Something to open the modal
 2. Some content inside the modal
 3. Something to close the modal

</div>

###

We often manage whether the modal is open or closed using a state variable, e.g.

```jsx
const [modalVisible, setModalVisible] = useState(false);
```

---

### Modal

A modal is nothing more than a secondary overlay! You will need to style it.

```jsx
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // ...
```

---

### Modal Properties

 - `animationType`: 'slide', 'fade', 'none'
 - `onShow`: callback func
 - `onRequestClose`: callback func
 - `transparent`: true/false
 - `visible`: true/false often handled by a state variable

[Modal Docs](https://reactnative.dev/docs/modal)
[Modal Snack](https://snack.expo.dev/@ctnelson1997/modal-example)

---

# FindMyBadgers Demo
As a React Native app with animations and modals.

[Snack Solution](https://snack.expo.dev/@ctnelson1997/findmybadgers-animated-modal)


---

### What did we learn today?

<div>

 - A review of React Native
 - Other core React Native concepts
 - Using animations
 - Using modals

</div>

---

# Questions?
