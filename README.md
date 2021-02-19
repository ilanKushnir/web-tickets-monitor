
<h1 align="center">
  <br>
  <img src="https://i.imgur.com/e43cGk2.png" alt="Markdownify" width="200">
  <br>
  Web Tickets Monitor
  <br>
</h1>

<div align="center">
<h4>Web tickets sale monitoring tool</h4>
<h5>set by default to hermon 🏂 tickets</h5>

  [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
  [![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()
</div>
<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

<div align="center">
    <img src="https://i.imgur.com/RH6JWAB.png" alt="screenshot" width="500"/>
</div>

## Key Features

* Supports waiting for async component load by XPath
* Sound alert when change occurs
  - soon: email & mobile notifications
* Custom settings:
  - checking days selection
  - parent componenet level selection

<div align="center">
    <img src="https://i.imgur.com/OTigp4d.png" alt="screenshot" width="500"/>
</div>

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/ilanKushnir/web-tickets-monitor.git

# Go into the repository
$ web-tickets-monitor

# Install dependencies
$ npm install

# Edit settings.js file

# Run the app
$ npm start
```
Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Settings File

+-----------------------------------+-------------------------------------------------------------------+
| Variable                          | Meaning                                                           |
+===================================+===================================================================+
| Track data                        | | ``$ git add train.py``                                          |
|                                   | | ``$ dvc add images.zip``                                        |
+-----------------------------------+-------------------------------------------------------------------+
| Connect code and data by commands | | ``$ dvc run -d images.zip -o images/ unzip -q images.zip``      |
|                                   | | ``$ dvc run -d images/ -d train.py -o model.p python train.py`` |
+-----------------------------------+-------------------------------------------------------------------+
| Make changes and reproduce        | | ``$ vi train.py``                                               |
|                                   | | ``$ dvc repro model.p.dvc``                                     |
+-----------------------------------+-------------------------------------------------------------------+
| Share code                        | | ``$ git add .``                                                 |
|                                   | | ``$ git commit -m 'The baseline model'``                        |
|                                   | | ``$ git push``                                                  |
+-----------------------------------+-------------------------------------------------------------------+
| Share data and ML models          | | ``$ dvc remote add myremote -d s3://mybucket/image_cnn``        |
|                                   | | ``$ dvc push``                                                  |
+-----------------------------------+-------------------------------------------------------------------+

## Credits

This software uses the following open source packages:

- [Open](https://github.com/sindresorhus/open)
- [Node.js](https://nodejs.org/)
- [Puppeteer](https://pptr.dev/)
- [Play-Sound](https://github.com/shime/play-sound)
- [Set-Interval-Async](https://github.com/ealmansi/set-interval-async)

## License

MIT

---

> GitHub [@ilanKushnir](https://github.com/ilanKushnir/) &nbsp;&middot;&nbsp;
