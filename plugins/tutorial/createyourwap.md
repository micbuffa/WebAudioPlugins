# Create your own WAP : 

In this tutorial you'll learn how to create your own WAP, with its GUI,  how to publish it and make it available through a URI.

### WAP code Architecture
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

This file must contain at least the plugin name, category, vendor & a thumbnail image to interract correctly with others WAP tools, such as plugin hosts.

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
Our host examples, online testers, etc. fetch this file first and use those fields to dynamically load the code, guess the main Class name etc.

 
 ###  The DSP part : *Audio Node(s)*  main.js 

 Define and build the audio graph of your WAP, define parameters, inputs, outputs, etc.

**First** you have to create 2 classes that inherit from the webaudioSDK:

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
It's inherited from the WebAudioPluginCompositeNode class which manages inputs,outputs & params. Inheriting from this class makes a plugin made of a graph of node behave like a single node (i.e you can use connect/disconnect, addParams)

Then you just have to add your params as you can see in the code snippet above. The SDK will build a key-value _**`descriptor`**_ and a _**`params`**_ object which will be useful later. Basically we add a param when the value of an audioparam is subject to change (ex : oscillator type property, the frequency of a filter etc.).

If some of yours params don't fit the descriptor template (default value, min, max, etc) you can define them using a syntax like this: `Object.assign({ "bypass": "true" }, this.params)`.

The SDK provides some tools such as: **descriptor** getter, **numberOfOutputs** getter that you can override if you have more than one input/output (default values). It also makes available default gain I/O nodes called respectively `this._input` and `this._output` that are by default available through `this.inputs[Ø]` and `this.outputs[0]`. You can programmatically add additional inputs or ouputs programmatically, even while the plugin is running (i.e. a multichannel mixer plugin). 

Let's have a look at the audio graph: you need to implements 2 methods :
```js
    createNodes(){};
    connectNodes(){};
```
You are free to have your own workflow but those method are called by default when you call super.setup(); in the constructor.

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
Ok, so we defined the params and we have created the audio graph. Now, you need to write setters for your parameters. These setters will be called when parameter values are changed (i.e therough the GUI code).
We recommand to code something like that: 

```js
  setParam(key, value) {
    console.log("key : ",key," value : ", value);
    try {
      this[key] = value;
    } catch (error) {
      console.warn("this plugin does not implement the param : ", key);
    }
  }

  set myparam(_value){
    // to store the new value
    this.params.myparam = _value;
    // if your param is linked to the filter frequency you can :
    this.lpfilter.frequency.setValueAtTime(_value,this.context.currentTime);

  }
```

We are done with the basic audio processing part. A last step consist in creating a factory object that will be in charge of loading dynamically the plugin code through its URI, and instanciate it (most of these operations are done under the hood in the WAP SDK classes):

```js
window.VendorNamePluginName = class VendorNamePluginName extends WebAudioPluginFactory {

  constructor(context, baseUrl,options) {
    super(context, baseUrl, options);
  }

}
```

The  **WebAudioPluginFactory** class contains methods that fetch and create your WAP. If you are curious, you can give a look at the implementation of the load method of the WebAudioPluginFactory class located in the webaudioSDK.js file.


 ###  *GUI*  main.html

 The SDK contains a **loadGUI()** method that is related to the **main.html** file.

A GUI is optionnal for a WAP, but here is how you can build our own using W3C WebComponents: 

 **First** define an html/css template

 ```html
<template>
	<style>
    #cutoff{
      /* Absolute position*/
    }
  </style>
  <div id="cutoff">
     <input type="range" min="30" max="2800" value="1500"/>
  </div>
</template>
 ``` 
We also recommand to use the [g200k webaudio controls widget library](https://github.com/g200kg/webaudio-controls/tree/master/2.0)  in its Web component version to have more custom options for knkbs, switches, leds, etc.. For this you have to add this link on your `main.html` file : 
```html
<script src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webaudio-controls.js"></script>
```
and enable the midi control of the provided widgets:

```html
<script>WebAudioControlsOptions = {useMidi: 1,};</script>
```
After that, go to the [knobgalery web site](https://www.g200kg.com/en/webknobman/gallery.php), choose the elements you like and render them with 99 sprites for knobs (recommended). Put the png files in the WAP assets folder and add the provided webaudio components to your template.

For example, here is how you can add a rotating knob (also: look at provided plugin examples):

```html
<webaudio-knob  sprites="99" min="30" max="22000" value="1500" step="1" midilearn="true" diameter="40"></webaudio-knob>
```

**When your template is done**, clone it in a WebComponent shadow root.

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
**&** bind the GUI knobs, etc. with your plugin audio DSP params (you can access the plugin composite node through this._plug)  :

```js
  setUp(){
    this._root.querySelector("#cutoff").querySelector("input").addEvenetListener("input", (e)=>{this._plug.setParam("cutoff", e.target.value)})
  }
```
**if you choose to use webaudio-knobs**, set the src attribute to load its GUI:

```js
this._root.querySelector("#cutoff").querySelector("webaudio-knob").setAttribute('src', this._plug.URL + '/assets/knobFile.png');
```

**The Last** step is  to create a function that builds this GUI and registers it  a custom HTML element: 

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

Now the WAP is ready to be tested. Lets create an HTML file and test it. Here is a minimal code for loading and testing a plugin :
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

### If you want to submit your WAP, publish it on npm and let us know its name :

* Create an account on [npmjs](https://www.npmjs.com/signup)
* open a terminal at your WAP root, bind the session by typing `npm login https://www.npmjs.com/~usrname`
* `npm init` and specify your entry point as `main.js`
* `npm publish`
* for the versionning : `npm version patch`

Once it's available on npm it can be installed on any remote repository, and become availble to the community.
See for example : [this repo](https://mainline.i3s.unice.fr/WebAudioPluginBank/repository.json) JSON descriptor, and this [repo tester](https://wasabi.i3s.unice.fr/WebAudioPluginBank/testers/explorandtest.html) application that will show available plugibn thumbnails you can click to load dynamically plugins, run them and test them.


