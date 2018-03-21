This part is used for extracting a list of guides and demos metadata
based on their code and `@Guide` and `@demo` decorators.

The code is a bit awkward as it uses webpack for creating a bundle which 
is ran in in on each compilation and it generates the 
`website/src/assets/content.json` file. The chunk itself is not emitted
as its not useful!

I know it's an awkward usage of webpack but I didn't came up with a
better solution for that purpose!
