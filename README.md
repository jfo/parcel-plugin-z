[linking for testing](https://stackoverflow.com/a/18778516)

so the loader works, and passes through the ZigAsset into the dist dir, but it
doesn't do anything special and it doesn't return the actual text of the file,
just the filename.

I have to figure out two things: how to process the file (in this case to
compile it) and how to load the file (in this case wasm compile on the client
side I guess.)

Look to rust etc for what it's doing.
