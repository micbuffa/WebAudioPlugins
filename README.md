# WebAudioPlugins (WAPs)
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

FIGURE XXX

## A Draft Specification
The goal of our [draft Web Audio plug-in API proposal](xxx) is to devise a minimal set of mechanisms that allow interoperation between our independently developed frameworks. A high level overview of the proposal is given below.

A WAP extends AudioNode (or AudioWorkletNode) and thus inherits their familiar properties and methods. This ensures interoperation with standard Web Audio API nodes and applications built on top of the Web Audio graph. Integration with Web Midi is provided by MIDIPort members.

WAPs are either *composite* or *custom audio nodes*. Composite nodes encapsulates an audio sub-graph that is built from any number of (elementary) AudioNodes. Custom nodes are AudioWorklets, with a fallback to a ScriptProcessorNode descendant. Although implementation details are outside the scope of the proposed API, a standard (but extensible) communication protocol between AudioWorkletNode and AudioWorkletProcessor was considered beneficial.
WAPs are GUI-aware but agnostic about their implementation strategy. This means that WAPs may be headless, or they may expose a visual HTML element (e.g., div, canvas, SVG, or custom element) which can be attached to DOM. The WAP design will ensure that the GUI code is loaded only if necessary.

WAP metadata describes implementation specific aspects of the plug-in. Metadata is available as a separate JSON file and also as a runtime object. Metadata describes audio and midi IO configuration, namespace attributes, parameter space, plug-in type, URIs and so on. WAP repositories may collect JSON files into aggregates for discovery purposes.

A WAP endpoint is described by a URI, which may point to an online or local filesystem resource. Metadata may describe separate URIs for headless and GUI equipped WAPs. We foresee two embedding strategies: a hosting web page may simply employ one of the URIs in a script/link tag. More complex WAPs, such as those implemented in WASM may however require a dynamic loading mechanism.

## Online Tools, Tutorials and Examples
Along with the online documentation, we propose simple examples/tutorials both for the “host side” and “plug-in side” of our proposal, as well as online tools such as validators/testers. Some are presented in the different examples that follow. 

**Example 1: very simple HTML page that acts as a host by loading a headless plug-in**: the source code below shows extracts of a minimal host implementation that loads a headless plug-in and connects it to the Web Audio graph:

[This example can be tried online at JsBin](https://jsbin.com/fidevim/edit?html,js,console,output)

```javascript
 var ctx = new AudioContext();
 var player = document.getElementById("soundSample");

 var mediaSource = ctx.createMediaElementSource(player);
 var pluginURL = "https://wasabi.i3s.unice.fr/WebAudioPluginBank/WASABI/PingPongDelay2";
 var plugin = new WAPlugin.WasabiPingPongDelay(ctx, pluginURL);

 plugin.load().then((node)=>{
   mediaSource.connect(node);
   node.connect(ctx.destination);
 });
```

Behind the scenes,  a JSON metadata file is loaded from the plug-in URI. A <script src="..."></script> HTML tag is added if needed. Following that, the plug-in is initialized. Since it may load assets such as image files or a WASM module asynchronously, the load method returns a JavaScript promise. In this example, the name of the plug-in class is hard-coded but it could have been built dynamically from the content of the plug-in metadata JSON file (further examples show how to do this, such as the online plug-in tester from Fig 5). From a host point of view, the plug-in might be of any kind: a Web Audio graph in a CompositeNode or a single CustomNode (AudioWorklet) node, written in JavaScript or in WebAssembly, etc. 

