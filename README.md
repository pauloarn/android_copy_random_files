# android_copy_random_files
Node project to select select random files from PC folder and copy them into android device

## Setup
- Clone repository
- Run npm install or yarn
- Setup a .env file like .env.example
- Change the value of `numerOfFiles` to the amound of files to be copied
- After project setup, make sure you unlocked Developer Options on your android([If you don't know, follow this tutorial](https://www.digitaltrends.com/mobile/how-to-get-developer-options-on-android/))
- Make sure you gave USB Debbuggin permitions to your PC ([If you dont't know, follow this tutorial](https://www.microfocus.com/documentation/silk-test/210/en/silktestworkbench-help-en/GUID-BE1EA2BA-EFF2-4B2D-8F09-4BEE0947DFB2.html))
- Make sure you have adb (Android Debug Bridge) on your PC ([If you dont't know, follow this tutorial](https://www.xda-developers.com/install-adb-windows-macos-linux/))
- After you setup everything, just need to run "npm run transfer" ou "yarn transfer" and wait the files to be transfered