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

