# week 8
## pseudocode

Pseudocode is a way of planning out real code in plain English, and potentially to use as a guide for writing the real code. I think of it as writing the English phonetic pronunciation when you're learning a new language, before writing the proper spelling; it helps you bridge the learning gap and make it easier to remember.
As my code will rely largely on numerical data pulled from sound rather than user input, I found it pretty hard to plan out the pseudocode for my project, so I left it quite abstract as to not spend too much time on it.

FUNCTION visual
INPUT sound
IF sound plays
	analyse (high, mid, low),
(high+mid+low)

ELSE IF
	Map waveform
	Map amplitude
	Map frequencies
ELSE IF
	Translate shapes
	Scale shapes 
ELSE IF
	change colours

WHILE sound plays
IF keyPressed
	sound stop
END IF

## speech 2 text

I was super surprised at how quick the process was for creating a basic text-to-speech function in p5js (for an experienced coder of course). The text-to-speech results using the p5speech library were also much more accurate than I would have expected them to be. While I may not use this in my project, I can see it being very useful for future reference when showcasing a typeface, or pretty much endless other possibilities.

<img src="Screen Shot 2020-09-19 at 4.18.20 pm.png" width="750" />

## my code progress

After browsing a few other people's ([Yannis Yannakopoulos](https://tympanus.net/codrops/2018/03/06/creative-audio-visualizers/) and [Rios](https://editor.p5js.org/rios/sketches)) codes using the getEnergy function of p5sound, I finally managed to get my own sketch up and running. The main difficulties arose from knowing where to place all the variables, I originally had them all outisde of 'function draw' but after trying everything I found that they should be within 'function draw' entirely. I'm sure there is a neater way to do it but I am just happy that it works. My code uses five variables from the sound, bass, low mid, mid, high mid, and treble.

<img src="getenergy.gif" width="750" />

This is just a start on trying to get the sound values to move shapes and change colours, rather than just control the scale. So far I am still not sure how I will achieve the wavy lines that I am aiming for, as the 'waveform' function that I had been working on appears to be tied to being a flat line. Right now thhe colours are not being effected as much as I need, but I still have a lot to explore in that department.

<img src="mandala.gif" width="750" />
