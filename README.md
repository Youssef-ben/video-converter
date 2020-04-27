# Online video converter

The idea of this project came from the fact that most of the free tools that exist on the internet have some restrictions like the length of the video, must watch ads, or a confusion UI with a lot of download buttons. With this, the need to create a free tool that has none of the inconvenience or restrictions like the others became stronger.

The **Online video converter** is a web/desktop application that will allows you to download youtube videos as `MP4s` or convert them to `MP3s` without any restriction.

## Disclaimer

This application should only be user for **non-copyrighted** materials and open source videos for personal use only.

If you wish to use any copyrighted videos from Youtube you must obtain expressed permission from the copyright owner.

## Stack

- [Create React App]():
- [ReactJS]():
- [Electron]():
- [Sass]():
- [FFmpeg]():

## Dependencies

- [Electron]():
- [ytdl-core]():
- [fluent-ffmpeg]():
- [ffmpeg-static]():
- [react-bootstrap]():

## Future Improvements

- [ ] Multiple downloads at a time
- [ ] Preference - Should show or not the `Select Download folder`.
- [ ] Preference - Save default storage path.
- [ ] Preference - Choice of bitrate for convertion of the MP3s files.
- [ ] Preference - Should show or not the `Select Download folder`.

## Getting started

To start developing or using the application you need to make sure that you have [NodeJs v12.16.x](https://nodejs.org/dist/latest-v12.x/node-v12.16.2-x64.msi) and the package manager [yarn v1.22.x](https://classic.yarnpkg.com/en/docs/install#windows-stable) installed.

### Useful commands

```bash

## Install dependencies
yarn

## Run the application
yarn run-dev

or

make run

## Build the application
yarn build

## Package the application
yarn pack-win-electron

## Lint the project
yarn lint-fix

## Clean the project
make clean
```
