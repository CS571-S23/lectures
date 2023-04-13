---
marp: true
footer: CS571 Building User Interfaces | Cole Nelson | Lecture 20: React Native 4
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

# **React Native 4**
### CS571: Building User Interfaces


<br>

#### Cole Nelson

---

### What will we learn today?

<div>

 - How to pass data using React Navigation?
 - How to perform "switch" navigation?
 - How to store secrets on mobile devices?
 - How to do advanced gestures and animations?
 - How to use sensors?
 - How to deploy our apps?

</div>

---

### React Navigation

Last time we covered...

<div>

 - Stack Navigation
 - Tabs Navigation
 - Drawer Navigation

</div>

###

How do we pass data down?

<div>

 - Using context
 - Using [render callbacks](https://reactnavigation.org/docs/hello-react-navigation#passing-additional-props)

</div>

![bg right:33% w:350](figures/rn_nav.svg)

---

### Passing Data Down

**Problem:** Create a drawer with many tools in it.

```javascript
  const [tools, setTools] = useState([
    { name: 'hammer', weight: 2, dangerous: false },
    { name: 'screwdriver', weight: 1, dangerous: false },
    { name: 'sawzall', weight: 6, dangerous: true }
  ]);
```

![bg right:25%](figures/drawer.png)

---

### Passing Data Down

Displaying the tool data.

```jsx
export default function ToolScreen(props) {
  return <View>
    <Text>I am a {props.name}</Text>
    <Text>I weigh {props.weight} pounds</Text>
    {
      props.dangerous ?
        <Text>I am dangerous</Text> :
        <Text>I am not dangerous</Text>
    }
  </View>
}
```

![bg right:33% w:350](figures/drawer_tool.png)

---

### Creating Navigator

```jsx
    <NavigationContainer>
      <ToolDrawer.Navigator>
        <ToolDrawer.Screen name="Landing" component={LandingScreen}/>
        <ToolDrawer.Screen name="Hammer" component={ToolScreen}/>
        <ToolDrawer.Screen name="Screwdriver" component={ToolScreen}/>
        <ToolDrawer.Screen name="Sawzall" component={ToolScreen}/>
      </ToolDrawer.Navigator>
    </NavigationContainer>
```

❌ hardcoding tool names
❌ not passing tool data

[Snack Example](https://snack.expo.dev/@ctnelson1997/tooldrawer-static)

---

```jsx
<NavigationContainer>
  <ToolDrawer.Navigator>
    <ToolDrawer.Screen name="Landing" component={LandingScreen}/>
    {
      tools.map(tool => {
        return <ToolDrawer.Screen
          key={tool.name}
          name={tool.name}
          component={ToolScreen}
        />
      })
    }
  </ToolDrawer.Navigator>
</NavigationContainer>
```

Similar Solution: [BadgerChat](https://github.com/CS571-S23/hw6/blob/main/src/components/structural/BadgerApp.js)

❌ not passing tool data


---

```jsx
<NavigationContainer>
  <ToolDrawer.Navigator>
    <ToolDrawer.Screen name="Landing" component={LandingScreen}/>
    {
      tools.map(tool => {
        return <ToolDrawer.Screen key={tool.name} name={tool.name}>
          {(props) => <ToolScreen {...props} {...tool}/>}
        </ToolDrawer.Screen>
      })
    }
  </ToolDrawer.Navigator>
</NavigationContainer>
```

✅ correct way!

[Snack Example](https://snack.expo.dev/@ctnelson1997/tooldrawer-dynamic)

---

### Switch Navigation

There is a fourth, "informal" navigation.

⚠️ Do not use the one from React Navigation! It is very out-of-date. [It existed in React Navigation < 4.x](https://reactnavigation.org/docs/4.x/switch-navigator/).

---

### "Switch" Navigation

```javascript
isSignedIn ? (
  <>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </>
) : (
  <>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </>
);
```

[React Navigation AuthFlow](https://reactnavigation.org/docs/auth-flow/)

---

### "Switch Navigation"

**Premise**: perform a conditional render.

**If** the user is signed in, show them their needs feed.

**Else** give the user the option to sign in or sign up.


[Snack Solution](https://snack.expo.dev/@ctnelson1997/switch-navigation)

---

# HW10 Demo
Switch navigation and data passing.

---

# Secure Storage
Storing secrets (asynchronously!)

---

### Authentication

**Web Development**

<div>

 - Interface with the *user's browser.*
 - Prefer `HTTP-Only` cookies.

</div>

<br/>

**Mobile Development**

<div>

 - Interface with the *user's operating system.*
 - Prefer OS-level secure encrypted storage.

</div>

---

### Authentication

**Web:** Specify *option* `include: 'credentials'`

```javascript
fetch("https://example.com/api/submit", {
  method: "POST",
  credentials: "include",
  // ...
```


---

### Authentication

**Mobile**: Specify...

<div>

 - *header* `Authorization`
 - *value* `Bearer <JWT>`

</div>

###

```javascript
fetch("https://example.com/api/submit", {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
  // ...
```

If the request has a body, don't forget `Content-Type`!

###

---


# Authentication

[Download HW10 Postman Collection](https://canvas.wisc.edu/courses/345833/files/31914122?module_item_id=6009455)

---


### Secure Storage

**Uh oh!** We have to store a JWT?

 - React has no built-in way to handle credentials!😮
 - [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)
   - Only works on Android and iOS -- not web!
 - Stores key/value pairs to *persistent* storage.
 - Up to 2KB of data per value (small!)
 - Cannot store emojis 😔
 - Additional options for passcode 🔒 and biometrics 👉

---

### Secure Storage
Secure storage is asynchronous in nature.

<div>

 - `getItemAsync(key)`
 - `setItemAsync(key, val)`
 - `deleteItemAsync(key)`

</div>

<br/>

**Note:** Key refers to a storage key (think HashMap) *not* an encryption key!

---

### Secure Storage

[expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) shows an example of `async`/`await`... What is this?...

###

Same thing as `then` and `catch` on a `Promise` (think `fetch`)... just a slightly different syntax!

###

We'll cover `async` / `await` in DialogFlow!

---

# Secure Storage
[CS571-ifying](https://snack.expo.dev/@ctnelson1997/secure-store) the expo-secure-store example.

**Use your phone,** not the web!


---

# Advanced Gestures
Making use of diverse mobile inputs ✌ ☝ 🤚 👌 👍

---

![bg 70%](figures/gestures.jpg)

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

[Image Source](https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/11/Screen-Shot-2015-11-09-at-14.36.39-520x340.jpg)

---

### Gestures
React Native [provides methods](https://reactnative.dev/docs/gesture-responder-system) to detect when and where the user's fingers move.

Higher-level gesture response libraries...

<div>

 - react-native's [PanResponder](https://reactnative.dev/docs/panresponder)
 - [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler)
 - component libraries, e.g. [react-native-paper](https://reactnativepaper.com/)

</div>

---

# PanResponder & Animated

[See S22 Example](https://snack.expo.dev/@yuhangzhao/notifications-swipe)

---

## react-native-gesture-handler & react-native-reanimated

[See Example](https://snack.expo.dev/@ctnelson1997/react-native-gesture-handler)

--- 

### Component Library Gestures

**react-native**'s Button `onPress`

**react-native-paper**'s Card `onPress` and `onLongPress`

**react-native-elements**' Slider `onSliding`

**react-native-maps**' Marker `onDrag`

**react-navigation**'s Drawer gesture

---

### Sensors

Use `expo-sensors` instead of `react-native-sensors`

<div>

 - [Accelerometer](https://snack.expo.dev/@ctnelson1997/basic-accelerometer-usage)
 - [Barometer](https://snack.expo.dev/@ctnelson1997/basic-barometer-usage)
 - Gyroscope
 - [LightSensor](https://snack.expo.dev/@ctnelson1997/basic-light-sensor-usage)
 - Magnetometer
 - Pedometer

</div>

Not all devices have all sensors!

---

### Other Sensors

<div>

 - `expo-camera`
 - `expo-battery`
 - `expo-haptics`
 - `expo-av`
 - `expo-brightness` 

</div>

<br/>

Beware of [permissions](https://docs.expo.dev/guides/permissions/)!

---

# Deployment
Getting your app to a production environment.

---

### Deployment

iOS vs Android Market Share

| Region | iOS | Android | Other |
| --- | --- | --- | --- |
| USA | 54% | 45% | 1% |
| North America | 52% | 47% | 1% |
| Asia | 16% | 83% | 1% |
| Worldwide | 28% | 71% | 1% | 

Source: [GlobalStatCounter](https://gs.statcounter.com/os-market-share/mobile/worldwide)

---

### Deployment

Use Expo Application Services (EAS)

```bash
npm install -g eas-cli
```

```bash
eas build -p android
eas build -p ios
```

An `.apk` gets deployed to the Google Play Store

An `.ipa` gets deployed to the iOS App Store

---

### Deployment

**No web server for deployment!** Hosted on Google Play Store or iOS App Store.

App goes through a review process.

<div>

 - **Google Play Store:** Hours to Days
 - **iOS App Store:** Days to Weeks

</div>


---

### Deployment Considerations

<div>

 - Reliability
 - Performance
 - Monitoring
 - Business Value of Delivery
 - App Store Optimization (ASO)

</div>


---

### What did we learn today?

<div>

 - How to pass data using React Navigation?
 - How to perform "switch" navigation?
 - How to store secrets on mobile devices?
 - How to do advanced gestures and animations?
 - How to use sensors?
 - How to deploy our apps?

</div>

---

# Questions?
