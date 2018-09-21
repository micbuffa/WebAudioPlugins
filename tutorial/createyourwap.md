# Create your own WAP : 

In this tutorial you'll learn how to create your own WAP, with its GUI, and mate it available.

### Architecture
```
wapName
├──main.js
├──main.html
├──main.json
└──assets
    ├──thumbnail.png
    └──js
        └──externalScript.js

          
```

###  *Metadata* main.json

Must contain at least name, category, vandor & thumbnail to interract correctly with others WAP tools.

```json
  {
    "documentation": "https://github.com/you/thisproject",
    "name": "wapName",
    "thumbnail": "./assets/thumbnail.png",
    "vendor": "you",
    "category":"Filter",
    "version": "1.0"
  }
```
Some of our applications fetch this file first and uses those fields to prepare the WAP launch.

 
 ###  *Audio Node(s)*  main.js 

 Define and build the audio graph of your WAP.

**First** you have to create 2 class inherited from the webaudioSDK:

The first class is the actual Audio Node
```js
window.PluginName = class PluginName extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    /*    ################     API PROPERTIES    ###############   */

    this.addParam({ name: 'cutoff', defaultValue: 1500, minValue: 30, maxValue: 22000 });
    super.setup();
  }
}
```
It's inherited from a CompositeNode which manages inputs,outputs & params.
Here you just have to add your params as you can see in the snippet and the SDK will build a key-value _**`descriptor`**_ and a _**`params`**_ object which will be useful later. Basically we add a param when the value of an audioparam is made to change (ex : type of an oscillator, frequency of a filter).

If some of yours params don't fit the descriptor you can add it like `Object.assign({ "status": "disable" }, this.params)` in the constructor.

The SDK has some tools like : **descriptor** getter, **numberOfOutputs** getter that you can override if you have features to add. It also make available default I/O called respectively `this._input` and `this._output` that are by default on `this.inputs[Ø]` and `this.outputs[0]` tabs that you can fill with additionnal I/O's. 

Let's jump to the audio graph : you need to implements 2 methods :
```js
    createNodes(){};
    connectNodes(){};
```
You are free to have your own workflow but those method are called by default in the super.setup(); It's also quite clear if your code is shared.

### Example
```js
    createNodes(){
      this.lpfilter = this.context.createBiquadFilter();
      this.lpfilter.type = "lowpass";
    };
    connectNodes(){
      this._input.connect(this.lpfilter);
      this.lpfilter.connect(this._output);
    };
```
Now the params are created and the audio nodes too, you just have to bind it. We rcommand something like that : 

```js
  setParam(key, value) {
    try {
      this[key] = value;
    } catch (error) {
      console.warn("this plugin does not implement this param")
    }
  }

  set myparam(_value){
    // to store the new value
    this.params.myparam = _value;
    // if your param is linked to the filter frequency you can :
    this.lpfilter.frequency.setValueAtTime(_value,this.context.currentTime);

  }
```

We are done with audio processing. Let's create the factory wich will make available our audio node :

```js
window.VendorNamePluginName = class VendorNamePluginName extends WebAudioPluginFactory {

  constructor(context, baseUrl) {
    super(context, baseUrl);
  }

}
```

The class **WebAudioPluginFactory** contains methods to fetch and load your WAP. We encourage you to read it in the webaudioSDK.js file.


 ###  *GUI*  main.html

 The SDK contains a **loadGUI()** method that link the **main.html** file.

 GUI is optionnal for a WAP, but here is how we build our own : 

 **First** define an html/css template

 ```html
<template>
	<style>
    #cutoff{
      /* Absolute position*/
    }
  </style>
  <div id="cutoff">
     <input type="range" min="30" max="22000" value="1500"/>
  </div>
</template>
 ``` 
We also recommand to use the [g200k webaudio controls](https://github.com/g200kg/webaudio-controls/tree/master/2.0) library in its Web component version to have more custom options. For this you have to add this link on your `main.html` file : 
```html
<script src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webaudio-controls.js"></script>
```
and enable the midi control :

```html
<script>WebAudioControlsOptions = {useMidi: 1,};</script>
```
After that, go to the [knobgalery](https://www.g200kg.com/en/webknobman/gallery.php), choose your knobs and render it with 99 sprites. Put the png file in the WAP assets and add the webaudio element to your template.

```html
<webaudio-knob  sprites="99" min="30" max="22000" value="1500" step="1" midilearn="true" diameter="40"></webaudio-knob>
```

**When your template is done**, clone it in a webcomponent shadowroot.

```js
let lowfiltertemp = document.currentScript.ownerDocument.querySelector('template');
	class PluginNameGui extends HTMLElement {
		constructor(plug) {
			super();
			// The audio processor is a field of this GUI
			this._plug = plug;
			// The link is bidirectionnal to be catched by the processor if needed once the module is loaded (for features like presets)
			this._plug.gui = this;
			// bind shadow to the class and clone the template into it
			this._root = this.attachShadow({ mode: 'open' });
			this._root.appendChild(lowfiltertemp.content.cloneNode(true));

			this.setUp();
    }
    ...
  }
```
**&** bind the GUI with your Audio node setter :

```js
  setUp(){
    this._root.querySelector("#cutoff").querySelector("input").addEvenetListener("input", (e)=>{this._plug.setParam("cutoff", e.target.value)})
  }
```
**if you choose to use webaudio-knobs**, set the src :

```js
this._root.querySelector("#cutoff").querySelector("webaudio-knob").setAttribute('src', this._plug.URL + '/assets/knobFile.png');
```

**Last** step is to create a function that build this GUIand register it (out of the class) : 

```js
try {
		// Define the custom element to the browser
		customElements.define('wasabi-myplugin', MyPluginGui);
		console.log("Element defined");
	} catch (error) {
		console.log(error);
		console.log("Element already defined");
	}
/**
* Gui factory, called from the SDK. 
* The name must be create+MyModule
*/
createMyPlugin = (plug) => {
	let elem = new MyPluginGui(plug);
	return elem;
}
```

Now the WAP is ready to be tested. Lets create a HTML file and test this minimal code :
```html
<!DOCTYPE html>
<html>

<head>
  <title>Host that loads a plugin with its GUI</title>
</head>
<script src="path/to/WebAudioSDK.js"></script>
<script src="path/to/MyPlugin/main.js"></script>

<body>
    <audio src="mysound.mp3" id="soundSample" controls loop crossorigin></audio>

</body>
<script>
  
  var ctx = new AudioContext();
  var pluginURL = "path/to/MyPlugin";
  // vendorName must be the same as in the main.json file
  var plugin = new window.VendorNamePluginName(ctx, pluginURL);

  var player = document.getElementById("soundSample");
  player.onplay = () => {
    ctx.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  }
  var mediaSource = ctx.createMediaElementSource(player);

  plugin.load().then((node) => {

    plugin.loadGui().then((elem) => {
      document.body.appendChild(elem);
    });
    mediaSource.connect(node);
    node.connect(ctx.destination)
  })
</script>

</html>
```

You can now affect the audioplayer with your WAP! Congrats!

###If you want to submit your WAP, publish it on npm and let us know its name :

* Create an account on [npmjs](https://www.npmjs.com/signup)
* open a terminal at your WAP root, bind the session by typing `npm login https://www.npmjs.com/~usrname`
* `npm init` and specify your entry point as `main.js`
* `npm publish`
* for the versionning : `npm version patch`


