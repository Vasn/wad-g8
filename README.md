# wad-g8

SHYA's Readme

README (♡˙︶˙♡)
FOR CHANGES IN THE SPOTIFY-FILES ONLY! + now  ALSO includes changes to other pages!

13 NOV 2021 
many things have changed since the 9th but the latest working update

SPOTIFY
- now has MORE modals because i am excessive that way: this also is to alert users to have one running instance of spotify or to change their spotify device to play on the web application 
- shifted music controls down next to the little scene changing circles, changed col-lg-4 to col
- EDITED THE CODE so it's cleaNER: VAS IF U R READING THIS I HAVE SHOVED MY MODALS INTO UR APP DIV

NAVBAR CHANGES
- vue navbar now works on spotify, updated navbar.js to keep up w the updates
- made the credits more subtle.


9 NOV 2021
- deleted main.css and util.css because there were many many many many many lines of useless code
- created test.css (probably should change the name for this but for now it works) it's what the main pages use (spotify - index.html and uploads - login.html)

4 NOV 2021
there were many pushes prior to this one but uhhh ignore those ...
- ACTUALLY fixed track analysis using local storage
    it now only returns a SINGLE console.log instance (i'm assuming it's the first instance because if it were to be the last, the delay would have been longer)
- linked upload.html from the navbar dropdown

23-24 OCT 2021
- fixed track analysis
- fixed dropdown menu
- redesigned modal (decided that it is OK to not make it slide out from right)

19 OCT 2021
- made the buttons cute, used Vue

16 OCT 2021
- since this is the first read me, just note that future read mes will be added above and not below!
- clientid/secret is currently shya's (this will change in the future!),
if you face an error in redirect uri, it is most likely that it's not whitelisted on shya's spotify web api app end
so use your own clientid/secret and whitelist it OR let me know and i will whitelist your redirect uri!
- added the base files, but important files to note are the index.html and app.js which will be where most of the changes occur

PROBLEMS TO FIX / FEATURES TO ADD ヾ(`ヘ´)ﾉﾞ	

- [X] Device not automatically obtained upon page load, requires a page reload for it to appear
- [X] Mobile responsiveness (to-check)
- [X] Fix Spotify Web SDK not working
- [] Store client ID/secret in database
- [x] Scene for music
- [x] Fix for when Spotify is used on another device, there's an error where name/pause data cannot be read
- [] Sessions
