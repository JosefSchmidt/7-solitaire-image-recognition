# Guide to using the app

## Step 1

Open the terminal and if the path is 7-solitaire-image-recognition-1 write the command down below. If that is not the path use the cd command to find the folder and when the path is found write the command below 

***cd api***

Now you are in the new folder 7-solitaire-image-recognition-1/api write the command

***npm install***

next open a new terminal and do the same procces again. just with the new path down below.

***cd app***

Now you are in the new folder 7-solitaire-image-recognition-1/app write the command

***npm install***

## Step 2

When the installation of all the librais is done you are gonna go into the terminal where the path is 7-solitaire-image-recognition-1/api and write the command below for it to start the API.

***npm start*** 

After that you need to change the ip address for the app, you do that by changing the ip address in the app folder in the App.js file. In the App there is written a comment it says to change the Ip-adress here. To get the Ip-address for you computer you can go through the terminal for mac and windows the command in the terminal is ipconfig /all and the IP-address is found under IPv4 Address. 

***change ip Adress***

Now you have changed the Ip-address in the App.js file. To get the system to work on the ihpone you need a app the app is called expo go.

***Download expo go on iphone***

The last thing before the iphone and computer works together is to get the same ip-address on both of them, there are to means to do this one is to share the network from the iphone or be on the same network, with same ip-addres. Some networks have subnets so be wary of that.

***Same network***

From here you go to the terminal with the path 7-solitaire-image-recognition-1/app and type the command down below. That starts the app.

***expo start***

## Step 3
It should show a QR code in the terminal, if not be sure to backtrack and see if you have missed something in the guide. If the QR code shows, scan it with the camera on the ihpone it should. There should be a link you can click on the iphone, that should direct it into the app.

***scan QR code**

## Step 4 

The final part is about how the Applikation work. Then the app is opened it shows the camera, then you need to take at picture of the solitarie. The UI bokses is laying sideways on purpose. The bottom part with seven columns is the tabluea, the left upper corner is the stack and the right upper corner is the foundation. 

***Take picture***

After taken the picture you get into a loading screen followed by a best move for the current state of the solitarie. To get out to the camera again press the ok button.

***Wait for bestMove*** 