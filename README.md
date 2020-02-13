# WebAudioPlugins (WAPs)
## How to use this repo
Clone this repo and open a web server on the root dir of the repo. Then you can click on any html file that starts with "test" in order to see the examples in action. Explanations below... Don't forget to see the plugins/tutorial that comes with a Readme that is a quickstart guide about how to write your first WebAudio plugins.
## Examples that use WebAudio Plugins
You can try the [The PedalBoard Project](https://wasabi.i3s.unice.fr/dynamicPedalboard/) for example, that enables loading and connecting a large set of different plugins and comes with different presets for real time guitar playing, keyboard playing etc.
## Introduction: Why WebAudio needs a plugin open standard
The Web Audio API includes a set of unit generators called AudioNodes for graph-based audio DSP algorithms. The standard AudioNodes allow for developing a range of web applications that require audio engines that go beyond simple playback. The recent addition of the AudioWorkletNode provides an efficient way to implement custom low-level processing, significantly increasing the possibilities of this technology. There are many different apps created with the Web Audio API that run independently, however there is no standard way to make them interoperable i.e. take a drum machine developed by X, load it into an application developed by Y and apply audio processing developed by Z. In the native audio world, these interchangeable units are called "audio plug-ins" and applications that can use them are known as "hosts" which are typically DAWs.
## First draft version: we target a minimal set of features plugins and hosts should take into account
We decided that the first draft Web Audio plug-in specification should look at the following categories:

* **Host/plug-in Model**: We need to define how plug-ins are loaded, instantiated, and connected together. Hosting scenarios require mechanisms for plug-in discovery and host-plug-in interface description. We must also bear in mind that in web there might not be a dedicated host - a plug-in could run “standalone” in an embedded browser. 
* **Events and MIDI**: there should be a way to send and receive events to / from plug-ins and host, and MIDI support is obvious for instruments. 
* **Parameters, Persistence**: plug-ins will need to expose their parameter set and provide getter/setters
* **Plug-in Files**: More generally, a way to persist current state so that loading and saving of presets/banks can be implemented.
* **User Interfaces**: Although some plug-ins may prefer to run headless, we need to support both generic and custom GUIs.

## Design principles / orientations

### WAP Uniform Resource Identifier
A Web Audio plug-in standard should be “Web aware” and use URIs as identifiers for plug-ins and repositories which are first class Web citizens/resources. Host web apps should be able to discover remote plug-ins by querying plug-in repositories. Plug-ins should be usable without the need for manual installation, and the mixture of different JavaScript libraries and frameworks, should not cause any naming conflict or dependency problems.

### Support for different WAP approaches 
A Web Audio Plug-in standard should be able to support multiple approaches in terms of programming language and programming environment, including pure JavaScript, C++ (via WebAssembly) and domain specific languages. It should be possible to port existing code bases across to work as a WAP and DSLs should be usable for the audio processing part. For example the [WebAudioModules](http://webaudiomodules.org/) allow the porting of native plug-ins to WAPs, and this has been demonstrated by porting several plug-ins originally made with JUCE. The iPlug 2 framework supports the WAM format and therefore could support WAPs, allowing existing iPlug plug-ins to be compiled to the format. The FAUST creators have developed a script to compile FAUST .dsp files to WAPs , and more importers/exporters are on the way.

![WAP Ecosystem](/imgs/worldDominationPlan4.png)


## A Draft Specification
The goal of our draft Web Audio plug-in API proposal is to devise a minimal set of mechanisms that allow interoperation between our independently developed frameworks. A high level overview of the proposal is given below.

A WAP extends AudioNode (or AudioWorkletNode) and thus inherits their familiar properties and methods. This ensures interoperation with standard Web Audio API nodes and applications built on top of the Web Audio graph. Integration with Web Midi is provided by MIDIPort members.

WAPs are either *composite* or *custom audio nodes*. Composite nodes encapsulates an audio sub-graph that is built from any number of (elementary) AudioNodes. Custom nodes are AudioWorklets, with a fallback to a ScriptProcessorNode descendant. Although implementation details are outside the scope of the proposed API, a standard (but extensible) communication protocol between AudioWorkletNode and AudioWorkletProcessor was considered beneficial.
WAPs are GUI-aware but agnostic about their implementation strategy. This means that WAPs may be headless, or they may expose a visual HTML element (e.g., div, canvas, SVG, or custom element) which can be attached to DOM. The WAP design will ensure that the GUI code is loaded only if necessary.

WAP metadata describes implementation specific aspects of the plug-in. Metadata is available as a separate JSON file and also as a runtime object. Metadata describes audio and midi IO configuration, namespace attributes, parameter space, plug-in type, URIs and so on. WAP repositories may collect JSON files into aggregates for discovery purposes.

A WAP endpoint is described by a URI, which may point to an online or local filesystem resource. Metadata may describe separate URIs for headless and GUI equipped WAPs. We foresee two embedding strategies: a hosting web page may simply employ one of the URIs in a script/link tag. More complex WAPs, such as those implemented in WASM may however require a dynamic loading mechanism.

## Online Tools, Tutorials and Examples
Along with the online documentation, we propose simple examples/tutorials both for the “host side” and “plug-in side” of our proposal, as well as online tools such as validators/testers. Some are presented in the different examples that follow. 

**Example 1: very simple HTML page that acts as a host by loading a headless plug-in**: the source code below shows extracts of a minimal host implementation that loads a headless plug-in and connects it to the Web Audio graph:

[This example can be tried online at JsBin](https://jsbin.com/moqutizono/edit?html,js,output)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/polyfills/webcomponents-lite.js"></script>
  <script src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/sdk/WebAudioSDK.js"></script>
  <script src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay3/main.js"></script>

</head>
<body>
  <audio src="https://wasabi.i3s.unice.fr/WebAudioPluginBank/BasketCaseGreendayriffDI.mp3" 
         id="soundSample" controls loop crossorigin></audio>
</body>
</html>
```
```javascript
 var ctx = new AudioContext();
 var player = document.getElementById("soundSample");

 var mediaSource = ctx.createMediaElementSource(player);
 var pluginURL = "https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay3";
 var plugin = new WasabiPingPongDelay(ctx, pluginURL);

 plugin.load().then((node)=>{
   mediaSource.connect(node);
   node.connect(ctx.destination);
 });
```

Behind the scenes,  a JSON metadata file is loaded from the plug-in URI. A <script src="..."></script> HTML tag is added if needed. Following that, the plug-in is initialized. Since it may load assets such as image files or a WASM module asynchronously, the load method returns a JavaScript promise. In this example, the name of the plug-in class is hard-coded but it could have been built dynamically from the content of the plug-in metadata JSON file (further examples show how to do this, such as the online plug-in tester shown further). From a host point of view, the plug-in might be of any kind: a Web Audio graph in a CompositeNode or a single CustomNode (AudioWorklet) node, written in JavaScript or in WebAssembly, etc. We will detail the different plugin files and their content later on...

**Example 2: same example as previous one, this time loading the plug-in with its GUI**: this shows the same example but this time, we also load asynchronously the GUI code (HTML, CSS, JS). The loadGUI method returns a single HTML element that contains the whole plug-in GUI. Here again, the method is asynchronous and returns a promise as a plug-in can have to load images for knobs, etc.
The load and loadGUI methods implementations are inherited by default when you extend the WebAudioPluginFactory class from the SDK, but can be overridden by the developer. In our examples, we use Web Components to package the GUI files in a single HTML file, adding encapsulation and avoiding any naming conflicts. Behind the scenes the default loadGUI method creates a <link rel="import" href="main.html"> when needed. If one prefers to use a canvas etc. for the GUI, just override the loadGUI method.
More detailed examples are available on the documentation pages of the WAP proposal. Some show in particular how to do real dynamic discovery, without hard coding any class names in the host code. 


![WAP pluginWithGUI](/imgs/PluginWithGUI.png)

[This example can be tried online at JsBin](https://jsbin.com/ralaziroxe/edit?html,js,output)


```javascript
 var ctx = new AudioContext();
  var player = document.getElementById("soundSample");
  var mediaSource = ctx.createMediaElementSource(player);
  var intermediateGain = ctx.createGain();

  var pluginURL = "https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay3";
  var plugin = new WasabiPingPongDelay(ctx, pluginURL);

  plugin.load().then((node)=>{
    console.log("node",node);

    plugin.loadGui().then((elem)=>{
      console.log("elem",elem);
      document.body.appendChild(elem);
    });
    mediaSource.connect(node);
    node.connect(ctx.destination);
  });
```
**Example 3: plug-in online validator**: this online tool uses this dynamic behavior and is provided to plug-in developers to test their work.  Copy and paste a plug-in URI and the code will be downloaded, the plug-in tested, and if a minimal set of tests passed, the plug-in will be runnable on the page and its GUI displayed, etc. You can then publish it on a repository. Notice that not all tests are mandatory to make the plug-in usable. For example, if a plug-in does not implement the load/save of its parameter state, it is still usable. 


![WAP pluginTester](/imgs/pluginTester.png)

[This example can be tried online](https://wasabi.i3s.unice.fr/WebAudioPluginBank/testers/test2.html)

If you look at the source code of the tester (in the subfolder named "testers") you will see we can dynamically load a plugin, only knowing its URI.

**Example 4: Plug-in repository online validator**, enter the URI of a REST endpoint and the list of plug-ins (with associated URIs) is first fetched, and then, in a second time, each plug-in metadata file is also fetched. Each plug-in thumbnail is displayed on the page and can be clicked to test the corresponding plug-in. If mandatory tests passed, then you’ll be able to try the plug-in online and get a full unit test report.

![WAP pluginTester](/imgs/RepoTester2.png)

[This example can be tried online](https://wasabi.i3s.unice.fr/WebAudioPluginBank/testers/explorandtest.html)




