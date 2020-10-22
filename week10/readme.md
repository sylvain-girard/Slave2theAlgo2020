# week 10

## Continuing with the final sketch

[Sketch as of week 10](https://sylvain-girard.github.io/Slave2theAlgo2020/week10/chromaesthetorweek10/)

<img src="Screen Shot 2020-10-19 at 1.36.50 pm.png" width="600" />

This week primarily consisted of getting the file upload function up and running. Given that my project really hinges on this function, I probably should have thought about this sooner, as it was not so easy. Most resources online were focused on uploading image data, not sound, so I found I was kind of just guessing until it worked. The file upload function didn't play very well with my preload function, so I decided to just remove the sound from the preload, which meant that people would only be able to use their own music, but I thought that was a good compromise seeing as it would also reduce loading times this way.

<img src="Screen Shot 2020-10-19 at 1.33.53 pm.png" width="400" />

The standard HTML button and the 'choose file' prompt was not really what I wanted on my site from a visual standpoint, so I thhen started my research into p5.DOM, HTML, CSS, and some other button libraries that would give me 'cleaner' buttons.

As far as the visual aspects, I was again working on the wavy lines that are supposed to be mapped to thhe mid tones. I spent a lot of time going back and forth between the text to points method and the simpler sin wave circle method, because the text to points sketch was proving really hard to work with. For my idea it needs to be centred in the middle of the screen, however a screen width and height translation wouldn't work because there is already a complex translation applied to the shape for it to function. The sin wave circle was a lot easier, but a lot less visually appealing. I could easily just translate by a number of pixels so it would look right on my screen, but I also really wanted my website to be responsive to screen bounds. 

<img src="Screen Shot 2020-10-22 at 1.50.22 pm.png" width="600" />

We also had a progress report with Karen and Andy, I had many questions for Karen surrounding the wavy lines that I wanted in my sketch, the issues with the file upload, as well as mapping colour hue further than the 360 degrees (wanting to go from 270 to 70 smoothly). Andy gave some good feedback on the UI and how my UI could be more focused on the visual characteristic of having the circles in the centre, the shapes lend themselves to be part of the UI in a way. This session was really valuable for me as it gave me a good direction of what to do in the last two weeks.

## [week 11 ->](https://sylvain-girard.github.io/Slave2theAlgo2020/week11/)
