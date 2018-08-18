# Vynthesizer :musical_keyboard:
![Vynthesizer](vynthesizer.png)
### Table of contents

1. [About](#about)
2. [Installation and usage](#installation-and-usage)
3. [Credits and inspirations](#credits-and-inspirations)
4. [Issues](#issues)
5. [License](#license)

## About
Vynthesizer is a university project for the course of **[Sound Analysis Synthesis and Processing](https://sites.google.com/site/sasppolimi/)** of the **Computer Science and Engineering - Musical Acoustics** master degree of the **[Politecnico of Milan](https://www.polimi.it/)**.  
It is a simple web synthesizer made of three oscillators with an amplitude envelope filter, each of them guided by one octave of the keyboard. You can either produce monophonic sounds, clicking with the mouse the key.note you want, or use your computer keyboard to produce basic three note chords.  
While you are playing, the sounds you are producing are analyzed in real time to drive the animations on the display:
  1. the three circles (one for each oscillators) follow the signal's amplitude and waveform;
  2. behind the circles, a little spectrogram shows the spectrum of the three oscillator's sounds;
  3. a little yellow bar, indicates where the majority of energy of the signal lies.
  
If you are more interested in how this project has been realized, check this [report](report.pdf).

## Installation and usage
The Vynthesizer can be used by simply going to this [link](https://vynthesizer.herokuapp.com/).  
If you prefer to run it locally, you can either:
  1. clone the repository, then use **Node.js** to start a server;
  2. download the [public](/public) folder, then simply open the [index](/public/index.html) file with an Internet browser.

**_Chrome and Safari_** are recommended, since Mozilla Firefox presents some [issues](#issues).

## Credits and inspirations
The whole project has been inspired by @mbuccoli 's [VRMusic](https://github.com/mbuccoli/VRmusic) project.  
Vynthesizer is mainly build upon [Tone.js](https://tonejs.github.io/) and [p5.js](https://github.com/processing/p5.js), using Javascript, JQuery, HTML5 and Bootstrap4.
For what concerns the UI, the keyboard is realized using a slightly modified version of https://github.com/openmusic/piano-keyboard (with the aid of https://github.com/WebReflection/document-register-element library for the Custom Web Components support in Firefox), while the knobs and dropdowns are realized using the following libraries: https://github.com/andrepxx/pure-knob and https://github.com/marghoobsuleman/ms-Dropdown.

## Issues
The main open issues regards the support for Custom Web Components in Mozilla Firefox. The keyboard indeed is realized with the v0 version of Custom Web Components, which is not implemented in Firefox. For this reason, I used the **document-register-element** API to interface the keyboard with Firefox, but still there are some problems (especially related to the dispatching of the *note on, note off* events.  
The best approach would probably be to update the project using the V1 version of Custom Components, and for this reason I opened a branch: if you would like to contribute, any help is really appreciated!  
Other minor issues involve the difference between the sounds generated by Tone.js when the app is open with different browsers: again, Firefox presents different sounds from Chrome, on which the app has been developed and tested. This issues are known to the Tone.js developers, therefore, if you would like to contribute, check their [GitHub repository](https://github.com/Tonejs/Tone.js).

## License
This software is licensed under the MIT License.


